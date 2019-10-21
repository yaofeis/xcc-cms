<template>
  <div id="article">
    <div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button @click="addArticle()" size="small" icon="el-icon-plus">添加文章</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border style="width: 99%" :height="tableHeight">
      <el-table-column type="index" label="文章ID" width="100"></el-table-column>
      <el-table-column prop="type" label="司机/客户端" width="240"></el-table-column>
      <el-table-column prop="newsTitle" label="文章名称"></el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button @click="lookUp(scope.row)" type="text">查看</el-button>
          <el-button @click="edited(scope.row)" type="text">编辑</el-button>
          <el-button type="text" @click="deleteRow(scope.row)">删除</el-button>
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

  <el-dialog title="添加文章" :visible.sync="dialogVisible" width="50%">
    <div class="list">
      <div style="padding-bottom: 10px;">
        <span style="color: #333;display: inline-block;width: 65px;">文章标题:</span>
        <el-input v-model="article.title" auto-complete="off" style="width: 300px" size="small"></el-input>
      </div>
      <div style="display: flex;width: 100%;height: 260px;">
        <span style="color: #333;flex-basis: 69px;">文章内容:</span>
        <div style="flex-basis: calc(100% - 69px);">
          <quill-editor ref="myTextEditor" :options="editorOption" v-model="article.content"></quill-editor>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      <el-button type="primary" @click="addNews()" size="small">确 定</el-button>
    </div>
  </el-dialog>

  <el-dialog title="编辑文章" :visible.sync="editedDialogVisible" width="50%" @close="closeEdited()">
    <div class="list">
      <div style="padding-bottom: 10px;">
        <span style="color: #333;display: inline-block;width: 65px;">文章标题:</span>
        <el-input v-model="article.title" auto-complete="off" style="width: 300px" size="small"></el-input>
      </div>
      <div style="display: flex;width: 100%;height: 260px;">
        <span style="color: #333;flex-basis: 69px;">文章内容:</span>
        <div style="flex-basis: calc(100% - 69px);">
          <quill-editor ref="myTextEditor" :options="editorOption" v-model="article.content"></quill-editor>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeEdited()" size="small">取 消</el-button>
      <el-button type="primary" @click="modifyNews()" size="small">确 定</el-button>
    </div>
  </el-dialog>

  <el-dialog title="文章详情" :visible.sync="detailsDialogVisible" width="50%" @close="closeDetail()">
    <div class="list">
      <div style="padding-bottom: 10px;">
        <span style="color: #333;display: inline-block;width: 65px;">文章标题:</span>
        <span style="color: #333;display: inline-block;width: 65px;">{{article.title}}</span>
      </div>
      <div style="display: flex;width: 100%;height: 260px;">
        <span style="color: #333;flex-basis: 69px;">文章内容:</span>
        <div style="flex-basis: calc(100% - 69px);">
          <span v-html="article.content"></span>
        </div>
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
  import { quillEditor } from "vue-quill-editor";
  export default {
    name: "Article",
    components:{
      quillEditor
    },
    data() {
      return {
        currentPage: 1,
        pageSizes:[10,20,50],
        pageSize:10,
        tableData: [],
        total:0,
        tableHeight: document.body.clientHeight - 220,
        dialogVisible: false,
        detailsDialogVisible:false,
        editedDialogVisible:false,
        article:{
          id:'',
          title: '',
          content: '',
          type:''
        },
        editorOption: {
          placeholder: "请输入内容",
          // 编辑器的配置
          // something config
          // theme: "bubble"
        }
      };
    },
    methods: {
      closeEdited(){
        this.editedDialogVisible = false;
        this.clear();
      },
      closeDetail(){
        this.clear();
      },
      clear(){
        this.article.title = '';
        this.article.content = '';
      },
      modifyNews(){
        let _this = this;
        let params = new FormData();
        params.append('newsId', _this.article.id);
        params.append('newsTitle', _this.article.title);
        params.append('newsContent', _this.article.content);
        _this.$axios.post(this.http.modifyNewsById, params).then((e)=>{
          console.log(e)
          if(e.data.code === '0'){
            _this.editedDialogVisible = false;
            _this.$message.success(e.data.message);
            let obj = [{
              name: 'pageSize',
              value: this.pageSize,
            },{
              name: 'pageNum',
              value: 1,
            }];
            _this.init(obj);
            _this.clear();
          }else{
            _this.$message.error(e.data.message);
          }
        })

      },
      edited(row){
        this.editedDialogVisible =true;
        let _this = this;
        let params = new FormData();
        params.append('newsId', row.newsId);
        _this.$axios.post(this.http.getNewsById, params).then((e)=>{
          console.log(e)
          if(e.data.code === '0'){
            _this.$message.success(e.data.message);
            _this.detailData = e.data.result;
            this.article.title = _this.detailData.newsTitle;
            this.article.content = _this.detailData.newsContent;
            this.article.id = _this.detailData.newsId;
          }else{
            _this.$message.error(e.data.message);
          }
        })
      },
      lookUp(row){
        this.detailsDialogVisible =true;
        let _this = this;
        let params = new FormData();
        params.append('newsId', row.newsId);

        _this.$axios.post(this.http.getNewsById, params).then((e)=>{
          console.log(e)
          if(e.data.code === '0'){
            _this.$message.success(e.data.message);
            _this.detailData = e.data.result;
            this.article.title = _this.detailData.newsTitle;
            this.article.content = _this.detailData.newsContent;
          }else{
            _this.$message.error(e.data.message);
          }
        })

      },
      addNews(){
       let _this = this;
       let params = new FormData();
       params.append('newsTitle', _this.article.title);
       params.append('newsContent', _this.article.content);
       params.append('newsType', 1);

       _this.$axios.post(this.http.addNews, params).then((e)=>{
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
          this.dialogVisible = false;
          this.init(obj);
          this.clear();
        }else{
          _this.$message.error(e.data.message);
        }
      })
     },
      //添加文章
      addArticle() {
        this.dialogVisible = true;
      },
      //删除
      deleteRow(row) {
        this.$confirm('确定删除此条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let obj = [{
            name:'newsId',
            value:row.newsId,
          }];
          this.deletedNews(obj);
        }).catch(() => {

        });
      },
      deletedNews(obj){
        let _this = this;
        let params = new FormData();
        obj.map((e) => params.append(e.name, e.value));
        console.log(params);
        _this.$axios.post(this.http.deletedNewsById, params).then((e)=>{
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
        this.$axios.post(this.http.getNewsList,params).then((e)=>{
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

      let obj = [{
        name: 'pageSize',
        value: this.pageSize,
      },{
        name: 'pageNum',
        value: 1,
      }];
      this.init(obj);
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
      },
      created(){

      }
    }
  }
</script>

<style lang="scss">
#article {
  padding: 20px;

  .el-pagination {
    padding-top: 15px;
  }

  .quill-editor{
    height: 200px;
  }
}
</style>
