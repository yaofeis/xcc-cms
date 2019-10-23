<template>
  <div id="banner">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="标题:">
        <el-input v-model="form.title" placeholder="请输入标题" size="small"></el-input>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select v-model="form.status" placeholder="请选择状态" size="small">
          <el-option label="全部" value=""></el-option>
          <el-option label="激活" value="1"></el-option>
          <el-option label="未激活" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" size="small" icon="el-icon-search">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" border style="width: 99%" :height="tableHeight" :fit="true">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="bannerTitle" label="标题" width="150"></el-table-column>
      <el-table-column prop="bannerImage" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.bannerImage" alt="" style="width: 200px;">
        </template>
      </el-table-column>
      <el-table-column prop="jumpUrl" label="跳转链接" width="150"></el-table-column>
      <el-table-column prop="sortIndex" label="排序" width="100"></el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 1">激活</span>
          <span v-else>未激活</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="170">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click="_delete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--编辑模态框-->
    <el-dialog title="编辑" :visible.sync="editDialog" width="400px">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="标题:">
          <el-input v-model="editForm.title" size="small" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input v-model="editForm.sort" size="small" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="editForm.status" size="small" style="width: 200px">
            <el-option label="激活" value="1"></el-option>
            <el-option label="未激活" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转链接:">
          <el-select v-model="editForm.jumpUrl" size="small" style="width: 200px">
            <el-option label="激活" value="1"></el-option>
            <el-option label="未激活" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片:">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            accept="image/jpeg,image/png,image/jpg"
            :auto-upload="false"
            :on-change="fileChange"
          >
            <img v-if="editForm.img" :src="editForm.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="save()" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Banner",
    data() {
      return {
        form: {
          title: "",
          status: ""
        },
        list: [],
        tableHeight: 200,
        // 编辑模态框相关
        editDialog: false,
        editForm: {
          title: "",
          sort: "",
          status: "",
          jumpUrl: "",
          img: "",
          id: ""
        }
      };
    },
    created() {
      let _this = this;
      _this.tableHeight = document.body.clientHeight - 155;
      _this.init();
    },
    methods: {
      // 初始化
      init(data = {title: "", status: ""}) {
        let _this = this;
        let params = new FormData();
        params.append("pageNum", "1");
        params.append("pageSize", "100");
        data.title !== "" && params.append("bannerTitle", data.title);
        data.status !== "" && params.append("status", data.status);
        _this.$axios.post(_this.http.getBannerList, params).then((res) => {
          let list = [];
          if (res.data.code === "0") {
            list = res.data.result;
          } else {
            _this.$message.error(res.data.message);
          }
          _this.list = list;
        })
      },
      // 打开编辑模态框
      edit(row) {
        this.editDialog = true;
        this.editForm.title = row.bannerTitle;
        this.editForm.sort = row.sortIndex;
        this.editForm.status = row.status.toString();
        this.editForm.jumpUrl = row.jumpUrl;
        this.editForm.img = row.bannerImage;
        this.editForm.id = row.bannerId;
      },
      // 删除
      _delete(row) {

      },
      // 搜索
      search() {
        let _this = this;
        _this.init(_this.form);
      },
      // 文件改变时
      fileChange(file){
        let _this = this;
        if(file && file.raw){
          let params = new FormData;
          params.append("file", file.raw);
          params.append("fileType", "3");
          _this.$axios.post(_this.http.moreFileUpload, params).then((res)=>{
            if (res.data.code === "0") {
              _this.$message({
                message: '上传成功',
                type: 'success'
              });
            } else {
              _this.$message.error(res.data.message);
            }
          });
        }
      },
      // 保存
      save() {
        let _this = this;
        let params = new FormData;
        params.append("bannerId", _this.editForm.id);
        params.append("bannerTitle", _this.editForm.title);
        params.append("sortIndex", _this.editForm.sort);
        params.append("status", _this.editForm.status);
        params.append("jumpUrl", _this.editForm.jumpUrl);
        params.append("bannerImage", _this.editForm.img);
        _this.$axios.post(_this.http.modifyBanner, params).then((res)=>{
          if (res.data.code === "0") {
            _this.$message({
              message: '操作成功!',
              type: 'success'
            });
            _this.editDialog = false;
            _this.init();
          } else {
            _this.$message.error(res.data.message);
          }
        });
      }
    }
  }
</script>

<style lang="scss">
  #banner {
    font-size: 14px;
    color: #333;

    .el-table__body-wrapper {
      overflow-y: auto;
    }

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }

    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>
