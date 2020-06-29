<template>
    <div class="member">
        <div class="foodBotBox">
            <el-dialog title="添加管理员" :visible.sync="addAdmin" width="30%" :before-close="handleClose">
                <el-form :model="addAdminForm" :rules="rules" ref="addAdminForm" label-width="70px"
                    class="demo-ruleForm">
                    <el-form-item label="账号" prop="tel">
                        <el-input v-model="addAdminForm.tel" placeholder="请输入手机号作为账号"></el-input>
                    </el-form-item>
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="addAdminForm.name" placeholder="请输入管理员名称"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="addAdminForm.password" placeholder="默认密码是12345678"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="delivery">
                        <el-switch v-model="addAdminForm.type" :active-value="1" :inactive-value="0"></el-switch>
                    </el-form-item>

                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="handleClose">取 消</el-button>
                    <el-button type="primary" @click="addTableSure('addAdminForm')">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="编辑管理员" :visible.sync="editAdmin" width="30%" :before-close="handleClose">
                <el-form :model="editAdminForm" :rules="rules" ref="editAdminForm" label-width="70px"
                    class="demo-ruleForm">
                    <el-form-item label="账号" prop="tel">
                        <el-input v-model="editAdminForm.tel" placeholder="请输入手机号作为账号"></el-input>
                    </el-form-item>
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="editAdminForm.name" placeholder="请输入管理员名称"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="editAdminForm.password" placeholder="默认密码是12345678"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="delivery">
                        <el-switch v-model="editAdminForm.type" :active-value="1" :inactive-value="0"></el-switch>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="handleClose">取 消</el-button>
                    <el-button type="primary" @click="editTableSure('editAdminForm')">确 定</el-button>
                </span>
            </el-dialog>
            <div class="foodrecordTable">
                <div class="moreHandle">
                    <p class="title"><i class="el-icon-tickets"></i>管理员列表</p>
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
                        <el-button type="primary" size="small" icon="el-icon-folder-add" @click="addAdmin=true"
                            style="margin: 10px 0;">添加管理员</el-button>
                    </div>
                </div>
                <el-table :data="tableData" style="width: 100%" id="foodtable"
                    :header-cell-style="{background:'#f5f8f9',color:'#5f6e82'}">
                    <el-table-column label="账号" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.tel}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="名称" align="center" sortable>
                        <template slot-scope="scope">
                            <span>{{ scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center" sortable>
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.type" :active-value="1" :inactive-value="0"
                                @change="enableSwitch(scope.row.id)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini"
                                @click="handleEdit(scope.row.id,scope.row.tel,scope.row.name,scope.row.password,scope.row.type)">
                                编辑</el-button>

                            <el-popconfirm confirmButtonText='确定' cancelButtonText='再想想' icon="el-icon-info"
                                iconColor="red" title="确定删除该管理员吗" @onConfirm="handleDelete(scope.row.id, scope.$index)">
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
                editAdmin: false,
                addAdminForm: {
                    tel: '',
                    name: '',
                    password: '',
                    type: 1
                },
                editAdminForm: {
                    tel: '',
                    name: '',
                    password: '',
                    type: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入管理员名称', trigger: 'blur' },
                    ],
                    tel: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                },
                addAdmin: false,
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
                adminId: '',
                form: {
                    name: '',
                    price: '',
                    class: '',
                    value2: [],
                    peoples: '',
                    orderstatus: ''

                },
                tableData: []

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
                this.$axios.post('/store/User/getUserList', {
                    token: this.token,
                    limit:this.limit,
                    page:this.page
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
            addTableSure(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/store/User/getUserAdd', {
                            token: this.token,
                            tel: this.addAdminForm.tel,
                            name: this.addAdminForm.name,
                            password: this.addAdminForm.password,
                            type: this.addAdminForm.type,
                        }, response => {
                            
                            if (response.data.code == 0) {
                                this.$notify({
                                    title: '成功',
                                    message: '添加管理员成功',
                                    type: 'success'
                                });
                                this.dataInit()
                                this.addAdmin = false
                            } else {
                                this.$message.error(response.data.msg);
                            }
                        })
                    }
                })
            },
            editTableSure(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/store/User/getUserEdit', {
                            token: this.token,
                            id: this.adminId,
                            tel: this.editAdminForm.tel,
                            name: this.editAdminForm.name,
                            password: this.editAdminForm.password,
                            type: this.editAdminForm.type,
                        }, response => {
                            
                            if (response.data.code == 0) {
                                this.$notify({
                                    title: '成功',
                                    message: '修改管理员成功',
                                    type: 'success'
                                });
                                this.dataInit()
                                this.editAdmin = false
                            } else {
                                this.$message.error(response.data.msg);
                            }
                        })
                    }
                })
            },
            enableSwitch(id) {
                this.$axios.post('/store/User/getUserType', {
                    token: this.token,
                    id: this.adminId,
                }, response => {
                    
                })
            },
            resetForm(formName) {
                
                this.$refs[formName].resetFields();
            },
            handleEdit(id, tel, name, password, type) {
                this.adminId = id;
                this._data.editAdmin = true;
                this.editAdminForm.tel = tel
                this.editAdminForm.name = name
                this.editAdminForm.password = password
                this.editAdminForm.type = type
            },
            handleDelete(id, index) {
                this.$axios.post('/store/User/getUserDel', {
                    token: this.token,
                    id: id
                }, response => {
                    
                    if (response.data.code == 0) {
                        this.$notify({
                            title: '成功',
                            message: '删除管理员成功',
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
                this.limit = val
                this.dataInit()
            },
            handleCurrentChange(val) {
                this.page = val
                this.dataInit()
            },
            addFood() {
                
                this.$router.push({ name: 'addfoodrecord', params: { bid: 'xx' } })
            },
            foodsearch() {
                this.$message({
                    message: '查询成功',
                    type: 'success'
                });
                
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.addAdmin = false
                        this.editAdmin = false
                        done();
                    })
                    .catch(_ => { });
            }
        },
    }
</script>

<style>
    .member .el-dialog__body {
        padding-right: 30px;
    }
</style>