<template>
  <div id="appointment">
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="学校:">
          <el-select v-model="form.school" placeholder="请选择状态" size="small">
            <el-option v-for="item in schoolList" :key="item.schoolId" :label="item.schoolName" :value="item.schoolId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" size="small" icon="el-icon-search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="list" border style="width: 99%" :height="tableHeight">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="schoolName" label="学校名称" width="180"></el-table-column>
      <el-table-column prop="schoolAddress" label="学校地址"></el-table-column>
      <el-table-column prop="userName" label="预约人" width="80"></el-table-column>
      <el-table-column prop="mobile" label="预约人联系方式" width="180"></el-table-column>
      <el-table-column prop="subscribeDate" label="预约时间" width="180"></el-table-column>
      <el-table-column prop="childGrade" label="预约班" width="80"></el-table-column>
      <el-table-column label="操作" width="140">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="edit(scope.row)">编辑</el-button>
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
    name: "Appointment",
    data() {
      return {
        // 搜索条件栏相关
        form: {
          school: ""
        },
        schoolList: [],
        // 分页与表格相关
        list: [],
        total: 0,
        currentPage: 1,
        tableHeight: 200,
        pageSize: 20
      }
    },
    methods: {
      // 获取学校列表(初始化搜索)
      getSchoolList(){
        let _this = this;
        let params = new FormData();
        params.append("pageSize", "10000");
        params.append("pageNum", "1");
        _this.$axios.post(_this.http.getSchoolList, params).then((res) => {
          if (res.data.code === "0") {
            res.data.result.unshift({
              schoolId: "",
              schoolName: "全部"
            });
            _this.schoolList = res.data.result;
          } else {
            _this.$message.error(res.data.message);
          }
        });
      },

      // 搜索
      search(){
        this.init(1, this.form.school);
      },

      // 编辑
      edit(){

      },
      // 初始化列表
      init(num, schoolId){
        let _this = this;
        let params = new FormData();
        params.append("pageSize", _this.pageSize);
        params.append("pageNum", num);
        schoolId && params.append("schoolId", schoolId);
        _this.$axios.post(_this.http.getSubscribeList, params).then((res) => {
          let list = [];
          let total = 0;
          if (res.data.code === "0") {
            list = res.data.result;
            total = res.data.total;
          } else {
            _this.$message.error(res.data.message);
          }
          _this.list = list;
          _this.total = total;
        });
      }
    },
    created() {
      this.tableHeight = document.body.clientHeight - 200;
      this.getSchoolList();
      this.init(1);
    }
  }
</script>

<style lang="scss">
  #appointment {
    .el-table__body-wrapper {
      overflow-y: auto;
    }

    .el-pagination {
      padding-top: 15px;
    }
  }
</style>
