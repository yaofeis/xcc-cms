<template>
  <div id="coupon">
    <div class="tips">
      <i class="el-icon-info"></i>
      提示:添加了优惠券后，用户自动拥有一张，但是优惠券只限于货运订单使用。
    </div>
    <div class="btn">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="searchState" placeholder="请选择" size="small">
            <el-option label="已发放" value="1"></el-option>
            <el-option label="未发放" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" size="small" icon="el-icon-search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-button @click="add" size="small" icon="el-icon-plus">添加</el-button>
    </div>
    <el-table :data="tableData" border style="width: 99%" :height="tableHeight">
      <el-table-column type="index" label="优惠券ID" width="100"></el-table-column>
      <el-table-column prop="couponTitle" label="优惠券名称" width="180"></el-table-column>
      <el-table-column prop="parValue" label="金额" width="180"></el-table-column>
      <el-table-column prop="isSand" label="状态" :formatter="formatState"></el-table-column>
      <el-table-column prop="createdDate" label="添加时间" :formatter="formatDate"></el-table-column>
      <el-table-column prop="onTime" label="有效期限" :formatter="formatDate"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="deleteRow(scope.$index, scope.row)" type="text" size="small">
            删除
          </el-button>
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

  <!--添加优惠券-->
  <el-dialog title="添加优惠券" :visible.sync="dialogFormVisible">
    <el-form :model="form" class="demo-form-inline" :inline="true" label-width="100px">
      <el-form-item label="优惠券名称">
        <el-input v-model="form.name" auto-complete="off" size="small"></el-input>
      </el-form-item>
      <el-form-item label="优惠券金额">
        <el-input type="number" v-model="form.price" auto-complete="off" size="small"></el-input>
      </el-form-item>
      <el-form-item label="有限期">
        <el-date-picker v-model="form.date" type="date" placeholder="选择日期" size="small"></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
      <el-button type="primary" @click="saveCoupon" size="small">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
  export default {
    name: "Coupon",
    data() {
      return {
        searchState: '',
        form: {
          isSand: '',
          name: '',
          price: '',
          date: ''
        },
        pageSizes:[10,20,50],
        pageSize:10,
        tableData: [],
        total:0,
        currentPage: 1,
        tableHeight: document.body.clientHeight - 249,
        dialogFormVisible: false,
      }
    },
    methods: {
     formatTen(num) { 
      return num > 9 ? (num + "") : ("0" + num); 
    } ,
    formatState(row,column){
       var state = row[column.property];
       if (state == undefined) {
        return "";
       }
       return state===1?'已发放':'未发放';
    },
    formatDate1(date) { 
      var year = date.getFullYear(); 
      var month = date.getMonth() + 1; 
      var day = date.getDate(); 
      var hour = date.getHours(); 
      var minute = date.getMinutes(); 
      var second = date.getSeconds(); 
      return year + "-" + this.formatTen(month) + "-" + this.formatTen(day); 
    },
    formatDate(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return this.$moment(date).format("YYYY-MM-DD");
    },
    saveCoupon(){
      let _this = this;
      let params = new FormData();
      console.log(_this.form.date)
      params.append('couponTitle', _this.form.name);
      params.append('parValue', _this.form.price);
      if (_this.form.date!=null&&_this.form.date!=="") {
        params.append('onTime', this.formatDate1(_this.form.date)+' 00:00:00');
      }
      _this.$axios.post(this.http.addCoupon, params).then((e)=>{
        console.log(e)
        if(e.data.code === '0'){
          _this.$message.success(e.data.message);
          let obj = [{
            name: 'pageSize',
            value: this.pageSize,
          },{
            name: 'pageNum',
            value: 1,
          }];
          this.dialogFormVisible = false;
          this.init(obj);
        }else{
          _this.$message.error(e.data.message);
        }
      })
    },
    search() {
      this.currentPage = 1;
      let obj = [{
        name: 'pageSize',
        value: this.pageSize,
      },{
        name: 'pageNum',
        value: this.currentPage,
      },{
        name: 'isSand',
        value: this.searchState,
      }];
      this.init(obj);  
    },
    add() {
      this.dialogFormVisible = true;
    },
    deleteRow(index, row) {
      let _this = this;
      let params = new FormData();
      params.append('couponId', row.couponId);
      _this.$axios.post(this.http.deleteCoupon, params).then((e)=>{
        if(e.data.code === '0'){
          _this.$message.success(e.data.message);
          this.currentPage = 1;
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
    },
    handleSizeChange(val) {
      this.pageSize = val;
      let obj = [{
        name: 'pageSize',
        value: this.pageSize,
      },{
        name: 'pageNum',
        value: this.currentPage,
      },{
        name: 'isSand',
        value: this.searchState,
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
      },{
        name: 'isSand',
        value: this.searchState,
      }];
      this.init(obj);
    },
    init(obj){
      let _this = this;
      let params = new FormData();
      obj.map((e) => params.append(e.name, e.value));
      this.$axios.post(this.http.getCouponList,params).then((e)=>{
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
    }
  },
  mounted() {
      // 动态设置表格高度
      const _this = this;
      _this.tableHeight = document.body.clientHeight - 249;
      window.onresize = () => {
        return (() => {
          _this.tableHeight = document.body.clientHeight - 249;
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
#coupon {
  padding: 20px;
  font-size: 14px;
  color: #333;

  .tips {
    background: #E6F7FF;
    border: 1px solid #91D5FF;
    border-radius: 5px;
    padding: 5px 8px;

    > i {
      color: #1890FF;
    }
  }

  .btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;

    .el-form-item {
      margin-bottom: 0;
    }
  }

  .el-pagination {
    padding-top: 15px;
  }

  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 200px;
  }
}
</style>
