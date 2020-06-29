<template>
    <div class="foodcategory">
        <el-dialog title="新增桌位" :visible.sync="addTableVisible" width="30%" :before-close="handleClose">
            <el-form ref="addtableform" :rules="rules" :model="addtableform" label-width="80px">
                <el-form-item label="桌位名称" prop="name">
                    <el-input v-model="addtableform.name" placeholder="请输入桌位名称"></el-input>
                </el-form-item>
                <div class="rongnai">
                    <el-form-item label="容纳人数" prop="peoplelow">
                        <el-input v-model="addtableform.peoplelow" placeholder="最低容纳人数"></el-input>
                    </el-form-item>
                    <span style="margin: 0 5px;">-</span>
                    <el-form-item label="容纳人数" prop="peoplehigh">
                        <el-input v-model="addtableform.peoplehigh" placeholder="最高容纳人数"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="桌位数量" prop="num">
                    <el-input v-model="addtableform.num" placeholder="请输入桌位数量"></el-input>
                </el-form-item>
                <el-form-item label="桌位金额" prop="money">
                    <el-input v-model="addtableform.money" placeholder="请输入预约桌位最低消费金额"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="addTableSure('addtableform')">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="编辑桌位" :visible.sync="edittableVisible" width="30%" :before-close="handleClose">
            <el-form ref="form" :model="edittableform" :rules="rules" label-width="80px">
                <el-form-item label="桌位名称" prop="name">
                    <el-input v-model="edittableform.name" placeholder="请输入桌位名称"></el-input>
                </el-form-item>
                <div class="rongnai">
                    <el-form-item label="容纳人数" prop="peoplelow">
                        <el-input v-model="edittableform.peoplelow" placeholder="最低容纳人数"></el-input>
                    </el-form-item>
                    <span style="margin: 0 5px;">-</span>
                    <el-form-item label="容纳人数" prop="peoplehigh">
                        <el-input v-model="edittableform.peoplehigh" placeholder="最高容纳人数"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="桌位数量" prop="num">
                    <el-input v-model="edittableform.num" placeholder="请输入桌位数量"></el-input>
                </el-form-item>
                <el-form-item label="桌位金额" prop="money">
                    <el-input v-model="edittableform.money" placeholder="请输入预约桌位最低消费金额"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="editTableSure">确 定</el-button>
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
                        <el-input v-model="form.name" placeholder="请输入桌位名称" size="medium"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="tableTitBot">
                <div class="tableTitBotLf">
                    <span>桌位总开关：</span>
                    <el-switch v-model="tableType" :active-value="1" :inactive-value="0" @change="enableSwitch">
                    </el-switch>
                </div>
                <div class="tableTitBotRh">
                    <el-button type="success" size="small" icon="el-icon-search" @click="foodsearch">查询</el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="resetForm('form')">清空
                    </el-button>
                    <el-button type="primary" size="small" icon="el-icon-folder-add" @click="addTableVisible=true">新增
                    </el-button>
                </div>
            </div>
        </div>
        <div class="foodBotBox" style="background-color: transparent;padding: 0;min-height: 150px;" v-loading="loading"
            element-loading-text="拼命加载中" element-loading-background="rgba(255, 255, 255, 1)">
            <el-row :gutter="20" v-show='jiaBox'>
                <el-col :span="6">
                    <div class="grid-content bg-purple category addcategoryBox">
                        <i class="el-icon-circle-plus addcategory" @click="addTableVisible=true"></i>
                    </div>
                </el-col>
                <el-col :span="6" class="categoryBox" v-for="(item,index) in foodcategoryData" :key="index">
                    <div class="grid-content bg-purple category">
                        <div class="categoryTop">
                            <i class="el-icon-download categoryEdit" @click="categoryDown(item.tableid)"
                                style="margin-right:10px"></i>
                            <i class="el-icon-edit-outline categoryEdit"
                                @click="categoryEdit(item.tableid,item.name,item.peoplelow,item.peoplehigh,item.num,item.money)"></i>
                            <el-popconfirm confirmButtonText='确定' cancelButtonText='再想想' icon="el-icon-info"
                                iconColor="red" title="确定删除该桌位吗" @onConfirm="tableDel(item.tableid,index)">
                                <i class="el-icon-delete categoryDel" slot="reference"></i>
                            </el-popconfirm>
                        </div>
                        <div class="categoryBot">
                            {{item.name}}
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>

