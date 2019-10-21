<template>
  <div id="order">
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="状态">
          <el-select v-model="searchState" size="small">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" size="small" icon="el-icon-search">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-table :data="tableData" border style="width: 99%" :height="tableHeight">
    <el-table-column type="index" label="司机ID" width="70"></el-table-column>
    <el-table-column prop="accountUser" label="开户名称" width="180"></el-table-column>
    <el-table-column prop="withdrawalMoney" label="提现金额" width="100"></el-table-column>
    <el-table-column prop="openingBank" label="开户行" width="100"></el-table-column>
    <el-table-column prop="bankCard" label="银行卡号" width="130"></el-table-column>
    <el-table-column prop="balance" label="司机余额" width="100"></el-table-column>
    <el-table-column prop="createdDate" label="申请时间" :formatter="timeStampToDate" width="130"></el-table-column>
    <el-table-column prop="status" label="状态" :formatter="formatState" width="80"></el-table-column>
    <el-table-column prop="operation" label="操作">
      <template slot-scope="scope">
        <el-button type="text" @click="pass(scope.$index, scope.row)">通过</el-button>
        <el-button type="text" @click="refuse(scope.$index, scope.row)">拒绝</el-button>
        <el-button type="text">已打款</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page="currentPage"
  :page-sizes="pageSizes"
  :page-size="pageSize"
  layout="total, sizes, prev, pager, next, jumper"
  :total="total">
</el-pagination>
</div>
</template>

<script>
  export default {
    name: "Order",
    data() {
      return {
        searchState: '',
        form: {},
        tableData: [],
        pageSizes:[10,20,50],
        pageSize:10,
        tableData: [],
        total:0,
        currentPage: 1,
        tableHeight: document.body.clientHeight - 220,
        options: [{
          value: '1',
          label: '已通过'
        }, {
          value: '2',
          label: '已拒绝'
        }, {
          value: '3',
          label: '审核中'
        }],
        value: '',
      };
    },
    methods: {
      formatState(row,column){
       var state = row[column.property];
       if (state == undefined) {
        return "";
      }
      switch (state) {
       case 1:
       return '已通过';
       case 2:
       return '已拒绝';
       case 3:
       return '审核中';
       default:
           // statements_def
           break;
         }
       },
       timeStampToDate(row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        return this.$moment(date).format("YYYY-MM-DD");
      },
      search() {
        this.currentPage = 1;
       let obj = [{
        name: 'pageSize',
        value: this.pageSize,
      },{
        name: 'pageNum',
        value: this.currentPage,
      }];
      this.init(obj);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      let obj = [{
        name: 'pageSize',
        value: this.pageSize,
      },{
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
      },{
        name: 'pageNum',
        value: this.currentPage,
      }];
      this.init(obj);
    },
    init(obj){
      let _this = this;
      let params = new FormData();
      obj.push({
        name: 'status',
        value: this.searchState,
      })
      obj.map((e) => params.append(e.name, e.value));
      this.$axios.post(this.http.getWithdrawalList,params).then((e)=>{
        console.log(e)
        if(e.data.code == '0'){
          if(e.data.result){
            let _data = e.data.result;
            _this.tableData = _data;
            _this.total = e.data.total;
          }
        }else{
          _this.$message.error(e.data.message);
        }
      });
    },
    pass(index,row) {
      this.$confirm('确定通过该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = [{
          name:'withdrawalId',
          value:row.withdrawalId,
        },{
          name:'status',
          value:1
        }];
        this.reviewWithdrawal(obj);
      }).catch(() => {

      });
    },
    refuse(index,row) {
      this.$confirm('确定拒绝此申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = [{
          name:'withdrawalId',
          value:row.withdrawalId,
        },{
          name:'status',
          value:2
        }];
        this.reviewWithdrawal(obj);
      }).catch(() => {

      });
    },
    reviewWithdrawal(obj){
      let _this = this;
      let params = new FormData();
      obj.map((e) => params.append(e.name, e.value));
      console.log(params)
      _this.$axios.post(this.http.reviewWithdrawal, params).then((e)=>{
        if(e.data.code === '0'){
          _this.$message.success(e.data.message);
          let obj = [{
            name: 'pageSize',
            value: this.pageSize,
          },{
            name: 'pageNum',
            value: 1,
          }];
          this.init(obj);
        }else{
          _this.$message.error(e.data.message);
        }
      })
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
    created(){
      let obj = [{
        name: 'pageSize',
        value: this.pageSize,
      },{
        name: 'pageNum',
        value: 1,
      }];
      this.init(obj);
    }
  }
</script>

<style lang="scss">
#order {
  padding: 20px;

  .el-pagination {
    padding-top: 15px;
  }

}
</style>
