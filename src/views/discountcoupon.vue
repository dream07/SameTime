<template>
    <div class="discountcoupon">
        <el-dialog title="新增优惠券" :visible.sync="adddiscountcouponStatus" width="30%" :before-close="handleClose">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="140px" class="demo-ruleForm">
                <el-form-item label="代金券名称/种类">
                    <el-select v-model="addForm.type" placeholder="请选择优惠券种类" style="width: 100%;">
                        <el-option value="0" label="满减券"></el-option>
                        <el-option value="1" label="折扣券"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="达到优惠券的金额" prop="money">
                    <el-input v-model="addForm.money"></el-input>
                </el-form-item>
                <el-form-item label="达到优惠金额" prop="num" v-if='addForm.type==0'>
                    <el-input v-model="addForm.num"></el-input>
                </el-form-item>
                <el-form-item label="折扣" prop="num" v-if='addForm.type==1'>
                    <el-select v-model="addForm.num" placeholder="请选择折扣" style="width: 100%;">
                        <el-option value="9.5" label="9.5折"></el-option>
                        <el-option value="9" label="9折"></el-option>
                        <el-option value="8.5" label="8.5折"></el-option>
                        <el-option value="8" label="8折"></el-option>
                        <el-option value="7.5" label="7.5折"></el-option>
                        <el-option value="7" label="7折"></el-option>
                        <el-option value="6.5" label="6.5折"></el-option>
                        <el-option value="6" label="6折"></el-option>
                        <el-option value="5.5" label="5.5折"></el-option>
                        <el-option value="5" label="5折"></el-option>
                        <el-option value="4.5" label="4.5折"></el-option>
                        <el-option value="4" label="4折"></el-option>
                        <el-option value="3.5" label="3.5折"></el-option>
                        <el-option value="3" label="3折"></el-option>
                        <el-option value="2.5" label="2.5折"></el-option>
                        <el-option value="2" label="2折"></el-option>
                        <el-option value="1.5" label="1.5折"></el-option>
                        <el-option value="1" label="1折"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择有效时间">
                    <el-date-picker v-model="addForm.date1" type="daterange" align="right" unlink-panels
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                            :picker-options="houPickerOptions" style="width: 100%;" value-format="yyyy-MM-dd"
                            @change="addOnPickDate">
                        </el-date-picker>
                </el-form-item>
                <el-form-item label="状态" prop="enable">
                    <el-switch v-model="addForm.enable" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="adddiscountcoupon('addForm')">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="编辑优惠券" :visible.sync="editdiscountcouponStatus" width="30%" :before-close="handleClose">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="140px" class="demo-ruleForm">
                <el-form-item label="代金券名称/种类">
                    <el-select v-model="editForm.type" placeholder="请选择" style="width: 100%;">
                        <el-option :value="0" label="满减券"></el-option>
                        <el-option :value="1" label="折扣券"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="达到优惠券的金额" prop="money">
                    <el-input v-model="editForm.money"></el-input>
                </el-form-item>
                <el-form-item label="达到优惠金额" prop="num" v-if='editForm.type==0'>
                    <el-input v-model="editForm.num"></el-input>
                </el-form-item>
                <el-form-item label="折扣" prop="num" v-if='editForm.type==1'>
                    <el-select v-model="editForm.num" placeholder="请选择折扣" style="width: 100%;">
                        <el-option value="9.5" label="9.5折"></el-option>
                        <el-option value="9" label="9折"></el-option>
                        <el-option value="8.5" label="8.5折"></el-option>
                        <el-option value="8" label="8折"></el-option>
                        <el-option value="7.5" label="7.5折"></el-option>
                        <el-option value="7" label="7折"></el-option>
                        <el-option value="6.5" label="6.5折"></el-option>
                        <el-option value="6" label="6折"></el-option>
                        <el-option value="5.5" label="5.5折"></el-option>
                        <el-option value="5" label="5折"></el-option>
                        <el-option value="4.5" label="4.5折"></el-option>
                        <el-option value="4" label="4折"></el-option>
                        <el-option value="3.5" label="3.5折"></el-option>
                        <el-option value="3" label="3折"></el-option>
                        <el-option value="2.5" label="2.5折"></el-option>
                        <el-option value="2" label="2折"></el-option>
                        <el-option value="1.5" label="1.5折"></el-option>
                        <el-option value="1" label="1折"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择有效时间">
                    <el-date-picker v-model="editForm.date1" type="daterange" align="right" unlink-panels
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                            :picker-options="houPickerOptions" style="width: 100%;" value-format="yyyy-MM-dd"
                            @change="editOnPickDate">
                        </el-date-picker>
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch v-model="editForm.enable" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="editdiscountcoupon('editForm')">确 定</el-button>
            </span>
        </el-dialog>
        <div class="foodTopBox">
            <!-- <div class="foodrecordTit">
                <div class="foodrecordTitLf"><i class="el-icon-search"></i></div>
                <div class="foodrecordTitRh">查询条件</div>
            </div> -->
            <div class="foodrecordSerach elementReset">
                <el-form ref="ruleForm" :model="ruleForm">
                    <el-form-item prop="value2">
                        <el-date-picker v-model="ruleForm.value2" type="daterange" align="right" unlink-panels
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                            :picker-options="pickerOptions" size="medium" value-format="yyyy-MM-dd" @change="onPick">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="orderstatus">
                        <el-select v-model="ruleForm.type" placeholder="种类" size="medium" @change="typeChange">
                            <el-option value="-1" label="全部"></el-option>
                            <el-option value="0" label="满减券"></el-option>
                            <el-option value="1" label="折扣券"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="orderstatus">
                        <el-select v-model="ruleForm.enable" placeholder="状态" size="medium" @change="enableChange">
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
                <el-button type="primary" size="small" icon="el-icon-folder-add" @click="adddiscountcouponTan">新增
                </el-button>
            </div>

        </div>
        <div class="foodBotBox">
            <div class="foodrecordTable">
                <div class="moreHandle">
                    <p class="title"><i class="el-icon-tickets"></i>优惠券列表</p>
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
                    <!-- <el-table-column label="优惠券名称" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.name }}</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column label="优惠券种类" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.type==0?'满减券':'折扣券'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="优惠券面额" align="center" sortable>
                        <template slot-scope="scope">
                            <span>{{ scope.row.money || scope.row.num}}</span>
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
                    <el-table-column label="创建时间" align="center" sortable>
                        <template slot-scope="scope">
                            <span>{{ scope.row.addtime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建人" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.usertel }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.enable" :active-value="1" :inactive-value="0"
                                @change="enableSwitch(scope.row.coid)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.row.coid)">编辑</el-button>
                            <el-popconfirm confirmButtonText='确定' cancelButtonText='再想想' icon="el-icon-info"
                                iconColor="red" title="确定删除该优惠券吗"
                                @onConfirm="handleDelete(scope.row.coid, scope.$index)">
                                <el-button size="mini" type="danger" slot="reference" style="margin-left: 10px;">删除</el-button>
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
                value:'',
                loading:true,
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                page: 1,
                limit: 10,
                total: 0,
                discountcouponType:0,
                ruleForm: {
                    starttime: '',
                    endtime: '',
                    enable: '-1',
                    type: '-1',
                },
                rules: {
                    quanclass: [
                        { required: true, message: '请输入优惠券名称/种类', trigger: 'blur' },
                    ],
                    money: [
                        { required: true, message: '请输入达到优惠券金额', trigger: 'blur' },
                    ],
                    num: [
                        { required: true, message: '此项为必填项', trigger: 'blur' },
                        { required: true, message: '此项为必填项', trigger: 'change' },
                    ],
                    toyouhuimoney: [
                        { required: true, message: '请输入优惠券名称/种类', trigger: 'blur' },
                    ],
                    youhuimoney: [
                        { required: true, message: '请输入优惠券名称/种类', trigger: 'blur' },
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' },
                        { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
                    ],


                },
                adddiscountcouponStatus: false,
                editdiscountcouponStatus: false,
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
                coid:'',
                addForm: {
                    money: '',
                    num: '',
                    date1: [],
                    starttime: '',
                    endtime: '',
                    type: '1',
                    enable:1
                },
                editForm: {
                    money: '',
                    num: '',
                    date1: [],
                    starttime: '',
                    endtime: '',
                    type: null,
                    enable:1
                },
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
                foodname: '',
                foodprice: '',
                foodclass: '',
                foodStatus: '',
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
                this.$axios.post('/store/Promotion/getCouponList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    starttime: this.ruleForm.starttime,
                    endtime: this.ruleForm.endtime,
                    enable: this.ruleForm.enable,
                    type: this.ruleForm.type,
                    page: this.page,
                    limit: this.limit
                }, response => {
                    
                    this.total = response.data.count
                    this.tableData = response.data.data
                    this.loading = false;
                })
            },
            enableSwitch(coid) {
                this.$axios.post('/store/Promotion/getCouponEnable', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    coid: coid
                }, response => {
                    

                })
            },
            adddiscountcoupon(formName) {
                
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        
                        // this.$refs[formName].resetFields
                        this.$axios.post('/store/Promotion/getCouponAdd', {
                            token: this.token,
                            bid: this.bussiness.bid,
                            starttime: this.addForm.starttime,
                            endtime: this.addForm.endtime,
                            enable: this.addForm.enable,
                            type: this.addForm.type,
                            money:this.addForm.money,
                            num:this.addForm.num
                        }, response => {
                            if (response.data.code == 0) {
                                this.adddiscountcouponStatus = false;
                                this.$notify({
                                    title: '成功',
                                    message: '优惠券新增成功',
                                    type: 'success'
                                });
                                
                                this.dataInit();
                            }
                            
                            
                        })
                    } else {
                        
                        return false;
                    }
                });
            },
            handleEdit(coid) {
                // this.editdiscountcouponStatus = true
                this.coid = coid
                this.$axios.post('/store/Promotion/getCouponForm', {
                            token: this.token,
                            bid: this.bussiness.bid,
                            coid: coid
                        }, response => {
                            
                            this.editForm.date1 = [response.data.data.starttime,response.data.data.endtime]
                            this.editForm.starttime = response.data.data.starttime,
                            this.editForm.endtime = response.data.data.endtime,
                            this.editForm.enable = response.data.data.enable,
                            this.editForm.type = response.data.data.type,
                            this.editForm.money = response.data.data.money,
                            this.editForm.num = response.data.data.num
                        })
                this._data.editdiscountcouponStatus = true;
            },
            editdiscountcoupon(formName) {
                 this.$refs[formName].validate((valid) => {
                    if (valid) {
                this.$axios.post('/store/Promotion/getCouponEdit', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    coid:this.coid,
                    starttime: this.editForm.starttime,
                    endtime: this.editForm.endtime,
                    enable: this.editForm.enable,
                    type: this.editForm.type,
                    money:this.editForm.money,
                    num:this.editForm.num
                }, response => {
                    
                    if (response.data.code == 0) {
                                this.$notify({
                                    title: '成功',
                                    message: '优惠券修改成功',
                                    type: 'success'
                    });
                this.editdiscountcouponStatus = false;
                                this.dataInit();
                    }
                })
                    }
                 })
            },
            handleSizeChange(val) {
                this.limit = val;
                this.dataInit();
                
            },
            handleCurrentChange(val) {
                this.page = val;
                this.dataInit();
                
            },
            typeChange() {
                this.dataInit()
            },
            enableChange() {
                this.dataInit()
            },
            resetForm(formName) {
                
                this.$refs[formName].resetFields();
                this.dataInit()
            },
            
            handleDelete(coid,index) {
                this.$axios.post('/store/Promotion/proCouponDel', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    coid:coid
                }, response => {
                    
                   if (response.data.code == 0) {
                        this.$notify({
                            title: '成功',
                            message: '优惠券删除成功',
                            type: 'success'
                        });
                        this.tableData.splice(index,1)
                    } else {
                        this.$message.error(response.data.msg);
                    }
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
            adddiscountcouponTan() {
                // this.$refs[ruleForm].resetFields();
                this._data.adddiscountcouponStatus = true;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this._data.adddiscountcouponStatus = false;
                        this._data.editdiscountcouponStatus = false;
                        done();
                    })
                    .catch(_ => { });
            },
            foodsearch() {
                this.dataInit()
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
            editOnPickDate(date) {
                
                if (date == null) {
                    this.editForm.starttime = ''
                    this.editForm.endtime = ''
                    return
                }
                this.editForm.starttime = date[0]
                this.editForm.endtime = date[1]
            }

        },
    }
</script>

<style>
    .order {
        width: 100%;
        height: 100%;
    }

    .discountcoupon .foodTopBox .el-form {
        display: flex;
        align-items: center;
        display: -ms-flexbox;
        -ms-flex-align: center;
    }

    .discountcoupon .el-dialog .el-form-item {
        margin-bottom: 25px;
    }

    .discountcoupon .el-dialog__body {
        padding: 20px 46px 0 30px;
    }
</style>