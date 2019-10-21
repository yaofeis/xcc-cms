<template>
  <div id="banner">
    <div class="tips">
      <i class="el-icon-info"></i>
      提示:图片大小最好为700px*200px，最多3张。
    </div>
    <el-upload
    class="upload-demo"
    action=""
    :on-change="changeFile"
    :http-request="saveEvent"
    :auto-upload="false"
    accept="image/jpeg,image/png,image/jpg"
    :file-list="fileList"
    :multiple="true"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :limit="limit"
    >
    <i class="el-icon-plus"></i>
  </el-upload>
  <el-button type="primary" size="small" class="btn" @click="saveEvent">确 定</el-button>
  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
</div>
</template>

<script>
  export default {
    name: "Banner",
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],
        limit: 3
      };
    },
    created(){
      this.init();
    },
    methods: {
      init(){
      this.fileList = [];
      let _this = this;
      let params = new FormData();
      params.append("pageNum", "1");
      params.append("pageSize", "3");
      _this.$axios.post(_this.http.getBannerList,params).then((res)=>{
        console.log(res.data);
        let data = res.data.result;
        data.map((e)=>{
          console.log(e)
          let _name = e.bannerTitle;
          let _url = e.bannerImage;
          _this.fileList.push({
            name: _name,
            url: _url
          });
        })
      })
      },
      changeFile(file, fileList) {
        this.fileList = fileList;
      },
      handleRemove(file, fileList) {
        this.fileList = fileList;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      saveEvent() {
        let _this = this;
        console.log(_this.fileList);
        if (_this.fileList.length === 0) return _this.$message({
          message: '请选择上传的图片',
          type: 'warning'
        });
          let params = new FormData();
          params.append("fileType", "3");
          _this.fileList.map((e) => params.append("file", e.raw));
          _this.$axios.post(_this.http.moreFileUpload, params).then((res) => {
            if (res.data.code === "0") {
              _this.$message({
                message: '上传成功',
                type: 'success'
              });
              this.init();
            } else {
              _this.$message.error(res.data.message);
            }
          })
        }
      }
    }
  </script>

  <style lang="scss">
  #banner {
    padding: 20px;
    font-size: 14px;
    color: #333;

    .tips {
      background: #E6F7FF;
      border: 1px solid #91D5FF;
      border-radius: 5px;
      padding: 5px 8px;
      margin-bottom: 15px;

      > i {
        color: #1890FF;
      }
    }

    .btn {
      margin-top: 15px;
    }
  }
</style>
