<template>
  <div id="schoolList">
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="form.searchPhone" placeholder="请输入手机号" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" size="small" icon="el-icon-search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="list" border style="width: 99%" :height="tableHeight" :fit="true">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="schoolName" label="学校名称" width="150"></el-table-column>
      <el-table-column prop="icon" label="学校头像" width="280">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt="" style="width: 200px;">
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click="_delete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="init"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "SchoolList",
    data() {
      return {
        form: {
          searchPhone: ""
        },
        list: [],
        // 分页相关与表格高度
        total: 0,
        currentPage: 1,
        tableHeight: 200,
        pageSize: 20
      }
    },
    methods: {
      search() {

      },
      init(num) {
        let _this = this;
        let params = new FormData();
        params.append("pageSize", _this.pageSize);
        params.append("pageNum", num);
        _this.$axios.post(_this.http.getSchoolList, params).then((res) => {
          if (res.data.code === "0") {
            _this.list = res.data.result;
            _this.total = res.data.total;
          } else {
            _this.$message.error(res.data.message);
          }
        });
      },
      // 编辑
      edit(row) {
        // this.dialog = true;
        // this.$router.push("/SchoolDetail");
        this.$router.push({ path: 'SchoolDetail', query: { id: row.schoolId }});
      },
      // 删除
      _delete(row){
        let _this = this;
        _this.$confirm('是否删除该学校?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new FormData();
          params.append("schoolId", row.schoolId);
          _this.$axios.post(_this.http.deleteSchool, params).then((res) => {
            if (res.data.code === "0") {
              _this.$message({
                message: '删除成功!',
                type: 'success'
              });
              _this.init(1);
            } else {
              _this.$message.error(res.data.message);
            }
          });
        }).catch(() => {
        });
      }
    },
    created() {
      let _this = this;
      _this.tableHeight = document.body.clientHeight - 200;
      _this.init(1);
    }
  }
</script>

<style lang="scss">
  #schoolList {
    .el-table__body-wrapper {
      overflow-y: auto;
    }

    .el-pagination {
      padding-top: 15px;
    }
  }
</style>
