<template>
  <div id="driver" ref="driver">
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="手机号">
          <el-input v-model="searchMobile" placeholder="请输入手机号" size="small"></el-input>
        </el-form-item>
        <el-form-item label="按类别">
          <el-select v-model="searchAuthType" placeholder="请选择" style="width: 90px" size="small">
            <el-option label="货运" value="2"></el-option>
            <el-option label="快送" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" size="small" icon="el-icon-search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border style="width: 99%" :height="tableHeight">
      <el-table-column type="index"" label="司机ID" width="100"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="mobile" label="手机号" width="180"></el-table-column>
      <el-table-column prop="transportName" label="车辆类型" width="100"></el-table-column>
      <el-table-column prop="authType" label="快送/货运" :formatter="formatType" width="100"></el-table-column>
      <el-table-column prop="createdDate" label="注册时间" :formatter="timeStampToDate" width="180"></el-table-column>
      <el-table-column prop="operation" label="操作" width="280">
        <template slot-scope="scope">
          <el-button @click.native.prevent="idImg(scope.$index, scope.row)" type="text" size="small">
            查看身份证
          </el-button>
          <el-button @click.native.prevent="carImg(scope.$index, scope.row)" type="text" size="small">
            查看驾照
          </el-button>
          <el-button @click.native.prevent="changeState(scope.$index, scope.row)" type="text" size="small">
            状态修改
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="authStatus" label="状态" :formatter="formatState"></el-table-column>

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

  <el-dialog title="司机审核" :visible.sync="dialogFormVisible" width="30%">
    <el-form :model="form" class="demo-form-inline" :inline="true">
      <el-form-item label="审核状态">
        <el-select v-model="status" size="small">
          <el-option label="通过审核" value="1"></el-option>
          <el-option label="不通过审核" value="2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
      <el-button type="primary" @click="driverApplyReview" size="small">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog title="身份信息" :visible.sync="imgShow" width="40%">
    <div class="demo-image__placeholder">
      <div class="block">
        <el-image :src="src1"></el-image>
      </div>
      <div class="block marginT">
        <el-image :src="src2"></el-image>
      </div>
    </div>
  </el-dialog>
  <el-dialog title="驾驶证信息" :visible.sync="carShow" width="40%">
    <div class="demo-image__placeholder">
      <div class="block">
        <el-image :src="src3"></el-image>
      </div>
      <div class="block marginT">
        <el-image :src="src4"></el-image>
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
  export default {
    name: "Driver",
    data() {
      let validateMobile = (rule, value, callback) => {
        if (value != null && value != "") {
          let rex1 = /^1[3-8]+\d{9}$/;
          let rex2 = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
          if (rex1.test(value) || rex2.test(value)) {
          } else {
            callback(new Error('请输入正确的手机号格式!'))
          }
        } else {
          callback();
        }
      };
      return {
        searchAuthType: '',
        searchMobile: '',
        src1: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        src2: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        src3: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        src4: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        form: {
          tel: ''
        },
        rules: {
          tel: [
          {validator: validateMobile, trigger: 'blur'},
          {trigger: ['blur', 'change']}
          ],
        },
        testData: [{
          value: '1',
          label: 'test'
        }],
        value: '',
        form: {
          driverId: '',
          username: '',
          mobile: '',
          transportName: '',
          authType: '',
          createdDate: '',
          authStatus: ''
        },
        pageSizes:[10,20,50],
        pageSize:10,
        pageNum:1,
        tableData: [],
        total:0,
        currentPage: 1,
        tableHeight: document.body.clientHeight - 220,
        dialogFormVisible: false,
        imgShow: false,
        carShow: false,
        driverId:'',
        status:'1'
      };
    },
    methods: {
      idImg(index, row) {
        this.src1 = row.idCardFront;
        this.src2 = row.idCardBack;
        this.imgShow = true;
      },
      carImg(index, row) {
        this.src3 = row.licenseImage;
        this.src4 = row.permitImage;
        this.carShow = true;
      },
      changeState(index, row) {
        this.dialogFormVisible = true;
        this.driverId = row.driverId;
      },
      formatType(row,column){
       var state = row[column.property];
       if (state == undefined) {
        return "";
      }
      switch (state) {
       case 1:
       return '快送';
       case 2:
       return '货运';
       case 3:
       return '快递';
       default:
           // statements_def
           break;
         }
       },
       formatState(row,column){
         var state = row[column.property];
         if (state == undefined) {
          return "";
        }
        switch (state) {
         case 1:
         return '通过';
         case 2:
         return '未通过';
         case 3:
         return '认证中';
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
      driverApplyReview(){
        let _this = this;
        let params = new FormData();
        let obj = [{
          name: 'driverId',
          value: this.driverId,
        },{
          name: 'status',
          value: this.status,
        }];
        obj.map((e) => params.append(e.name, e.value));
        this.$axios.post(this.http.driverApplyReview,params).then((e)=>{
          if(e.data.code == '0'){
            _this.$message.success(e.data.message);
            let obj = [{
              name: 'pageSize',
              value: this.pageSize,
            },{
              name: 'pageNum',
              value: this.currentPage,
            }];
            this.dialogFormVisible = false;
            this.init(obj);
          }else{
            _this.$message.error(e.data.message);
          }
        });
      },
      init(obj){
        let _this = this;
        let params = new FormData();
        obj.push({
          name: 'mobile',
          value: this.searchMobile,
        },{
          name: 'authType',
          value: this.searchAuthType,
        })
        obj.map((e) => params.append(e.name, e.value));
        this.$axios.post(this.http.getDriverList,params).then((e)=>{
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
#driver {
  padding: 20px;

  .el-pagination {
    padding-top: 15px;
  }

  .marginT {
    margin-top: 20px;
  }
}
</style>
