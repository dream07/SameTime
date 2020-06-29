<template>
    <div class="addfoodrecord">
        <el-dialog title="选择菜品" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <el-tabs tab-position="left" @tab-click="tabclick" style="height: 400px;" v-model="tabvalue">
                <div class="searchBox">
                    <el-input placeholder="请输入内容" v-model="searchinput" clearable>
                    </el-input>
                    <el-button type="primary" icon="el-icon-search" @click="searchFood"></el-button>
                </div>
                <el-tab-pane label="全部" name="-1" value='-1'>
                    <div v-loading="loading" style="width: 100%;height: 100%;">
                        <el-row :gutter="20">
                            <el-col :span="8" v-for="(item,index) in foodList" :key="index">
                                <div :class="item.enable==0?'checkBoxIt foodChecked': 'checkBoxIt'"
                                    @click="addChecked(index,item.menuid,item.name,item.price,item.ggid)">
                                    <img :src="item.banner_img" alt="">
                                    <div class="checkBoxItBot">
                                        <div>
                                            <el-checkbox :value="item.enable==0" style="margin-right: 5px;">
                                            </el-checkbox>
                                            <span class="checkBoxItName">{{item.name}}</span>
                                        </div>
                                        <span class="checkBoxItPrice">￥{{item.price}}</span>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
                <el-tab-pane v-for="(item,index) in foodClass" :key="index" :label="item.name" :name="item.classid+''"
                    style="width: 100%;height: 100%;">
                    <div v-loading="loading" style="width: 100%;height: 100%;">
                        <el-row :gutter="20">
                            <el-col :span="8" v-for="(item,index) in foodList" :key="index">
                                <div :class="item.enable==0?'checkBoxIt foodChecked': 'checkBoxIt'"
                                    @click="addChecked(index,item.menuid,item.name,item.price,item.ggid)">
                                    <img :src="item.banner_img" alt="">
                                    <div class="checkBoxItBot">
                                        <div>
                                            <el-checkbox :value="item.enable==0" style="margin-right: 5px;">
                                            </el-checkbox>
                                            <span class="checkBoxItName">{{item.name}}</span>
                                        </div>
                                        <span class="checkBoxItPrice">￥{{item.price}}</span>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>

                    </div>
                </el-tab-pane>

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
        <el-dialog title="取消确认" :visible.sync="cancelSure" width="30.5%">
            <div style="font-size: 16px;margin-left: 10px;">确定取消吗？数据将不会保存</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelSure=false">取 消</el-button>
                <el-button type="primary" @click="cancelSureHandel">确 定</el-button>
            </span>
        </el-dialog>
        <h2 class="addfoodrecordTit">新增促销</h2>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm">
            <el-form-item label="促销折扣" prop="zhekou">
                <el-input v-model="ruleForm.zhekou" placeholder="请输入促销折扣"></el-input>
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
                <el-button icon='el-icon-folder-add' size="mini" @click="checkFood">添加菜品</el-button>
                <el-table :data="tableData" style="width: 920px" @click="addfood">

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
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>

            <el-form-item style="margin-top: 30px;">
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click='cancelSureHandel'>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            var checkzheKou = (rule, value, callback) => {
                if (value==0||value>9.9) {
                    return callback(new Error('折扣值须在0.1-9.9'));
                }else {
                    callback()
                }
            };
            return {
                cancelSure: false,
                firstInit: false,
                tabvalue: '-1',
                loading: true,
                searchinput: '',
                tableData: [],
                dialogVisible: false,
                checkdata: false,
                ruleForm: {
                    zhekou: '',
                    value2: '',
                    starttime: '',
                    endtime: ''
                },
                rules: {
                    zhekou: [
                        { required: true, message: '请输入促销折扣'},
                        { pattern: /^[0-9]+([.][0-9]{1}){0,1}$/, message: '只能输入数字且保留小数点后一位' },
                        { validator:checkzheKou}
                    ],
                    value2: [
                        { required: true, message: '请输入促销时间'},
                    ],

                    // tableData: [
                    //     { type: 'array', required: true, message: '请至少选择一个菜品', trigger: 'change' }
                    // ],

                },
                inircheckData:[],
                foodClass: [],
                foodList: [],
                foodChecked: [],
                checkList: [],
                initTableData: [],
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
        },
        methods: {
            checkFood() {
                // this.foodList = [];
                if (this.firstInit == false) {
                    
                    this.loading = true
                    this.firstInit = true
                }
                this.dialogVisible = true;
                // this.loading = true;
                
                this.$axios.post('/store/menu/getClassList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    name: '',
                }, response => {
                    
                    this.foodClass = response.data.data.menu
                })
                this.$axios.post('/store/Promotion/getMenuList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    class: this.tabvalue,
                    name: '',
                }, response => {
                    
                    this.foodList = response.data.date;
                    var initTableData = this.initTableData
                    var foodList = this.foodList
                    for (var j = 0; j < initTableData.length; j++) {
                        for (var i = 0; i < foodList.length; i++) {
                            if (initTableData[j].menuid == foodList[i].menuid && initTableData[j].ggid == foodList[i].ggid) {
                                foodList[i].enable = 0
                            }
                        }
                    }
                    this.loading = false
                })
            },
            tabclick(val) {
                this.loading = true
                // var foodclassId = e.$attrs.id
                
                this.tabvalue = val.name
                
                this.$axios.post('/store/Promotion/getMenuList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    class: val.name,
                    name: ''
                }, response => {
                    
                    this.foodList = response.data.date;
                    var initTableData = this.initTableData
                    var foodList = this.foodList
                    for (var j = 0; j < initTableData.length; j++) {
                        for (var i = 0; i < foodList.length; i++) {
                            if (initTableData[j].menuid == foodList[i].menuid && initTableData[j].ggid == foodList[i].ggid) {
                                this.foodList[i].enable = 0
                            }
                        }
                    }
                    this.loading = false
                })
            },
            handleDataClose() {
                this.$confirm('确认取消？')
                    .then(_ => {
                        this.checkList=this.inircheckData;
                        this.checkdata=false;
                        done();
                    })
                    .catch(_ => {});
            },
            checkdataTan() {
                this.inircheckData = this.checkList
                // this._data.checkList = [];
                this._data.checkdata = true
            },
            searchFood() {
                this.loading = true
                // var foodclassId = e.$attrs.id
                
                
                this.$axios.post('/store/Promotion/getMenuList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    class: '-1',
                    name: this.searchinput
                }, response => {
                    
                    this.foodList = response.data.date;
                    var initTableData = this.initTableData
                    var foodList = this.foodList
                    for (var j = 0; j < initTableData.length; j++) {
                        for (var i = 0; i < foodList.length; i++) {
                            if (initTableData[j].menuid == foodList[i].menuid && initTableData[j].ggid == foodList[i].ggid) {
                                this.foodList[i].enable = 0
                            }
                        }
                    }
                    this.loading = false
                })
            },
            cancelSureHandel() {
                this.$confirm('确认取消？')
                    .then(_ => {
                        this.$router.go(-1)
                        done();
                    })
                    .catch(_ => { });
            },
            removeAaary(_arr, _obj, menuid) {
                var length = _arr.length;
                for (var i = 0; i < length; i++) {
                    if (_arr[i].ggid == _obj && _arr[i].menuid == menuid) {
                        
                        return _arr.splice(i, 1);  //删除并返回数组的最后一个元素
                    }
                }
            },

            addChecked(index, menuid, name, price, ggid) {
                if (this.foodList[index].enable == 0) {
                    this.foodList[index].enable = 1;
                    var initTableData = this.initTableData
                    
                    this.removeAaary(initTableData, ggid, menuid)
                    
                    return
                }
                this.foodList[index].enable = 0
                // this.initTableData.push({ name: name, menuid: menuid, price: price, ggid: ggid });
                
                
                

                
                
                
            },
            submitForm(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (this.checkList.length == 0) {
                        this.$message.error('周期不可为空')
                        return;
                    }
                    if (valid) {
                        this.$axios.post('/store/Promotion/getTjzkAdd', {
                            token: this.token,
                            bid: this.bussiness.bid,
                            menu: this.tableData,
                            zk: this.ruleForm.zhekou,
                            zhouqi: this.checkList,
                            starttime: this.ruleForm.starttime,
                            endtime: this.ruleForm.endtime
                        }, response => {
                            if (response.data.code == 0) {
                                this.$notify({
                                    title: '成功',
                                    message: '折扣新增成功',
                                    type: 'success'
                                });
                                this.$router.push({ path: '/specialoffer' })
                            }
                            
                        })
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
                this._data.dialogVisible = false;
                 var foodList = this.foodList
                var nweFoodList = []
                for (var i = 0; i < foodList.length; i++) {
                    if (foodList[i].enable == 0) {
                        
                        
                        
                        nweFoodList.push({ name: foodList[i].name, menuid: foodList[i].menuid, num: 1, price: foodList[i].price, ggid: foodList[i].ggid })
                    }
                }
                for (var j = 0; j < nweFoodList.length; j++) {
                    this.tableData.push(nweFoodList[j])
                }
               
                this._data.foodCheckedTan = false;
        
                

            },
            handleDelete(index, row) {
                this.tableData.splice(index, 1)
                
            },
            addfood() {
                
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.dialogVisible = false
                        this.checkdata = false
                        done();
                    })
                    .catch(_ => { });
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
        }
    }
</script>

<style>
    .addfoodrecord .el-dialog__body {
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

    .addfoodrecord {
        width: 1000px;
        margin: 0 auto;
    }

    .addfoodrecordTit {
        text-align: center;
        margin: 13px 0 20px 0;
        font-weight: 400;
    }

    .addfoodrecord .el-form-item {
        margin-bottom: 25px;
    }

    .addfoodrecord .el-table__empty-text {
        width: 100%;
        /* color: #0000EE; */
        cursor: pointer;
    }

    .checkBoxIt {
        float: left;
        width: 100%;
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

    .checkBoxIt img {
        width: 100%;
    }

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


    .checkBoxIt img {
        width: 100%;
        height: 144.7px;
    }
</style>