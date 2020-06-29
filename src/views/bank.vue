<template>
    <div class="foodrecord">
        <el-dialog title="添加银行卡" :visible.sync="addBank" width="30%" :before-close="handleClose" class="bank">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="95px" class="demo-ruleForm" style="display: block;">
                <el-form-item label="银行卡号" prop="bankcode">
                    <el-input v-model="ruleForm.bankcode" placeholder="请输入银行卡号"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="realname">
                    <el-input v-model="ruleForm.realname" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="tel">
                    <el-input v-model="ruleForm.tel" disabled></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code" class="yanzhengmaBox">
                    <el-input v-model="ruleForm.code" style="width: 120px;margin-right: 10px;"></el-input>
                    <el-button type="text" v-show="show" @click="getCode">发送验证码</el-button>
                    <el-button type="text" v-show="!show" @click="getCode" class="count">{{count}}s</el-button>
                </el-form-item>

                <el-form-item label="开户行地址" prop="bankaddress">
                    <el-input v-model="ruleForm.bankaddress" placeholder="请输入开户行地址"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="handleClose">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <div class="foodBotBox">
            
            <div class="foodrecordTable">
                <div class="moreHandle">
                    <p class="title"><i class="el-icon-tickets"></i>银行卡列表</p>
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


                        <el-button type="primary" size="small" icon="el-icon-folder-add" @click="addBankHandel"
                            style="margin: 10px 0;">添加银行卡</el-button>


                    </div>
                </div>
                <el-table :data="tableData" style="width: 100%" id="foodtable"
                    :header-cell-style="{background:'#f5f8f9',color:'#5f6e82'}" v-loading="loading">
                    <el-table-column label="银行名称" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.bankname }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="银行卡号" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.bankcode }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="姓名" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.realname }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="开户行" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.bankaddress }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="添加时间" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.addtime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-popconfirm confirmButtonText='确定' cancelButtonText='再想想' icon="el-icon-info"
                                iconColor="red" title="确定删除该银行卡吗"
                                @onConfirm="handleDelete(scope.row.bankid,scope.$index)">
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
                addBank: false,
                loading: true,
                page: 1,
                limit: 10,
                total: 0,
                show: true,
                count: '',
                ruleForm: {
                    bankcode: '',
                    tel: '',
                    realname: '',
                    code: '',
                    bankaddress: ''
                },
                form: {
                    name: '',
                    price: '',
                    class: '',
                    status: '',
                },
                tableData: [],
                rules: {
                    tel: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
                    bankcode: [{ required: true, message: '请输入银行卡号', trigger: 'blur' }],
                    realname: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
                    bankaddress: [{ required: true, message: '请输入开户行地址', trigger: 'blur' }]
                }
            }
        },
        created() {
            var globId = this.$route.query.globId;
            this.token = this.$Cookies.get('token');
            this.bussiness = JSON.parse(this.$Cookies.get('bussiness'));
            if(globId) {
                this.addBankHandel()
            }
            this.dataInit();
        },
        methods: {
            dataInit(command) {
                this.loading = true;
                if (command) {
                    
                    this.bussiness = command
                    
                }
                this.$axios.post('/store/Order/getBankList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                }, response => {
                    
                    this.total = response.data.data.count
                    this.tableData = response.data.data.list
                    this.loading = false;
                })
            },
            getCode() {
                if (this.ruleForm.tel == '') {
                    this.$message.error('请输入手机号')
                    return;
                }
                const TIME_COUNT = 60;
                if (!this.timer) {
                    this.$axios.post('/store/User/getMobileCode', {
                        token: this.token,
                        tel: this.ruleForm.tel
                    }, response => {
                        
                    })
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }
            },
            addBankHandel() {
                this.bussiness = JSON.parse(this.$Cookies.get('bussiness'));
                this.addBank = true;
                this.$axios.post('/store/Order/getBusinessTel', {
                    token: this.token,
                    bid: this.bussiness.bid,
                }, response => {
                    this.ruleForm.tel = response.data.data.list
                })
            },
            addshop() {
                this.$router.push({ path: 'addshop' })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/store/Order/getBankAdd', {
                            token: this.token,
                            bid: this.bussiness.bid,
                            code: this.ruleForm.code,
                            bankcode: this.ruleForm.bankcode,
                            realname: this.ruleForm.realname,
                            bankaddress: this.ruleForm.bankaddress
                        }, response => {
                            
                            if (response.data.code == 0) {
                                this.$notify({
                                    title: '成功',
                                    message: '银行卡添加成功',
                                    type: 'success'
                                });
                                this.addBank = false
                                this.dataInit()
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        })
                    } else {
                        
                        return false;
                    }
                });
            },
            resetForm(formName) {
                
                this.$refs[formName].resetFields();
            },
            handleEdit(index, row) {
                
                this.$router.push({ path: 'editshop', params: { foodId: index } })
            },
            handleDelete(bankid,index) {
                this.$axios.post('/store/Order/getBankDel', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    bankid:bankid
                }, response => {
                    
                    if (response.data.code == 0) {
                        this.$notify({
                            title: '成功',
                            message: '银行卡删除成功',
                            type: 'success'
                        });
                        this.addBank = false
                        this.tableData.splice(index,1)
                        this.dataInit()
                    } else {
                        this.$message.error(response.data.msg)
                    }
                })
            },
            onSubmit() {
                
            },
            handleDetail(index, row) {
                
                this.$router.push({ path: 'shopdetail', params: { foodId: index } })
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
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this._data.addBank = false

                        done();
                    })
                    .catch(_ => { });
            },
            handleCurrentChange(val) {
                this.page = val;
                this.dataInit();
                
            },
            addFood() {
                
                this.$router.push({ name: 'addfoodrecord', params: { bid: 'xx' } })
            },
            foodsearch() {
                this.$message({
                    message: '查询成功',
                    type: 'success'
                });
                
            }
        },
    }
