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
          <el-button size="mini" type="text" @click="edit(scope.row)">编辑</el-button>
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

    <!--模态框-->
    <el-dialog title="编辑" :visible.sync="dialog" width="70%">
      <div>
        <h1>基础信息：</h1>
        <el-form :model="dialogForm" label-width="180px">
          <el-form-item label="学校名称:">
            <el-input v-model="dialogForm.name" size="small" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="学校地址:">
            <el-input v-model="dialogForm.address" size="small" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="联系方式:">
            <el-input v-model="dialogForm.tel" size="small" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="学费:">
            <el-input v-model="dialogForm.tuition" size="small" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="师生比列:">
            <el-input v-model="dialogForm.ratio" size="small" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="建校时间:">
            <el-input v-model="dialogForm.creatTime" size="small" style="width: 200px"></el-input>
          </el-form-item>
          <!--<el-form-item label="是否开通渠道沟通:">-->
          <!--<el-select v-model="dialogForm.status" size="small" style="width: 200px">-->
          <!--<el-option label="激活" value="1"></el-option>-->
          <!--<el-option label="未激活" value="2"></el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="可预约时间:">-->
          <!--<el-select v-model="dialogForm.status" size="small" style="width: 200px">-->
          <!--<el-option label="激活" value="1"></el-option>-->
          <!--<el-option label="未激活" value="2"></el-option>-->
          <!--</el-select>-->
          <!--<el-select v-model="dialogForm.status" size="small" style="width: 200px">-->
          <!--<el-option label="激活" value="1"></el-option>-->
          <!--<el-option label="未激活" value="2"></el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item label="学校头像:">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              accept="image/jpeg,image/png,image/jpg"
              :auto-upload="false"
              :on-change="headImgChange"
            >
              <img v-if="dialogForm.headImg" :src="dialogForm.headImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="save()" size="small">确 定</el-button>
      </div>
    </el-dialog>
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
        // 模态框相关
        dialog: false,
        dialogForm: {
          name: "",
          address: "",
          tel: "",
          tuition: "",
          ratio: "",
          creatTime: "",
          headImg: ""
        }
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
        this.$router.push("/SchoolDetail")
      },
      // 头像上传
      headImgChange(file){

      },
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
