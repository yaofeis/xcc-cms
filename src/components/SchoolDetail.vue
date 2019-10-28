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
            <el-form-item label="建校年限:">
              <el-input v-model="dialogForm.creatTime" size="small" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="占地面积:">
              <el-input v-model="dialogForm.area" size="small" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="是否开通渠道沟通:">
              <el-select v-model="dialogForm.openSubscribe" @change="isOpen" size="small" style="width: 200px">
                <el-option label="开启" value="1"></el-option>
                <el-option label="不开启" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="可预约时间:" v-show="isShow" v-for="(item, index) in dialogForm.subscribeTime" :key="index">
              <el-cascader
                :options="options"
                v-model="item.val"
                size="small">
              </el-cascader>
              <el-button size="small" icon="el-icon-circle-plus-outline" @click="addSubscribe">新增</el-button>
              <el-button size="small" icon="el-icon-delete" @click="deleteSubscribe(index)">删除</el-button>
            </el-form-item>
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
              进展中的建设工地，尘埃污染
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
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            accept="image/jpeg,image/png,image/jpg"
            :auto-upload="false"
            :on-change="facilitiesChange"
          >
            <img v-if="dialogForm.facilitiesImg" :src="dialogForm.facilitiesImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
        <td><h5>课程亮点：</h5></td>
        <td>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="dialogForm.curriculum">
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
        <td colspan="2">
          <el-button type="primary" @click="save">保存</el-button>
        </td>
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
          facilitiesImg: "",
          rule: "",
          teacher: "",
          idea: "",
          area: "",
          curriculum: "",
          openSubscribe: "",// 是否开启渠道
          subscribeTime: [{
            val: []
          }]
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
        },
        isShow: false,// 预约时间是否显示
        // 可预约时间列表参数
        options: []
      }
    },
    created() {
      const _this = this;
      // 给预约时间下拉框赋值
      let weeks = ["周一", "周二", "周三", "周四", "周五"];
      let times = ["9:00~10:00", "10:00~11:00", "14:00~15:00", "15:00~16:00", "16:00~17:00"];
      weeks.map((item) => {
        let children = [];
        times.map(item1 => {
          children.push({
            value: item1,
            label: item1
          });
        });
        _this.options.push({
          value: item,
          label: item,
          children: children
        });
      });

      // 获取学校信息(编辑时回显)
      let params = new FormData();
      params.append("schoolId", _this.$route.query.id);
      _this.$axios.post(_this.http.getSchoolById, params).then((res) => {
        if (res.data.code === "0") {
          console.log(res.data.result);
          _this.dialogForm.name = res.data.result.schoolName;
          _this.dialogForm.address = res.data.result.address;
          _this.dialogForm.tel = res.data.result.described;
          _this.dialogForm.tuition = res.data.result.tuition;
          _this.dialogForm.ratio = res.data.result.studentRatio;
          _this.dialogForm.creatTime = res.data.result.buildYear;
          _this.dialogForm.headImg = res.data.result.icon;
          _this.dialogForm.admissionRequirements = res.data.result.entryRequirements;
          _this.dialogForm.areaCovered = res.data.result.area;
          _this.dialogForm.facilities = res.data.result.campusFacilities;
          // TODO 先把多图片弄了
        } else {
          _this.$message.error(res.data.message);
        }
      });
    },
    methods: {
      // 头像上传
      headImgChange(file) {
        let _this = this;
        if (file && file.raw) {
          let params = new FormData;
          params.append("file", file.raw);
          params.append("fileType", "10");
          _this.imgUpload({
            params: params,
            callback(res) {
              _this.dialogForm.headImg = res[0];
            }
          });
        }
      },
      // 周边环境图片
      surroundingChange(file) {
        let _this = this;
        if (file && file.raw) {
          let params = new FormData;
          params.append("file", file.raw);
          params.append("fileType", "10");
          _this.imgUpload({
            params: params,
            callback(res) {
              _this.surrounding.img = res[0];
            }
          });
        }
      },
      // 学校环境图片
      schoolChange(file) {
        let _this = this;
        if (file && file.raw) {
          let params = new FormData;
          params.append("file", file.raw);
          params.append("fileType", "10");
          _this.imgUpload({
            params: params,
            callback(res) {
              _this.school.img = res[0];
            }
          });
        }
      },
      // 伙食情况图片
      foodChange(file) {
        let _this = this;
        if (file && file.raw) {
          let params = new FormData;
          params.append("file", file.raw);
          params.append("fileType", "10");
          _this.imgUpload({
            params: params,
            callback(res) {
              _this.food.img = res[0];
            }
          });
        }
      },
      // 托班课程表
      miniChange(file) {
        let _this = this;
        if (file && file.raw) {
          let params = new FormData;
          params.append("file", file.raw);
          params.append("fileType", "10");
          _this.imgUpload({
            params: params,
            callback(res) {
              _this.schedule.mini = res[0];
            }
          });
        }
      },
      // 小班课程表
      smallChange(file) {
        let _this = this;
        if (file && file.raw) {
          let params = new FormData;
          params.append("file", file.raw);
          params.append("fileType", "10");
          _this.imgUpload({
            params: params,
            callback(res) {
              _this.schedule.small = res[0];
            }
          });
        }
      },
      // 中班课程表
      middleChange(file) {
        let _this = this;
        if (file && file.raw) {
          let params = new FormData;
          params.append("file", file.raw);
          params.append("fileType", "10");
          _this.imgUpload({
            params: params,
            callback(res) {
              _this.schedule.middle = res[0];
            }
          });
        }
      },
      // 大班课程表
      bigChange(file) {
        let _this = this;
        if (file && file.raw) {
          let params = new FormData;
          params.append("file", file.raw);
          params.append("fileType", "10");
          _this.imgUpload({
            params: params,
            callback(res) {
              _this.schedule.big = res[0];
            }
          });
        }
      },
      // 校园设施图片
      facilitiesChange(file){
        let _this = this;
        if (file && file.raw) {
          let params = new FormData;
          params.append("file", file.raw);
          params.append("fileType", "10");
          _this.imgUpload({
            params: params,
            callback(res) {
              _this.dialogForm.facilitiesImg = res[0];
            }
          });
        }
      },
      // 图片上传公用
      imgUpload(obj) {
        let _this = this;
        _this.$axios.post(_this.http.moreFileUpload, obj.params).then((res) => {
          if (res.data.code === "0") {
            _this.$message({
              message: '上传成功',
              type: 'success'
            });
            obj.callback(res.data.result);
          } else {
            _this.$message.error(res.data.message);
          }
        });
      },
      // 保存
      save() {
        let _this = this;
        let isFull = _this.isFull();
        if (isFull === true) {
          _this.$axios.post(_this.http.addSchool, _this.params()).then((res) => {
            if (res.data.code === "0") {
              _this.$message({
                message: '添加成功',
                type: 'success'
              });
            } else {
              _this.$message.error(res.data.message);
            }
          });
        }
      },
      // 封装请求参数
      params() {
        let _this = this;
        let params = new FormData();
        params.append("schoolName", _this.dialogForm.name);
        params.append("icon", _this.dialogForm.headImg);
        params.append("address", _this.dialogForm.address);
        params.append("areaCovered", _this.dialogForm.area);
        params.append("buildYear", _this.dialogForm.creatTime);
        params.append("studentRatio", _this.dialogForm.ratio);
        params.append("tuition", _this.dialogForm.tuition);
        params.append("described", _this.dialogForm.tel);// 学校简介字段装联系方式
        // 是否开始预约沟通
        params.append("openSubscribe", _this.dialogForm.openSubscribe);
        if (_this.dialogForm.openSubscribe === "1") {
          let subscribeTime = [];
          _this.dialogForm.subscribeTime.map(item => {
            subscribeTime.push(item.val.join("/"));
          });
          params.append("subscribeTime", subscribeTime.join());
        }
        // 入学要求
        params.append("entryRequirements", _this.dialogForm.admissionRequirements);
        // 师资情况
        params.append("ourFaculty", _this.dialogForm.teacher);
        // 课程亮点
        params.append("courseCharacteristics", _this.dialogForm.curriculum);
        // 教学理念
        params.append("educationalIdeas", _this.dialogForm.idea);
        // 周边环境
        let surrounding = [];
        surrounding.push({
          itemType: 1,
          itemIndex: 1,
          itemContent: `${_this.surrounding.firstTwo},${_this.surrounding.firstThree}`,
          itemPraise: _this.surrounding.firstOne,
          itemWhole: `${_this.surrounding.firstTwo}进展中的建设工地，尘埃污染${_this.surrounding.firstThree}`
        });
        surrounding.push({
          itemType: 1,
          itemIndex: 2,
          itemContent: _this.surrounding.secondTwo,
          itemPraise: _this.surrounding.secondOne,
          itemWhole: `${_this.surrounding.firstTwo}停车区域`
        });
        surrounding.push({
          itemType: 1,
          itemIndex: 3,
          itemContent: _this.surrounding.thirdTwo,
          itemPraise: _this.surrounding.thirdOne,
          itemWhole: _this.surrounding.thirdTwo
        });
        params.append("surroundingEnvironment", JSON.stringify(surrounding));
        // 校园环境
        let school = [];
        school.push({
          itemType: 2,
          itemIndex: 1,
          itemContent: `${_this.school.firstTwo},${_this.school.firstThree}`,
          itemPraise: _this.school.firstOne,
          itemWhole: `寝室${_this.school.firstTwo}${_this.school.firstThree}孩子睡眠`
        });
        school.push({
          itemType: 2,
          itemIndex: 2,
          itemContent: _this.school.secondTwo,
          itemPraise: _this.school.secondOne,
          itemWhole: `植被覆率大约${_this.school.secondTwo}%`
        });
        school.push({
          itemType: 2,
          itemIndex: 3,
          itemContent: _this.school.thirdTwo,
          itemPraise: _this.school.thirdOne,
          itemWhole: `场地${_this.school.thirdTwo}`
        });
        school.push({
          itemType: 2,
          itemIndex: 4,
          itemContent: _this.school.fourthTwo,
          itemPraise: _this.school.fourthOne,
          itemWhole: `装修${_this.school.fourthTwo}危险拐角`
        });
        school.push({
          itemType: 2,
          itemIndex: 5,
          itemContent: _this.school.fifthTwo,
          itemPraise: _this.school.fifthOne,
          itemWhole: `平均活动范围${_this.school.fifthTwo}`
        });
        school.push({
          itemType: 2,
          itemIndex: 6,
          itemContent: _this.school.sixthTwo,
          itemPraise: _this.school.sixthOne,
          itemWhole: `${_this.school.sixthTwo}国家卫生许可证明`
        });
        school.push({
          itemType: 2,
          itemIndex: 7,
          itemContent: _this.school.seventhTwo,
          itemPraise: _this.school.seventhOne,
          itemWhole: `地面防滑处理${_this.school.seventhTwo}`
        });
        school.push({
          itemType: 2,
          itemIndex: 8,
          itemContent: `${_this.school.eighthTwo},${_this.school.eighthThree}`,
          itemPraise: _this.school.eighthOne,
          itemWhole: `教室光线${_this.school.eighthTwo}，通气${_this.school.eighthThree}`
        });
        console.log(school);
        params.append("campusEnvironment", JSON.stringify(school));
        // 伙食情况
        let food = [];
        food.push({
          itemType: 3,
          itemIndex: 1,
          itemContent: _this.food.firstTwo,
          itemPraise: _this.food.firstOne,
          itemWhole: _this.food.firstTwo
        });
        food.push({
          itemType: 3,
          itemIndex: 2,
          itemContent: _this.food.secondTwo,
          itemPraise: _this.food.secondOne,
          itemWhole: _this.food.secondTwo
        });
        food.push({
          itemType: 3,
          itemIndex: 3,
          itemContent: _this.food.thirdTwo,
          itemPraise: _this.food.thirdOne,
          itemWhole: `${_this.food.thirdTwo}食品样品抽查制度`
        });
        food.push({
          itemType: 3,
          itemIndex: 4,
          itemContent: _this.food.fourthTwo,
          itemPraise: _this.food.fourthOne,
          itemWhole: `${_this.food.fourthTwo}餐具消毒设备`
        });
        params.append("mealsSituation", JSON.stringify(food));
        // 校园设施
        let facilities = [{
          itemType: 4,
          itemIndex: 1,
          itemContent: _this.dialogForm.facilities,
          itemPraise: "1",
          itemWhole: _this.dialogForm.facilities
        }];
        params.append("campusFacilities", JSON.stringify(facilities));
        // 各种图片
        let _image = [];
        _image.push({
          imageType: 1,
          imageUrl: _this.surrounding.img
        });// 周边环境
        _image.push({
          imageType: 2,
          imageUrl: _this.school.img
        });// 校园环境
        _image.push({
          imageType: 3,
          imageUrl: _this.food.img
        });// 伙食
        _image.push({
          imageType: 5,
          imageUrl: _this.dialogForm.facilitiesImg
        });// 校园设施
        _image.push({
          imageType: 7,
          imageUrl: _this.schedule.mini
        });// 托班
        _image.push({
          imageType: 8,
          imageUrl: _this.schedule.small
        });// 小班
        _image.push({
          imageType: 9,
          imageUrl: _this.schedule.middle
        });// 中班
        _image.push({
          imageType: 10,
          imageUrl: _this.schedule.big
        });// 大班
        params.append("imagesJson", JSON.stringify(_image));
        return params;
      },
      // 判断表单是否完善
      isFull() {
        let _this = this;
        if (_this.dialogForm.name === "") return _this.$message('学校名称不能为空');
        if (_this.dialogForm.address === "") return _this.$message('学校地址不能为空');
        if (_this.dialogForm.tel === "") return _this.$message('联系方式不能为空');
        if (_this.dialogForm.tuition === "") return _this.$message('学费不能为空');
        if (_this.dialogForm.ratio === "") return _this.$message('师生比列不能为空');
        if (_this.dialogForm.creatTime === "") return _this.$message('建校时间不能为空');
        if (_this.dialogForm.area === "") return _this.$message('占地面积不能为空');
        if (_this.dialogForm.openSubscribe === "") return _this.$message('请选择是否开启预约沟通');
        if (_this.dialogForm.openSubscribe === "1") {
          for (let i = 0; i < _this.dialogForm.subscribeTime.length; i++) {
            if (JSON.stringify(_this.dialogForm.subscribeTime[0].val) === "[]") {
              return _this.$message('请选择预约沟通时间');
            }
          }
        }
        if (_this.dialogForm.headImg === "") return _this.$message('学校头像不能为空');
        if (_this.dialogForm.admissionRequirements === "") return _this.$message('入学要求不能为空');
        if (_this.dialogForm.facilities === "") return _this.$message('校园设施情况不能为空');
        if (_this.dialogForm.facilitiesImg === "") return _this.$message('校园设施图片不能为空');
        if (_this.dialogForm.teacher === "") return _this.$message('师资情况不能为空');
        if (_this.dialogForm.idea === "") return _this.$message('教育理念不能为空');
        if (_this.dialogForm.curriculum === "") return _this.$message('课程亮点不能为空');
        if (_this.schedule.mini === "") return _this.$message('托班课程表不能为空');
        if (_this.schedule.small === "") return _this.$message('小班课程表不能为空');
        if (_this.schedule.middle === "") return _this.$message('中班课程表不能为空');
        if (_this.schedule.big === "") return _this.$message('大班课程表不能为空');
        if (_this.surrounding.firstTwo === ""
          || _this.surrounding.firstThree === ""
          || _this.surrounding.secondTwo === ""
          || _this.surrounding.thirdTwo === ""
          || _this.surrounding.img === "") return _this.$message('请完善周围环境，包括图片！');
        if (_this.school.firstTwo === ""
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
        if (_this.food.firstTwo === ""
          || _this.food.secondTwo === ""
          || _this.food.thirdTwo === ""
          || _this.food.fourthTwo === ""
          || _this.food.img === "") return _this.$message('请完善伙食情况，包括图片！');
        return true;
      },
      // 是否开通渠道变化
      isOpen(val) {
        this.isShow = val === "1";
      },
      // 新增预约时间
      addSubscribe() {
        this.dialogForm.subscribeTime.push({
          val: []
        });
      },
      // 删除预约时间
      deleteSubscribe(index) {
        if (this.dialogForm.subscribeTime.length === 1) return this.$message('请至少保证一条预约时间！');
        this.dialogForm.subscribeTime.splice(index, 1);
      }
    }
  }
</script>

<style lang="scss">
  #schoolDetail {
    > table {
      td {
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

    .el-form-item {
      margin-bottom: 0;
    }
  }
</style>
