<template>
    <div class="foodrecord">
        <div class="foodTopBox elementReset">
            <!-- <div class="foodrecordTit">
                <div class="foodrecordTitLf"><i class="el-icon-search"></i></div>
                <div class="foodrecordTitRh">查询条件</div>
            </div> -->
            <div class="foodrecordSerach">
                <el-form ref="ruleForm" :model="ruleForm">
                    <el-form-item prop="tel">
                        <el-input v-model="ruleForm.tel" placeholder="请输入手机号" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入门店名称" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item prop="class">
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
                <el-button type="primary" size="small" icon="el-icon-folder-add" @click="addshop()">新增</el-button>
            </div>

        </div>
        <div class="foodBotBox">
            <div class="foodrecordTable">
                <div class="moreHandle">
                    <p class="title"><i class="el-icon-tickets"></i>门店列表</p>
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
                    <el-table-column label="编号" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.inviter }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="门店名称" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="区域" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.area }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="地址" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.address }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="电话" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.tel }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="添加时间" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.addtime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center">
                        <template slot-scope="scope">
                            <el-switch v-if="scope.row.type==0 || scope.row.type==1" v-model="scope.row.type"
                                :active-value="1" :inactive-value="0" @change="enableSwitch(scope.row.bid)"></el-switch>
                            <div v-if="scope.row.type==-2">审核中</div>
                            <div v-if="scope.row.type==-4">审核失败</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="208px">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleDetail(scope.row.bid)">详情</el-button>
                            <el-button v-if="scope.row.type!==-2&&scope.row.type==1||scope.row.type==-4" size="mini"
                                @click="handleEdit(scope.row.bid)"
                                :class="[scope.row.specialoffer==true ? 'putaway' : '']">编辑</el-button>
                            <el-popconfirm v-if="scope.row.type!==-2&&scope.row.type==1" confirmButtonText='确定' cancelButtonText='再想想' icon="el-icon-info"
                                iconColor="red" title="确定删除该店铺吗"
                                @onConfirm="handleDelete(scope.row.bid,scope.$index)">
                                <el-button slot="reference" style="margin-left: 10px;" size="mini" type="danger"
                                :class="[scope.row.specialoffer==true ? 'putaway' : '']">删除
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
                ruleForm: {
                    name: '',
                    tel: '',
                    type: '-1'
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
                this.$axios.post('/store/Discount/getBussinessList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    tel: this.ruleForm.tel,
                    name: this.ruleForm.name,
                    type: this.ruleForm.type,
                    limit: this.limit,
                    page: this.page
                }, response => {
                    this.total = response.data.count;
                    this.tableData = response.data.data;
                    this.loading = false;
                })
            },
            addshop() {
                this.$router.push({ path: 'addshop' })
            },
            typeChange() {
                this.dataInit()
            },
            resetForm(formName) {
                
                this.$refs[formName].resetFields();
                this.dataInit()
            },
            handleEdit(bid) {
                this.$router.push({ path: '/editshop', query: { globId: bid } })
            },
            handleDelete(bid, index) {
                this.$axios.post('/store/Discount/getBusinessDel', {
                    token: this.token,
                    bid: bid,
                }, response => {
                    if (response.data.code == 0) {
                        this.$notify({
                            title: '成功',
                            message: '店铺删除成功',
                            type: 'success'
                        });
                        this.tableData.splice(index, 1)
                    } else {
                        this.$message.error(response.data.msg)
                    }
                })
                this.tableData.splice()
            },
            onSubmit() {
                
            },
            handleDetail(bid) {
                this.$router.push({ path: '/shopDetail', query: { globId: bid } })
            },
            enableSwitch(bid) {
                this.$axios.post('/store/Discount/getBussinessType', {
                    token: this.token,
                    bid: bid,
                }, response => {
                    
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
    .foodTopBox {
        background-color: #fff;
    }

    .foodBotBox {
        padding: 10px;
        background-color: #fff;
        margin-top: 15px;
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

    .foodrecord .el-form {
        display: flex;
        align-items: center;
        display: -ms-flexbox;
        -ms-flex-align: center;
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