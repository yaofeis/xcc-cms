<template>
  <div id="login">
    <div class="form">
      <p class="title">账号登录</p>
      <el-form :model="loginForm" status-icon :rules="loginRule" ref="loginForm" class="demo-ruleForm">
        <el-form-item prop="account">
          <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="loginForm.pass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      let validateAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入账号'));
        }
        callback();
      };
      let validatePass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入密码'));
        }
        callback();
      };
      return {
        loginForm: {
          account: '',
          pass: ''
        },
        loginRule: {
          account: [
            {validator: validateAccount, trigger: 'blur'}
          ],
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push('Index');
          }
        });
      }
    },
    created(){
      // this.$axios.post(this.http.getCouponList).then((res)=>{
      //   console.log(res);
      // });
    }
  }
</script>

<style lang="scss">
  #login {
    background: antiquewhite;
    height: 100%;

    .title {
      text-align: center;
      font-size: 20px;
      padding-bottom: 20px;
      color: #409EFF;
    }

    .form {
      background: white;
      position: fixed;
      top: 20%;
      right: 20%;
      width: 350px;
      padding: 20px;
      border-radius: 10px;

      .el-input__inner {
        border: none;
        border-bottom: 1px solid #DCDFE6;
        border-radius: 0;
      }

      .el-form-item.is-error {
        .el-input__inner {
          border-bottom: 1px solid #F56C6C;
        }
      }

      .el-form-item.is-success {
        .el-input__validateIcon {
          color: #409EFF;
        }
      }

      button {
        width: 100%;
        margin-top: 20px;
      }
    }
  }
</style>
