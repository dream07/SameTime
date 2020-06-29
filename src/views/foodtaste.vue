<template>
    <div class="shopoffer">
        <!-- <div class="foodrecordTit">
                <div class="foodrecordTitLf"><i class="el-icon-search"></i></div>
                <div class="foodrecordTitRh">查询条件</div>
            </div> -->
        <div class="foodTopBox">
            <div class="foodrecordSerach elementReset">
                <el-form ref="ruleForm" :model="ruleForm">
                    <el-form-item prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入菜品名称" size="medium"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="foodrecordTitBot">
                <el-button type="success" size="small" icon="el-icon-search" @click="foodsearch">查询</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="resetForm('ruleForm')">清空
                </el-button>
            </div>
        </div>



        <div class="foodBotBox">
            <div class="foodrecordTable">
                <div class="moreHandle">
                    <p class="title"><i class="el-icon-tickets"></i>菜品口味列表</p>
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

                <el-table :data="tableData" id="foodtable" style="width: 100%" :row-key="getRowKeys" :expand-row-keys="expends"
                    v-loading="loading">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <div>
                                <el-tag :key="index" v-for="(tag,index) in props.row.hhhh" closable
                                    :disable-transitions="false" @close="handleTagClose(tag,props.$index,index)"
                                    @click="tagCilckHandel(props.$index,index)"
                                    :effect="[index==props.row.tabNum? 'dark' : 'plain']">
                                    {{tag.name}}
                                </el-tag>
                                <el-input class="input-new-tag" v-if="props.row.inputVisible"
                                    v-model="props.row.inputValue" ref="saveTagInput" size="small"
                                    @keyup.enter.native="handleInputConfirm(props.$index)"
                                    @blur="handleInputConfirm(props.$index)">
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput(props.$index)">
                                    +口味类别
                                </el-button>
                            </div>

                            <div style="margin-top: 10px;" v-if="props.row.hhhh.length!==0">
                                <el-tag :key="index"
                                    v-for="(tagChildren,index) in props.row.hhhh[props.row.tabNum].xiaji" closable
                                    :disable-transitions="false" @close="handleTagChildrenClose(tag,props.$index,index)"
                                    type="">
                                    {{tagChildren}}
                                </el-tag>
                                <el-input class="input-new-tag" v-if="props.row.childreninputVisible"
                                    v-model="props.row.childreninputValue" ref="saveTagChildrenInput" size="small"
                                    @keyup.enter.native="handleChildrenInputConfirm(props.$index)"
                                    @blur="handleChildrenInputConfirm(props.$index)">
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small"
                                    @click="showChildrenInput(props.$index)">
                                    +口味名称
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="菜名" width="180" align="center">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p><img :src="scope.row.banner_img"
                                        alt="" style="width: 150px;max-height: 150px;"></p>
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
                    <el-table-column label="口味" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.kouwei }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.row.menuid, scope.row)">编辑</el-button>
                            </el-button>
                            <el-button size="mini" @click="handleSave(scope.row.menuid,scope.$index)">保存</el-button>
                            </el-button>
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
                expends: ['353'],
                filterData: [{ text: '八珍', value: '八珍' }, { text: '七珍', value: '七珍' }],
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
                value1: '',
                ruleForm: {
                    name: '',
                    price: '',
                    class: '',
                    value2: [],
                    peoples: '',
                    orderstatus: ''

                },
                page: 1,
                limit: 10,
                total: 0,
                tableData: [],
                rules: {
                    zhekou: [
                        { required: true, message: '请输入店铺折扣', trigger: 'blur' },
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' },
                        { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' },
                        // { type: 'date',required: true, message: '请选择时间', trigger: 'blur' }
                    ],

                }
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
                this.$axios.post('/store/menu/getKouweiList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    name: this.ruleForm.name,
                    page: this.page,
                    limit: this.limit
                }, response => {
                    
                    this.total = response.data.count
                    this.tableData = response.data.data
                    // var filterData = []
                    // var tableData = this.tableData
                    // this._data.filterData = filterData
                    this.loading = false;
                })
            },
            handleEdit(id) {
                
                
                var id = id.toString()
                
                
                if (this.expends[0] == id) {
                    this.expends = [];
                } else {
                    this.expends = [];
                    this.expends.push(id);
                    
                }

            },
            getExpends() {
                var Id = this.tableData.map(item => item.id)
                
                this.expends = Id
            },
            getRowKeys(row) {
                
                return row.menuid
            },
            tagCilckHandel(propsIndex, index) {
                
                this.tableData[propsIndex].tabNum = index;
            },
            handleTagClose(tag, propsIndex, index) {
                
                
                
                if(this.tableData[propsIndex].tabNum==0) {
                    this.tableData[propsIndex].hhhh.splice(index, 1);
                } else if(this.tableData[propsIndex].tabNum==index){
                    this.tableData[propsIndex].tabNum -= 1;
                    this.tableData[propsIndex].hhhh.splice(index, 1);
                } else {
                    this.tableData[propsIndex].hhhh.splice(index, 1);
                }
                
                
            },
            handleSave(menuid, index) {
                
                var kouweiIt = this.tableData[index].hhhh
                
                for(var i=0;i<kouweiIt.length;i++) {
                    if(kouweiIt[i].xiaji.length==0) {
                        this.$message.error('请至少添加一个"'+kouweiIt[i].name+'"的口味名称');
                        return;
                    }
                    
                }
               
                this.$axios.post('/store/menu/getKouweiAdd', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    menuid: menuid,
                    menu: this.tableData[index].hhhh
                }, response => {
                    
                    if (response.data.code == 0) {
                        this.$notify({
                            title: '成功',
                            message: '口味保存成功',
                            type: 'success'
                        });
                        this.dataInit()
                    } else {
                        this.$message.error(response.data.msg);
                    }
                })
            },
            showInput(index) {
                
                this.tableData[index].inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm(index) {
                let inputValue = this.tableData[index].inputValue;
                if (inputValue) {
                    this.tableData[index].hhhh.push({ name: inputValue, xiaji: [] });
                }
                this.tableData[index].inputVisible = false;
                this.tableData[index].inputValue = '';
            },


            handleTagChildrenClose(tag, propsIndex, index) {
                
                var tabindex = this.tableData[propsIndex].tabNum
                
                this.tableData[propsIndex].hhhh[tabindex].xiaji.splice(index, 1);
            },
            showChildrenInput(index) {
                
                this.tableData[index].childreninputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagChildrenInput.$refs.input.focus();
                });
            },
            handleChildrenInputConfirm(index) {
                var tabindex = this.tableData[index].tabNum
                
                let childreninputValue = this.tableData[index].childreninputValue;
                if (childreninputValue) {
                    this.tableData[index].hhhh[tabindex].xiaji.push(childreninputValue);
                }
                this.tableData[index].childreninputVisible = false;
                this.tableData[index].childreninputValue = '';
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

            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.dataInit()
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
            }
        }


    }
</script>

<style>
    .el-tag+.el-tag {
        margin-right: 10px;
        cursor: pointer;
    }

    .el-tag {
        cursor: pointer;
        margin-right: 10px;
    }

    .button-new-tag {
        margin-right: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-right: 10px;
        vertical-align: bottom;
    }

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .shopoffer .el-form {
        display: flex;
        display: -ms-flexbox;
    }

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