</template>
<script>

    import axios from 'axios'
    export default {
        data() {
            return {
                loading: true,
                jiaBox: false,
                tableType: null,
                edittableVisible: false,
                addTableVisible: false,
                form: {
                    name: '',
                    price: '',
                    class: '',
                    status: '',
                },
                tableId: '',
                edittableform: {
                    name: '',
                    peoplelow: '',
                    peoplehigh: '',
                    num: '',
                    money: ''
                },
                addtableform: {
                    name: '',
                    peoplelow: '',
                    peoplehigh: '',
                    num: '',
                    money: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入桌位名称', trigger: 'blur' },
                        { required: true, message: '请输入桌位名称', trigger: 'change' },
                    ],
                    peoplelow: [
                        { required: true, message: '请输入桌位最低容纳人数', trigger: 'blur' },
                        { required: true, message: '请输入桌位最低容纳人数', trigger: 'change' },
                    ],
                    peoplehigh: [
                        { required: true, message: '请输入桌位最高容纳人数', trigger: 'blur' },
                        { required: true, message: '请输入桌位最高容纳人数', trigger: 'change' },
                    ],
                    money: [
                        { required: true, message: '请输入桌位金额', trigger: 'blur' },
                        { required: true, message: '请输入桌位金额', trigger: 'change' },
                    ],
                    num: [
                        { required: true, message: '请输入桌位数量', trigger: 'blur' },
                        { required: true, message: '请输入桌位数量', trigger: 'change' },
                    ],


                },
                foodcategoryData: []
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
                this.$axios.post('/store/Discount/getTableList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    name: this.form.name
                }, response => {
                    
                    this.loading = false;
                    this.jiaBox = true;
                    this.tableType = response.data.type
                    this.foodcategoryData = response.data.data
                })
            },
            foodsearch() {
                this.dataInit()
            },
            enableSwitch() {
                this.$axios.post('/store/Discount/getTableType', {
                    token: this.token,
                    bid: this.bussiness.bid
                }, response => {
                    
                })
            },
            editTableSure() {
                this.$axios.post('/store/Discount/getTableEdit', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    tableid: this.tableId,
                    name: this.edittableform.name,
                    peoplelow: this.edittableform.peoplelow,
                    peoplehigh: this.edittableform.peoplehigh,
                    num: this.edittableform.num,
                    money: this.edittableform.money,
                }, response => {
                    
                    if (response.data.code == 0) {
                        this.$notify({
                            title: '成功',
                            message: '桌位修改成功',
                            type: 'success'
                        });
                        this.edittableVisible = false;
                        this.dataInit();
                    }
                })
            },
            categoryEdit(tableId, name, peoplelow, peoplehigh, num, money) {
                this.tableId = tableId;
                this.edittableVisible = true;
                this.edittableform.name = name;
                this.edittableform.peoplelow = peoplelow;
                this.edittableform.peoplehigh = peoplehigh;
                this.edittableform.num = num;
                this.edittableform.money = money;
            },
            resetForm(formName) {
                
                this.$refs[formName].resetFields();
                this.dataInit()
            },
            addTableSure(formName) {

                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        this.$axios.post('/store/Discount/getTableAdd', {
                            token: this.token,
                            bid: this.bussiness.bid,
                            tableid: this.tableId,
                            name: this.addtableform.name,
                            peoplelow: this.addtableform.peoplelow,
                            peoplehigh: this.addtableform.peoplehigh,
                            num: this.addtableform.num,
                            money: this.addtableform.money,
                        }, response => {
                            
                            if (response.data.code == 0) {
                                this.$notify({
                                    title: '成功',
                                    message: '桌位新增成功',
                                    type: 'success'
                                });
                                this.addTableVisible = false;
                                this.dataInit();
                            }
                        })
                    }
                })
            },
            categoryDown(tableid) {
                axios({
                method: 'post',
                url: 'https://store.galaxyhigh.cn/store/Discount/getTableDownload',
                data: {
                    token:this.token,
                    bid:this.bussiness.bid,
                    tableid:tableid
                },
                headers: {
                    Accept: 'application/json'
                },
                responseType: 'blob'
            }).then(response => {
                
                let data = response.data;
                let fileReader = new FileReader();
                fileReader.onload = function() {
                    try {
                        let jsonData = JSON.parse(this.result);  // 说明是普通对象数据，后台转换失败
                    if (jsonData.code) {
                        that.$message.error(jsonData.message)
                    }
                    } catch (err) {   // 解析成对象失败，说明是正常的文件流
                        const blob = new Blob([response.data], {type: 'application/zip'});
                        // const filename = response.headers['content-disposition'];
                        const downloadElement = document.createElement('a');
                        const href = window.URL.createObjectURL(blob); //创建下载的链接
                        downloadElement.href = href;
                        // [downloadElement.download] = [filename.split('=')[1]];
                        document.body.appendChild(downloadElement);
                        downloadElement.click(); //点击下载
                        document.body.removeChild(downloadElement); //下载完成移除元素
                        window.URL.revokeObjectURL(href); //释放blob对
                    }
                };
                fileReader.readAsText(data)
            }).catch((error) => {
 
            })
            },
            tableEdit(index) {
                
                this.edittableVisible = true;
            },
            tableDel(tableid, index) {
                this.$axios.post('/store/Discount/getTableDel', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    tableid: tableid
                }, response => {
                    
                    if (response.data.code == 0) {
                        this.foodcategoryData.splice(index, 1)
                        this.$notify({
                            title: '成功',
                            message: '桌位删除成功',
                            type: 'success'
                        });
                    }
                })
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.addTableVisible = false
                        this.edittableVisible = false
                        done();
                    })
                    .catch(_ => { });
            }
        },
    }
