<template>
    <div class="editfoodrecord">
        <el-dialog title="选择菜品" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <el-tabs tab-position="left" @tab-click="tabclick" style="height: 400px;">
                <div class="searchBox">
                    <el-input placeholder="请输入内容" v-model="searchinput" clearable>
                    </el-input>
                    <el-button type="primary" icon="el-icon-search"></el-button>
                </div>
                <el-tab-pane label="全部">
                    <div :class="item.checked==true?'checkBoxIt foodChecked': 'checkBoxIt'"
                        v-for="(item,index) in foodList" :key="item.menuid" @click="addChecked(index)">
                        <img src="../assets/jirou.jpg" alt="">
                        <div class="checkBoxItBot">
                            <span class="checkBoxItName">{{item.name}}</span>
                            <span class="checkBoxItPrice">￥{{item.price}}</span>
                        </div>
                    </div>

                </el-tab-pane>
                <el-tab-pane label="凉菜">凉菜</el-tab-pane>
                <el-tab-pane label="新品">新品</el-tab-pane>
                <el-tab-pane label="八珍">八珍</el-tab-pane>
                <el-tab-pane label="八珍">八珍</el-tab-pane>
                <el-tab-pane label="八珍">八珍</el-tab-pane>
                <el-tab-pane label="八珍">八珍</el-tab-pane>
                <el-tab-pane label="八珍">八珍</el-tab-pane>
                <el-tab-pane label="八珍">八珍</el-tab-pane>
                <el-tab-pane label="八珍">八珍</el-tab-pane>
                <el-tab-pane label="八珍">八珍</el-tab-pane>
                <el-tab-pane label="八珍">八珍</el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="checkFoodSure">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="选择周期" :visible.sync="checkdata" width="30.5%" :before-close="handleDataClose">
            <el-checkbox-group v-model="checkList">
                <el-checkbox label="1" value="1">周一</el-checkbox>
                <el-checkbox label="2" value="2">周二</el-checkbox>
                <el-checkbox label="3" value="3">周三</el-checkbox>
                <el-checkbox label="4" value="3">周四</el-checkbox>
                <el-checkbox label="5" value="3">周五</el-checkbox>
                <el-checkbox label="6" value="3">周六</el-checkbox>
                <el-checkbox label="7" value="3">周日</el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleDataClose">取 消</el-button>
                <el-button type="primary" @click="checkdata = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- <el-dialog title="取消确认" :visible.sync="cancelSure" width="30.5%">
            <div style="font-size: 16px;margin-left: 10px;">确定取消吗？数据将不会保存</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelSure=false">取 消</el-button>
                <el-button type="primary" @click="cancelSureHandel">确 定</el-button>
            </span>
        </el-dialog> -->
        <h2 class="editfoodrecordTit">修改促销</h2>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm">
            <el-form-item label="促销特价" prop="tejia">
                <el-input v-model="ruleForm.tejia" placeholder="请输入促销特价" @input="tejiaChange"></el-input>
            </el-form-item>
            <el-form-item label="促销折扣" prop="zhekou">
                <el-input v-model="ruleForm.zhekou" placeholder="请输入促销折扣" disabled></el-input>
            </el-form-item>

            <el-form-item label="促销时间" prop="value2">
                <el-date-picker v-model="ruleForm.value2" type="daterange" align="right" unlink-panels
                    range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                    :picker-options="houPickerOptions" style="width: 100%;" @change="onPick">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="促销周期" prop="zhouqiempty">
                <el-button :type="checkList.length==0?'':'primary'" plain icon="el-icon-time" @click="checkdataTan">
                    {{checkList.length==0?'选择周期':'已选择周期'}}</el-button>
            </el-form-item>
            <el-form-item label="促销菜品" prop="tableData">
                <el-table :data="tableData" style="width: 920px" @click="addfood" v-loading="loading">
                    <!-- <template slot="empty">
                        <el-link type="primary" @click="dialogVisible=true">选择菜品</el-link>
                    </template> -->
                    <el-table-column label="菜品名称" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="售价" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.price }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="特价" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.tejia }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.type" :active-value="1" :inactive-value="0"
                                @change="switchChange(scope.row.zkid)"></el-switch>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>

            <el-form-item style="margin-top: 30px;">
                <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
                <el-button @click='cancelSureHandel'>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            var checkPrice = (rule, value, callback) => {
                var yuanprice = Number(this.yuanprice)
                if (value > yuanprice) {
                    return callback(new Error('特价不能大于原价' + yuanprice));
                } else {
                    callback()
                }
            };
            return {
                cancelSure: false,
                loading: true,
                searchinput: '',
                tableData: [],
                dialogVisible: false,
                checkdata: false,
                yuanprice: '',
                inircheckData:[],
                ruleForm: {
                    tejia: '',
                    zhekou: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    dialogImageUrl: '',
                    dialogVisible: false,
                    status: true,
                    value1: '',
                    value2: [],
                    starttime: '',
                    endtime: ''
                },
                rules: {
                    tejia: [
                        { validator: checkPrice, trigger: 'blur' },
                        { required: true, message: '请输入促销特价', trigger: 'blur' },
                        { pattern: /^[0-9]+([.][0-9]{2}){0,1}$/, message: '只能输入数字且保留小数点后两位', trigger: 'blur' },
                    ],
                    zhekou: [
                        { required: true, message: '请输入促销折扣', trigger: 'blur' },
                    ],
                    value2: [
                        { required: true, message: '请输入促销时间', trigger: 'blur' },
                    ],
                    // checkList: [
                    //     {required: true, message: '请选择促销周期', trigger: 'change' },
                    // ],
                    // tableData: [
                    //     { required: true, message: '请至少选择一个菜品', trigger: 'change' }
                    // ],
                },
                foodList: [
                    {
                        checked: false,
                        banner_img: "https://ceshi.galaxyhigh.cn//public/dyimg/20191223/201912231577092107969.jpg",
                        classes: "凉菜",
                        enable: 1,
                        gg: "",
                        ggid: 0,
                        menuid: 292,
                        name: "干煸豆角",
                        price: "20.80"
                    },
                    {
                        checked: false,
                        banner_img: "https://ceshi.galaxyhigh.cn//public/dyimg/20191223/201912231577092107969.jpg",
                        classes: "凉菜",
                        enable: 1,
                        gg: "",
                        ggid: 0,
                        menuid: 293,
                        name: "干煸豆角",
                        price: "20.80"
                    },
                    {
                        checked: false,
                        banner_img: "https://ceshi.galaxyhigh.cn//public/dyimg/20191223/201912231577092107969.jpg",
                        classes: "凉菜",
                        enable: 1,
                        gg: "",
                        ggid: 0,
                        menuid: 294,
                        name: "干煸豆角",
                        price: "20.80"
                    }
                ],
                foodChecked: [],
                checkList: [],
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

            }
        },
        created() {
            this.token = this.$Cookies.get('token');
            this.bussiness = JSON.parse(this.$Cookies.get('bussiness'));
            this.globId = this.$route.query.globId;
            this.$axios.post('/store/Promotion/getTjzkForm', {
                token: this.token,
                bid: this.bussiness.bid,
                zkid: this.globId
            }, response => {
                
                
                this.yuanprice = response.data.data.price
                this.ruleForm.tejia = response.data.data.tejia
                this.ruleForm.zhekou = response.data.data.zk
                this.ruleForm.value2.push(response.data.data.starttime)
                this.ruleForm.value2.push(response.data.data.endtime)
                // var checkList = JSON.parse(JSON.stringify(response.data.data.zhouqi))
                for (var i = 0; i < response.data.data.zhouqi.length; i++) {
                    this.checkList.push(JSON.stringify(response.data.data.zhouqi[i]))
                }
                this.tableData.push({
                    menuid: response.data.data.menuid,
                    name: response.data.data.name,
                    price: response.data.data.price,
                    tejia: response.data.data.tejia,
                    type: response.data.data.type,
                    ggid: response.data.data.ggid
                })
                
                this.loading = false;
            })
        },
        methods: {
            tabclick(e) {
                
                // var foodclassId = e.$attrs.id
                
                
            },
            checkdataTan() {
                this.inircheckData = this.checkList
                // this._data.checkList=[];
                this._data.checkdata = true
            },
            handleDataClose() {
                this.$confirm('确认取消？')
                    .then(_ => {
                        this.checkList=this.inircheckData;
                        this.checkdata=false;
                        done();
                    })
                    .catch(_ => { });
            },
            cancelSureHandel() {
                this.$confirm('确认取消？')
                    .then(_ => {
                        this.$router.go(-1)
                        done();
                    })
                    .catch(_ => { });
            },
            addChecked(index) {
                if (this._data.foodList[index].checked == true) {
                    
                    this._data.foodList[index].checked = false;
                } else {
                    
                    this._data.foodList[index].checked = true;
                }
                
                
                
            },
            submitForm(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (this.checkList.length == 0) {
                        this.$message.error('周期不可为空')
                        return;
                    }
                    if (valid) {
                        this.ruleForm.starttime = this.ruleForm.value2[0]
                        this.ruleForm.endtime = this.ruleForm.value2[1]
                        this.$axios.post('/store/Promotion/getTjzkEdit', {
                            token: this.token,
                            bid: this.bussiness.bid,
                            zkid: this.globId,
                            menu: this.tableData,
                            zhouqi: this.checkList,
                            tejia: this.ruleForm.tejia,
                            zk: this.ruleForm.zhekou,
                            starttime: this.ruleForm.starttime,
                            endtime: this.ruleForm.endtime,
                            type: this.tableData[0].type
                        }, response => {
                            if (response.data.code == 0) {
                                this.$notify({
                                    title: '成功',
                                    message: '折扣修改成功',
                                    type: 'success'
                                });
                                this.$router.push({ path: '/specialoffer' })
                            }
                            
                        })
                        // alert('submit!');
                    } else {
                        
                        return false;
                    }
                })
            },
            handleRemove(file, fileList) {
                
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            checkFoodSure() {
                this._data.dialogVisible = false
                
                this._data.foodList.forEach(foodItem => {
                    if (foodItem.checked == true) {
                        this._data.foodChecked.push(foodItem)
                        
                    }
                });
            },
            handleDelete(index, row) {
                
            },
            addfood() {
                
            },
            switchChange() {

            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this._data.dialogVisible = false
                        this._data.checkdata = false
                        done();
                    })
                    .catch(_ => { });
            },
            onPick(date) {
                if (date == null) {
                    this.form.starttime = ''
                    this.form.endtime = ''
                    return
                }
                this.form.starttime = date[0]
                this.form.endtime = date[1]
            },
            tejiaChange(val) {
                
                this.ruleForm.zhekou = ((val / this.tableData[0].price) * 10).toFixed(1);
            }
        }
    }
