<template>
  <el-dialog title="编辑采集组" :visible.sync="dialogVisible" size="tiny">
    <el-form :model="form" :rules="rules" ref="groupEditForm">
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
      <el-button type="primary" @click="editGroup">确 定</el-button>
      <el-button type="primary" @click="deleteGroup">删除</el-button>
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
        form: {
          GroupId: '',
          GroupName: '',
          Interval: 1000,
          IsStore: false,
          GroupEnable: true,
          GroupDescription: ''
        },
        formLabelWidth: '100px'
      }
    },
    methods: {
      open (data) {
        this.dialogVisible = true
        let detail = JSON.parse(data.GroupDetail)
        this.form.GroupId = data.GroupId
        this.form.GroupName = data.GroupName
        this.form.GroupEnable = data.GroupEnable
        this.form.GroupDescription = data.GroupDescription
        this.form.IsStore = detail.IsStore
        this.form.Interval = detail.Interval
      },
      deleteGroup () {
        this.$confirm('此操作将永久删除该采集组, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.form.State = 1
          this.$axios.post('box/updateGroupInfo', this.form).then(response => {
            if (response.data.success === true) {
              this.$emit('callback-group-data-delete', this.form)
              this.dialogVisible = false
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
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
        }).catch(() => {
        })
      },
      editGroup () {
        this.$refs['groupEditForm'].validate((valid) => {
          if (valid) {
            let details = {
              Interval: this.form.Interval,
              IsStore: this.form.IsStore
            }
            this.form.State = 2
            this.form.GroupDetail = JSON.stringify(details)
            this.$axios.post('box/updateGroupInfo', this.form).then(response => {
              if (response.data.success) {
                this.$emit('callback-group-data-edit', this.form)
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
