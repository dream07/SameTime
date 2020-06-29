<template>
  <div style="position: relative;">
    <div :id="id" :style="{width: width, height: height}"></div>
    <div class="block timePick">
      <el-date-picker v-model="value2" type="daterange" align="right" size="small" unlink-panels range-separator="至"
        start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" @change="onPick">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import westeros from './theme/westeros'

  export default {
    name: 'lineEcharts',
    props: {
      id: {
        type: String,
        default: 'myChart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      }
    },
    data() {
      let self = this;
      return {
        xAxisData: [],
        series: [],
        chart: null,
        value2: [],
        zuijin: '',
        starttime: '',
        endtime: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              // console.log(self);
              this.zuijin = 1;
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
              picker.$emit('pick', [start, end]);
              self.starttime = self.value2[0];
              self.endtime = self.value2[1];
              // console.log(self.value2);
              self.chartChange();
            }
          }, {
            text: '最近十五天',
            onClick(picker) {
              this.zuijin = 2;
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
              picker.$emit('pick', [start, end]);
              self.starttime = self.value2[0];
              self.endtime = self.value2[1];
              self.chartChange();
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              self.zuijin = 3;
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 29);
              picker.$emit('pick', [start, end]);
              self.starttime = self.value2[0];
              self.endtime = self.value2[1];
              self.chartChange();
            }
          }]
        },
      }
    },
    mounted() {
      // console.log(this.$Cookies.get('token'));
      this.initChart()
      // this.chartChange()

    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id), 'westeros')
        this.chart.setOption({
          title: {
            text: '数据分析',
          },

          tooltip: {
            trigger: 'axis'
          },
          legend: {
            x: 'center',
            data: ['订单数', '营业额', '退款数', '退款额']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {

          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: []
        })
      },
      chartChange(command) {
        var token = this.$Cookies.get('token');
        var bussiness = JSON.parse(this.$Cookies.get('bussiness'));
        // console.log(token);
        // console.log(bussiness);
        // console.log(typeof(bussiness));
        if (command) {
          // console.log('有');
          bussiness = command
          // console.log(bussiness);
        }
        this.$axios.post('/store/index/getSelectData', {
          token: token,
          bid: bussiness.bid,
          starttime: this.starttime,
          endtime: this.endtime,
          zuijin: ''
        }, response => {
          // console.log(response);
          this.xAxisData = response.data.data
          this.series = response.data.sjfx
          this.chart.setOption({
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: this.xAxisData
            },
            series: this.series
          })
        })
      },
      onPick(date) {
        this.starttime = date[0];
        this.endtime = date[1];
        this.chartChange()
      }

    }
  }
</script>

<style lang="scss">
  .timePick {
    position: absolute;
    top: 15px;
    right: 67px;
    /* z-index: 99999; */
  }

  %shadow {
    background: #fff;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);

    .title {
      font-size: 14px;
      padding: 10px;

      i {
        margin-right: 5px;
      }
    }
  }

  #lineEcharts {
    padding-top: 15px;
    margin-top: 20px;
    box-sizing: content-box;
    @extend %shadow;
  }

  .el-range-separator {
    padding: 0 !important;
  }
</style>