</script>

<style>
    .el-dialog__body {
        padding: 10px;
    }

    .searchBox {
        display: flex;
        display: -ms-flexbox;
        margin-bottom: 15px;
    }

    .searchBox .el-input {
        width: 500px;
        margin-right: 15px;
    }

    .editfoodrecord {
        width: 1000px;
        margin: 0 auto;
    }

    .editfoodrecordTit {
        text-align: center;
        margin: 13px 0 20px 0;
        font-weight: 400;
    }

    .editfoodrecord .el-form-item {
        margin-bottom: 25px;
    }

    .editfoodrecord .el-table__empty-text {
        width: 100%;
        /* color: #0000EE; */
        cursor: pointer;
    }

    .checkBoxIt {
        float: left;
        /* width: 31%; */
        border: 1px solid #ccc;
        border-radius: 12px;
        overflow: hidden;
        /* margin-right: 3.33%; */
        margin-bottom: 20px;
        cursor: pointer;
    }

    .checkBoxItAct {
        border: 1px solid #66B1FF;
    }

    /* .checkBoxIt:nth-child(4n) {
        margin-right: 0;
    } */



    .checkBoxItBot {
        display: flex;
        justify-content: space-between;
        display: -ms-flexbox;
        -ms-flex-pack: justify;
        height: 30px;
        line-height: 30px;
        padding: 0 15px;
    }

    .checkBoxItName {}

    .checkBoxItPrice {
        color: red;
    }

    .el-tab-pane {
        overflow: hidden;
        /* margin-left: 10px; */
    }

    .el-tabs__content {
        margin-left: 20px;
    }

    .el-tabs__content {
        height: 100%;
        overflow-y: scroll;
    }

    /* .foodChecked {
        border: 3px solid #409EFF;
    } */
</style>