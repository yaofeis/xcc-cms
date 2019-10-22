<template>
  <div id="user" ref="user">
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
    <el-table :data="tableData" border style="width: 99%" :height="tableHeight">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column type="schoolName" label="学校名称" width="100"></el-table-column>
      <el-table-column prop="icon" label="展示图片" width="180"></el-table-column>
      <el-table-column prop="address" label="地址" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<el-pagination-->
    <!--@size-change="handleSizeChange"-->
    <!--@current-change="handleCurrentChange"-->
    <!--:current-page="currentPage"-->
    <!--:page-sizes="pageSizes"-->
    <!--:page-size="pageSize"-->
    <!--layout="total, sizes, prev, pager, next, jumper"-->
    <!--:total="total">-->
    <!--</el-pagination>-->
  </div>
</template>

<script>
  export default {
    name: "User",
    data() {
      return {
        searchPhone: '',
        form: {
          userId: '',
          openId: '',
          mobile: '',
          createdDate: ''
        },
        pageSizes: [10, 20, 50],
        pageSize: 10,
        tableData: [],
        total: 0,
        currentPage: 1,
        tableHeight: document.body.clientHeight - 220
      }
    },
    methods: {
      formatDate(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return year + "-" + this.formatTen(month) + "-" + this.formatTen(day);
      },
      timeStampToDate(row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        return this.$moment(date).format("YYYY-MM-DD");
      },
      search() {
        let obj = [{
          name: 'pageSize',
          value: this.pageSize,
        }, {
          name: 'pageNum',
          value: 1,
        }, {
          name: 'mobile',
          value: this.searchPhone,
        }];
        this.init(obj);
      },
      handleSizeChange(val) {
        this.pageSize = val;
        let obj = [{
          name: 'pageSize',
          value: this.pageSize,
        }, {
          name: 'pageNum',
          value: this.currentPage,
        }];
        this.init(obj);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        let obj = [{
          name: 'pageSize',
          value: this.pageSize,
        }, {
          name: 'pageNum',
          value: this.currentPage,
        }];
        this.init(obj);
      },
      init(obj) {
        let _this = this;
        let params = new FormData();
        obj.map((e) => params.append(e.name, e.value));
        this.$axios.post(this.http.getUserList, params).then((e) => {
          console.log(e)
          if (e.data.code == '0') {
            if (e.data.result) {
              let _data = e.data.result;
              _this.tableData = _data;
              _this.total = e.data.total;
            }
          } else {
            _this.$message.error(e.data.message);
          }
        });
      }
    },
    mounted() {
      // 动态设置表格高度
      const _this = this;
      _this.tableHeight = document.body.clientHeight - 220;
      window.onresize = () => {
        return (() => {
          _this.tableHeight = document.body.clientHeight - 220;
        })()
      }
    },
    watch: {
      // 防止频繁改变表格高度
      tableHeight(val) {
        const _this = this;
        if (!_this.timer) {
          _this.tableHeight = val;
          _this.timer = true;
          setTimeout(function () {
            _this.timer = false;
          }, 400)
        }
      }
    },
    created() {
      let obj = [{
        name: 'pageSize',
        value: this.pageSize,
      }, {
        name: 'pageNum',
        value: 1,
      }];
      // this.init(obj);
    }
  }
</script>

<style lang="scss">
  #user {
    padding: 20px;

    .el-pagination {
      padding-top: 15px;
    }
  }
</style>
