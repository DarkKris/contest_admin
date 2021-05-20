<template>
  <div class="admin-page">
    <div class="page-top">
      <h2 class="page-title">管理员信息管理</h2>
      <div class="operate-btns">
        <el-button type="primary" @click="callAddAdminModal">添加管理员</el-button>
      </div>
    </div>
    <el-table class="admin-table" :data="tableData" border>
      <el-table-column prop="account" label="账号名"/>
      <el-table-column prop="date" label="创建时间"/>
      <el-table-column fixed="right" label="操作" width="77"><!-- 148 -->
        <template slot-scope="scope">
          <!-- <el-button @click="callEditAdmin(scope.row.id)" size="mini">编辑</el-button> -->
          <el-button @click="callDeleteAdmin(scope.row.id)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-bottom">
      <el-pagination layout="prev, pager, next"
        :total="countTotal"
        :page-size="10"
        @current-change="pageChange"
      />
    </div>

    <el-dialog class="add-admin-dialog" :visible="addVisible" @close="closeDialog">
      <template>
        <el-form label-position="right" label-width="80px" :model="createForm">
          <el-form-item label="邮箱地址">
            <el-input v-model="createForm.account"
              :rules="[
                { required: true, message: '请输入登录邮箱', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
              ]"
            />
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password"
              v-model="createForm.password"
              :rules="[{required: true, message: '请输入登录密码', trigger: 'blur'}]"
            />
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="createForm.captcha"
              :rules="[{required: true, message: '请输入超级管理员验证码', trigger: 'blur'}]"
            />
          </el-form-item>
        </el-form>
      </template>
      <span slot="title">添加管理员</span>
      <div slot="footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="doAddAdmin">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog class="edit-admin-dialog" :visible="editVisible" @close="closeDialog">
      <template>
        <el-form label-position="right" label-width="80px" :model="editForm">
          <el-form-item label="账号名">
            <el-input v-model="editForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="editForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input type="password" v-model="editForm.check"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <span slot="title">编辑管理员</span>
      <div slot="footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="doEditAdmin">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog class="delete-admin-dialog" :visible="deleVisible" @close="closeDialog">
      <template>
        <el-form label-position="right" label-width="80px" :model="deleteForm">
          <el-form-item label="验证码">
            <el-input v-model="deleteForm.captcha"
              :rules="[{required: true, message: '请输入超级管理员验证码', trigger: 'blur'}]"
            />
            <el-button @click.prevent="getCode('删除管理员')" size="mini">获取验证码</el-button>
          </el-form-item>
        </el-form>
      </template>
      <span slot="title">编辑管理员</span>
      <div slot="footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="doDeleteAdmin">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { sendCaptcha } from "api/login";
import { getAllAdmin, addAdmin, deleteAdmin } from "api/admin";

export default {
  name: "admin-page",
  data() {
    return {
      addVisible: false,
      editVisible: false,
      deleVisible: false,
      tableData: [{
        account: 'Fuqian Liu',
        date: '2016-05-02',
      }],
      countTotal: 0,
      createForm: {
        account: "",
        password: "",
        captcha: "",
        token: "",
      },
      editForm: {
        id: "",
        account: "",
        password: "",
        check: ""
      },
      deleteForm: {
        id: "",
        code: "",
      },
      lastOperateToken: "",
    }
  },
  created() {
    this.getAdminList();
  },
  methods: {
    async getCode(str) {
      const email = this.$store.state.userInfo.email;
      await sendCaptcha({
        email: email,
        subject: "【比赛管理系统】" + str + "验证码"
      });

      if (resp.success) {
        this.lastOperateToken = resp.data.token;
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
    callAddAdminModal() {
      this.addVisible = true;
    },
    callEditAdmin(id) {
      this.editForm.id = id;
      this.editVisible = true;
    },
    callDeleteAdmin(id) {
      this.deleteForm.id = id;
      this.deleVisible = true;
    },
    closeDialog() {
      this.addVisible = false;
      this.editVisible = false;
      this.deleVisible = false;
    },
    pageChange(page) {
      this.getAdminList(page);
    },
    async getAdminList(page = 1) {
      const token = this.$store.state.userInfo.token;
      const resp = await getAllAdmin(page, token);

      if (resp.success) {
        const data = resp.data;
        this.tableData = [...data.admins];
        this.countTotal = total_count;
      } else {
        this.$message({
          type: "error",
          message: "获取管理员列表失败，" + resp.err_msg
        });
      }
    },
    async doAddAdmin() {
      this.closeDialog();
      const token = this.$store.state.userInfo.token;
      const resp = await addAdmin({
        email: this.createForm.account,
        password: this.createForm.password,
        code: this.createForm.code,
        token: this.createForm.token
      }, token);

      if (resp.success) {
        const data = resp.data;
        this.tableData = [data, ...this.tableData].slice(0, 10);
        this.$message({
          type: 'success',
          message: '添加管理员成功!'
        });
      } else {
        this.$message({
          type: 'error',
          message: '添加管理员失败，' + resp.err_msg
        });  
      }
    },
    async doEditAdmin() {
    
    },
    doDeleteAdmin() {
      const token = this.$store.state.userInfo.token;
      this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const resp = await deleteAdmin({
          remove_id: this.deleteForm.id,
          code: this.deleteForm.code,
          token: this.lastOperateToken,
        }, token);

        if (resp.success) {
          this.tableData = [...this.tableData.filter((val) => val.id !== this.deleteForm.id)];

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        } else {

        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  }
}
</script>

<style lang="less" scoped>
@import "./admin.less";
</style>