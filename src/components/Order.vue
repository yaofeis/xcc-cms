<template>
  <div id="order">
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="寄件人">
          <el-input v-model="searchContacts" placeholder="请输入寄件人" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchState" size="mini">
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
    <el-table-column type="index" label="订单ID" width="100"></el-table-column>
    <el-table-column prop="contacts" label="寄件人" width="140"></el-table-column>
    <el-table-column prop="contactsMobile" label="联系方式" width="180"></el-table-column>
    <el-table-column prop="receiveUser" label="收件人" width="100"></el-table-column>
    <el-table-column prop="receiveMobile" label="联系方式" width="130"></el-table-column>
    <el-table-column prop="actualPrice" label="实付金额" width="100"></el-table-column>
    <el-table-column prop="sendTime" label="下单时间" :formatter="timeStampToDate" width="130"></el-table-column>
    <el-table-column prop="status" label="状态" :formatter="formatState" width="130"></el-table-column>
    <el-table-column prop="operation" label="操作">
      <template slot-scope="scope">
        <el-button type="text" @click="lookInfo(scope.row)">查看</el-button>
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
<el-dialog  title="订单详情" :visible.sync="dialogTableVisible" width="40%">
  <table class="width260">
    <tr>
      <td>
        <label>订单号</label>
      </td>
      <td>
        <label>{{detailData.orderCode}}</label>
      </td>
    </tr>
    <tr>
      <td>
        <label>寄件人名称</label>
      </td>
      <td>
        <label id="2"> {{detailData.contacts}}</label>
      </td>
    </tr>
    <tr>
      <td>
        <label>寄件人电话</label>
      </td>
      <td>
        <label> {{detailData.contactsMobile}}</label>
      </td>
    </tr>
    <tr>
      <td>
        <label>收件人名称</label>
      </td>
      <td>
        <label> {{detailData.receiveUser}}</label>
      </td>
    </tr>
    <tr>
      <td>
        <label>收件人电话</label>
      </td>
      <td>
        <label> {{detailData.receiveMobile}}</label>
      </td>
    </tr>
    <tr>
      <td>
        <label>收货地址</label>
      </td>
      <td>
        <label> {{detailData.endPlace}}</label>
      </td>
    </tr>
    <tr>
      <td>
        <label>运输司机</label>
      </td>
      <td>
        <label> {{detailData.driverName}}</label>
      </td>
    </tr>
    <tr>
      <td>
        <label>运输司机联系电话</label>
      </td>
      <td>
        <label> {{detailData.driverMobile}}</label>
      </td>
    </tr>
    <tr>
      <td>
        <label>运输类别</label>
      </td>
      <td>
        <label> {{detailData.orderType}}</label>
      </td>
    </tr>
    <tr>
      <td>
        <label>运输方式</label>
      </td>
      <td>
        <label> {{detailData.transportName}}</label>
      </td>
    </tr>
    <tr>
      <td>
        <label>优惠券支付金额</label>
      </td>
      <td>
        <label> {{detailData.couponPrice}}</label>
      </td>
    </tr>
    <tr>
      <td>
        <label>实际付款金额</label>
      </td>
      <td>
        <label> {{detailData.actualPrice}}</label>
      </td>
    </tr>
    <tr>
      <td>
        <label>支付方式</label>
      </td>
      <td>
        <label> {{detailData.payType}}</label>
      </td>
    </tr>
    <tr>
      <td>
        <label>下单金额</label>
      </td>
      <td>
        <label> {{detailData.orderPrice}}</label>
      </td>
    </tr>
  </table>
</el-dialog>

</div>
</template>

<script>
  export default {
    name: "Order",
    data() {
      return {
        form:{

        },
        searchContacts: '',
        searchState: '',
        detailData: {
          orderCode: '',
          contacts: '',
          contactsMobile: '',
          receiveUser: '',
          receiveMobile: '',
          endPlace: '',
          driverName: '',
          driverMobile: '',
          orderType: '',
          transportName: '',
          couponPrice: '',
          actualPrice: '',
          payType: '',
          orderPrice: ''
        },
        pageSizes:[10,20,50],
        pageSize:10,
        tableData: [],
        total:0,
        currentPage: 1,
        dialogTableVisible: false,
        tableHeight: document.body.clientHeight - 220,
        options: [{
          value: '1',
          label: '待抢单'
        }, {
          value: '2',
          label: '待取货'
        },{
          value: '3',
          label: '待收货'
        },{
          value: '4',
          label: '待支付'
        },{
          value: '5',
          label: '已完成'
        },{
          value: '10',
          label: '已取消'
        }],
        value: ''
      };
    },
    methods: {
      //查看功能
      lookInfo(row) {
        this.dialogTableVisible = true;
        let _this = this;
        let params = new FormData();
        params.append('orderId', row.orderId);
        _this.$axios.post(this.http.getOrderById, params).then((e)=>{
          if(e.data.code === '0'){
            _this.$message.success(e.data.message);
            let _data = e.data.result;
            console.log(_data)
            _this.detailData = _data;
            switch (_this.detailData.orderType) {
             case 1:
             _this.detailData.orderType = '快送';
             break;
             case 2:
             _this.detailData.orderType = '货运';
             break;
             case 3:
             _this.detailData.orderType = '快递';
             break;
             default:
                // statements_def
                break;
              }
            }else{
              _this.$message.error(e.data.message);
            }
          })
      },
      formatState(row,column){
       var state = row[column.property];
       if (state == undefined) {
        return "";
      }
      switch (state) {
       case 1:
       return '待抢单';
       case 2:
       return '待取货';
       case 3:
       return '待收货';
       case 4:
       return '待支付';
       case 5:
       return '已完成';
       case 10:
       return '已取消';

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
        name: 'contacts',
        value: this.searchContacts,
      },{
        name: 'status',
        value: this.searchState,
      })
      obj.map((e) => params.append(e.name, e.value));
      this.$axios.post(this.http.getOrderList,params).then((e)=>{
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

  .width260 {
    width: 260px;
  }

  .width260 > tr {
    height: 27px;

  }

}
</style>
