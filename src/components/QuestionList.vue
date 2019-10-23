<template>
  <div id="questionList">
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="标题:">
          <el-input v-model="form.title" placeholder="请输入标题" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" size="small" icon="el-icon-search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" border style="width: 99%" :height="tableHeight" :fit="true">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="questionTitle" label="标题" width="150"></el-table-column>
      <el-table-column prop="questionDescrib" label="描述"></el-table-column>
      <el-table-column prop="address" label="发布人" width="100"></el-table-column>
      <el-table-column prop="address" label="发布时间" width="100"></el-table-column>
      <el-table-column prop="address" label="回答数" width="100"></el-table-column>
      <el-table-column prop="address" label="浏览数" width="100"></el-table-column>
      <el-table-column label="操作" width="170">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click="_delete(scope.row)">删除</el-button>
          <el-button size="mini" type="text" @click="seeComment(scope.row)">查看评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="pageChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>

    <!--编辑模态框-->
    <el-dialog title="编辑" :visible.sync="editDialog" width="400px">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="标题:">
          <el-input v-model="editForm.title" auto-complete="off" size="small" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="描述:">
          <el-input type="textarea" v-model="editForm.desc" size="small" style="width: 200px;height: 200px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="save" size="small">确 定</el-button>
      </div>
    </el-dialog>

    <!--查看评论模态框-->
    <el-dialog title="评论列表" :visible.sync="commentDialog" width="900px">
      <el-table :data="commentList" border style="width: 99%" height="500" :fit="true">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="nickName" label="回答者昵称" width="150"></el-table-column>
        <el-table-column prop="ansContent" label="答案" width="480"></el-table-column>
        <el-table-column prop="countPraise" label="点赞数" width="80"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="_deleteComment(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="initComment"
        :current-page="commentCurrentPage"
        :page-size="commentPageSize"
        layout="total, prev, pager, next"
        :total="commentTotal">
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "QuestionList",
    data() {
      return {
        form: {
          title: ""
        },
        list: [],
        // 分页相关与表格高度
        total: 0,
        currentPage: 1,
        tableHeight: 200,
        pageSize: 20,
        nowPage: 1,
        // 编辑模态框相关
        editDialog: false,
        editForm: {
          title: "",
          desc: "",
          id: ""
        },
        // 评论模态框相关
        commentDialog: false,
        commentList: [],
        commentCurrentPage: 1,
        commentPageSize: 20,
        commentTotal: 0,
        commentParams: {
          questionId: "",
          userId: ""
        }
      }
    },
    methods: {
      // 搜索
      search() {
        let _this = this;
        _this.nowPage = 1;
        let params = new FormData();
        params.append("pageSize", _this.pageSize);
        params.append("pageNum", _this.nowPage);
        params.append("questionTitle", _this.form.title);
        _this.$axios.post(_this.http.getQuestionList, params).then((res) => {
          if (res.data.code === "0") {
            _this.list = res.data.result;
            _this.total = res.data.total;
          } else {
            _this.$message.error(res.data.message);
          }
        });
      },
      // 打开编辑模态框
      edit(row) {
        this.editDialog = true;
        this.editForm.title = row.questionTitle;
        this.editForm.desc = row.questionDescrib;
        this.editForm.id = row.questionId;
      },
      // 保存编辑
      save() {
        let _this = this;
        let params = new FormData();
        if (_this.editForm.title === "") return _this.$message('标题不能为空!');
        if (_this.editForm.desc === "") return _this.$message('描述不能为空!');
        params.append("questionId", _this.editForm.id);
        params.append("questionTitle", _this.editForm.title);
        params.append("questionDescrib", _this.editForm.desc);
        _this.$axios.post(_this.http.modifyQuestion, params).then((res) => {
          if (res.data.code === "0") {
            _this.$message({
              message: res.data.message,
              type: 'success'
            });
            _this.editDialog = false;
            _this.init(_this.nowPage);
          } else {
            _this.$message.error(res.data.message);
          }
        });
      },
      // 删除
      _delete(row) {
        let _this = this;
        _this.$confirm('是否删除该问题?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new FormData();
          params.append("questionId", row.questionId);
          _this.$axios.post(_this.http.deleteQuestion, params).then((res) => {
            if (res.data.code === "0") {
              _this.$message({
                message: res.data.message,
                type: 'success'
              });
              _this.init(_this.nowPage);
            } else {
              _this.$message.error(res.data.message);
            }
          });
        }).catch(() => {
        });
      },
      // 换页
      pageChange(val) {
        this.nowPage = val;
        this.init(val);
      },
      // 查看评论
      seeComment(row) {
        this.commentDialog = true;
        this.commentParams.questionId = row.questionId;
        this.commentParams.userId = row.userId;
        this.initComment(1);
      },
      // 初始化评论列表
      initComment(pageNum) {
        let _this = this;
        let params = new FormData();
        _this.commentList = [];
        _this.commentTotal = 0;
        params.append("pageSize", _this.commentPageSize);
        params.append("pageNum", pageNum);
        params.append("userId", _this.commentParams.userId);
        params.append("questionId", _this.commentParams.questionId);
        _this.$axios.post(_this.http.getAnswerList, params).then((res) => {
          let list = [];
          let total = 0;
          if (res.data.code === "0") {
            list = res.data.result;
            total = res.data.total;
          } else {
            _this.$message.error(res.data.message);
          }
          _this.commentList = list;
          _this.commentTotal = total;
        });
      },
      // 删除评论
      _deleteComment(row) {
        let _this = this;
        _this.$confirm('是否删除该回答?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new FormData();
          params.append("answerId", row.answerId);
          _this.$axios.post(_this.http.deleteAnswer, params).then((res) => {
            if (res.data.code === "0") {
              _this.$message({
                message: res.data.message,
                type: 'success'
              });
              _this.initComment(1);
            } else {
              _this.$message.error(res.data.message);
            }
          });
        }).catch(() => {
        });
      },
      // 初始化
      init(num) {
        let _this = this;
        let params = new FormData();
        params.append("pageSize", _this.pageSize);
        params.append("pageNum", num);
        _this.$axios.post(_this.http.getQuestionList, params).then((res) => {
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
      let _this = this;
      _this.tableHeight = document.body.clientHeight - 200;
      _this.init(1);
    }
  }
</script>

<style lang="scss">
  #questionList {
    .el-table__body-wrapper {
      overflow-y: auto;
    }

    .el-pagination {
      padding-top: 15px;
    }
  }
</style>
