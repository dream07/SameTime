<template>
    <div class="editfoodrecord">
        <el-dialog title="选择菜品" :visible.sync="foodCheckedTan" width="50%" :before-close="handleClose">
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
                                            <el-checkbox :value="item.enable==0" style="margin-right: 5px">
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
        <h2 class="editfoodrecordTit">新增套餐</h2>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="编号:" prop="name">
                <el-input v-model="ruleForm.number" placeholder="请输入套餐名称" disabled></el-input>
            </el-form-item>
            <el-form-item label="套餐名称:" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入套餐名称"></el-input>
            </el-form-item>
            <el-form-item label="套餐原价格:" prop="yuanjia">
                <el-input v-model="ruleForm.yuanjia" placeholder="选择菜品将自动生成" disabled=""></el-input>
            </el-form-item>
            <el-form-item label="特价:" prop="price">
                <el-input v-model="ruleForm.price" placeholder="请输入套餐价格"></el-input>
            </el-form-item>
            <el-form-item label="类别" prop="classid">
                <el-select v-model="ruleForm.classid" placeholder="请选择菜品类别">
                    <el-option v-for="item in category" :key="item.classid" :label="item.name" :value="item.classid">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品状态:">
                <el-switch v-model="ruleForm.enable"></el-switch>
            </el-form-item>
            <el-form-item label="排序:">
                <el-input v-model="ruleForm.sort" placeholder="数字越小越靠前"></el-input>
            </el-form-item>
            <el-form-item label="说明:">
                <el-input type="textarea" v-model="ruleForm.content" rows="5" maxlength="30" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="预览图:">
                <el-upload action="https://store.galaxyhigh.cn/store/server/upDataImg" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess"
                    :limit="1" :multiple="true">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="促销菜品:" prop="tableData">
                <el-button icon='el-icon-folder-add' size="mini" @click="checkFood">添加菜品</el-button>
                <el-table :data="tableData" style="width: 920px">
                    <!-- <template slot="empty">
                        <el-link type="primary" @click="foodCheckedTan=true">选择菜品</el-link>
                    </template> -->
                    <el-table-column label="菜品名称:" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="售价:" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.price }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="数量" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.num }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作:" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleDelete(scope.$index)" type="danger" slot="reference"
                                style="margin-left: 10px;">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="cancelSureHandel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            var checkPrice = (rule, value, callback) => {
                var yuanprice = Number(this.ruleForm.yuanjia)
                if (value > yuanprice) {
                    return callback(new Error('特价不能大于原价' + yuanprice));
                } else {
                    callback()
                }
            };
            return {
                cancelSure: false,
                firstInit: false,
                tabvalue: '-1',
                loading: true,
                searchinput: '',
                foodClass: [],
                foodList: [],
                foodChecked: [],
                checkList: [],
                initTableData: [],
                ruleForm: {
                    number: '',
                    name: '',
                    classid: '',
                    yuanjia: null,
                    price: '',
                    sort: '',
                    enable: '',
                    content: '',
                    banner_img: []
                },
                moutedTable: [],
                category: [],
                dialogImageUrl: '',
                dialogVisible: false,
                rules: {
                    name: [
                        { required: true, message: '请输入套餐名称', trigger: 'blur' },
                    ],
                    classid: [
                        { required: true, message: '请选择菜品类别', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '请输入套餐特价', trigger: 'change' },
                        { required: true, message: '请输入套餐特价', trigger: 'blur' },
                        { validator: checkPrice, trigger: 'blur' },
                        { pattern: /^[0-9]+([.][0-9]{2}){0,1}$/, message: '只能输入数字且保留小数点后两位' }
                    ],
                    region: [
                        { required: true, message: '请选择套餐类别', trigger: 'blur' },
                        { required: true, message: '请选择套餐类别', trigger: 'change' }
                    ]

                },
                checkdata: false,
                foodCheckedTan: false,
                tableData: []
            }
        },
        created() {
            this.token = this.$Cookies.get('token');
            this.bussiness = JSON.parse(this.$Cookies.get('bussiness'));
            this.$axios.post('/store/menu/getClassList', {
                token: this.token,
                bid: this.bussiness.bid,
                name: ''
            }, response => {
                
                this.category = response.data.data.menu
            })
            this.$axios.post('/store/menu/getMenuNumber', {
                token: this.token,
                bid: this.bussiness.bid,
                type: 1
            }, response => {
                
                this.ruleForm.number = response.data.data.numbre
            })
        },
        methods: {
            checkdataTan() {
                this._data.checkList = [];
                this._data.checkdata = true
            },
            removeAaary(_arr, _obj, menuid) {
                var length = _arr.length;
                for (var i = 0; i < length; i++) {
                    if (_arr[i].ggid == _obj && _arr[i].menuid == menuid) {
                        
                        return _arr.splice(i, 1);  //删除并返回数组的最后一个元素
                    }
                }
            },
            cancelSureHandel() {
                this.$confirm('确认取消？')
                    .then(_ => {
                        this.$router.go(-1)
                        done();
                    })
                    .catch(_ => { });
            },
            checkFoodSure() {
                var foodList = this.foodList
                var nweFoodList = []
                for (var i = 0; i < foodList.length; i++) {

                    if (foodList[i].enable == 0) {
                        
                        
                        
                        nweFoodList.push({ name: foodList[i].name, menuid: foodList[i].menuid, num: 1, price: foodList[i].price, ggid: foodList[i].ggid })
                    }
                }
                this._data.foodCheckedTan = false;
                var initTableData = this.initTableData;
                var tableData = this.tableData;
                
                // if (this.tableData.length == 0) {
                //     this.tableData = JSON.parse(JSON.stringify(nweFoodList))
                // }
                // this.tableData = JSON.parse(JSON.stringify(nweFoodList))
                var tableDataSon = tableData
                var count = 0;
                for (var j = 0; j < nweFoodList.length; j++) {
                    for (var i = 0; i < tableData.length; i++) {
                        if (nweFoodList[j].menuid == tableData[i].menuid && nweFoodList[j].ggid == tableData[i].ggid) {
                            
                            this.tableData[i].num += 1
                            count++;
                            // return
                        }
                    }
                    if (count == 0) {
                        this.tableData.push(nweFoodList[j])
                    }
                    count = 0;

                    // this.tableData.push(nweFoodList[j])
                }

                var tableData = this.tableData
                var computedPrice = 0
                for (var i = 0; i < tableData.length; i++) {
                    computedPrice += (Number(tableData[i].num) * Number(tableData[i].price))
                }
                this.ruleForm.yuanjia = computedPrice
                

            },
            handleDelete(index) {
                this.tableData.splice(index, 1)
                var tableData = this.tableData
                var computedPrice = 0
                for (var i = 0; i < tableData.length; i++) {
                    
                    
                    computedPrice += (Number(tableData[i].num) * Number(tableData[i].price))
                }
                
                this.ruleForm.yuanjia = computedPrice

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
            addChecked(index, menuid, name, price, ggid) {
                
                if (this.foodList[index].enable == 0) {
                    
                    this.foodList[index].enable = 1;
                    var initTableData = this.initTableData
                    
                    this.removeAaary(initTableData, ggid, menuid)
                    
                    return
                }
                this.foodList[index].enable = 0
                // var initTableData = this.initTableData

                // for (var j = 0; j < initTableData.length; j++) {
                //     if (initTableData[j].menuid == menuid && initTableData[j].ggid == ggid) {
                //         this.initTableData[i].num += 1
                //     }
                //     return
                // }

                // this.initTableData.push({ name: name, menuid: menuid, num: 1, price: price, ggid: ggid });
                
                
                

                
                
                
            },
            handleSuccess(response, file, fileList) {
                // this.ruleForm.banner_img.push(fileList.response.url)
                this.ruleForm.banner_img = [];
                for (var i = 0; i < fileList.length; i++) {
                    this.ruleForm.banner_img.push(fileList[i].response.url)

                }
                
                return;
            },
            checkFood() {
                this.foodCheckedTan = true
                if (this.firstInit == false) {
                    
                    this.loading = true
                    this.firstInit = true
                }
                // this.dialogVisible = true;
                // this.loading = true;
                
                this.$axios.post('/store/menu/getClassList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    name: '',
                }, response => {
                    
                    this.foodClass = response.data.data.menu
                })
                this.$axios.post('/store/Promotion/getTaocanMenu', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    class: this.tabvalue,
                    name: '',
                }, response => {
                    
                    var initTableData = this.initTableData
                    var foodList = response.data.date
                    for (var i = 0; i < foodList.length; i++) {
                        // if (initTableData[j].menuid == foodList[i].menuid && initTableData[j].ggid == foodList[i].ggid) {
                        foodList[i].enable = 1
                        // }
                    }
                    
                    this.foodList = foodList
                    this.loading = false
                })
            },
            submitForm(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (this.ruleForm.banner_img.length == 0) {
                        this.$message.error('套餐图片还未上传')
                        return;
                    }
                    if (valid) {
                        this.$axios.post('/store/Promotion/getTaocanAdd', {
                            token: this.token,
                            bid: this.bussiness.bid,
                            yuanprice: this.ruleForm.yuanjia,
                            number: this.ruleForm.number,
                            name: this.ruleForm.name,
                            classid: this.ruleForm.classid,
                            price: this.ruleForm.price,
                            sort: this.ruleForm.sort,
                            enable: this.ruleForm.enable,
                            content: this.ruleForm.content,
                            banner_img: this.ruleForm.banner_img,
                            danpin: this.tableData
                        }, response => {
                            
                            if (response.data.code == 0) {
                                this.$notify({
                                    title: '成功',
                                    message: '套餐添加成功',
                                    type: 'success'
                                });
                                this.$router.push({ path: '/bestseller' })
                            }
                        })
                    } else {
                        
                        return false;
                    }
                })
            },
            handleRemove(file, fileList) {
                this.ruleForm.banner_img = []
                for (var i = 0; i < fileList.length; i++) {
                    this.ruleForm.banner_img.push(fileList[i].url)
                }
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this._data.foodCheckedTan = false
                        this._data.checkdata = false
                        done();
                    })
                    .catch(_ => { });
            }
        }
    }
</script>

<style>
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
</style>