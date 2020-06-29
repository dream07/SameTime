<template>
    <div class="foodrecord elementReset">
        <el-dialog title="选择银行卡" :visible.sync="checkBank" width="30%" :before-close="handleClose">
            <div v-for="(item,index) in bankData" :key="index" v-loading="bankloading">
                <el-radio v-model="radio1" :label="item.bankid" style="margin-bottom:20px">
                    {{item.bankname+item.bankcode}}
                </el-radio>
                
            </div>
            <div v-if='bankData.length==0' style="margin-left: 10px;color: #F56C6C;">还未绑定银行卡，请先去绑定银行卡</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="bankSure">确 定</el-button>
            </span>
        </el-dialog>
        <div class="foodTopBox">
            <!-- <div class="foodrecordTit">
                <div class="foodrecordTitLf"><i class="el-icon-search"></i></div>
                <div class="foodrecordTitRh">查询条件</div>
            </div> -->
            <div class="foodrecordSerach">
                <el-form ref="ruleForm" :model="ruleForm">
                    <el-form-item prop="value2">
                        <el-date-picker v-model="ruleForm.value2" type="daterange" align="right" unlink-panels
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                            :picker-options="pickerOptions" value-format="yyyy-MM-dd" @change="onPick">
                        </el-date-picker>
                    </el-form-item>
                </el-form>

            </div>
            <div class="foodrecordTitBot">
                <el-button type="success" size="small" icon="el-icon-search" @click="foodsearch">查询</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="resetForm('ruleForm')">清空
                </el-button>
            </div>

        </div>
        <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <div class="chartTop"><i class="el-icon-s-data"></i>营业概括</div>
                    <div id="chart1" class="chart" v-loading="loading"></div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <div class="chartTop"><i class="el-icon-s-data"></i>销售减免</div>
                    <div id="chart2" class="chart" v-loading="loading"></div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <div class="chartTop"><i class="el-icon-s-data"></i>付款概况</div>
                    <div id="chart3" class="chart" v-loading="loading"></div>
                </div>
            </el-col>

        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark tixianBox">
                    <span style="font-size: 14px;color: #606266;">可提现金额:￥{{ketixian}}</span>
                    <el-form ref="form" :model="form" :rules="rules" label-width="250px" class="demo-ruleForm"
                        @submit.native.prevent>
                        <el-form-item label="请输入提现金额（最低100元）:￥" prop="tixianVal">
                            <el-input :placeholder="'费率'+fuwufei+'%'" v-model="form.tixianVal" clearable @input="tiXianChang">
                            </el-input>
                        </el-form-item>
                        <!-- <el-button type="primary" @click="submitForm('form')" style="margin: 0 40px 0 20px;">提现
                        </el-button> -->
                        <el-radio-group v-model="tixianType" style="margin: 0 40px 0 20px;">
                            <el-radio-button label="提现到支付宝" @click.native.prevent="zhifuForm('提现到支付宝')"
                                style="border:none" class="radiobutton"></el-radio-button>
                            <el-radio-button label="提现到银行卡" @click.native.prevent="bankForm('提现到银行卡')"
                                style="border:none" class="radiobutton"></el-radio-button>
                        </el-radio-group>
                        <span style="font-size: 14px;color: red;">实际到账: <span>{{shiji}}元</span></span>
                    </el-form>
                </div>
            </el-col>
        </el-row>
        <div class="foodBotBox">
            <div class="foodrecordTable">
                <div class="moreHandle">
                    <p class="title"><i class="el-icon-tickets"></i>已发起提现</p>
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
                    <el-table-column label="时间" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.addtime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="提现金额" align="center" sortable>
                        <template slot-scope="scope">
                            <span>{{ scope.row.money }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="实际到账" align="center" sortable>
                        <template slot-scope="scope">
                            <span>{{ scope.row.shiji }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="提现方式" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    
                    <el-table-column label="提现到账账户" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.zfb_zhanghao }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="处理时间" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.cltime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.type }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
                    :page-sizes="[5, 10, 15, 20, 25, 30]" :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper" :total="total" style="margin: 10px 0 10px 10px;">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import echarts from 'echarts'
    import westeros from '../components/ECharts/theme/westeros'
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (Number(this.ketixian) < Number(value)) {
                    callback(new Error('提现金额不能大于可提现金额'));
                } else {
                    callback()
                }
            };
            return {
                bankloading: true,
                checkBank: false,
                radio1: '',
                tixianType: '提现到支付宝',
                loading: true,
                page: 1,
                limit: 10,
                total: 0,
                shiji: 0,
                bankData: [],
                tixianVal: '',
                ruleForm: {
                    starttime: '',
                    endtime: '',
                    value2: []
                },
                form: {
                    tixianVal: ''
                },
                ketixian: '',
                line1: {
                    series: [
                        {
                            data: [
                                { value: 335, name: '销售额' },
                                { value: 310, name: '退款额' },
                                { value: 234, name: '服务费' },
                            ]
                        }]
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                fuwufei:'',
                value1: '',
                value2: '',
                tableData: [],

                rules: {
                    tixianVal: [
                        { required: true, message: '请输入提现金额', trigger: 'change' },
                        { pattern: /^[0-9]+([.][0-9]{2}){0,1}$/, message: '只能输入数字,可保留小数点后两位', trigger: 'change' },
                        { validator: validatePass, trigger: 'change' }
                    ],




                },
            }
        },
        mounted() {
            // this.$chart.line1('chart1');
            // this.$chart.line2('chart2');
            // this.$chart.line3('chart3');
            // var line1 = this.line1
            // this.chart1.setOption(line1)
            this.token = this.$Cookies.get('token');
            this.bussiness = JSON.parse(this.$Cookies.get('bussiness'));
            this.chart1 = echarts.init(document.getElementById('chart1'), 'westeros')
            this.chart2 = echarts.init(document.getElementById('chart2'), 'westeros')
            this.chart3 = echarts.init(document.getElementById('chart3'), 'westeros')
            this.chart1.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    // orient: 'vertical',
                    left: 'center',
                    data: ['销售额', '退款额', '服务费'],
                    top: '20px'
                },
                series: [
                    {
                        name: '营业概括',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '55%'],
                        data: [],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }

                ]/*  */
            })
            this.chart2.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    // orient: 'vertical',
                    left: 'center',
                    data: ['优惠券'],
                    top: '20px'
                },
                series: [
                    {
                        name: '销售减免',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '55%'],
                        data: [

                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            })
            this.chart3.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    // orient: 'vertical',
                    left: 'center',
                    data: ['支付宝', '微信'],
                    top: '20px'
                },
                series: [
                    {
                        name: '付款概况',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '55%'],
                        data: [

                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]/*  */
            })

            this.dataInit()
        },
        methods: {
            dataInit(command) {
                this.loading = true;
                if (command) {
                    
                    this.bussiness = command
                    
                }
                this.$axios.post('/store/Order/getYytjList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    starttime: this.ruleForm.starttime,
                    endtime: this.ruleForm.endtime,

                }, response => {
                    this.fuwufei = response.data.businsee.fuwufei,
                    this.ketixian = response.data.businsee.zong;
                    // this.tableData = response.data.da
                    this.chart1.setOption({
                        series: [
                            {
                                data: [
                                    { value: response.data.data.xiaoshoue, name: '销售额' },
                                    { value: response.data.data.tuikuan, name: '退款额' },
                                    { value: response.data.data.fuwufei, name: '服务费' },
                                ]
                            }]
                    })
                    this.chart2.setOption({
                        series: [
                            {
                                data: [
                                    { value: response.data.data.jianmian, name: '优惠券' }
                                ]
                            }]
                    })
                    this.chart3.setOption({
                        series: [
                            {
                                data: [
                                    { value: response.data.data.mayun, name: '支付宝' },
                                    { value: response.data.data.mahuateng, name: '微信' },
                                ]
                            }]
                    })
                    // this.loading = false
                })
                this.$axios.post('/store/Order/getTixianList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    enable: '-1',
                    starttime: this.ruleForm.starttime,
                    endtime: this.ruleForm.endtime,
                    page: this.page,
                    limit: this.limit
                }, response => {
                    this.total = response.data.count
                    this.tableData = response.data.data
                    this.loading = false;
                })


            },
            foodsearch() {
                this.dataInit()
            },
            bankSure() {
                if(this.bankData.length==0) {
                    this.$router.push({path:'/bank',query:{globId:'1'}})
                    return
                }
                
                this.$axios.post('/store/Order/getDrawBank', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    bankid: this.radio1,
                    money: this.form.tixianVal
                }, response => {
                    if (response.data.code == 0) {
                        this.$notify({
                            title: '成功',
                            message: '提现成功',
                            type: 'success'
                        });
                        this.checkBank = false
                        this.dataInit()
                    } else {
                        this.$message.error(response.data.msg)
                    }
                })
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this._data.checkBank = false;
                        done();
                    })
                    .catch(_ => { });
            },
            resetForm(formName) {
                
                this.$refs[formName].resetFields();
                this.ruleForm.starttime = '';
                this.ruleForm.endtime = '';
                this.dataInit()
            },
            zhifuForm(e) {
                if (e !== this.tixianType) {
                    this.tixianType = '提现到支付宝'

                } else {
                    this.$axios.post('/store/Order/getDrawApply', {
                        token: this.token,
                        bid: this.bussiness.bid,
                        money: this.form.tixianVal
                    }, response => {
                        if (response.data.code == 0) {
                            this.$notify({
                                title: '成功',
                                message: '提现成功',
                                type: 'success'
                            });
                            this.dataInit()
                        } else {
                            this.$message.error(response.data.msg)
                        }
                    })
                }
                
            },
            bankForm(e) {
                if (e !== this.tixianType) {
                    
                    this.tixianType = '提现到银行卡'
                } else {
                    this.bankloading = true
                    this.checkBank = true
                    this.$axios.post('/store/Order/getBankList', {
                        token: this.token,
                        bid: this.bussiness.bid,
                    }, response => {
                        
                        this.bankData = response.data.data.list
                        this.bankloading = false

                    })
                }
                
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/store/Order/getTixianAdd', {
                            token: this.token,
                            bid: this.bussiness.bid,
                            money: this.ruleForm.tixianVal,
                            shiji: this.shiji,

                        }, response => {
                            
                            if (response.data.code == 0) {
                                this.$notify({
                                    title: '成功',
                                    message: '发起提现成功',
                                    type: 'success'
                                });
                                this.$refs[formName].resetFields();
                                this.dataInit();
                            } else {
                                this.$message.error('还未绑定支付宝账号');
                            }
                        })
                    }
                })
            },
            handleSizeChange(val) {
                this.limit = val;
                this.loading = true;
                
                this.$axios.post('/store/Order/getTixianList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    enable: '-1',
                    starttime: this.ruleForm.starttime,
                    endtime: this.ruleForm.endtime,
                    page: this.page,
                    limit: this.limit
                }, response => {
                    this.total = response.data.count
                    this.tableData = response.data.data
                    this.loading = false;
                })
            },
            handleCurrentChange(val) {
                this.page = val;
                this.loading = true;
                
                this.$axios.post('/store/Order/getTixianList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    enable: '-1',
                    starttime: this.ruleForm.starttime,
                    endtime: this.ruleForm.endtime,
                    page: this.page,
                    limit: this.limit
                }, response => {
                    this.total = response.data.count
                    this.tableData = response.data.data
                    this.loading = false;
                })
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
            tiXianChang(val) {
                var fuwufei = Number(this.fuwufei)
                if (Number(this.ketixian) < Number(this.form.tixianVal)) {
                } else {
                    console.log(fuwufei);
                    if(fuwufei==0.00) {
                        this.shiji = (val - (val * fuwufei*0.01)).toString()
                        
                    } else {
                        var shiji = (val - (val * fuwufei*0.01)).toString()
                        this.shiji = shiji.substring(0, shiji.indexOf(".") + 3);
                    }
                    
                    console.log(shiji);
                    
                }
            },
            onPick(date) {
                if (date == null) {
                    this.ruleForm.starttime = ''
                    this.ruleForm.endtime = ''
                    return
                }
                this.ruleForm.starttime = date[0];
                this.ruleForm.endtime = date[1];
                // this.chartChange()
            },
        },
    }
</script>

<style lang="scss">
    .tixianBox {
        display: flex;
        display: -ms-flexbox;
        align-items: center;
        -ms-flex-align: center;
        padding: 20px;

    }

    .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
        box-shadow: none;
    }

    .chartTop {
        border-bottom: 1px solid #ccc;
        padding: 10px 20px;
        box-sizing: border-box;
    }

    .chart {
        width: 100%;
        height: 280px;
    }

    .el-row {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #fff;
    }

    .bg-purple {
        background: #fff;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>