<template>
  <div class="box">
    <el-card class="login-box box-card">
      <div class="login-content">
        <el-form
        :model="loginForm"
        ref="loginForm"
        label-position="left"
        label-width="80px"
      >
        <el-form-item label="用户名">
          <el-input
            suffix-icon="el-icon-user"
            v-model="loginForm.loginName"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.passwordNew" show-password></el-input>
        </el-form-item>
        <el-footer>
          <el-button type="primary" @click="login">登录</el-button>
        </el-footer>
      </el-form>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.box {
  width: 100%;
}

.login-box {
  width: 400px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

.el-footer {
  padding: 0;
  text-align: right;
}
</style>

<script>
import { MessageBox } from "element-ui";
import login from "../apis/index";

export default {
  data() {
    return {
      loginForm: {
        loginName: "",
        passwordNew: "",
      },
    };
  },
  methods: {
    login() {
      login(this.loginForm).then((res) => {
        debugger;
        if (!res) {
          MessageBox.alert("账号或密码错误！");
        } else {
          MessageBox.alert("登录成功！");
        }
      });
    },
  },
};
</script>
