<template>
  <el-container style="height: 100%">
    <el-header>
      <div>
        <div>
          <img src="../assets/logo.png" alt="">
          <span>公司名称</span>
        </div>
        <div>
          <span>当前登录：{{nickname}}</span>
          <span @click="exit">退出</span>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="Index" class="el-menu-vertical-demo" router>
          <el-menu-item index="Index">
            <span slot="title">学校列表</span>
          </el-menu-item>
          <el-menu-item index="QuestionList">
            <span slot="title">问题列表</span>
          </el-menu-item>
          <el-menu-item index="Banner">
            <span slot="title">轮播图</span>
          </el-menu-item>
          <el-menu-item index="Administrator">
            <span slot="title">管理员</span>
          </el-menu-item>
          <el-menu-item index="News">
            <span slot="title">新闻列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div>
          <router-view/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        nickname: this.$store.state.admin.nickName
      };
    },
    methods: {
      exit() {
        this.$confirm('是否退出当前账号?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch("outLogin");
          this.$router.push('/');
        }).catch(() => {
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .el-header {
    /*background-color: #B3C0D1;*/
    color: #333;
    /*text-align: center;*/
    line-height: 60px;
    background: #1890ff url("./../assets/header_right.png") no-repeat right;

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;

      > div:nth-of-type(1) {
        display: flex;
        align-items: center;
        color: white;

        img {
          width: 50px;
        }
      }

      > div:nth-of-type(2) {
        color: white;

        > span:nth-of-type(1) {
          padding-right: 10px;
        }

        > span:nth-of-type(2) {
          cursor: pointer;
        }
      }
    }

  }

  .el-aside {
    background-color: white;
    color: #333;
    /*text-align: center;*/
    line-height: 200px;
    overflow-y: auto;
    height: 100%;
    overflow-x: hidden;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    padding: 6px 5px;

    > div {
      background: white;
      height: 100%;
      border-radius: 5px;
      overflow-y: auto;
      padding: 10px;
      box-sizing: border-box;
    }
  }

  /*滚动条宽度*/
  .el-main::-webkit-scrollbar,
  .el-main > div::-webkit-scrollbar,
  .el-aside::-webkit-scrollbar {
    width: 5px;
  }

  /*定义滚动条的轨道颜色、内阴影及圆角*/
  .el-aside::-webkit-scrollbar-track,
  .el-main::-webkit-scrollbar-track,
  .el-main > div::-webkit-scrollbar-track {
    background-color: white;
    border-radius: 3px;
  }

  /*定义滑块颜色、内阴影及圆角*/
  .el-aside::-webkit-scrollbar-thumb,
  .el-main::-webkit-scrollbar-thumb,
  .el-main > div::-webkit-scrollbar-thumb {
    border-radius: 7px;
    background-color: #CFCFD1;
  }

  /*定义两端按钮的样式*/
  .el-aside::-webkit-scrollbar-button,
  .el-main::-webkit-scrollbar-button,
  .el-main > div::-webkit-scrollbar-button {
    display: none;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
