<template>
  <div class="production-box">
    <!--搜索条件-->
    <div class="search-box">
      <el-form :inline="true" :model="searchList" size="mini">
        <el-form-item label="仓库">
          <el-select
            v-model="searchList.deliveryStorage"
            placeholder="请选择仓库"
          ></el-select>
        </el-form-item>
        <el-form-item label="单据日期">
          <div class="create-time">
            <el-date-picker
              placeholder="单据日期"
              v-model="createTime"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              type="daterange"
              style="width: 100%"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="生产单号">
          <el-input
            v-model="searchList.productionNo"
            placeholder="请输入生产单号"
          ></el-input>
        </el-form-item>
        <el-form-item label="同步状态">
          <el-select
            v-model="searchList.sync"
            placeholder="请选择状态"
          ></el-select>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="onSearch" icon="el-icon-search"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!--内容承载区-->
    <div class="production-body">
      <el-row style="margin-top: 10px; width: 100%" :gutter="10"
        ><el-col :span="24">
          <el-table :data="productionList">
            <el-table-column prop="ProductionNo" label="生产单号">
            </el-table-column>
            <el-table-column prop="CreateTime" label="单据时间" width="200">
            </el-table-column>
            <el-table-column prop="CreatePerson" label="创建人">
            </el-table-column>
            <el-table-column prop="DepartmentName" label="部门">
            </el-table-column>
            <el-table-column prop="CatalogNoCp" label="成品单号">
            </el-table-column>
            <el-table-column prop="ProductionCount" label="生产数量">
            </el-table-column>
            <el-table-column prop="Unit" label="生产单位"> </el-table-column>
            <el-table-column prop="Tracking" label="批次"> </el-table-column>
            <el-table-column prop="InStockNo" label="成品入库单号" width="220">
            </el-table-column>
            <el-table-column prop="ProductionBZ" label="备注" width="280">
              <template #default="scope"
                ><el-tooltip
                  :content="scope.row.ProductionBZ"
                  raw-content
                  placement="top-start"
                  v-if="scope.row.ProductionBZ"
                >
                  //判断单元格中有值，并且值的长度小于等于13，显示单元格中的值
                  <span
                    v-if="
                      scope.row.ProductionBZ &&
                      scope.row.ProductionBZ.length <= 13
                    "
                  >
                    {{ scope.row.ProductionBZ }}
                  </span>
                  //如果单元格中有值，并且值得长度大于13，便使用substr截取0-13的内容显示，后面的变成省略号
                  <span
                    v-if="
                      scope.row.ProductionBZ &&
                      scope.row.ProductionBZ.length > 13
                    "
                  >
                    {{ scope.row.ProductionBZ.substr(0, 13) + "..." }}
                  </span>
                </el-tooltip>
                <span v-else-if="scope.row.ProductionBZ == null"> N/A </span>
              </template>
            </el-table-column>
          </el-table>
        </el-col></el-row
      >
    </div>
  </div>
</template>

<style scoped>
.production-box {
  height: 100%;
}

.search-box {
  min-width: 1380px;
}

.create-time {
  min-width: 320px;
  display: flex;
}

.el-form--inline {
  height: 30px;
}
</style>

<script>
import getProduction from "@/apis/production";
export default {
  data() {
    return {
      createTime: [],
      searchList: {
        deliveryStorage: "",
        startTime: "",
        endTime: "",
        productionNo: "",
        state: "",
        companyCode: "HHSW",
        sync: 0,
      },
      productionList: [],

      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },

  methods: {
    async getProductionList() {
      const search = this.searchList;
      const res = await getProduction(search);
      console.log(res);
      return res;
    },

    async onSearch() {
      this.productionList = [];
      const { startTime, endTime } = this.dateToString(this.createTime);
      console.log(startTime + "" + endTime);
      this.searchList.startTime = `${startTime} 00:00:00`;
      this.searchList.endTime = `${endTime} 23:59:59`;
      const productions = await this.getProductionList();
      console.log(productions);
      this.productionList.push(...productions);
      console.log(this.productionList);
    },

    dateToString(date) {
      console.log(date);
      if (date && date.length === 2) {
        return {
          startTime: date[0].toLocaleDateString(),
          endTime: date[1].toLocaleDateString(),
        };
      } else {
        return { startTime: "", endTime: "" };
      }
    },
  },

  created() {},
};
</script>
