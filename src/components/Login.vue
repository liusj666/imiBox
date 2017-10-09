<template>
  <div class="login-layout">
    <header>
      <img src="../../static/images/logo.png" style="height: 60px;width: 180px;">
    </header>
    <div class="login-body">
      <main class="login-content">
        <div class="login-box">
          <div class="box-title">系统登录</div>
          <!--<div class="box-input">-->
            <!--<label class="box-lable">账号</label>-->
            <!--<el-input v-model="form.acount" auto-complete="off"></el-input>-->
          <!--</div>-->
          <div class="box-input">
            <label class="box-lable">密码</label>
            <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
          </div>
          <div class="box-btn">
            <el-button type="primary" @click="login">登录</el-button>
          </div>
        </div>
      </main>
    </div>
    <footer class="main-footer">
      <p class="footer-text">&copy; 2017 杭州吉利易云科技有限公司</p>
    </footer>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        rules: {
          acount: [
            {required: true, message: '请输入账号'}
          ],
          password: [
            {required: true, message: '请输入密码'}
          ]
        },
        form: {
          acount: '',
          password: ''
        }
      }
    },
    methods: {
      login () {
        let params = {
          Acount: this.form.acount,
          Password: this.form.password
        }
        this.$axios.post('api/login', params).then(response => {
          if (response.data.success) {
            this.$router.push({name: 'Home'})
          } else {
            this.$message(response.data.message)
          }
          // success callback
        }, response => {
          // error callback
        })
      }
    }
  }
</script>

<style scoped>
  .box-lable {
    margin-right: 5px;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .box-title {
    display: flex;
    justify-content: center;
  }

  .box-input {
    padding: 10px;
    display: flex;
    flex-direction: row;
  }

  .box-btn {
    display: flex;
    justify-content: center;
  }

  .login-box {
    padding: 10px;
    display: flex;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.8);
    width: 30vh;
  }

  .login-layout {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  .login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    background-image: url("../../static/images/background.png");
    background-size: 100% 100%;
  }

  .main-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 3em;
  }

  .footer-text {
    color: #999 !important;
  }
</style>
