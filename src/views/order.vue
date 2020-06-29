<template>
    <div class="order elementReset">
        <el-dialog title="状态日志" :visible.sync="orderRiZhi" width="30%">
            <div class="statusRiZhiItem" v-for="(item,index) in orderLog" :key="index">
                <span class="statusTime">{{item.addtime}}</span>
                <span class="statusContent">{{item.text}}</span>
            </div>
            
        </el-dialog>
        <div class="foodTopBox">
            <!-- <div class="foodrecordTit">
                <div class="foodrecordTitLf"><i class="el-icon-search"></i></div>
                <div class="foodrecordTitRh">查询条件</div>
            </div> -->
            <div class="foodrecordSerach">
                <el-form ref="form" :model="form">
                    <el-form-item prop="number">
                        <el-input v-model="form.number" placeholder="请输入订单号" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item prop="tel">
                        <el-input v-model="form.tel" placeholder="请输入手机号" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item prop="value2">
                        <el-date-picker v-model="form.value2" type="daterange" align="right" unlink-panels
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                            :picker-options="pickerOptions" size="medium" value-format="yyyy-MM-dd" @change="onPick">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="peoples">
                        <el-select v-model="form.peoples" placeholder="人数" size="medium" @change="peopleChange">
                            <el-option value="-1" label="全部人数"></el-option>
                            <el-option value="1" label="1"></el-option>
                            <el-option value="2" label="2"></el-option>
                            <el-option value="3" label="3"></el-option>
                            <el-option value="4" label="4"></el-option>
                            <el-option value="5" label="5"></el-option>
                            <el-option value="6" label="6"></el-option>
                            <el-option value="7" label="7"></el-option>
                            <el-option value="8" label="8"></el-option>
                            <el-option value="9" label="9"></el-option>
                            <el-option value="10" label="10"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="orderstatus">
                        <el-select v-model="form.orderstatus" placeholder="订单状态" size="medium" @change="statusChange">
                            <el-option value="-1" label="全部状态"></el-option>
                            <el-option value="0" label="待使用"></el-option>
                            <el-option value="1" label="进行中"></el-option>
                            <el-option value="2" label="已结束"></el-option>
                            
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="foodrecordTitBot">
                <el-button type="success" size="small" icon="el-icon-search" @click="foodsearch">查询</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="resetForm('form')">清空
                </el-button>
                <!-- <el-button type="primary" size="small" icon="el-icon-folder-add" @click="addFood()">新增</el-button> -->
            </div>
        </div>
        <div class="foodBotBox">
            <div class="foodrecordTable">
                <div class="moreHandle">
                    <p class="title"><i class="el-icon-tickets"></i>餐饮订单列表</p>
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
                            <el-button size="mini" @click="orderDetail(scope.row.oid,scope.row.leixing)">查看订单</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态日志" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="rizhi(scope.row.oid,scope.row.leixing)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="1" :page-sizes="[5, 10, 15, 20, 25, 30]" :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper" :total="total" style="margin: 10px 0 10px 10px;">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'
    export default {
        data() {
            return {
                loading: true,
                orderRiZhi: false,
                page: 1,
                limit: 10,
                total: 0,
                filterData: [{ text: '八珍', value: '八珍' }, { text: '七珍', value: '七珍' }],
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
                value1: '',
                orderLog:[],
                form: {
                    tel: '',
                    number: '',
                    price: '',
                    starttime: '',
                    endtime: '',
                    peoples: '-1',
                    orderstatus: '-1'
                },
                tableData: []
            }
        },
        created() {
            this.token = this.$Cookies.get('token');
            this.bussiness = JSON.parse(this.$Cookies.get('bussiness'));
            this.dataInit()
        },

        methods: {
            dataInit(command) {
                this.loading = true;
                if (command) {
                    
                    this.bussiness = command
                    
                }
                this.$axios.post('/store/Order/getOrderList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    number: this.form.number,
                    tel: this.form.tel,
                    starttime: this.form.starttime,
                    endtime: this.form.endtime,
                    people: this.form.peoples,
                    type: this.form.orderstatus,
                    page: this.page,
                    limit: this.limit
                }, response => {
                    
                    this.total = response.data.count
                    this.tableData = response.data.data
                    this.loading = false;
                })
            },
            peopleChange() {
                this.dataInit()
            },
            statusChange() {
                this.dataInit()
            },
            orderDetail(oid,leixing) {
                this.$router.push({ path: 'orderDetail', query: { globId: oid,leixing:leixing } })
            },
            rizhi(oid,leixing) {
                this.orderRiZhi = true;
                this.$axios.post('/store/Order/getOrderLog', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    leixing: leixing,
                    oid: oid
                }, response => {
                    
                    this.orderLog = response.data.data
                    
                })
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this._data.editshopoffer = false
                        this.dataInit()
                        done();
                    })
                    .catch(_ => { });
            },
            resetForm(formName) {
                
                this.form.starttime = '';
                this.form.endtime = '';
                this.$refs[formName].resetFields();
                this.dataInit()
            },
            handleEdit(index, row) {
                
                this.$router.push({ name: 'editfoodrecord', params: { foodId: index } })
            },
            handleDelete(index, row) {
                
            },
            handleSizeChange(val) {
                this.limit = val;
                this.dataInit();
                
            },
            handleCurrentChange(val) {
                this.page = val;
                this.dataInit();
                
            },
            onSubmit() {
                
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
            resetDateFilter() {
                this.$refs.filterTable.clearFilter('date');
            },
            onPick(date) {
                this.form.starttime = date[0];
                this.form.endtime = date[1];
            },
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.className === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            handleSizeChange(val) {
                this.limit = val;
                this.dataInit();
                
            },
            handleCurrentChange(val) {
                this.page = val;
                this.dataInit();
                
            },
            addFood() {
                
                this.$router.push({ name: 'addfoodrecord', params: { bid: 'xx' } })
            },
            foodsearch() {
                this.dataInit()
            }
        },
    }
</script>

<style>
    .statusRiZhiItem {
        margin-bottom: 20px;
    }

    .statusContent {
        margin-left: 100px;
    }

    .order {
        width: 100%;
        height: 100%;
    }

    .order .el-dialog__body {
        padding-left: 20px;
    }

    .order .el-form {
        display: flex;
        align-items: center;
        display: -ms-flexbox;
        -ms-flex-align: center;
    }
</style>