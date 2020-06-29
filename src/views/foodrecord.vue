<template>
    <div class="foodrecord elementReset">
        <div class="foodTopBox">
            <!-- <div class="foodrecordTit">
                <div class="foodrecordTitLf"><i class="el-icon-search"></i></div>
                <div class="foodrecordTitRh">查询条件</div>
            </div> -->
            <div class="foodrecordSerach">
                <el-form ref="searchBox" :model="searchBox">
                    <el-form-item prop="serarchName">
                        <el-input v-model="searchBox.serarchName" placeholder="请输入菜品名称" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item prop="serarchPrice">
                        <el-input v-model="searchBox.serarchPrice" placeholder="请输入菜品价格" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item prop="serarchClass">
                        <el-select placeholder="请选择菜品类别" size="medium" v-model="searchBox.serarchClass"
                            @change="categoryChange">
                            <el-option value="-1" label="所有类别">
                            </el-option>
                            <el-option v-for="item in category" :key="item.classid" :label="item.name"
                                :value="item.classid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="serarchEnable">
                        <el-select v-model="searchBox.serarchEnable" placeholder="请选择菜品状态" size="medium"
                            @change="enableChange">
                            <el-option value="-1" label="所有状态"></el-option>
                            <el-option value="1" label="上架"></el-option>
                            <el-option value="0" label="下架"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="foodrecordTitBot">
                <el-button native-type="submit" type="success" size="small" icon="el-icon-search" @click="foodsearch">查询
                </el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="resetForm('searchBox')">清空
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-folder-add" @click="addFood()">新增</el-button>
            </div>

        </div>
        <div class="foodBotBox">
            <div class="foodrecordTable">
                <div class="moreHandle">
                    <p class="title"><i class="el-icon-tickets"></i>菜品档案列表</p>
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
                    <el-table-column label="价格" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.price }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="类别" align="center" :filters=filterData :filter-method="filterTag"
                        filter-placement="bottom-end">
                        <template slot-scope="scope">
                            <span :type="scope.row.className === '八珍' ? 'primary' : 'success'"
                                disable-transitions>{{ scope.row.class }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.enable==1?'上架':'下架'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.row.menuid)">编辑</el-button>
                            <!-- <el-popconfirm title="这是一段内容确定删除吗？">
                                <el-button slot="reference">删除</el-button>
                            </el-popconfirm> -->
                            <el-popconfirm confirmButtonText='确定' cancelButtonText='再想想' icon="el-icon-info"
                                iconColor="red" title="确定删除该菜品吗" @onConfirm="handleDelete(scope.row.menuid,scope.$index)">
                                <el-button size="mini" type="danger" slot="reference" style="margin-left: 10px;">删除
                                </el-button>
                            </el-popconfirm>


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
                searchBox: {
                    serarchName: '',
                    serarchPrice: '',
                    serarchClass: '-1',
                    serarchEnable: '-1'
                },
                page: 1,
                limit: 10,
                total: 0,
                category: [],
                filterData:[],
                tableData: []
            }
        },
        created() {
            this.token = this.$Cookies.get('token');
            this.bussiness = JSON.parse(this.$Cookies.get('bussiness'));
            this.dataInit()
        },
        methods: {
            categoryChange() {
                this.dataInit()
            },
            enableChange() {
                this.dataInit()
            },
            dataInit(command) {
                this.loading = true;
                if (command) {
                    
                    this.bussiness = command
                    
                }
                this.$axios.post('/store/menu/getClassList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    name: ''
                }, response => {
                    
                    var category =  this.category = response.data.data.menu
                    this.filterData=[]
                    for (var i = 0; i < category.length; i++) {
                        this.filterData.push({ text: category[i].name, value: category[i].name })
                    }
                    
                })
                
                this.$axios.post('/store/menu/getMenuList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    name: this.searchBox.serarchName,
                    price: this.searchBox.serarchPrice,
                    class: this.searchBox.serarchClass,
                    enable: this.searchBox.serarchEnable,
                    page: this.page,
                    limit: this.limit

                }, response => {
                    
                    this.total = response.data.data.count
                    this.tableData = response.data.data.menu
                    // var filterData = []
                    // var tableData = this.tableData
                    
                    // this._data.filterData = filterData
                    this.loading = false;
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.dataInit()
            },
            handleEdit(index) {
                this.$router.push({ path: '/editfoodrecord',query: { globId: index } })
            },
            handleDelete(menuid,index) {
                
                this.$axios.post('/store/menu/getMenuDel', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    menuid: menuid
                }, response => {
                    this.tableData.splice(index,1)
                    this.$notify({
                        title: '成功',
                        message: '菜品删除成功',
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
                return row.class === value;
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
        margin-bottom: 0;
    }

    .router-link-active {
        text-decoration: none !important;
    }
</style>