<template>
  <div id="schoolDetail">
    <table>
      <tr>
        <td><h5>基础信息：</h5></td>
        <td>
          <el-form :model="dialogForm" label-width="180px">
            <el-form-item label="学校名称:">
              <el-input v-model="dialogForm.name" size="small" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="学校地址:">
              <el-input v-model="dialogForm.address" size="small" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="联系方式:">
              <el-input v-model="dialogForm.tel" size="small" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="学费:">
              <el-input v-model="dialogForm.tuition" size="small" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="师生比列:">
              <el-input v-model="dialogForm.ratio" size="small" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="建校时间:">
              <el-date-picker v-model="dialogForm.creatTime" type="date" placeholder="选择日期" size="small" style="width: 200px"></el-date-picker>
            </el-form-item>
            <el-form-item label="占地面积:">
              <el-input v-model="dialogForm.area" size="small" style="width: 200px"></el-input>
            </el-form-item>
            <!--<el-form-item label="是否开通渠道沟通:">-->
            <!--<el-select v-model="dialogForm.status" size="small" style="width: 200px">-->
            <!--<el-option label="激活" value="1"></el-option>-->
            <!--<el-option label="未激活" value="2"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="可预约时间:">-->
            <!--<el-select v-model="dialogForm.status" size="small" style="width: 200px">-->
            <!--<el-option label="激活" value="1"></el-option>-->
            <!--<el-option label="未激活" value="2"></el-option>-->
            <!--</el-select>-->
            <!--<el-select v-model="dialogForm.status" size="small" style="width: 200px">-->
            <!--<el-option label="激活" value="1"></el-option>-->
            <!--<el-option label="未激活" value="2"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item label="学校头像:">
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                accept="image/jpeg,image/png,image/jpg"
                :auto-upload="false"
                :on-change="headImgChange"
              >
                <img v-if="dialogForm.headImg" :src="dialogForm.headImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </td>
      </tr>
      <tr>
        <td><h5>入学要求：</h5></td>
        <td>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="dialogForm.admissionRequirements">
          </el-input>
        </td>
      </tr>
      <tr>
        <td><h5>周边环境：</h5></td>
        <td>
          <el-form :model="surrounding">
            <el-form-item>
              <el-select v-model="surrounding.firstOne" size="small" style="width: 80px;margin-right: 50px;">
                <el-option label="优点" value="1"></el-option>
                <el-option label="缺点" value="2"></el-option>
              </el-select>
              1、
              <el-select v-model="surrounding.firstTwo" size="small" style="width: 100px">
                <el-option label="有" value="有"></el-option>
                <el-option label="无" value="无"></el-option>
              </el-select>
              进展中的建设工地，尘埃污染。
              <el-select v-model="surrounding.firstThree" size="small" style="width: 100px">
                <el-option label="小" value="小"></el-option>
                <el-option label="大" value="大"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="surrounding.secondOne" size="small" style="width: 80px;margin-right: 50px;">
                <el-option label="优点" value="1"></el-option>
                <el-option label="缺点" value="2"></el-option>
              </el-select>
              2、
              <el-select v-model="surrounding.secondTwo" size="small" style="width: 100px">
                <el-option label="有" value="1"></el-option>
                <el-option label="无" value="2"></el-option>
              </el-select>
              停车区域。
            </el-form-item>
            <el-form-item>
              <el-select v-model="surrounding.thirdOne" size="small" style="width: 80px;margin-right: 50px;">
                <el-option label="优点" value="1"></el-option>
                <el-option label="缺点" value="2"></el-option>
              </el-select>
              3、
              <el-input v-model="surrounding.thirdTwo" size="small" style="width: 200px"></el-input>
              如：有无红绿灯、限速、车辆来往情况。
            </el-form-item>
            <el-form-item>
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                accept="image/jpeg,image/png,image/jpg"
                :auto-upload="false"
                :on-change="surroundingChange"
              >
                <img v-if="surrounding.img" :src="surrounding.img" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </td>
      </tr>
      <tr>
        <td><h5>校园环境：</h5></td>
        <td>
          <el-form :model="school">
            <el-form-item>
              <el-select v-model="school.firstOne" size="small" style="width: 80px;margin-right: 50px;">
                <el-option label="优点" value="1"></el-option>
                <el-option label="缺点" value="2"></el-option>
              </el-select>
              1、寝室
              <el-select v-model="school.firstTwo" size="small" style="width: 90px">
                <el-option label="临街" value="临街"></el-option>
                <el-option label="不临街" value="不临街"></el-option>
              </el-select>
              <el-select v-model="school.firstThree" size="small" style="width: 130px">
                <el-option label="影响" value="影响"></el-option>
                <el-option label="不影响" value="不影响"></el-option>
                <el-option label="稍微有点影响" value="稍微有点影响"></el-option>
              </el-select>
              孩子睡眠。
            </el-form-item>
            <el-form-item>
              <el-select v-model="school.secondOne" size="small" style="width: 80px;margin-right: 50px;">
                <el-option label="优点" value="1"></el-option>
                <el-option label="缺点" value="2"></el-option>
              </el-select>
              2、植被覆率大约
              <el-input v-model="school.secondTwo" size="small" style="width: 70px"></el-input>
              %。
            </el-form-item>
            <el-form-item>
              <el-select v-model="school.thirdOne" size="small" style="width: 80px;margin-right: 50px;">
                <el-option label="优点" value="1"></el-option>
                <el-option label="缺点" value="2"></el-option>
              </el-select>
              3、场地
              <el-select v-model="school.thirdTwo" size="small" style="width: 100px;">
                <el-option label="单一" value="单一"></el-option>
                <el-option label="多样" value="多样"></el-option>
                <el-option label="比较单一" value="比较单一"></el-option>
              </el-select>
              （如：草地、泥地、沙地等）
            </el-form-item>
            <el-form-item>
              <el-select v-model="school.fourthOne" size="small" style="width: 80px;margin-right: 50px;">
                <el-option label="优点" value="1"></el-option>
                <el-option label="缺点" value="2"></el-option>
              </el-select>
              4、装修
              <el-select v-model="school.fourthTwo" size="small" style="width: 120px;">
                <el-option label="软包了" value="软包了"></el-option>
                <el-option label="基本软包了" value="基本软包了"></el-option>
                <el-option label="没有软包了" value="没有软包了"></el-option>
              </el-select>
              危险拐角。
            </el-form-item>
            <el-form-item>
              <el-select v-model="school.fifthOne" size="small" style="width: 80px;margin-right: 50px;">
                <el-option label="优点" value="1"></el-option>
                <el-option label="缺点" value="2"></el-option>
              </el-select>
              5、平均活动范围
              <el-select v-model="school.fifthTwo" size="small" style="width: 120px;">
                <el-option label="宽阔" value="宽阔"></el-option>
                <el-option label="一般" value="一般"></el-option>
                <el-option label="比较狭窄" value="比较狭窄"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="school.sixthOne" size="small" style="width: 80px;margin-right: 50px;">
                <el-option label="优点" value="1"></el-option>
                <el-option label="缺点" value="2"></el-option>
              </el-select>
              6、厨房
              <el-select v-model="school.sixthTwo" size="small" style="width: 120px;">
                <el-option label="已获得" value="已获得"></el-option>
                <el-option label="未获得" value="未获得"></el-option>
              </el-select>
              国家卫生许可证明
            </el-form-item>
            <el-form-item>
              <el-select v-model="school.seventhOne" size="small" style="width: 80px;margin-right: 50px;">
                <el-option label="优点" value="1"></el-option>
                <el-option label="缺点" value="2"></el-option>
              </el-select>
              7、地面防滑处理
              <el-select v-model="school.seventhTwo" size="small" style="width: 120px;">
                <el-option label="很好" value="很好"></el-option>
                <el-option label="一般" value="一般"></el-option>
                <el-option label="无" value="无"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="school.eighthOne" size="small" style="width: 80px;margin-right: 50px;">
                <el-option label="优点" value="1"></el-option>
                <el-option label="缺点" value="2"></el-option>
              </el-select>
              8、教室光线
              <el-select v-model="school.eighthTwo" size="small" style="width: 120px;">
                <el-option label="充足" value="充足"></el-option>
                <el-option label="不充足" value="不充足"></el-option>
              </el-select>
              ，通气
              <el-select v-model="school.eighthThree" size="small" style="width: 120px;">
                <el-option label="良好" value="良好"></el-option>
                <el-option label="差" value="差"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                accept="image/jpeg,image/png,image/jpg"
                :auto-upload="false"
                :on-change="schoolChange"
              >
                <img v-if="school.img" :src="school.img" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </td>
      </tr>
      <tr>
        <td><h5>伙食情况：</h5></td>
        <td>
          <el-form :model="food">
            <el-form-item>
              <el-select v-model="food.firstOne" size="small" style="width: 80px;margin-right: 50px;">
                <el-option label="优点" value="1"></el-option>
                <el-option label="缺点" value="2"></el-option>
              </el-select>
              1、
              <el-input v-model="food.firstTwo" size="small" style="width: 200px" placeholder="请输入学校营养师情况"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="food.secondOne" size="small" style="width: 80px;margin-right: 50px;">
                <el-option label="优点" value="1"></el-option>
                <el-option label="缺点" value="2"></el-option>
              </el-select>
              2、
              <el-input v-model="food.secondTwo" size="small" style="width: 200px" placeholder="请输入学校工作人员情况"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="food.thirdOne" size="small" style="width: 80px;margin-right: 50px;">
                <el-option label="优点" value="1"></el-option>
                <el-option label="缺点" value="2"></el-option>
              </el-select>
              3、
              <el-select v-model="food.thirdTwo" size="small" style="width: 100px;">
                <el-option label="有" value="有"></el-option>
                <el-option label="无" value="无"></el-option>
              </el-select>
              食品样品抽查制度
            </el-form-item>
            <el-form-item>
              <el-select v-model="food.fourthOne" size="small" style="width: 80px;margin-right: 50px;">
                <el-option label="优点" value="1"></el-option>
                <el-option label="缺点" value="2"></el-option>
              </el-select>
              4、
              <el-select v-model="food.fourthTwo" size="small" style="width: 100px;">
                <el-option label="有" value="有"></el-option>
                <el-option label="无" value="无"></el-option>
              </el-select>
              餐具消毒设备。
            </el-form-item>
            <el-form-item>
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                accept="image/jpeg,image/png,image/jpg"
                :auto-upload="false"
                :on-change="foodChange"
              >
                <img v-if="food.img" :src="food.img" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </td>
      </tr>
      <tr>
        <td><h5>课程安排：</h5></td>
        <td>
          <el-form :model="schedule" label-width="100px">
            <el-form-item label="托班课程表:">
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                accept="image/jpeg,image/png,image/jpg"
                :auto-upload="false"
                :on-change="miniChange"
              >
                <img v-if="schedule.mini" :src="schedule.mini" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="小班课程表:">
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                accept="image/jpeg,image/png,image/jpg"
                :auto-upload="false"
                :on-change="smallChange"
              >
                <img v-if="schedule.small" :src="schedule.small" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="中班课程表:">
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                accept="image/jpeg,image/png,image/jpg"
                :auto-upload="false"
                :on-change="middleChange"
              >
                <img v-if="schedule.middle" :src="schedule.middle" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="大班课程表:">
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                accept="image/jpeg,image/png,image/jpg"
                :auto-upload="false"
                :on-change="bigChange"
              >
                <img v-if="schedule.big" :src="schedule.big" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </td>
      </tr>
      <tr>
        <td><h5>校园设施情况：</h5></td>
        <td>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="dialogForm.facilities">
          </el-input>
        </td>
      </tr>
      <tr>
        <td><h5>师资情况：</h5></td>
        <td>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="dialogForm.teacher">
          </el-input>
        </td>
      </tr>
      <tr>
        <td><h5>教育理念：</h5></td>
        <td>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="dialogForm.idea">
          </el-input>
        </td>
      </tr>
      <tr>
        <td colspan="2"> <el-button type="primary" @click="save">保存</el-button></td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "SchoolDetail",
    data() {
      return {
        dialogForm: {
          name: "",
          address: "",
          tel: "",
          tuition: "",
          ratio: "",
          creatTime: "",
          headImg: "",
          admissionRequirements: "",
          facilities: "",
          rule: "",
          teacher: "",
          idea: "",
          area: ""
        },
        // 周围环境
        surrounding: {
          firstOne: "1",
          firstTwo: "",
          firstThree: "",
          secondOne: "1",
          secondTwo: "",
          thirdOne: "1",
          thirdTwo: "",
          img: ""
        },
        // 校园环境
        school: {
          firstOne: "1",
          firstTwo: "",
          firstThree: "",
          secondOne: "1",
          secondTwo: "",
          thirdOne: "1",
          thirdTwo: "",
          fourthOne: "1",
          fourthTwo: "",
          fifthOne: "1",
          fifthTwo: "",
          sixthOne: "1",
          sixthTwo: "",
          seventhOne: "1",
          seventhTwo: "",
          eighthOne: "1",
          eighthTwo: "",
          eighthThree: "",
          img: ""
        },
        // 伙食情况
        food: {
          firstOne: "1",
          firstTwo: "",
          secondOne: "1",
          secondTwo: "",
          thirdOne: "1",
          thirdTwo: "",
          fourthOne: "1",
          fourthTwo: "",
          img: ""
        },
        // 课程安排
        schedule: {
          mini: "",
          small: "",
          middle: "",
          big: ""
        }
      }
    },
    methods: {
      // 头像上传
      headImgChange(file) {

      },
      // 周边环境图片
      surroundingChange(){

      },
      // 学校环境图片
      schoolChange(){

      },
      // 伙食情况图片
      foodChange(){},
      // 托班课程表
      miniChange(){},
      // 小班课程表
      smallChange(){},
      // 中班课程表
      middleChange(){},
      // 大班课程表
      bigChange(){},
      // 保存
      save(){
        let _this = this;
        let isFull = _this.isFull();
        if(isFull === true){
          let params = new FormData();
          params.append("schoolName",_this.dialogForm.name);
          params.append("icon",_this.dialogForm.headImg);
          params.append("address",_this.dialogForm.address);
          params.append("areaCovered",_this.dialogForm.area);
          params.append("buildYear",_this.dialogForm.creatTime);
          params.append("studentRatio",_this.dialogForm.ratio);
          params.append("tuition",_this.dialogForm.tuition);
          params.append("described",_this.dialogForm.tel);// 学校简介字段装联系方式
          params.append("entryRequirements",_this.dialogForm.admissionRequirements);
          params.append("courseCharacteristics",_this.dialogForm.facilities);
        }
      },
      // 判断表单是否完善
      isFull(){
        let _this = this;
        if(_this.dialogForm.name === "") return _this.$message('学校名称不能为空');
        if(_this.dialogForm.address === "") return _this.$message('学校地址不能为空');
        if(_this.dialogForm.tel === "") return _this.$message('联系方式不能为空');
        if(_this.dialogForm.tuition === "") return _this.$message('学费不能为空');
        if(_this.dialogForm.ratio === "") return _this.$message('师生比列不能为空');
        if(_this.dialogForm.creatTime === "") return _this.$message('建校时间不能为空');
        if(_this.dialogForm.area === "") return _this.$message('占地面积不能为空');
        if(_this.dialogForm.headImg === "") return _this.$message('学校头像不能为空');
        if(_this.dialogForm.admissionRequirements === "") return _this.$message('入学要求不能为空');
        if(_this.dialogForm.facilities === "") return _this.$message('校园设施情况不能为空');
        if(_this.dialogForm.teacher === "") return _this.$message('师资情况不能为空');
        if(_this.dialogForm.idea === "") return _this.$message('教育理念不能为空');
        if(_this.schedule.mini === "") return _this.$message('托班课程表不能为空');
        if(_this.schedule.small === "") return _this.$message('小班课程表不能为空');
        if(_this.schedule.middle === "") return _this.$message('中班课程表不能为空');
        if(_this.schedule.big === "") return _this.$message('大班课程表不能为空');
        if(_this.surrounding.firstTwo === ""
          || _this.surrounding.firstThree === ""
          || _this.surrounding.secondTwo === ""
          || _this.surrounding.thirdTwo === ""
          || _this.surrounding.img === "") return _this.$message('请完善周围环境，包括图片！');
        if(_this.school.firstTwo === ""
          || _this.school.firstThree === ""
          || _this.school.secondTwo === ""
          || _this.school.secondTwo === ""
          || _this.school.thirdTwo === ""
          || _this.school.fourthTwo === ""
          || _this.school.fifthTwo === ""
          || _this.school.sixthTwo === ""
          || _this.school.seventhTwo === ""
          || _this.school.eighthTwo === ""
          || _this.school.eighthThree === ""
          || _this.school.img === "") return _this.$message('请完善校园环境，包括图片！');
        if(_this.food.firstTwo === ""
          || _this.food.secondTwo === ""
          || _this.food.thirdTwo === ""
          || _this.food.fourthTwo === ""
          || _this.food.img === "") return _this.$message('请完善伙食情况，包括图片！');
        return true;
      }
    }
  }
</script>

<style lang="scss">
  #schoolDetail {
    >table {
      td{
        padding: 10px 0;
      }
      td:nth-of-type(odd) {
        vertical-align: top;
      }
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

    .el-form-item{
      margin-bottom: 0;
    }
  }
</style>