</script>
<style lang="scss">
    .tableTitBot {
        display: flex;
        display: -ms-flex;
        justify-content: space-between;
        -ms-flex-pack: justify;
        align-items: center;
        -ms-flex-align: center;
        padding: 10px;
    }

    .foodcategory {

        .el-row {
            margin-bottom: 20px;

            &:last-child {
                margin-bottom: 0;
            }
        }

        .el-dialog__body {
            padding-right: 30px;
        }

        .categoryBot {
            height: 100%;
            display: flex;
            display: -ms-flexbox;
            justify-content: center;
            -ms-flex-pack: center;
            align-items: center;
            -ms-flex-align: center;
            margin-top: -30px;

        }

        .categoryDel {
            color: #F56C6C;
            cursor: pointer;
            font-size: 20px;
            margin-left: 10px;
        }

        .categoryTop {
            display: flex;
            display: -ms-flexbox;
            justify-content: flex-end;
            -ms-flex-pack: end;
            padding: 10px 20px 0 0;
        }

        .categoryEdit {
            color: #409EFF;
            cursor: pointer;
            font-size: 20px;
        }

        .categoryBox {
            transition: 0.5s;
            margin-bottom: 20px;
        }

        .addcategoryBox {
            display: flex;
            display: -ms-flexbox;
            justify-content: center;
            -ms-flex-pack: center;
            align-items: center;
            -ms-flex-align: center;
            margin-bottom: 20px;
        }

        .addcategory {
            color: #409EFF;
            font-size: 100px;
            cursor: pointer;
        }

        .category {
            height: 150px;
        }

        .el-col {
            border-radius: 4px;
        }

        .bg-purple-dark {
            background: #99a9bf;
        }

        .bg-purple {
            background: #fff;
        }

        .bg-purple-light {
            background: #e5e9f2;
        }

        .grid-content {
            border-radius: 4px;
            min-height: 36px;
        }

        .row-bg {
            padding: 10px 0;
            background-color: #f9fafc;
        }
        .rongnai {
            display: flex;
            display: -ms-flexbox;
        }
    }
</style>