<template>
  <div class="contest-page">
    <div class="page-top">
      <h2 class="page-title">文件/比赛管理</h2>
      <div class="operate-btns">
        <el-radio-group v-model="typeRadio">
          <el-radio-button label="文件"></el-radio-button>
          <el-radio-button label="比赛"></el-radio-button>
      </el-radio-group>
        <el-button type="primary" @click="callAddContest">添加比赛/文件类型</el-button>
      </div>
    </div>
    <el-table class="contest-table" :data="tableData" border>
      <el-table-column label="比赛/文件" width="160">
        <template slot-scope="scope">
          {{ scope.row.is_file_type ? "文件" : "比赛" }}
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型"/>
      <el-table-column fixed="right" label="操作" width="77">
        <template slot-scope="scope">
          <el-button type="danger" @click="deleteType(scope.row.type_id)" size="mini">删除</el-button>
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
    <el-dialog :visible="dialogVisible" @close="closeDialog">
      <template>
        <el-form label-position="right" label-width="80px" :model="createForm">
          <el-form-item label="创建类型">
            <el-radio-group v-model="createForm.is_file_type">
              <el-radio :label="true">文件类型</el-radio>
              <el-radio :label="false">比赛类型</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="createForm.type"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <span slot="title">添加类型</span>
      <div slot="footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="doCreateType">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getContestList, addContestType, deleteContestType } from "api/contest";
export default {
  name: "contest-page",
  data() {
    return {
      typeRadio: "文件",
      dialogVisible: false,
      tableData: [{
        is_file_type: true,
        type: "doc",
      }],
      countTotal: 0,
      createForm: {
        is_file_type: true,
        type: "",
      },
      nowPage: 1,
    }
  },
  created() {
    this.getTypeList();
  },
  methods: {
    callAddContest() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    pageChange(page) {
      this.nowPage = page;
      switch (this.typeRadio) {
        case "文件":
          this.getTypeList(page);
          break;
        case "比赛":
          this.doGetContestList(page);
          break;
      }
    },
    async getTypeList(page = 1) {
      const token = this.$store.state.userInfo.token;
      const resp = await getContestList(page, token);

      if (resp.success) {
        const data = resp.data;
        this.tableData = [...data.match_types];
        this.countTotal = data.total_count;
      } else {
        this.$message({
          type: 'error',
          message: "获取类型列表失败，" + resp.err_msg
        });
      }
    },
    async doGetContestList(page = 1) {
      const token = this.$store.state.userInfo.token;
      const resp = await getContestTypeList(page, token);

      if (resp.success) {
        const data = resp.data;
        this.tableData = [...data.match_types];
        this.countTotal = data.total_count;
      } else {
        this.$message({
          type: 'error',
          message: "获取类型列表失败，" + resp.err_msg
        });
      }
    },
    async doCreateType() {
      const token = this.$store.state.userInfo.token;
      const reqData = {
        is_file_type: this.createForm.is_file_type == true,
        type: this.createForm.type,
      };
      const resp = await addContestType(reqData, token);

      if (resp.success) {
        this.tableData = [resp.data, ...this.tableData].slice(0, 10);
        this.$message({
          type: "succes",
          message: "添加类型成功"
        });
      } else {
        this.$message({
          type: "succes",
          message: "添加类型失败，" + resp.err_msg
        });
      }
    },
    deleteType(typeID) {
      const token = this.$store.state.userInfo.token;
      this.$confirm('确认删除该类型吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const resp = await deleteContestType({
          type_id: typeID,
          is_file_type: this.tableData.find(val => val.type_id === typeID).is_file_type
        }, token);

        if (resp.success) {
          this.tableData = [...this.tableData.filter(val => val.type_id !== typeID)];
          this.$message({
            type: 'success',
            message: '删除类型成功!'
          });
        } else {
          this.$message({
            type: 'error',
            message: '删除类型失败，' + resp.err_msg
          });
        }
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  },
  watch: {
    typeRadio(type) {
      switch (type) {
        case "文件": 
          this.getTypeList(this.nowPage);
          break;
        case "比赛":
          this.doGetContestList(this.nowPage);
          break;
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "./contest.less";
</style>