<template>
  <div>
    <!--第一步-->
    <el-dialog title="编辑设备" :visible.sync="dialogDevice" size="tiny">
      <el-form :model="form" :rules="rules" ref="deviceEditForm">
        <el-form-item prop="Name" label="设备名称" :label-width="formLabelWidth">
          <el-input v-model="form.Name"></el-input>
        </el-form-item>
        <el-form-item label="站位号" :label-width="formLabelWidth">
          <el-input-number v-model="form.StationId"></el-input-number>
        </el-form-item>
        <el-form-item label="启用" :label-width="formLabelWidth">
          <el-switch on-text="" off-text="" v-model="form.Enable"></el-switch>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.Description" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="DriverType" label="设备驱动" :label-width="formLabelWidth">
          <el-select v-model="form.DriverType" placeholder="请选择">
            <el-option v-for="item in driverList" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="btn-footer">
        <el-button type="primary" @click="next">下一步</el-button>
        <el-button @click="dialogDevice = false">取 消</el-button>
      </div>
    </el-dialog>

    <!--S7模板-->
    <el-dialog title="编辑设备" :visible.sync="dialogS7" size="tiny">
      <el-form :model="form">
        <el-form-item label="IP地址" :label-width="formLabelWidth">
          <el-input v-model="form.IpAddress"></el-input>
        </el-form-item>
        <el-form-item label="端口号" :label-width="formLabelWidth">
          <el-input v-model="form.Port"></el-input>
        </el-form-item>
        <el-form-item label="槽号" :label-width="formLabelWidth">
          <el-input-number v-model="form.Solt"></el-input-number>
        </el-form-item>

      </el-form>
      <div slot="footer" class="btn-footer">
        <el-button type="primary" @click="last">上一步</el-button>
        <el-button type="primary" @click="editDevice">完成</el-button>
        <el-button @click="dialogS7 = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    props: ['deviceGroupId'],
    data () {
      return {
        rules: {
          Name: [
            { required: true, message: '请输入设备名称', trigger: 'blur' }
          ],
          DriverType: [
            { required: true, message: '请选择驱动类型', trigger: 'blur' }
          ]
        },
        dialogDevice: false,
        dialogS7: false,
        form: {},
        formLabelWidth: '100px',
        driverList: ''
      }
    },
    methods: {
      open (data) {
        let detail
        if (data.Details !== '' && data.Details !== undefined) {
          if (JSON.parse(data.Details)._driverCfg !== undefined || JSON.parse(data.Details)._driverCfg !== '') {
            detail = JSON.parse(JSON.parse(data.Details)._driverCfg)
          }
        } else {
          detail = {
            IpAddress: '',
            Port: '',
            Solt: ''
          }
        }

        this.form = {
          State: 2,
          Id: data.Id,
          Name: data.Name,
          Enable: data.Enable,
          DriverType: data.DriverType,
          StationId: data.StationId,
          Description: data.Description,
          IpAddress: detail.IpAddress,
          Port: detail.Port,
          Solt: detail.Solt
        }
        this.driverList = window.driverType
        this.dialogDevice = true
      },
      last () {
        this.dialogDevice = true
        this.dialogS7 = false
      },
      next () {
        this.$refs['deviceEditForm'].validate((valid) => {
          if (valid) {
            this.dialogDevice = false
            this.dialogS7 = true
          } else {
            return false
          }
        })
      },
      editDevice () {
        let details = {
          IpAddress: this.form.IpAddress,
          Solt: this.form.Solt,
          Port: this.form.Port
        }
        this.form.Details = JSON.stringify(details)
        this.form.DeviceGroupId = this.deviceGroupId
        this.$axios.post('api/updateDeviceInfo', this.form).then(response => {
          console.log(response)
          details = {
            _driverCfg: JSON.stringify(details)
          }
          this.form.Details = JSON.stringify(details)
          this.$emit('callback-device-data-edit', this.form)
          this.dialogS7 = false
          // success callback
        }, response => {
          // error callback
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
