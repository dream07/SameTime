<template>
    <div class="specificationconfig">
        <el-dialog title="编辑规格" :visible.sync="editshopoffer" width="30%" :before-close="handleClose" center>
            <el-form :model="guiGeName" :rules="rules1" ref="guiGeName" label-width="80px" class="demo-ruleForm">
                <div class="guiGeTopTopBox">
                    <el-form-item label="规格名" prop="name" style="margin-bottom: 0;">
                        <el-input v-model="guiGeName.name"></el-input>
                    </el-form-item>
                    <div class="el-icon-circle-plus addGuiGe" @click='addGuiGeName("guiGeName")'></div>
                </div>
                <div v-if="ggname==''" style="margin-left: 65px;text-align: left;line-height: 50px;color: #ccc;">
                    <div>请输入规格名</div>
                </div>
                <el-tag v-if="ggname!==''" closable type="warning" style="margin: 15px 0;" @close="removeGuiGeName">
                    {{ggname}}
                </el-tag>
            </el-form>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">

                <div class="guiGeTopBox">
                    <el-form-item label="规格值" prop="name" style="width: 46%;">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="加价" prop="price" style="width: 46%;">
                        <el-input v-model="ruleForm.price"></el-input>
                    </el-form-item>
                    <div class="el-icon-circle-plus addGuiGe" @click='addGuiGe("ruleForm")'></div>
                </div>

            </el-form>
            <div v-loading='guiGeLoding' style="min-height: 50px;" element-loading-background="rgba(255, 255, 255, 1)">
                <div v-if='specificationData.length==0' style="text-align: center;line-height: 50px;color: #ccc;">
                    <div style="margin-top: 20px;">暂无数据</div>
                </div>
                <div v-for="(item,index) in specificationData" :key="index">
                    <el-divider></el-divider>
                    <div class="guiGeBotBox">
                        <div>{{item.name}}</div>
                        <div>{{item.jiajia}}</div>
                        <div class="el-icon-circle-close delGuiGe" @click='delGuige(index)'></div>
                    </div>
                </div>
            </div>


            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="editshopofferSure" style="margin-left: 50px;">确 定</el-button>
            </span>
        </el-dialog>
        <div class="foodTopBox elementReset">


            <!-- <div class="foodrecordTit">
                <div class="foodrecordTitLf"><i class="el-icon-search"></i></div>
                <div class="foodrecordTitRh">查询条件</div>
            </div> -->
            <div class="foodrecordSerach">
                <el-form ref="form" :model="form">
                    <el-form-item prop="name">
                        <el-input v-model="form.name" placeholder="请输入菜品名称" size="medium"></el-input>
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
                    <p class="title"><i class="el-icon-tickets"></i>规格管理列表</p>
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
                    <el-table-column label="菜名" width="180" align="center">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p><img :src="scope.row.banner_img" alt="" style="width: 150px;max-height: 150px;"></p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column label="编号" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.number }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="基础价格" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.price }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="规格" align="center">
                        <template slot-scope="scope">
                            <div v-for="(item,index) in scope.row.spec" :key="index">{{item.name}}&nbsp;</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="加价" align="center">
                        <template slot-scope="scope">
                            <div v-for="(item,index) in scope.row.spec[0].xiaji" :key="index">
                                ￥{{item.jiajia}}&nbsp;</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.row.menuid,scope.$index)">编辑</el-button>
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
                ggname: '',
                menuid: '',
                specificationData: [],
                guiGeLoding: true,
                loading: true,
                page: 1,
                limit: 10,
                total: 0,
                editshopoffer: false,
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                guiGeName: {
                    name: ''
                },
                form: {
                    name: '',
                },
                tableData: [],
                guigeData: [],
                globIndex: '',
                ruleForm: {
                    name: '',
                    price: '',
                },
                rules1: {
                    name: [
                        { required: true, message: '请输入规格名称', trigger: 'blur' },
                        { required: true, message: '请输入规格名称', trigger: 'change' },
                    ],
                },
                rules: {
                    name: [
                        { required: true, message: '请输入规格值', trigger: 'blur' },
                        { required: true, message: '请输入规格值', trigger: 'change' },
                    ],
                    price: [
                        { required: true, message: '请输入加价', trigger: 'blur' },
                        { required: true, message: '请输入加价', trigger: 'change' },
                    ],

                }
            }
        },
        created() {
            this.token = this.$Cookies.get('token');
            this.bussiness = JSON.parse(this.$Cookies.get('bussiness'));
            this.dataInit()
        },

        mounted() {

        },
        methods: {
            addGuiGeName(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.ggname !== '') {
                            this.$message.error('规格名只能有一个')
                            return
                        }
                        var index = this.globIndex
                        this.ggname = this.guiGeName.name
                        this.guigeData[index].spec[0].name = this.guiGeName.name
                    }
                })
            },
            addGuiGe(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var index = this.globIndex
                        this.specificationData.push({ name: this.ruleForm.name, jiajia: this.ruleForm.price })
                        
                        // this.guigeData[index].spec[0].xiaji.push({ name: this.ruleForm.name, jiajia: this.ruleForm.price })
                    } else {
                        
                        return false;
                    }
                });
                

            },
            editshopofferSure() {
                var index = this.globIndex
                this.guigeData[index].spec[0].xiaji = this.specificationData
                
                
                if (this.guigeData[index].spec[0].name == '') {
                    this.$message.error('规格名称还未添加')
                    return
                }
                if (this.guigeData[index].spec[0].xiaji.length == 0) {
                    this.$message.error('规格值还未添加')
                    return
                }
                
                this.$axios.post('/store/menu/getSpecAdd', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    menuid: this.menuid,
                    spec: this.guigeData[index].spec
                }, response => {
                    
                    if (response.data.code == 0) {
                        this.$notify({
                            title: '成功',
                            message: '规格修改成功',
                            type: 'success'
                        });
                        this.editshopoffer = false;
                        this.dataInit();
                    }
                })
            },
            removeGuiGeName() {
                var index = this.globIndex
                this.ggname = ''
                this.guigeData[index].spec[0].name = ''
                
            },
            delGuige(index) {
                var globIndex = this.globIndex
                this.specificationData.splice(index, 1)
                this.guigeData[globIndex].spec[0].xiaji.splice(index, 1)
            },
            dataInit(command) {
                this.loading = true;
                if (command) {
                    
                    this.bussiness = command
                    
                }
                this.$axios.post('/store/menu/getSpecList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    name: this.form.name,
                    limit: this.limit,
                    page: this.page
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
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.editshopoffer = false
                        // this.dataInit()
                        done();
                    })
                    .catch(_ => { });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            resetForm(formName) {
                
                this.$refs[formName].resetFields();
            },
            handleEdit(menuid, index) {
                this.globIndex = index
                this.menuid = menuid
                this.guiGeLoding = true
                this._data.editshopoffer = true;
                this.$axios.post('/store/menu/getSpecList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    name: ''
                }, response => {
                    
                    this.guigeData = response.data.data
                    if (this.ggname = response.data.data[index].spec.length == 0) {
                        this.ggname = ''
                        this.specificationData = []
                    } else {
                        this.ggname = response.data.data[index].spec[0].name
                        this.specificationData = response.data.data[index].spec[0].xiaji
                        
                    }
                    this.guiGeLoding = false
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
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            handleSizeChange(val) {
                this.limit = val;
                this.dataInit()
                
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
    .delGuiGe {
        cursor: pointer;
    }

    .guiGeBotBox {
        display: flex;
        display: -ms-flexbox;
        justify-content: space-between;
        -ms-flex-pack: justify;
        align-items: center;
        -ms-flex-align: center;
    }

    .guiGeTopBox .el-form-item {
        margin-bottom: 0 !important;
    }

    .el-icon-circle-close {
        font-size: 30px;
        color: #F56C6C;
    }

    .addGuiGe {
        font-size: 30px;
        margin-left: 10px;
        color: #409EFF;
        cursor: pointer;
    }

    .guiGeTopBox {
        display: flex;
        display: -ms-flexbox;
        align-items: center;
        -ms-flex-align: center;
        justify-content: space-around;
        -ms-flex-pack: distribute;
        /* margin-top: 20px; */
        margin-left: -15px;
    }

    .guiGeTopTopBox {
        display: flex;
        display: -ms-flexbox;
        align-items: center;
        -ms-flex-align: center;
        justify-content: start;
        -ms-flex-pack: start;
        margin-left: -15px;
        /* margin-bottom: 20px; */
    }

    .specificationconfig .el-form {
        display: flex;
        display: -ms-flexbox;
    }

    .specificationconfig .el-dialog__body .el-form-item {
        margin-bottom: 25px;
    }

    .specificationconfig .el-dialog__body {
        padding-right: 33px;
        padding-left: 33px;
        padding-bottom: 20px;
    }

    .el-dialog .el-form {
        display: block !important;
    }

    .order {
        width: 100%;
        height: 100%;
    }

    .order .el-form-item {
        margin-bottom: 25px;
    }

    .order .el-form {
        display: flex;
        align-items: center;
        display: -ms-flexbox;
        -ms-flex-align: center;
    }

    .order .el-dialog__body {
        padding-right: 35px;
    }
</style>