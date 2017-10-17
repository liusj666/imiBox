<template>
  <el-dialog title="修改密码" :visible.sync="dialogVisible" size="tiny">
    <el-form :model="form" :rules="rules" ref="passwordForm">
      <el-form-item prop="oldPass" label="原始密码" :label-width="formLabelWidth">
        <el-input type="password" v-model="form.oldPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="newPass" label="新密码" :label-width="formLabelWidth">
        <el-input type="password" v-model="form.newPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass" label="确认密码" :label-width="formLabelWidth">
        <el-input type="password" v-model="form.checkPass" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="btn-footer">
      <el-button type="primary" @click="submit">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.passwordForm.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.newPass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        rules: {
          oldPass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          newPass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        },
        formLabelWidth: '100px',
        form: {
          oldPass: '',
          newPass: '',
          checkPass: ''
        },
        dialogVisible: false
      }
    },
    methods: {
      open () {
        this.dialogVisible = true
        this.form = {
          oldPass: '',
          newPass: '',
          checkPass: ''
        }
      },
      submit () {
        let params = {
          OldPassword: this.form.oldPass,
          NewPassword: this.form.newPass
        }
        this.$refs['passwordForm'].validate((valid) => {
          if (valid) {
            this.$axios.post('box/password', params).then(response => {
              if (response.data.success) {
                this.dialogVisible = false
                this.$message({
                  type: 'success',
                  message: response.data.message
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
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
