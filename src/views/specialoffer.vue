<template>
    <div class="foodrecord elementReset">
        <div class="foodTopBox">
            <!-- <div class="foodrecordTit">
                <div class="foodrecordTitLf"><i class="el-icon-search"></i></div>
                <div class="foodrecordTitRh">查询条件</div>
            </div> -->
            <div class="foodrecordSerach">
                <el-form ref="form" :model="form">
                    <el-form-item prop="name">
                        <el-input v-model="form.name" placeholder="请输入菜品名称" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item prop="value2">
                        <el-date-picker v-model="form.value2" type="daterange" align="right" unlink-panels
                            range-separator="至" start-placeholder="下单起始时间" end-placeholder="下单截至时间"
                            :picker-options="pickerOptions" size="medium" value-format="yyyy-MM-dd" @change="onPick">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item prop="status">
                        <el-select v-model="form.type" placeholder="请选择菜品状态" size="medium" @change="typeChange">
                            <el-option value="-1" label="全部"></el-option>
                            <el-option value="1" label="开启"></el-option>
                            <el-option value="0" label="关闭"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="foodrecordTitBot">
                <el-button type="success" size="small" icon="el-icon-search" @click="foodsearch">查询</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="resetForm('form')">清空
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-folder-add" @click="addpromotion()">新增</el-button>
            </div>

        </div>
        <div class="foodBotBox">
            <div class="foodrecordTable">
                <div class="moreHandle">
                    <p class="title"><i class="el-icon-tickets"></i>特价折扣列表</p>
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
                    :header-cell-style="{background:'#f5f8f9',color:'#5f6e82'}" v-loading='loading'>
                    <el-table-column label="菜品名称" width="180" align="center">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p><img :src="scope.row.banner_img" alt="" style="width: 150px;max-height: 150px;"></p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column label="价格" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.price }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="折扣" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.zk }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="开始日期" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.starttime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="结束日期" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.endtime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="发起时间" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.addtime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center">
                        <template scope="scope">
                            <el-switch v-model="scope.row.type" :active-value="1" :inactive-value="0"
                                @change="switchChange(scope.row.zkid)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="208px">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleDetail(scope.row.zkid)">详情</el-button>
                            <el-button v-show='scope.row.type==1' size="mini" @click="handleEdit(scope.row.zkid)">编辑
                            </el-button>
                            <el-popconfirm confirmButtonText='确定' cancelButtonText='再想想' icon="el-icon-info"
                                iconColor="red" title="确定删除该促销吗吗"
                                @onConfirm="handleDelete(scope.$index,scope.row.zkid)">
                                <el-button v-show='scope.row.type==1' size="mini" type="danger" slot="reference"
                                    style="margin-left: 10px;">删除
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

                category: [],
                form: {
                    name: '',
                    value2: [],
                    starttime: '',
                    endtime: '',
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
                this.$axios.post('/store/Promotion/getTjzkList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    starttime: this.form.starttime,
                    endtime: this.form.endtime,
                    name: this.form.name,
                    type: this.form.type,
                    page: this.page,
                    limit: this.limit
                }, response => {
                    
                    this.total = response.data.count
                    this.tableData = response.data.data
                    this.loading = false;
                })
            },
            switchChange(zkid) {
                this.$axios.post('/store/Promotion/getTjzkType', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    zkid: zkid,
                }, response => {
                    
                })
            },
            typeChange() {
                this.dataInit()
            },
            resetForm(formName) {
                
                this.$refs[formName].resetFields();
                this.form.starttime = '';
                this.form.endtime = '';
                this.dataInit()
            },
            handleEdit(zkid) {
                this.$router.push({ path: 'editpromotion', query: { globId: zkid } })
            },
            handleDetail(zkid) {
                this.$router.push({ path: 'specificationdetail', query: { globId: zkid } })
            },
            handleDelete(index, zkid) {
                this.$axios.post('/store/Promotion/getTjzkDel', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    zkid: zkid,
                }, response => {
                    
                    this.tableData.splice(index, 1)
                    this.$notify({
                        title: '成功',
                        message: '折扣删除成功',
                        type: 'success'
                    });
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
            addpromotion() {
                this.$router.push({ path: 'addpromotion', params: { bid: 'xx' } })
            },
            foodsearch() {
                this.dataInit()
                // this.$message({
                //     message: '查询成功',
                //     type: 'success'
                // });
                
            },
            categoryChange() {

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
        margin-bottom: 0;
    }

    .router-link-active {
        text-decoration: none !important;
    }

    .putaway {
        display: none;
    }
</style>