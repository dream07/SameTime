<template>
    <div class="foodcategory">
        <el-dialog title="新增菜品类别" :visible.sync="addCategoryVisible" width="30%" :before-close="handleClose">
            <el-form ref="addform" :model="form" label-width="60px" :rules="rules">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" placeholder="最多输入16个字符"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model="form.sort" placeholder="数字越小越靠前，不填默认为0"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="addSure('addform')">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="编辑菜品类别" :visible.sync="editCategoryVisible" width="30%" :before-close="handleClose">
            <el-form ref="editform" :model="form" label-width="60px">
                <el-form-item label="名称">
                    <el-input v-model="form.name" placeholder="最多输入16个字符"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="form.sort" placeholder="数字越小越靠前，不填默认为0"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="editSure('editform')">确 定</el-button>
            </span>
        </el-dialog>
        <div class="foodTopBox elementReset">
            <!-- <div class="foodrecordTit">
                <div class="foodrecordTitLf"><i class="el-icon-search"></i></div>
                <div class="foodrecordTitRh">查询条件</div>
            </div> -->
            <el-form ref="searchBox" :model="searchBox">
                <div class="foodrecordSerach">

                    <el-form-item prop="serarchform">
                        <el-input v-model="searchBox.serarchform" placeholder="请输入菜品名称" size="medium"></el-input>
                    </el-form-item>


                </div>
                <div class="foodrecordTitBot">
                    <el-button type="success" size="small" icon="el-icon-search" @click="foodsearch">
                        查询</el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="resetForm('searchBox')">清空
                    </el-button>
                    <el-button type="primary" size="small" icon="el-icon-folder-add" @click="categoryAdd">新增
                    </el-button>
                </div>
            </el-form>
        </div>
        <div class="foodBotBox" style="background-color: transparent;padding: 0;min-height: 150px;" v-loading="loading"
            element-loading-text="拼命加载中" element-loading-background="rgba(255, 255, 255, 1)">
            <el-row :gutter="20" v-show='jiaBox'>
                <el-col :span="6">
                    <div class="grid-content bg-purple category addcategoryBox">
                        <i class="el-icon-circle-plus addcategory" @click="categoryAdd"></i>
                    </div>
                </el-col>
                <el-col :span="6" class="categoryBox" v-for="(item,index) in foodcategoryData" :key="index">
                    <div class="grid-content bg-purple category">
                        <div class="categoryTop">
                            <i class="el-icon-edit-outline categoryEdit"
                                @click="categoryEdit(item.classid,item.name,item.sort)"></i>
                            <el-popconfirm confirmButtonText='确定' cancelButtonText='再想想' icon="el-icon-info"
                                iconColor="red" title="确定删除该类别吗" @onConfirm="categoryDel(item.classid)">
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
    export default {
        data() {
            return {
                token: '',
                bussiness: '',
                searchBox: {
                    serarchform: '',
                },
                jiaBox: false,
                loading: true,
                addCategoryVisible: false,
                editCategoryVisible: false,
                form: {
                    name: '',
                    price: '',
                    classid: '',
                    sort: '',
                },
                addcategoryform: {
                    name: '',
                },
                foodcategoryData: [],
                rules: {
                    name: [
                        { required: true, message: '请输入类别名称', trigger: 'blur' },
                    ]
                }
            }
        },
        created() {
            this.token = this.$Cookies.get('token');
            this.bussiness = JSON.parse(this.$Cookies.get('bussiness'));
            this.dataInit()
        },
        methods: {
            categoryAdd() {
                this.form = {
                    name: '',
                    price: '',
                    classid: '',
                    sort: '',
                },
                    this.addCategoryVisible = true;
            },
            addSure(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/store/menu/getClassAdd', {
                            token: this.token,
                            bid: this.bussiness.bid,
                            name: this.form.name,
                            sort: this.form.sort
                        }, response => {
                            if (response.data.code == 0) {
                                this.dataInit()
                                this.addCategoryVisible = false
                                this.$message({
                                    showClose: true,
                                    message: response.data.msg,
                                    type: 'success'
                                })
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: response.data.msg,
                                    type: 'error'
                                })
                            }
                            
                        })
                    }
                })
            },
            editSure(ruleForm, classid) {
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/store/menu/getClassEdit', {
                            token: this.token,
                            bid: this.bussiness.bid,
                            classid: this.form.classid,
                            name: this.form.name,
                            sort: this.form.sort
                        }, response => {
                            if (response.data.code == 0) {
                                this.dataInit()
                                this.editCategoryVisible = false
                                this.$message({
                                    showClose: true,
                                    message: response.data.msg,
                                    type: 'success'
                                })
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: response.data.msg,
                                    type: 'error'
                                })
                            }
                            
                        })
                    }
                })
            },
            dataInit(command) {
                this.loading = true;
                if (command) {
                    
                    this.bussiness = command
                    
                }
                this.$axios.post('/store/menu/getClassList', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    name: this.searchBox.serarchform
                }, response => {
                    
                    this.loading = false;
                    this.jiaBox = true;
                    this.foodcategoryData = response.data.data.menu
                })
            },
            foodsearch() {
                this.dataInit()
            },
            resetForm(formName) {
                
                this.$refs[formName].resetFields();
                this.dataInit()
            },
            categoryEdit(classid, oldname, oldsort) {
                this.form.classid = classid;
                this.form.name = oldname;
                this.form.sort = oldsort;
                this.editCategoryVisible = true;
                
            },
            categoryDel(classid) {
                
                this.$axios.post('/store/menu/getClassDel', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    classid: classid,
                }, response => {
                    if (response.data.code == 0) {
                        this.dataInit()
                        this.$message({
                            showClose: true,
                            message: response.data.msg,
                            type: 'success'
                        })
                    } else {
                        this.$message({
                            showClose: true,
                            message: response.data.msg,
                            type: 'error'
                        })
                    }
                    
                })
                // this.foodcategoryData.splice(index, 1);
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this._data.addCategoryVisible = false
                        this._data.editCategoryVisible = false
                        done();
                    })
                    .catch(_ => { });
            }
        },
    }
</script>
<style lang="scss">
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
    }
</style>