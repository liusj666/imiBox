<template>
  <el-dialog title="新增采集组" :visible.sync="dialogVisible" size="tiny">
    <el-form :model="form" :rules="rules" ref="groupAddForm">
      <el-form-item prop="GroupName" label="采集组名称" :label-width="formLabelWidth">
        <el-input v-model="form.GroupName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="采集组间隔" :label-width="formLabelWidth">
        <el-input-number v-model="form.Interval" auto-complete="off"></el-input-number>
      </el-form-item>
    </el-form>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="持久化支持" :label-width="formLabelWidth">
          <el-switch on-text="" off-text="" v-model="form.IsStore"></el-switch>
        </el-form-item>
        <el-form-item label="启用" :label-width="formLabelWidth">
          <el-switch on-text="" off-text="" v-model="form.GroupEnable"></el-switch>
        </el-form-item>
      </el-form>
    <el-form :model="form">
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.GroupDescription" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="btn-footer">
      <el-button type="primary" @click="addGroup">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </div>
  </el-dialog>

</template>

<script>
  export default {
    data () {
      return {
        rules: {
          GroupName: [
            { required: true, message: '请输入采集组名称', trigger: 'blur' }
          ]
        },
        dialogVisible: false,
        form: {},
        formLabelWidth: '100px'
      }
    },
    methods: {
      open () {
        this.dialogVisible = true
        this.form = {
          State: 0,
          GroupName: '',
          Interval: 1000,
          IsStore: false,
          GroupEnable: true,
          GroupDescription: ''
        }
      },
      addGroup () {
        this.$refs['groupAddForm'].validate((valid) => {
          if (valid) {
            let details = {
              Interval: this.form.Interval,
              IsStore: this.form.IsStore
            }
            this.form.GroupDetail = JSON.stringify(details)
            this.form.DeviceId = this.$store.state.mainSidebar.selectedDeviceId
            let params = {
              State: 0,
              GroupName: this.form.GroupName,
              GroupEnable: this.form.GroupEnable,
              GroupDescription: this.form.GroupDescription,
              GroupDetail: JSON.stringify(details),
              DeviceId: this.$store.state.mainSidebar.selectedDeviceId,
              Points: []
            }
            this.$axios.post('box/updateGroupInfo', this.form).then(response => {
              if (response.data.success) {
                let data = response.data.data
                params.GroupId = data
                this.$emit('callback-group-data-add', params)
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
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
