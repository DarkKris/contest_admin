<template>
  <div class="account-bar">
    <template v-if="isLogin">
      <el-button type="text" @click="callLogin">未登录</el-button>
    </template>
    <template v-else>
      <el-button type="text" @click="doLogout">注销</el-button>
      <el-button type="text" @click="callEdit">更新信息</el-button>
      <span class="account-name">{{ username }}</span>
      <el-avatar>{{ username }}</el-avatar>
    </template>
    <el-dialog class="edit-admin-dialog" :visible="editVisible" @close="closeDialog">
      <template>
        
        <el-form label-position="right" label-width="80px" :model="editForm">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="用户名" name="username">
              <el-form-item label="用户名">
                <el-input v-model="editForm.username"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="邮箱" name="emial">
              <el-form-item label="邮箱">
                <el-input type="email" v-model="editForm.email"></el-input>
              </el-form-item>
              <el-form-item label="验证码">
                <el-input v-model="editForm.code"></el-input>
                <el-button @click="getCode">获取验证码</el-button>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </template>
      <span slot="title">编辑管理员</span>
      <div slot="footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="doEditAdmin">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateUsername, updateEmail } from "api/admin";

export default {
  name: "account-bar",
  data() {
    return {
      editVisible: false,
      activeTab: "username",
      editForm: {
        username: "",
        email: "",
        code: "",
        token: ""
      }
    }
  },
  methods: {
    closeDialog() {
      this.editVisible = false;
    },
    callEdit() {
      this.editVisible = true;
    },
    callLogin() {
      if (this.isLogin || this.$route.path.includes("/login")) return;
      this.$router.push("/login");
    },
    doLogout() {
      this.$store.dispatch("changeLoginStatus", false);
    },
    async getCode() {
      const email = this.$store.state.userInfo.email;
      await sendCaptcha({
        email: email,
        subject: "【比赛管理系统】更新信息验证码"
      });

      if (resp.success) {
        this.editForm.token = resp.data.token;
        this.$message({
          type: 'success',
          message: '发送验证码成功，请前往邮箱接收'
        });
      } else {
        this.$message({
          type: 'error',
          message: '发送验证码失败，' + resp.err_msg
        });
      }
    },
    async doEditAdmin() {
      const token = this.$store.state.userInfo.token;
      let resp = null;
      if (this.activeTab === "username") {
        resp = await updateUsername({
          username: this.editForm.username
        }, token);
      } else {
        resp = await updateEmail({
          email: this.editForm.email,
          code: this.editForm.code,
          token: this.editForm.token
        }, token);
      }

      if (resp.success) {
        let newInfo = { username: this.editForm.username };
        if (this.activeTab === "email") {
          newInfo = { email: this.editForm.email };
        }

        this.$store.dispatch("setUserInfo", Object.assign({}, this.$store.state.userInfo, newInfo));
        this.$message({
          type: 'success',
          message: "更新信息成功！"
        });
      } else {
        this.$message({
          type: 'error',
          message: "更新信息失败，" + resp.err_msg
        });
      }
    }
  },
  computed: {
    username() {
      const { username } = this.$store.state.userInfo;
      return username;
    },
    isLogin() {
      const { isLogin } = this.$store.state.userInfo;
      return isLogin;
    }
  }
}
</script>

<style lang="less" scoped>
@import "./account-bar";
</style>