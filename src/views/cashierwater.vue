<template>
    <div class="order elementReset">
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
                    <el-form-item prop="money">
                        <el-input v-model="form.money" placeholder="请输入交易金额" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item prop="value2">
                        <el-date-picker v-model="form.value2" type="daterange" align="right" unlink-panels
                            range-separator="至" start-placeholder="下单起始时间" end-placeholder="下单截至时间"
                            :picker-options="pickerOptions" size="medium" value-format="yyyy-MM-dd" @change="onPick">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="orderstatus">
                        <el-select v-model="form.fk_type" placeholder="支付方式" size="medium" @change="fktypeChange">
                            <el-option value="-1" label="所有支付方式"></el-option>
                            <el-option value="1" label="支付宝"></el-option>
                            <el-option value="0" label="微信"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="orderstatus">
                        <el-select v-model="form.type" placeholder="交易状态" size="medium" @change="typeChange">
                            <el-option value="-1" label="所有交易状态"></el-option>
                            <el-option value="1" label="待使用"></el-option>
                            <el-option value="2" label="待评价"></el-option>
                            <el-option value="5" label="已完成"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="foodrecordTitBot">
                <el-button type="success" size="small" icon="el-icon-search" @click="foodsearch">查询</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="resetForm('form')">清空
                </el-button>
            </div>

        </div>
        <div class="foodBotBox">
            <div class="foodrecordTable">
                <div class="moreHandle">
                    <p class="title"><i class="el-icon-tickets"></i>收银流水列表</p>
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
                            <span>{{ scope.row.number }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="门店" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.bid }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="支付方式" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.fk_type }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="金额" align="center" prop="money" sortable>
                        <template slot-scope="scope">
                            <span>{{ scope.row.money }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="时间" align="center" prop="addtime" sortable>
                        <template slot-scope="scope">
                            <span>{{ scope.row.addtime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="交易状态" align="center">
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
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'
    export default {
        data() {
            return {
                loading: true,
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
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
                form: {
                    starttime: '',
                    endtime: '',
                    number: '',
                    type: '-1',
                    fk_type: '-1',
                    money: '',
                    value2: ['', '']
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
                this.$axios.post('/store/Order/getSylsList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    starttime: this.form.starttime,
                    endtime: this.form.endtime,
                    number: this.form.number,
                    type: this.form.type,
                    fk_type: this.form.fk_type,
                    money: this.form.money,
                    limit: this.limit,
                    page: this.page
                }, response => {
                    
                    this.total = response.data.count
                    this.tableData = response.data.data
                    this.loading = false;
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.dataInit()
            },
            handleEdit(index, row) {
                
                this.$router.push({ name: 'editfoodrecord', params: { foodId: index } })
            },
            handleDelete(index, row) {
                
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
            },
            fktypeChange() {
                this.dataInit()
            },
            typeChange() {
                this.dataInit()
            },
            onPick(date) {
                
                if (date == null) {
                    this.form.starttime = ''
                    this.form.endtime = ''
                    return
                }
                this.form.starttime = date[0]
                this.form.endtime = date[1]
            }
        },
    }
</script>

<style>
    .order {
        width: 100%;
        height: 100%;
    }

    .order .el-form {
        display: flex;
        align-items: center;
        display: -ms-flexbox;
        -ms-flex-align: center;
    }
</style>