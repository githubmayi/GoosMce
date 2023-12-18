<template>
  <div class="box">
    <el-container>
      <el-scrollbar>
        <el-aside :width="isCollapse ? '' : '220px'"
          ><nav-menu :is-collapse="isCollapse"></nav-menu
        ></el-aside>
      </el-scrollbar>
      <el-container>
        <el-header>
          <el-row>
              <el-col :span="1">
                <span class="collapse-size"
                  ><i
                    :class="isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
                    @click="isShow(isCollapse)"
                  ></i
                ></span>
              </el-col>
              <!--导航栏-->
              <el-col :span="23">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item></el-breadcrumb-item>
                </el-breadcrumb>
              </el-col>
            </el-row>
        </el-header>
        <el-scrollbar>
          <el-main>
          <!--内容承载区-->
          <div class="main-container">
            <router-view />
          </div>
        </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import navMenu from "@/components/nav-menu.vue";
import { Scrollbar } from "element-ui";
export default {
  components: { navMenu, [Scrollbar.name]: Scrollbar },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    isShow(isCollapse) {
      this.isCollapse = !isCollapse;
    },
  },
};
</script>

<style lang="scss" scoped>
$default-height: 60px;
$default-margin: 6px;
.el-header {
  background: #ffffff;
  height: $default-height;
  margin: $default-margin $default-margin 0 $default-margin;
  padding: 0;
  line-height: $default-height;
}
.el-container {
  background: #e8ecf6;
  height: 100vh;
}

.collapse-size {
  i {
    margin: 5px;
    font-size: 24px;
  }
}

.el-aside {
  overflow: hidden;
}

//样式穿透 因为加了scoped 浏览器无法识别到element自带的样式标签
.box ::v-deep .el-scrollbar__wrap {
  overflow-x: hidden !important;
}

.box ::v-deep .el-scrollbar__view {
  height: 100%;
  
}

.box ::v-deep .el-main {
  padding: 0;
  overflow-x: hidden;
  height: 100%;
  margin: $default-margin;
}

.box ::v-deep .el-image {
  img {
    width: 24px;
    margin-top: 16px;
  }
}

.main-container {
  height: 100%;
}

.box ::v-deep .el-scrollbar {
  height: 100%;
}
</style>
