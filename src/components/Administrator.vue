<template>
  <div id="administrator">
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="账号:">
          <el-input v-model="form.username" placeholder="请输入账号" size="small"></el-input>
        </el-form-item>
        <el-form-item label="昵称:">
          <el-input v-model="form.nickname" placeholder="请输入昵称" size="small"></el-input>
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
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="nickName" label="昵称"></el-table-column>
      <el-table-column prop="activated" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.activated === 1">激活</span>
          <span v-else>未激活</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="edit(scope.row)">编辑</el-button>
          <!--<el-button size="mini" type="text" @click="_delete(scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <!--编辑/新增模态框-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogShow" width="400px">
      <el-form :model="dialogForm" label-width="80px">
        <el-form-item label="账号:">
          <el-input v-model="dialogForm.username" :disabled="dialogForm.id !== ''" size="small"
                    style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="dialogForm.password" :disabled="dialogForm.id !== ''" size="small"
                    style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="昵称:">
          <el-input v-model="dialogForm.nickname" size="small" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="dialogForm.status" size="small" style="width: 200px">
            <el-option label="激活" value="1"></el-option>
            <el-option label="未激活" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false" size="small">取 消</el-button>
        <el-button type="primary" @click="save()" size="small">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "Administrator",
    data() {
      return {
        form: {
          username: "",
          nickname: ""
        },
        list: [],
        tableHeight: 200,
        // 新增/编辑模态框相关
        dialogTitle: "新增",
        dialogShow: false,
        dialogForm: {
          username: "",
          password: "",
          nickname: "",
          status: "",
          id: ""
        }
      }
    },
    created() {
      let _this = this;
      _this.tableHeight = document.body.clientHeight - 155;
      _this.init();
    },
    methods: {
      // 初始化
      init(data = {username: "", nickname: ""}) {
        let _this = this;
        let params = new FormData();
        params.append("pageNum", "1");
        params.append("pageSize", "100");
        data.username !== "" && params.append("username", data.username);
        data.nickname !== "" && params.append("nickName", data.nickname);
        _this.$axios.post(_this.http.getAdminList, params).then((res) => {
          let list = [];
          if (res.data.code === "0") {
            list = res.data.result;
          } else {
            _this.$message.error(res.data.message);
          }
          _this.list = list;
        })
      },
      // 搜索
      search() {
        let _this = this;
        _this.init(_this.form);
      },
      // 新增
      newAdd() {
        this.dialogShow = true;
        this.dialogTitle = "新增";
        this.dialogForm.username = "";
        this.dialogForm.password = "";
        this.dialogForm.nickname = "";
        this.dialogForm.status = "";
        this.dialogForm.id = "";
      },
      // 保存新增or编辑
      save() {
        let _this = this;
        let params = new FormData();
        let url = "";
        params.append("username", _this.dialogForm.username);
        params.append("password", _this.dialogForm.password);
        params.append("nickName", _this.dialogForm.nickname);
        params.append("roleId", "1");
        params.append("operatorId", _this.$store.state.admin.adminId);
        params.append("activated", _this.dialogForm.status);
        if (_this.dialogForm.id === "") {
          // 新增
          url = _this.http.addAdmin;
        } else {
          // 编辑
          url = _this.http.modifyAdmin;
          params.append("adminId", _this.dialogForm.id);
        }
        _this.$axios.post(url, params).then((res) => {
          if (res.data.code === "0") {
            _this.$message({
              message: '操作成功!',
              type: 'success'
            });
            _this.init();
            _this.dialogShow = false;
          } else {
            _this.$message.error(res.data.message);
          }
        })
      },
      // 编辑
      edit(row) {
        this.dialogShow = true;
        this.dialogTitle = "编辑";
        this.dialogForm.username = row.username;
        this.dialogForm.password = row.password;
        this.dialogForm.nickname = row.nickName;
        this.dialogForm.status = row.activated.toString();
        this.dialogForm.id = row.adminId;
      },
    }
  }
</script>

<style lang="scss">
  #administrator {
    .el-table__body-wrapper {
      overflow-y: auto;
    }
  }
</style>
