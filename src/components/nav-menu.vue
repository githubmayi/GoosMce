<template>
  <el-menu class="el-menu-vertical-demo" :collapse="isCollapse">
    <el-submenu
      v-for="(menu, index) in menus"
      :key="menu.id"
      :index="String(index)"
    >
      <template slot="title">
        <!--base64 可以请求到 但是图片都是白色 要修改整体样式 为其他颜色 还有字体颜色-->
        <!-- <el-image :src="`data:image/png;base64,${menu.ImgName}`"></el-image> -->
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.MenuText }}</span>
      </template>
      <div v-if="menu.childMenus && menu.childMenus.length > 0">
        <div v-for="(child, index) in menu.childMenus" :key="child.id">
          <el-menu-item :index="`${index}-1`">{{
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
    };
  },
  created() {
    this.getAllMenus();
  },
  methods: {
    getAllMenus() {
      const emptyGuid = "00000000-0000-0000-0000-000000000000";
      const sysKey = 5;
      const isAll = true;
      const param = { reloIdKeyS: [emptyGuid], sysKey: sysKey, isAll: isAll };
      const classList = [
        "el-icon-position",
        "el-icon-location-outline",
        "el-icon-truck",
        "el-icon-postcard"
      ];
      menu(param).then((res) => {
        console.log(res);
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
            const randomIndex = Math.floor(Math.random() * classList.length);
            this.menus[i].icon = classList[randomIndex];
            for (let j = 0, lens2 = child.length; j < lens2; j++) {
              if (child[j].ParentMenuId === this.menus[i].MenuId) {
                if (!this.menus[i].childMenus) {
                  this.menus[i].childMenus = [];
                }
                this.menus[i].childMenus.push(child[j]);
              }
            }
          }
          console.log(this.menus);
        } else {
          MessageBox.alert("未能正确加载菜单信息！");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
