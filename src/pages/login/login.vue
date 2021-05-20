<template>
  <div class="login-page">
    <div class="page-top">
      <h2 ckass="page-title">管理员登录</h2>
    </div>
    <div class="page-content">
      <el-radio-group v-model="loginType" class="radio-box">
        <el-radio label="password">密码登录</el-radio>
        <el-radio label="captcha">验证码登录</el-radio>
      </el-radio-group>
      <el-form :model="loginForm" ref="LoginForm" label-width="100px" label-position="left">
        <el-form-item
          prop="account"
          label="登录邮箱"
          :rules="[
            { required: true, message: '请输入登录邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]"
        >
          <el-input v-model="loginForm.account"></el-input>
        </el-form-item>
        <el-form-item
          v-if="loginType === 'password'"
          label="登录密码"
          prop="password"
          :rules="[{
            required: true, message: '密码不能为空', trigger: 'blur'
          }]"
        >
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item
          v-if="loginType === 'captcha'"
          label="验证码"
          prop="password"
          :rules="[{
            required: true, message: '验证码不能为空', trigger: 'blur'
          }]"
        >
          <div style="display: flex; flex-direction: row;">
            <el-input v-model="loginForm.password" style="width: 100%; margin-right: 5px;"></el-input>
            <el-button @click.prevent="getLoginCode" size="mini">获取验证码</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doLogin">登录</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { adminLogin, sendCaptcha } from "api/login";

const LOGIN_KEY = "ContestAdmin-isLogin";

export default {
  name: "login-page",
  data() {
    return {
      loginType: "password",
      loginForm: {
        account: "",
        password: "",
        code: "",
        token: "",
      },
      isLoading: false,
      sendCodeLoding: false,
    }
  },
  methods: {
    async getLoginCode() {
      if (this.sendCodeLoading) return;

      this.sendCodeLoding = true;
      const resp = await sendCaptcha({
        email: this.loginForm.account,
        subject: "【比赛管理系统后台】管理员登录验证码"
      });

      if (resp.success) {
        const data = resp.data;
        this.loginForm = data.token;
        this.$message({
          type: "success",
          message: "已发送验证码，请前往邮箱接收",
        })
      } else {
        this.$message({
          type: "error",
          message: "发送验证码错误，" + resp.err_msg
        });
      }
      this.sendCodeLoding = false;
    },
    doLogin() {
      if (this.isLoading) return;

      this.$refs["LoginForm"].validate(async (valid) => {
        if (valid) {
          this.isLoading = true;

          const reqData = this.loginType === "password" ? {
            email: this.loginForm.account,
            password: this.loginForm.password
          } : {
            email: this.loginForm.account,
            code: this.loginForm.code,
            token: this.loginForm.token
          };

          const resp = await adminLogin(reqData);
          if (resp.success) {
            const data = resp.data;
            this.$store.dispatch("setUserInfo", {
              isLogin: true,
              ...data.admin,
              token: data.token
            });
            localStorage.setItem(LOGIN_KEY, true);
            this.$router.push("/admin");
          } else {
            this.$store.dispatch("changeLoginStatus", false);
            localStorage.removeItem(LOGIN_KEY);
            console.error("🙅 登录失败 err_msg: %s", resp.err_msg);
            this.$message({
              type: "error",
              message: "登录失败，" + resp.err_msg
            });
          }
          this.isLoading = false;
        }
        return false;
      });
    },
    resetForm() {
      this.loginForm = Object.assing({}, this.loginForm, {
        account: "",
        password: "",
        captcha: "",
      });
    }
  }
}
</script>

<style lang="less" scoped>
@import "./login.less";
</style>