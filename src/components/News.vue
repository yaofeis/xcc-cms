<template>
  <div id="news">
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="标题:">
          <el-input v-model="form.title" placeholder="请输入标题" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" size="small" icon="el-icon-search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="newAdd" size="small" icon="el-icon-plus">新增</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="list" border style="width: 99%" :height="tableHeight" :fit="true">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="newsTitle" label="标题" width="150"></el-table-column>
      <el-table-column prop="showImage" label="展示图片" width="220">
        <template slot-scope="scope">
          <img :src="scope.row.showImage" alt="" style="width: 200px;">
        </template>
      </el-table-column>
      <el-table-column prop="showContent" label="简介"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click="_delete(scope.row)">删除</el-button>
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
    <el-dialog title="编辑" :visible.sync="editDialog" width="60%">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="标题:">
          <el-input v-model="editForm.title" size="small" style="width: 200px"></el-input>
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
        <el-form-item label="内容:">
          <quill-editor ref="myTextEditor" :options="editorOption" v-model="editForm.content"></quill-editor>
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
  import {quillEditor} from "vue-quill-editor";

  export default {
    components: {
      quillEditor
    },
    name: "News",
    data() {
      return {
        form: {
          title: ""
        },
        list: [],
        tableHeight: 200,
        // 分页相关
        currentPage: 1,
        pageSize: 20,
        total: 0,
        // 模态框相关
        editDialog: false,
        editForm: {
          title: "",
          img: "",
          content: "",
          id: ""
        },
        // 富文本编辑器配置
        editorOption: {
          placeholder: "请输入内容"
        }
      }
    },
    created() {
      let _this = this;
      _this.tableHeight = document.body.clientHeight - 200;
      _this.init(1);
    },
    methods: {
      // 初始化
      init(num, title = "") {
        let _this = this;
        let params = new FormData();
        params.append("pageSize", _this.pageSize);
        params.append("pageNum", num);
        title !== "" && params.append("newsTitle", title);
        _this.$axios.post(_this.http.getNewsList, params).then((res) => {
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
      },
      // 搜索
      search() {
        this.init(1, this.form.title);
      },
      // 新增
      newAdd() {
        this.editForm.title = "";
        this.editForm.img = "";
        this.editForm.content = "";
        this.editForm.id = "";
        this.editDialog = true;
      },
      // 编辑
      edit(row) {
        this.editForm.title = row.newsTitle;
        this.editForm.img = row.showImage;
        this.editForm.content = row.newsContent;
        this.editForm.id = row.newsId;
        this.editDialog = true;
      },
      // 删除
      _delete(row) {
        let _this = this;
        _this.$confirm('是否删除该新闻?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new FormData();
          params.append("newsId", row.newsId);
          _this.$axios.post(_this.http.deleteNews, params).then((res) => {
            if (res.data.code === "0") {
              _this.$message({
                message: res.data.message,
                type: 'success'
              });
              _this.init(1);
            } else {
              _this.$message.error(res.data.message);
            }
          });
        }).catch(() => {
        });
      },
      // 文件改变时
      fileChange(file) {
        let _this = this;
        if (file && file.raw) {
          let params = new FormData;
          params.append("file", file.raw);
          params.append("fileType", "3");
          _this.$axios.post(_this.http.oneFileUpload, params).then((res) => {
            if (res.data.code === "0") {
              _this.$message({
                message: '上传成功',
                type: 'success'
              });
              _this.editForm.img = res.data.result;
            } else {
              _this.$message.error(res.data.message);
            }
          });
        }
      },
      // 保存
      save() {
        let _this = this;
        let params = new FormData();
        if (_this.editForm.title === "") return _this.$message('标题不能为空!');
        if (_this.editForm.img === "") return _this.$message('请上传图片!');
        if (_this.editForm.content === "") return _this.$message('请输入新闻内容!');
        let showContent = _this.editForm.content.replace(/<[^>]+>/g, "");
        params.append("newsTitle", _this.editForm.title);
        params.append("newsContent", _this.editForm.content);
        params.append("showImage", _this.editForm.img);
        params.append("showContent", showContent.substring(0, 100));
        let url = "";
        if (_this.editForm.id === "") {
          // 新增
          url = _this.http.addNews;
          params.append("newsType", "1");
        } else {
          // 编辑
          url = _this.http.modifyNews;
          params.append("newsId", _this.editForm.id);
        }
        _this.$axios.post(url, params).then((res) => {
          if (res.data.code === "0") {
            _this.$message({
              message: "操作成功",
              type: 'success'
            });
            _this.editDialog = false;
            _this.init(1);
          } else {
            _this.$message.error(res.data.message);
          }
        });
      }
    }
  }
</script>

<style lang="scss">
  #news {
    .el-table__body-wrapper {
      overflow-y: auto;
    }

    .el-pagination {
      padding-top: 15px;
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
