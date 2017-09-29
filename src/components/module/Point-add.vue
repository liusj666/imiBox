<template>
  <el-dialog title="新增点位" :visible.sync="dialogVisible" size="small">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="点位名称" :label-width="formLabelWidth">
        <el-input v-model="form.PointName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="点位编码" :label-width="formLabelWidth">
        <el-input v-model="form.TagName" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <el-form :model="form">
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="form.Description" auto-complete="off"></el-input>
      </el-form-item>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="设备变量" :label-width="formLabelWidth">
          <el-switch on-text="" off-text="" v-model="form.IsVariable"></el-switch>
        </el-form-item>
        <el-form-item label="只读" :label-width="formLabelWidth">
          <el-switch on-text="" off-text="" v-model="form.IsReadonly"></el-switch>
        </el-form-item>
      </el-form>
    </el-form>
    <div class="point-S7-1" v-if="!form.IsVariable">
      <el-form :model="form">
        <el-form-item label="点位地址" :label-width="formLabelWidth">
          <el-input v-model="form.TagCode" @blur="writeDetailInfo" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="块名" :label-width="formLabelWidth">
          <el-input v-model="form.TagArea" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.TagAddress" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="数据类型" :label-width="formLabelWidth">
          <el-input v-model="form.DataType" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="长度" :label-width="formLabelWidth">
          <el-input v-model="form.Size" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="point-S7-2" v-if="form.IsVariable">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="设定值" :label-width="formLabelWidth">
          <el-input v-model="form.Value" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div slot="footer" class="btn-footer">
      <el-button type="primary" @click="addPoint">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </div>
  </el-dialog>

</template>

<script>
  export default {
    data () {
      return {
        dialogVisible: false,
        form: {},
        formLabelWidth: '100px'
      }
    },
    methods: {
      writeDetailInfo () {
        console.log(1)
      },
      open () {
        this.form = {
          State: 0,
          PointName: '',
          TagName: '',
          IsVariable: false,
          IsReadonly: false,
          Enable: true,
          Description: '',
          TagCode: '',
          TagArea: '',
          TagAddress: '',
          DataType: '',
          Size: '',
          Value: ''
        }
        this.dialogVisible = true
      },
      addPoint () {
        let details = {}
        if (this.form.IsVariable) {
          details = {
            Value: this.form.Value
          }
        } else {
          details = {
            TagName: this.form.TagCode,
            TagArea: this.form.TagArea,
            TagAddress: this.form.TagAddress,
            DataType: this.form.DataType,
            Size: this.form.Size
          }
        }
        this.form.DeviceId = this.$store.state.mainSidebar.selectedDeviceId
        this.form.GroupId = this.$store.state.contentDevice.selectedGroupId
        this.form.PointDetail = JSON.stringify(details)

        let params = {
          State: 0,
          PointName: this.form.PointName,
          TagName: this.form.TagName,
          IsVariable: this.form.IsVariable,
          IsReadonly: this.form.IsReadonly,
          Enable: this.form.Enable,
          Description: this.form.Description,
          DeviceId: this.$store.state.mainSidebar.selectedDeviceId,
          GroupId: this.$store.state.contentDevice.selectedGroupId,
          PointDetail: JSON.stringify(details)
        }

        this.$axios.post('api/updatePointInfo', this.form).then(response => {
          let data = response.data.data
          params.PointId = data
          this.$emit('callback-point-data-add', params)
          this.dialogVisible = false
          // success callback
        }, response => {
          // error callback
        })
//      this.$emit('callback-group-data-add', this.form)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
