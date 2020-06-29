<template>
    <div class="body">
        <!-- <h1 class="ztshuju">整体数据</h1> -->
        <el-dialog title="状态日志" :visible.sync="orderRiZhi" width="30%">
            <div v-loading="rizhiLoading">
                <div class="statusRiZhiItem" v-for="(item,index) in orderLog" :key="index" v-if='orderLog.length!==0'>
                    <span class="statusTime">{{item.addtime}}</span>
                    <span class="statusContent">{{item.text}}</span>
                </div>
                <div v-if='orderLog.length==0' style="margin: -7px 0 10px 13px;">暂无日志</div>
            </div>
        </el-dialog>
        <el-row :gutter="20">
            <el-col :span="6">
                <router-link to="order">
                    <div class="grid-content bg-purple">
                        <div class="gridTop">
                            <div class="gridTopLf"><i class="el-icon-s-order"></i><span
                                    class="gridTopLfTit">今日成交订单数(笔)</span></div><i class="el-icon-arrow-right"></i>
                        </div>
                        <div class="gridBot">
                            <div class="gridRightTop">
                                {{order_countTween}}
                            </div>
                            <div class="gridRightBot">
                            </div>
                        </div>
                    </div>
                </router-link>
            </el-col>
            <el-col :span="6">
                <router-link to="businessstatistics">
                    <div class="grid-content bg-purple">
                        <div class="gridTop">
                            <div class="gridTopLf"><i class="el-icon-coin"></i><span
                                    class="gridTopLfTit">今日营业额(元)</span>
                            </div><i class="el-icon-arrow-right"></i>
                        </div>
                        <div class="gridBot">
                            <div class="gridRightTop">
                                {{order_moneyTween}}
                            </div>
                            <div class="gridRightBot">
                            </div>
                        </div>
                    </div>
                </router-link>
            </el-col>
            <el-col :span="6">
                <router-link to="refoundorder">
                    <div class="grid-content bg-purple">
                        <div class="gridTop">
                            <div class="gridTopLf"><i class="el-icon-s-release"></i><span
                                    class="gridTopLfTit">今日退款(笔)</span>
                            </div><i class="el-icon-arrow-right"></i>
                        </div>
                        <div class="gridBot">
                            <div class="gridRightTop">
                                {{refund_countTween}}
                            </div>
                            <div class="gridRightBot">
                            </div>
                        </div>
                    </div>
                </router-link>
            </el-col>
            <el-col :span="6">
                <router-link to="businessstatistics">
                    <div class="grid-content bg-purple">
                        <div class="gridTop">
                            <div class="gridTopLf"><i class="el-icon-s-finance"></i><span
                                    class="gridTopLfTit">今日退款额(元)</span>
                            </div><i class="el-icon-arrow-right"></i>
                        </div>
                        <div class="gridBot">
                            <div class="gridRightTop">
                                {{refund_moneyTween}}
                            </div>
                            <div class="gridRightBot">
                            </div>
                        </div>
                    </div>
                </router-link>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24" class="tubiaoBox">
                <line-echarts id="lineEcharts" height="300px" ref="echarts"></line-echarts>


            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="foodBotBox">
                    <div class="foodrecordTable">
                        <div class="moreHandle">
                            <p class="title"><i class="el-icon-tickets"></i>最近十条订单</p>
                            <!-- <el-button type="primary" size="mini" icon="el-icon-folder-add">新增菜品</el-button> -->
                            <!-- <el-button plain size="mini">批量修改</el-button> -->
                            <!-- <el-tooltip class="item" effect="dark" content="导出" placement="top-start">
                                <el-button type="primary" plain size="mini" icon="el-icon-upload"></el-button>
                            </el-tooltip> -->
                            <div class="moreHandleRight" style="margin-right:50px">
                                <!-- <el-popover
                                placement="bottom"
                                title="标题"
                                width="200"
                                trigger="click"
                                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
                                style="width:30px;height: 30px;">
                                <el-button slot="reference" size="small"
                                    style="padding:5px;height: 30px;border-radius: 0;vertical-align: top;">
                                    <i class="iconfont icon-filter" style="display: inline-block;width: 18px;height: 18px;font-size: 17px;"></i>
                                </el-button>
                              </el-popover> -->
                                <el-tooltip class="item" effect="dark" content="导出" placement="top">
                                    <el-button icon="el-icon-upload" size="small"
                                        style="padding: 5px;height: 30px;font-size: 18px;border-radius: 0;margin-left:10px"
                                        @click="exportToExcel">
                                    </el-button>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="打印" placement="top">
                                    <el-button icon="el-icon-printer" size="small"
                                        style="padding: 5px;height: 30px;font-size: 18px;border-radius: 0;"
                                        @click="printContent">
                                    </el-button>
                                </el-tooltip>
                            </div>
                        </div>
                        <el-table :data="tableData" style="width: 100%" id="foodtable"
                            :header-cell-style="{background:'#f5f8f9',color:'#5f6e82'}" v-loading="loading">
                            <el-table-column label="订单号" align="center">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.number}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="订单时间" align="center" sortable>
                                <template slot-scope="scope">
                                    <span>{{ scope.row.addtime}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="订单发起人" align="center">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.tel}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="订单人数" align="center" sortable>
                                <template slot-scope="scope">
                                    <span>{{ scope.row.people}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="订单状态" align="center">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.type=='0'?'待使用':(scope.row.type=='1'?'进行中':'已结束')}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="预约时间" align="center" sortable>
                                <template slot-scope="scope">
                                    <span>{{ scope.row.time}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="orderDetail(scope.row.oid,scope.row.leixing)">查看订单
                                    </el-button>
                                </template>
                            </el-table-column>
                            <el-table-column label="状态日志" align="center">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="rizhi(scope.row.oid,scope.row.leixing)">查看
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import LineEcharts from '../components/ECharts/lineEcharts'
    import maintable from '../views/table/maintable'
    import TWEEN from '@tweenjs/tween.js'
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'
    export default {
        data() {
            return {
                orderRiZhi: false,
                loading: true,
                rizhiLoading: true,
                orderLog: [],
                order_count: 0,
                order_money: 0,
                refund_count: 0,
                refund_money: 0,
                order_countTween: 0,
                order_moneyTween: 0,
                refund_countTween: 0,
                refund_moneyTween: 0,
                tableData: []
            }
        },
        components: { maintable, LineEcharts },
        watch: {
            order_count(newValue, oldValue) {
                new TWEEN.Tween({
                    number: oldValue
                })
                    .to({
                        number: newValue
                    }, 5000)
                    .onUpdate(tween => {
                        this.order_countTween = tween.number.toFixed(0)
                    })
                    .start()
                function animate() {
                    if (TWEEN.update()) {
                        requestAnimationFrame(animate);
                    }
                }
                animate()
            },
            order_money(newValue, oldValue) {
                new TWEEN.Tween({
                    number: oldValue
                })
                    .to({
                        number: newValue
                    }, 5000)
                    .onUpdate(tween => {
                        this.order_moneyTween = tween.number.toFixed(2)
                    })
                    .start()
                function animate() {
                    if (TWEEN.update()) {
                        requestAnimationFrame(animate);
                    }
                }
                animate()
            },
            refund_count(newValue, oldValue) {
                new TWEEN.Tween({
                    number: oldValue
                })
                    .to({
                        number: newValue
                    }, 5000)
                    .onUpdate(tween => {
                        this.refund_countTween = tween.number.toFixed(0)
                    })
                    .start()
                function animate() {
                    if (TWEEN.update()) {
                        requestAnimationFrame(animate);
                    }
                }
                animate()
            },
            refund_money(newValue, oldValue) {
                new TWEEN.Tween({
                    number: oldValue
                })
                    .to({
                        number: newValue
                    }, 5000)
                    .onUpdate(tween => {
                        this.refund_moneyTween = tween.number.toFixed(2)
                    })
                    .start()
                function animate() {
                    if (TWEEN.update()) {
                        requestAnimationFrame(animate);
                    }
                }
                animate()
            }
        },
        created() {
            this.token = this.$Cookies.get('token');
            this.bussiness = JSON.parse(this.$Cookies.get('bussiness'));
            this.dataInit();
            this.selfAdaption();
        },
        methods: {
            dataInit(command) {
                this.loading = true
                if (command) {
                    this.bussiness = command
                }
                this.$nextTick(function () {
                    this.$refs.echarts.chartChange(command)
                })
                this.$axios.post('/store/Index/getIndexData', {
                    token: this.token,
                    bid: this.bussiness.bid
                }, response => {
                    
                    this.order_count = response.data.zzsj.order_count
                    this.order_money = response.data.zzsj.order_money
                    this.refund_count = response.data.zzsj.refund_count
                    this.refund_money = response.data.zzsj.refund_money
                    this.tableData = response.data.list
                    this.loading = false
                    // this.num = 1000;
                })
            },
            handleSizeChange() {

            },
            handleCurrentChange() {

            },
            printContent() {
                //判断iframe是否存在，不存在则创建iframe
                var el = document.getElementById("foodtable");
                var iframe = document.getElementById("print-iframe");
                if (!iframe) {
                    iframe = document.createElement('IFRAME');
                    var doc = null;
                    iframe.setAttribute("id", "print-iframe");
                    iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
                    document.body.appendChild(iframe);
                    
                    //这里可以自定义样式
                    //doc.write("<LINK rel="stylesheet" type="text/css" href="css/print.css">");
                }
                doc = iframe.contentWindow.document;
                doc.write("<style>.cell {text-align: center;line-height: 40px;}</style>");
                doc.write('<div>' + el.innerHTML + '</div>');
                doc.close();
                iframe.contentWindow.focus();
                iframe.contentWindow.print();
                if (navigator.userAgent.indexOf("MSIE") > 0) {
                    document.body.removeChild(iframe);
                }
            },
            exportToExcel() {
                
                let et = XLSX.utils.table_to_book(document.getElementById('foodtable')); //此处传入table的DOM节点
                let etout = XLSX.write(et, {
                    bookType: 'xlsx',
                    bookSST: true,
                    type: 'array'
                });
                try {
                    FileSaver.saveAs(new Blob([etout], {
                        type: 'application/octet-stream'
                    }), 'trade-publish.xlsx');   //trade-publish.xlsx 为导出的文件名
                } catch (e) {
                    
                }
                return etout;
            },
            // echart自适应
            selfAdaption() {
                let that = this
                setTimeout(() => {
                    window.onresize = function () {
                        if (that.$refs.echarts) {
                            that.$refs.echarts.chart.resize()
                        }
                    }
                }, 10)
            },
            orderDetail(oid, leixing) {
                this.$router.push({ path: 'orderDetail', query: { globId: oid, leixing: leixing } })
            },
            rizhi(oid, leixing) {
                this.rizhiLoading = true;
                this.orderRiZhi = true;
                this.$axios.post('/store/Order/getOrderLog', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    leixing: leixing,
                    oid: oid
                }, response => {
                    
                    this.rizhiLoading = false;
                    this.orderLog = response.data.data



                })
            },
        },

    }
