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
        schoolList: []
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

      },
    },
    created() {
      this.getSchoolList();
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
