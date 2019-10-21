<template>
  <div id="platformInformation">
    <div class="positionSet">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="平台信息" class="labelSet"></el-form-item>
        <el-form-item label="平台名称" prop="name">
          <el-input v-model="ruleForm.name" class="w140" size="small"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="contactEmail">
          <el-input v-model="ruleForm.contactEmail" class="w140" size="small"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model="ruleForm.tel" class="w140" size="small"></el-input>
        </el-form-item>
        <el-form-item label="标语" prop="notice">
          <el-input type="textarea" v-model="ruleForm.notice" class="w140" size="small"></el-input>
        </el-form-item>
        <el-form-item label="客服电话" prop="serveTel">
          <el-input v-model="ruleForm.serveTel" class="w140" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="marginLe" size="small">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PlatformInformation",
    data() {
      return {
        ruleForm: {
          name: '',
          contactEmail: '',
          tel: '',
          notice: '',
          serveTel: '',
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.ruleForm.name == '') {
              this.$message.error("平台名称不能为空")
              return;
            }
            if (this.ruleForm.contactEmail == "") {
              this.$message.error("联系邮箱不能为空")
              return;
            }
            if (this.ruleForm.tel == "") {
              this.$message.error("联系电话不能为空")
              return;
            }
            if (this.ruleForm.notice == "") {
              this.$message.error("标题不能为空")
              return;
            }
            if (this.ruleForm.serveTel == "") {
              this.$message.error("客服电话不能为空")
              return;
            }
            let _this = this;
            let params = new FormData();
            let obj = [{
              name: 'settingId',
              value: 1,
            },
            {
              name: 'platName',
              value: this.ruleForm.name,
            },
            {
              name: 'platMail',
              value: this.ruleForm.contactEmail,
            },
            {
              name: 'platMobile',
              value: this.ruleForm.tel,
            },
            {
              name: 'platTitle',
              value: this.ruleForm.notice,
            },
            {
              name: 'serveMobile',
              value: this.ruleForm.serveTel,
            }]
            obj.map((e) => params.append(e.name, e.value));
            this.$axios.post(this.http.modifySetting,params).then((e)=>{
              console.log(e)
              if(e.data.code == '0'){
                _this.$message.success(e.data.message);
                if(e.data.result){
                  let obj = [{
                    name: 'settingId',
                    value: 1,
                  }];
                  this.init(obj);
                }
              }else{
                _this.$message.error(e.data.message);
              }
            });
          } else {
            return false;
          }
        });
      },
      init(obj){
        let _this = this;
        let params = new FormData();
        obj.map((e) => params.append(e.name, e.value));
        this.$axios.post(this.http.getSettingById,params).then((e)=>{
          console.log(e)
          if(e.data.code == '0'){
            if(e.data.result){
              let _data = e.data.result;
              _this.ruleForm.name = _data.platName;
              _this.ruleForm.contactEmail = _data.platMail;
              _this.ruleForm.tel = _data.platMobile;
              _this.ruleForm.notice = _data.platTitle;
              _this.ruleForm.serveTel = _data.serveMobile;
            }
          }else{
            _this.$message.error(e.data.message);
          }
        });
      }
    },
    created(){
      let obj = [{
        name: 'settingId',
        value: 1,
      }];
      this.init(obj);
    }
  }
</script>

<style lang="scss">
#platformInformation {
  padding: 20px;

  .w140 {
    width: 140px;
  }

  .positionSet {
    width: 400px;
    margin: 0 auto;
  }

  .labelSet > .el-form-item__label {
    width: 200px !important;
    font-size: 20px;
  }

  .marginLe {
    margin-left: 40px !important;
  }
}

</style>