</script>


<style lang="scss" scoped>
    /* .body {
        padding: 20px;
    }  */
    .el-row {
        margin-bottom: 20px;
        margin-top: 10px;

        &:last-child {
            margin-bottom: 0;
        }

        .gridTopLf i {
            font-size: 25px;
            color: #fff;
        }
    }

    .el-col:nth-child(1) .grid-content {
        background-color: #20A8D8;
    }

    .el-col:nth-child(2) .grid-content {
        background-color: #63C1DC;
    }

    .el-col:nth-child(3) .grid-content {
        background-color: #FEC107;
    }

    .el-col:nth-child(4) .grid-content {
        background-color: #F86C6B;
    }

    .el-col {
        border-radius: 4px;

    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        padding: 15px;
        border-radius: 4px;
        min-height: 126px;
        box-shadow: 10px 0px 10px rgba(0, 0, 0, 0.2);
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .gridTop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        display: -ms-flexbox;
        -ms-flex-pack: justify;
        -ms-flex-align: center;
    }

    .gridTopLf {
        display: flex;
        display: -ms-flexbox;
        align-items: center;
        -ms-flex-align: center;
    }

    .ztshuju {
        font-size: 36px;
        font-weight: 400;
        margin-top: 15px;
    }

    .gridTopLfTit {
        margin-left: 10px;
        color: #fff;
    }

    .gridRightTop {
        font-size: 28px;
        font-weight: 600;
        text-align: center;
        margin-top: 15px;
        color: #666;
    }

    .el-icon-arrow-right {
        vertical-align: middle;
        color: #fff;
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

    .dataFen {
        font-size: 36px;
        font-weight: 400;
    }

    #maintable {
        @extend %shadow;
    }

    .title {
        color: #5e6d82;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .tubiaoBox {
        position: relative;
    }



    #lineEcharts div:nth-child(1) {
        width: 100% !important;
    }

    canvas {
        width: 100% !important;
    }
</style>