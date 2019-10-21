<template>
  <div id="schoolList">
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
      <el-table-column prop="questionDescrib" label="描述" width="280"></el-table-column>
      <el-table-column prop="address" label="发布人" width="100"></el-table-column>
      <el-table-column prop="address" label="发布时间" width="100"></el-table-column>
      <el-table-column prop="address" label="回答数" width="100"></el-table-column>
      <el-table-column prop="address" label="浏览数" width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click="_delete(scope.row)">删除</el-button>
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
        // 模态框相关
        editDialog: false,
        editForm: {
          title: "",
          desc: "",
          id: ""
        }
      }
    },
    methods: {
      search() {

      },
      // 编辑
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
        params.append("questionId", _this.editForm.id);
        params.append("questionTitle", _this.editForm.title);
        params.append("questionDescrib", _this.editForm.desc);
        _this.$axios.post('/api/schoolhome-server/question/modifyQuestion.do?', params).then((res) => {
          if (res.data.code === "0") {
            _this.$message({
              message: res.data.message,
              type: 'success'
            });
            _this.editDialog = false;
            _this.init(_this.nowPage);
          } else {
            _this.$message.error('服务器出错!');
          }
        });
      },
      // 删除
      _delete(row){
        let _this = this;
        _this.$confirm('是否删除该问题?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new FormData();
          params.append("questionId", row.questionId);
          _this.$axios.post('/api/schoolhome-server/question/deleteQuestion.do?', params).then((res) => {
            if (res.data.code === "0") {
              _this.$message({
                message: res.data.message,
                type: 'success'
              });
              _this.init(_this.nowPage);
            } else {
              _this.$message.error('服务器出错!');
            }
          });
        })
      },
      // 换页
      pageChange(val){
        this.nowPage = val;
        this.init(val);
      },
      init(num) {
        let _this = this;
        let params = new FormData();
        params.append("pageSize", _this.pageSize);
        params.append("pageNum", num);
        _this.$axios.post('/api/schoolhome-server/question/getQuestionList.do?', params).then((res) => {
          if (res.data.code === "0") {
            _this.list = res.data.result;
            _this.total = res.data.total;
          } else {
            _this.$message.error('服务器出错!');
          }
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
  .el-pagination {
    padding-top: 15px;
  }
</style>
