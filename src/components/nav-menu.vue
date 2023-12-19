<template>
  <el-menu
    class="el-menu-vertical"
    :collapse="isCollapse"
    background-color="#000000"
    text-color="#ffffff"
    router
    default-active="/Main/Home"
  >
    <el-menu-item v-if="isLoad" index="/Main/Home">
      <i class="el-icon-location-outline"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu
      v-for="(menu, index) in menus"
      :key="menu.id"
      :index="String(index)"
    >
      <template slot="title">
        <el-image :src="`data:image/png;base64,${menu.ImgName}`"></el-image>
        <span class="menu-title" slot="title">{{ menu.MenuText }}</span>
      </template>
      <div v-if="menu.childMenus && menu.childMenus.length > 0">
        <div v-for="child in menu.childMenus" :key="child.id">
          <el-menu-item :index="getIndex(child.FrmName)">{{
            child.MenuText
          }}</el-menu-item>
        </div>
      </div>
    </el-submenu>
  </el-menu>
</template>

<script>
import menu from "../apis/menu";
import { MessageBox } from "element-ui";
export default {
  name: "nav-menu",
  props: {
    isCollapse: { type: Boolean, default: false },
  },
  data() {
    return {
      menus: [],
      isLoad: false,
    };
  },
  created() {
    this.getAllMenus();
  },
  methods: {
    getAllMenus() {
      debugger;
      const menus = window.localStorage.getItem("menus");
      if (menus) {
        const jsonResult = JSON.parse(menus);
        this.menus = jsonResult;
        this.isLoad = true;
        return;
      }
      const emptyGuid = "00000000-0000-0000-0000-000000000000";
      const sysKey = 5;
      const isAll = true;
      const param = { reloIdKeyS: [emptyGuid], sysKey: sysKey, isAll: isAll };
      menu(param).then((res) => {
        if (res) {
          if (res.length <= 0) {
            return;
          }
          let child = [];
          for (let i = 0, lens = res.length; i < lens; i++) {
            let item = res[i];
            if (item.ParentMenuId === emptyGuid) {
              this.menus.push(item);
            } else {
              child.push(item);
            }
          }
          for (let i = 0, lens = this.menus.length; i < lens; i++) {
            for (let j = 0, lens2 = child.length; j < lens2; j++) {
              if (child[j].ParentMenuId === this.menus[i].MenuId) {
                if (!this.menus[i].childMenus) {
                  this.menus[i].childMenus = [];
                }
                this.menus[i].childMenus.push(child[j]);
              }
            }
          }
          this.isLoad = true;
          console.log(this.menus);
          const menus = JSON.stringify(this.menus);
          window.localStorage.setItem("menus", menus);
        } else {
          MessageBox.alert("未能正确加载菜单信息！");
        }
      });
    },

    getIndex(name) {
      return `/Main/${name.replace(/Frm/g, "")}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-title {
  padding-left: 10px;
}
.el-icon-location-outline {
  color: #ffffff;
  font-size: 24px !important;
}
</style>
