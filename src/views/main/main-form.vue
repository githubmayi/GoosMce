<template>
  <div class="box">
    <el-container>
      <el-header></el-header>
      <el-container>
        <el-scrollbar>
          <el-aside :width="isCollapse ? '' : '220px'"
            ><nav-menu :is-collapse="isCollapse"></nav-menu
          ></el-aside>
        </el-scrollbar>
        <el-container>
          <el-main>
            <span class="collapse-size"
              ><i
                :class="isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
                @click="isShow(isCollapse)"
              ></i
            ></span>
          </el-main>
        </el-container>
      </el-container>
      <el-footer></el-footer>
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
.el-header {
  background: #0088e2;
  height: $default-height;
}
.el-container {
  height: calc(100vh - 2 * $default-height);
}

.el-main {
  padding: 0;
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

.el-footer {
background: black;
}
</style>
