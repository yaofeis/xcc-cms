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
      <el-table-column prop="showImage" label="展示图片"></el-table-column>
      <el-table-column prop="address" label="简介" width="100"></el-table-column>
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

  </div>
</template>

<script>
  export default {
    name: "News",
    data() {
      return {
        form: {
          title: ""
        },
        list: [],
        tableHeight: 200
      }
    },
    created(){
      let _this = this;
      _this.tableHeight = document.body.clientHeight - 200;
      // _this.init(1);
    },
    methods: {
      // 搜索
      search(){},
      // 新增
      newAdd(){},
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
  }
</style>
