<template>
  <el-dialog title="新增点位" :visible.sync="dialogVisible" Size="small">
    <el-form :inline="true" :model="form" class="demo-form-inline" :rules="rules" ref="pointAddForm">
      <el-form-item prop="PointName" label="点位名称" :label-width="formLabelWidth">
        <el-input v-model="form.PointName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="TagName" label="点位编码" :label-width="formLabelWidth">
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
    <!--<div class="point-S7-1" v-if="!form.IsVariable">-->
      <el-form :model="form" v-if="!form.IsVariable">
        <el-form-item label="点位地址" :label-width="formLabelWidth">
          <el-input v-model="form.TagCode" @blur="writeDetailInfo" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="form" class="demo-form-inline" :rules="rules" ref="pointS7AddForm" v-if="!form.IsVariable">
        <el-form-item prop="TagArea" label="块名" :label-width="formLabelWidth">
          <el-input v-model="form.TagArea" :readonly="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="TagAddress" label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.TagAddress" :readonly="true" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="form" class="demo-form-inline" v-if="!form.IsVariable">
        <el-form-item label="数据类型" :label-width="formLabelWidth">
          <el-select v-model="form.DataType" placeholder="请选择数据类型">
            <el-option label="Bool" value=1></el-option>
            <el-option label="Byte" value=2></el-option>
            <el-option label="Int16" value=3></el-option>
            <el-option label="Int32" value=4></el-option>
            <el-option label="Int64" value=5></el-option>
            <el-option label="Float" value=6></el-option>
            <el-option label="Double" value=7></el-option>
            <el-option label="String" value=8></el-option>
            <el-option label="Buff" value=9></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="长度" :label-width="formLabelWidth">
          <el-input v-model="form.Size" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
    <!--</div>-->
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
        rules: {
          PointName: [
            {required: true, message: '请输入点位名称', trigger: 'blur'}
          ],
          TagName: [
            {required: true, message: '请输入点位编码', trigger: 'blur'}
          ],
          TagArea: [
            {required: true, message: '块名不能为空'}
          ],
          TagAddress: [
            {required: true, message: '地址不能为空'}
          ]
        },
        dialogVisible: false,
        form: {},
        formLabelWidth: '100px'
      }
    },
    methods: {
      writeDetailInfo () {
        if (this.form.TagCode !== '') {
          this.form.TagCode = this.form.TagCode.toUpperCase()
          let tagCode = this.form.TagCode.trim()
          if (tagCode.indexOf('DB') === 0) {
            let temp = tagCode.split('.')
            if (temp.length === 2) {
              this.form.TagArea = temp[0]
              this.form.TagAddress = temp[1]
            } else if (temp.length === 3) {
              let address = temp[1] + '.' + temp[2]
              this.form.TagArea = temp[0]
              this.form.TagAddress = address
              this.form.DataType = '1'
              this.form.Size = 0
            } else {
              this.$message('错误的DB块地址!')
              return false
            }
          } else if (tagCode.indexOf('Q') === 0) {
            let temp = tagCode.split('.')
            if (temp.length === 2) {
              this.form.TagArea = temp[0]
              this.form.TagAddress = temp[1]
              this.form.DataType = '1'
              this.form.Size = 0
            } else {
              this.$message('错误的Q区地址!')
              return false
            }
          } else if (tagCode.indexOf('I') === 0) {
            let temp = tagCode.split('.')
            if (temp.length === 2) {
              this.form.TagArea = temp[0]
              this.form.TagAddress = temp[1]
              this.form.DataType = '1'
              this.form.Size = 0
            } else {
              this.$message('错误的I区地址!')
              return false
            }
          } else if (tagCode.indexOf('M') === 0) {
            let temp = tagCode.split('.')
            if (temp.length === 1) {
              let area = temp[0].substr(0, 1)
              let address = temp[0].substr(1)
              this.form.TagArea = area
              this.form.TagAddress = address
            } else if (temp.length === 2) {
              this.form.TagArea = temp[0]
              this.form.TagAddress = temp[1]
              this.form.DataType = '1'
              this.form.Size = 0
            } else {
              this.$message('错误的M区地址!')
              return false
            }
          } else {
            this.$message('错误的或不支持点位地址!')
            return false
          }
        }
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
        let isvalid = false
        this.$refs['pointAddForm'].validate((valid) => {
          if (valid) {
            isvalid = true
          } else {
            isvalid = false
          }
        })
        this.$refs['pointS7AddForm'].validate((valid) => {
          if (valid) {
            isvalid = true
          } else {
            isvalid = false
          }
        })
        if (isvalid) {
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

          this.$axios.post('box/updatePointInfo', this.form).then(response => {
            if (response.data.success) {
              let data = response.data.data
              params.PointId = data
              this.$emit('callback-point-data-add', params)
              this.dialogVisible = false
            } else {
              if (response.data.data === 'verifed') {
                this.$router.push({
                  name: 'Login'
                })
              } else {
                this.$message({
                  type: 'warning',
                  message: response.data.message
                })
              }
            }
            // success callback
          }, response => {
            // error callback
          })
        }
//      this.$emit('callback-group-data-add', this.form)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
