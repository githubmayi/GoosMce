<template>
  <div class="box">
    <div class="content">
      <div>
        <el-image :src="imgSrc"></el-image>
        <p class="font">404 Not Found!</p>
        <p class="font">很抱歉！你访问的页面不存在！</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: require("../assets//images//404.svg"),
    };
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
}
.content {
  width: 800px;
  height: 800px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-image {
  width: 600px;
  height: 600px;
}

.font {
    text-align: center;
    padding-top: 16px;
    font-size: 22px;
}
</style>