</script>

<style>
    .foodTopBox {
        background-color: #fff;
    }

    .foodBotBox {
        padding: 10px;
        background-color: #fff;
        margin-top: 15px;
    }

    .bank .el-dialog__body {
        padding-right: 20px;
    }

    .foodrecord {
        width: 100%;
        height: 100%;
        /* background-color: #fff; */
        /* border: 1px solid #d8dce5; */
    }

    .moreHandle {
        display: flex;
        display: -ms-flexbox;
        justify-content: space-between;
        -ms-flex-pack: justify;
        align-items: center;
        -ms-flex-align: center;
    }

    .el-main {
        padding: 10px !important;
    }

    .foodrecordSerach {
        padding: 13px;
        display: flex;
        display: -ms-flexbox;
        border-bottom: 1px solid #d8dce5;
    }

    .foodrecordSerach .el-input {
        width: 150px;
    }

    .foodrecordSerach .el-form-item {
        margin-right: 20px;
    }

    .foodrecordTable {
        padding-top: 0;
        border: 1px solid #ddd;
    }

    .el-table {
        /* border: 1px solid #ddd; */
        border-bottom: none;
    }

    .foodrecordTit {
        display: flex;
        display: -ms-flexbox;
        align-items: center;
        -ms-flex-align: center;
        border-bottom: 1px solid #d8dce5;
        box-sizing: border-box;
    }

    .foodrecordTitLf {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-right: 1px solid #d8dce5;
        color: #606266;
    }

    .foodrecordTitRh {
        color: #606266;
        padding-left: 10px;
    }

    .foodrecordTitBot {
        display: flex;
        justify-content: flex-end;
        -ms-flex-pack: end;
        padding: 10px;
    }

  

    .elementReset .el-form-item {
        margin-bottom: 0 !important;
    }

    .router-link-active {
        text-decoration: none !important;
    }

    .putaway {
        display: none;
    }
</style>