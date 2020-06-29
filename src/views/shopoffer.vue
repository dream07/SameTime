<template>
    <div class="shopoffer">

        <el-dialog title="新增店铺折扣" :visible.sync="addshopoffer" width="30%" :before-close="handleClose">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm" style="display: block;">
                <el-form-item label="店铺折扣" prop="zhekou">
                    <el-input v-model="addForm.zhekou"></el-input>
                </el-form-item>
                <el-form-item label="活动时间" prop="date1">
                    <el-date-picker v-model="addForm.date1" type="daterange" align="right" unlink-panels
                        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                        :picker-options="houPickerOptions" style="width: 100%;" value-format="yyyy-MM-dd"
                        @change="addOnPickDate">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="每日时间" prop="date2">
                    <el-time-picker is-range v-model="addForm.date2" range-separator="至" start-placeholder="开始时间"
                        end-placeholder="结束时间" placeholder="选择时间范围" style="width: 100%;" value-format="HH:mm"
                        format="HH:mm" @change="addOnPickTime">
                    </el-time-picker>
                </el-form-item>
                <el-form-item label="状态" prop="type">
                    <el-switch v-model="addForm.type" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="addshopofferSure('addForm')">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="编辑店铺折扣" :visible.sync="editshopoffer" width="30%" :before-close="handleClose">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm" style="display: block;">
                <el-form-item label="店铺折扣" prop="zhekou">
                    <el-input v-model="editForm.zhekou"></el-input>
                </el-form-item>
                <el-form-item label="活动时间" prop="date1">
                    <el-date-picker v-model="editForm.date1" type="daterange" align="right" unlink-panels
                        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                        :picker-options="houPickerOptions" style="width: 100%;" value-format="yyyy-MM-dd"
                        @change="editOnPickDate">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="每日时间" prop="date2">
                    <el-time-picker is-range v-model="editForm.date2" range-separator="至" start-placeholder="开始时间"
                        end-placeholder="结束时间" placeholder="选择时间范围" style="width: 100%;" value-format="HH:mm"
                        format="HH:mm" @change="editOnPickTime">
                    </el-time-picker>
                </el-form-item>
                <el-form-item label="状态" prop="delivery">
                    <el-switch v-model="editForm.type" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <!-- <el-form-item>
                        <el-button type="primary" @click="submitForm('editForm')">立即创建</el-button>
                        <el-button @click="resetForm('editForm')">重置</el-button>
                    </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="editshopofferSure">确 定</el-button>
            </span>
        </el-dialog>
        <div class="foodTopBox">
            <div class="foodrecordSerach elementReset">
                <el-form ref="ruleForm" :model="ruleForm">
                    <el-form-item prop="num">
                        <el-input v-model="ruleForm.num" placeholder="请输入折扣" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item prop="value2">
                        <el-date-picker v-model="ruleForm.value2" type="daterange" align="right" unlink-panels
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                            :picker-options="pickerOptions" size="medium" value-format="yyyy-MM-dd" @change="onPick">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="orderstatus">
                        <el-select v-model="ruleForm.type" placeholder="状态" size="medium" @change="typeChange">
                            <el-option value="-1" label="全部"></el-option>
                            <el-option value="1" label="开启"></el-option>
                            <el-option value="0" label="关闭"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="foodrecordTitBot">
                <el-button type="success" size="small" icon="el-icon-search" @click="foodsearch">查询</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="resetForm('ruleForm')">清空
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-folder-add" @click="addshopofferTan('addForm')">新增
                </el-button>
            </div>
        </div>
        <div class="foodBotBox">
            <div class="foodrecordTable">
                <div class="moreHandle">
                    <p class="title"><i class="el-icon-tickets"></i>店铺折扣列表</p>
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
                    <el-table-column label="折扣" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.num }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="开始时间" align="center" sortable>
                        <template slot-scope="scope">
                            <span>{{ scope.row.starttime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="结束时间" align="center" sortable>
                        <template slot-scope="scope">
                            <span>{{ scope.row.endtime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="每日开始时间" align="center" sortable>
                        <template slot-scope="scope">
                            <span>{{ scope.row.hour_m_start }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="每日结束时间" align="center" sortable>
                        <template slot-scope="scope">
                            <span>{{ scope.row.hour_m_end}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="订单状态" align="center" sortable>
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.type" :active-value="1" :inactive-value="0"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.row.diid)">编辑</el-button>
                            <el-popconfirm confirmButtonText='确定' cancelButtonText='再想想' icon="el-icon-info"
                                iconColor="red" title="确定删除该促销吗吗"
                                @onConfirm="handleDelete(scope.row.diid, scope.$index)">
                                <el-button size="mini" type="danger" slot="reference" style="margin-left: 10px;">删除
                                </el-button>
                            </el-popconfirm>

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
                page: 1,
                limit: 10,
                total: 0,
                addshopoffer: false,
                editshopoffer: false,
                houPickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(end.getTime() + 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(end.getTime() + 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
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
                tableData: [],
                ruleForm: {
                    num: '',
                    starttime: '',
                    endtime: '',
                    value2: [],
                    type: '-1'
                },
                addForm: {
                    zhekou: '',
                    starttime: '',
                    endtime: '',
                    hour_m_start: '',
                    hour_m_end: '',
                    date1: [],
                    date2: ['', ''],
                    type: 1
                },
                ddid: '',
                editForm: {
                    zhekou: '',
                    starttime: '',
                    endtime: '',
                    hour_m_start: '',
                    hour_m_end: '',
                    date1: [],
                    date2: ['', ''],
                    type: 1
                },
                rules: {
                    zhekou: [
                        { required: true, message: '请输入折扣', trigger: 'blur' },
                    ],

                }
            }
        },
        created() {
            this.token = this.$Cookies.get('token');
            this.bussiness = JSON.parse(this.$Cookies.get('bussiness'));
            this.dataInit();
        },
        methods: {
            dataInit(command) {
                this.loading = true;
                if (command) {
                    
                    this.bussiness = command
                    
                }
                this.$axios.post('/store/Promotion/getDiscountList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    starttime: this.ruleForm.starttime,
                    endtime: this.ruleForm.endtime,
                    num: this.ruleForm.num,
                    type: this.ruleForm.type,
                    page: this.page,
                    limit: this.limit
                }, response => {
                    
                    this.total = response.data.count
                    this.tableData = response.data.data
                    this.loading = false;
                })
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        
                        return false;
                    }
                });
            },
            addshopofferSure(formName) {
                
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/store/Promotion/getDiscountAdd', {
                            token: this.token,
                            bid: this.bussiness.bid,
                            starttime: this.addForm.starttime,
                            endtime: this.addForm.endtime,
                            hour_m_start: this.addForm.hour_m_start,
                            hour_m_end: this.addForm.hour_m_end,
                            num: this.addForm.zhekou,
                            type: this.addForm.type,
                        }, response => {
                            
                            if (response.data.code == 0) {
                                this.$notify({
                                    title: '成功',
                                    message: '店铺折扣新增成功',
                                    type: 'success'
                                });
                            }
                            this.addshopoffer = false;
                            this.dataInit();

                        })
                    } else {
                        
                        return false;
                    }
                });

            },
            typeChange() {
                this.dataInit()
            },

            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this._data.addshopoffer = false
                        this._data.editshopoffer = false
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
            addshopofferTan(ruleForm) {
                this._data.addshopoffer = true;
                this.$refs[ruleForm].resetFields();
                // this._data.ruleForm.zhekou = '';
                // this._data.ruleForm.data1 = '';
                // this._data.ruleForm.data2 = '';
                // this._data.ruleForm.delivery = true;

            },
            handleEdit(diid) {
                this.ddid = diid;
                this.editForm.date1 = [];
                this._data.editshopoffer = true;
                this.$axios.post('/store/Promotion/getDiscountForm', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    diid: diid
                }, response => {
                    
                    this.editForm.date2 = [response.data.data.list.hour_m_start, response.data.data.list.hour_m_end]
                    this.editForm.zhekou = response.data.data.list.num
                    this.editForm.date1.push(response.data.data.list.starttime)
                    this.editForm.date1.push(response.data.data.list.endtime)
                    this.editForm.starttime = response.data.data.list.starttime
                    this.editForm.endtime = response.data.data.list.endtime
                    this.editForm.type = response.data.data.list.type
                    
                    
                })
            },
            editshopofferSure() {
                this.$axios.post('/store/Promotion/getDiscountEdit', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    diid: this.ddid,
                    starttime: this.editForm.starttime,
                    endtime: this.editForm.endtime,
                    hour_m_start: this.editForm.hour_m_start,
                    hour_m_end: this.editForm.hour_m_end,
                    num: this.editForm.zhekou,
                    type: this.editForm.type,
                }, response => {
                    
                    if (response.data.code == 0) {
                        this.$notify({
                            title: '成功',
                            message: '店铺折扣编辑成功',
                            type: 'success'
                        });
                        this.editshopoffer = false;
                        this.dataInit();
                    } else {
                        this.$message.error(response.data.msg);
                    }

                })
            },
            handleDelete(diid, index) {
                this.$axios.post('/store/Promotion/getDiscountDel', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    diid: this.ddid,

                }, response => {
                    
                    if (response.data.code == 0) {
                        this.$notify({
                            title: '成功',
                            message: '店铺折扣删除成功',
                            type: 'success'
                        });
                        this.tableData.splice(index, 1)
                    } else {
                        this.$message.error(response.data.msg);
                    }

                })
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
                // this.$message({
                //     message: '查询成功',
                //     type: 'success'
                // });
                
            },
            onPick(date) {
                
                if (date == null) {
                    this.ruleForm.starttime = ''
                    this.ruleForm.endtime = ''
                    return
                }
                this.ruleForm.starttime = date[0]
                this.ruleForm.endtime = date[1]
            },
            addOnPickDate(date) {
                if (date == null) {
                    this.addForm.starttime = ''
                    this.addForm.endtime = ''
                    return
                }
                this.addForm.starttime = date[0]
                this.addForm.endtime = date[1]
            },
            addOnPickTime(date) {
                if (date == null) {
                    this.addForm.hour_m_start = ''
                    this.addForm.hour_m_end = ''
                    return
                }
                this.addForm.hour_m_start = date[0]
                this.addForm.hour_m_end = date[1]
                
            },
            editOnPickDate(date) {
                
                if (date == null) {
                    this.editForm.starttime = ''
                    this.editForm.endtime = ''
                    return
                }
                this.editForm.starttime = date[0]
                this.editForm.endtime = date[1]
            },
            editOnPickTime(date) {
                if (date == null) {
                    this.editForm.hour_m_start = ''
                    this.editForm.hour_m_end = ''
                    return
                }
                this.editForm.hour_m_start = date[0]
                this.editForm.hour_m_end = date[1]
                
            }
        },
    }
</script>

<style>
   

    .shopoffer .el-dialog__body .el-form-item {
        margin-bottom: 25px;
    }

    .shopoffer .el-dialog__body {
        padding-right: 33px;
    }

    .el-dialog .el-form {
        display: initial !important;
    }

    .order {
        width: 100%;
        height: 100%;
    }

    .order .el-form-item {
        margin-bottom: 25px;
    }
    
    .foodrecordSerach .el-form {
        display: flex;
        display: -ms-flexbox;
    }
    .order .foodTopBox .el-form {
        display: flex;
        align-items: center;
        display: -ms-flexbox;
        -ms-flex-align: center;
    }

    .order .el-dialog__body {
        padding-right: 35px;
    }
</style>