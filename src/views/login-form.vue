<template>
  <div class="box">
    <el-card class="login-box box-card">
      <div class="login-content">
        <div class="login-title">
          <el-image :src="imgSrc">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
        <el-form
          :model="loginForm"
          ref="loginForm"
          label-position="left"
          :label-width="lblWidth"
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
            <el-button type="primary" :loading="loading" @click="login"
              >登录</el-button
            >
          </el-footer>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.box {
  width: 100%;
  height: 100%;
}

.login-box {
  width: 400px;
  height: 380px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 340px;
  background: rgba(255,255,255,.3);
}

.login-title {
  height: 100px;
  width: 100%;
  text-align: center;
}

.login-title .el-image{
  width: 84px;
}

.el-footer {
  padding: 0;
  text-align: right;
}

.el-footer .el-button--primary {
  width: 100%;
  background-color: #0088E2;
  border-color: #0088E2;
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
      lblWidth: "60px",
      loading: false,
      imgSrc: require("../assets//images//login-title.png"),
    };
  },
  methods: {
    login() {
      this.loading = true;
      login(this.loginForm)
        .then((res) => {
          debugger;
          if (!res) {
            MessageBox.alert("账号或密码错误！");
          } else {
            this.$router.push("/Main");
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
