<template>
  <div class="home-box">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >操作按钮</el-button
            >
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{ `点击列表要干啥？${o}` }}
          </div>
        </el-card></el-col
      >
      <el-col :span="12">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >操作按钮</el-button
            >
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{ `点击列表要干啥？${o}` }}
          </div>
        </el-card></el-col
      >
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >操作按钮</el-button
            >
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{ `点击列表要干啥？${o}` }}
          </div>
        </el-card></el-col
      >
    </el-row>
    <el-row style="margin-top: 10px" :gutter="10">
      <el-col :span="12">
        <div id="main" style="height: 400px; background: #ffffff"></div
      ></el-col>
      <el-col :span="12">
        <div id="main2" style="height: 400px; background: #ffffff"></div
      ></el-col>
    </el-row>
    <el-row style="margin-top: 10px" :gutter="10"
      ><el-col :span="24">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table> </el-col
    ></el-row>
  </div>
</template>

<style scoped>
.home-box {
  width: 100%;
}

.home-box ::v-deep .el-row {
  width: 100%;
}
</style>

<script>
export default {
  data() {
    return {
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    };
  },
  mounted() {
    this.drawChart();
    this.drawChart2();
  },
  methods: {
    drawChart() {
      let myChart = this.$echarts.init(document.getElementById("main"));
      let option = {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },

    drawChart2() {
      var chartDom = document.getElementById("main2");
      var myChart = this.$echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "Referer of a Website",
          subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
};
</script>
