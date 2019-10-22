<template>
  <div id="schoolList">
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchPhone" placeholder="请输入手机号" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" size="small" icon="el-icon-search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" border style="width: 99%" :height="tableHeight" :fit="true">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="schoolName" label="学校名称" width="150"></el-table-column>
      <el-table-column prop="icon" label="展示图片" width="280">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt="" style="width: 200px;">
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        searchPhone: '',
        list: [],
        // 分页相关与表格高度
        total: 0,
        currentPage: 1,
        tableHeight: 200,
        pageSize: 20,
      }
    },
    methods: {
      search(){

      },
      init(num){
        let _this = this;
        let params = new FormData();
        params.append("pageSize", _this.pageSize);
        params.append("pageNum", num);
        _this.$axios.post(_this.http.getSchoolList, params).then((res)=>{
          if(res.data.code === "0"){
            _this.list = res.data.result;
            _this.total = res.data.total;
          }else{
            _this.$message.error(res.data.message);
          }
        });
      }
    },
    created(){
      let _this = this;
      _this.tableHeight = document.body.clientHeight - 200;
      _this.init(1);
    }
  }
</script>

<style lang="scss">
  .el-pagination {
    padding-top: 15px;
  }
</style>
