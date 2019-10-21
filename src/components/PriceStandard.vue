<template>
  <div id="priceStandard">
    <div class="positionSet">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="定价标准" class="labelSet"></el-form-item>
        <el-form-item label="起步价格：" prop="firstPrice">
          <el-input type="firstPrice" v-model.number="ruleForm.firstPrice" class="w140" size="small"></el-input>
        </el-form-item>
        <el-form-item label="起步公里数" prop="mileage">
          <el-input type="mileage" v-model.number="ruleForm.mileage" class="w140" size="small"></el-input>
          <span style="color: lightgray;">(超过三公里部分)</span>
        </el-form-item>
        <el-form-item label="每公里价格" prop="milePrice">
          <el-input type="milePrice" v-model.number="ruleForm.milePrice" class="w140" size="small"></el-input>
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
    name: "PriceStandard",
    data() {
      return {
        ruleForm: {
          firstPrice: '',
          mileage: '',
          milePrice: ''
        },
        rules: {
          firstPrice: [
            {required: true, message: '请输入正确的数字', trigger: 'blur'},
            {type: 'number', message: '必须为数字值'}
          ],
          mileage: [
            {required: true, message: '请输入正确的数字', trigger: 'blur'},
            {type: 'number', message: '必须为数字值'}
          ],
          milePrice: [
            {required: true, message: '请输入正确的数字', trigger: 'blur'},
            {type: 'number', message: '必须为数字值'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {

            return false;
          }
        });
      },
    }
  }
</script>

<style lang="scss">
  #priceStandard {
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
