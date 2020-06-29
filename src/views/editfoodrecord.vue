<template>
    <div class="editfoodrecord" v-loading="loading" element-loading-background="#f2f2f2">
        <h2 class="editfoodrecordTit">编辑菜品</h2>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm">
            <el-form-item label="菜品编号" prop="name">
                <el-input v-model="ruleForm.number" disabled></el-input>
            </el-form-item>
            <el-form-item label="菜品名称" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入菜品名称"></el-input>
            </el-form-item>
            <el-form-item label="菜品价格" prop="price">
                <el-input v-model="ruleForm.price" placeholder="请输入菜品价格"></el-input>
            </el-form-item>
            <el-form-item label="菜品类别" prop="classid">
                <el-select v-model="ruleForm.classid" placeholder="请选择菜品类别" @change="categoryChange">
                    <el-option v-for="item in category" :key="item.classid" :label="item.name" :value="item.classid">
                    </el-option>

                </el-select>
            </el-form-item>
            <el-form-item label="排序">
                <el-input v-model="ruleForm.sort" placeholder="数字越小越靠前"></el-input>
            </el-form-item>

            <el-form-item label="菜品状态">
                <el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item label="预览图">
                <el-upload action="https://store.galaxyhigh.cn/store/server/upDataImg" :file-list='filelist'
                    list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                    :on-success="handleSuccess" :on-error="handleErr" :limit="1" :multiple="true" :on-exceed="onexceed">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>

            <el-form-item label="说明">
                <el-input type="textarea" v-model="ruleForm.desc" rows="5"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
                <el-button @click="cancelHandel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: true,
                ruleForm: {
                    number: '',
                    name: '',
                    price:'',
                    classid: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    banner_img: [],
                    status: null,
                    sort: ''
                },
                filelist: [],
                category: [],
                dialogImageUrl: '',
                dialogVisible: false,
                rules: {
                    name: [
                        { required: true, message: '请输入菜品名称', trigger: 'blur' }

                    ],
                    price: [
                        { required: true, message: '请输入菜品价格', trigger: 'change' },
                        { required: true, message: '请输入菜品价格', trigger: 'blur' },
                        { pattern: /^[0-9]+([.][0-9]{2}){0,1}$/, message: '只能输入数字且保留小数点后两位' }
                    ],
                    classid: [
                        { required: true, message: '请选择菜品类别', trigger: 'change' }
                    ]
                },
            }
        },
        created() {
            this.token = this.$Cookies.get('token');
            this.bussiness = JSON.parse(this.$Cookies.get('bussiness'));
            this.globId = this.$route.query.globId;
            this.$axios.post('store/menu/getMenuForm', {
                token: this.token,
                bid: this.bussiness.bid,
                menuid: this.globId
            }, response => {
                
                this.ruleForm.name = response.data.data.name
                this.ruleForm.number = response.data.data.number
                this.ruleForm.classid = response.data.data.classid
                this.ruleForm.price = response.data.data.price
                this.ruleForm.status = response.data.data.enable
                this.ruleForm.sort = response.data.data.sort
                for (var i = 0; i < response.data.data.banner_img.length; i++) {
                    this.filelist.push({ url: response.data.data.banner_img[i] })
                }
                this.ruleForm.banner_img = response.data.data.banner_img
                this.ruleForm.desc = response.data.data.content
                this.loading = false
            })
            this.$axios.post('/store/menu/getClassList', {
                token: this.token,
                bid: this.bussiness.bid,
                name: ''
            }, response => {
                
                this.category = response.data.data.menu
            })


            // this.$api.post('/store/menu/getMenuForm', {
            //     token: this.token,
            //     bid: this.bussiness.bid,
            //     menuid: this.globId
            // }, response => {
            //     this.ruleForm.name = response.data.data.name
            //     this.ruleForm.number = response.data.data.number
            //     this.ruleForm.classid = response.data.data.classid
            //     this.ruleForm.price = response.data.data.price
            //     this.ruleForm.enable = response.data.data.enable
            //     this.ruleForm.sort = response.data.data.sort
            //     for (var i = 0; i < response.data.data.banner_img.length; i++) {
            //         this.filelist.push({ url: response.data.data.banner_img[i] })
            //     }
            //     this.ruleForm.banner_img = response.data.data.banner_img

            //     this.ruleForm.desc = response.data.data.content

            //     

            // })

        },
        mounted() {

        },
        methods: {
            // beforeUpload(file) {
            //     
            // },
            cancelHandel() {
                this.$confirm('确认取消？')
                    .then(_ => {
                        this.$router.go(-1)
                        done();
                    })
                    .catch(_ => { });
            },
            categoryChange() {

            },
            onexceed (files, fileList) {
                this.$message.error('只能上传一张菜品图片')
            },
            editfoodrecordInit(menuid) {
                // this.$api.post('/store/menu/getMenuForm', {
                //     token: this.token,
                //     bid: this.bussiness.bid,
                //     menuid: menuid
                // }, response => {
                //     
                //     // this.category = response.data.data.menu
                // })
            },
            handleSuccess(response, file, fileList) {
                
                
                
                // this.ruleForm.banner_img.push(fileList.response.url)
                this.ruleForm.banner_img = [];
                for (var i = 0; i < fileList.length; i++) {
                    
                    if (this.changeBannerImg || this.ruleForm.banner_img.length == 0) {
                        this.ruleForm.banner_img.push(fileList[i].response.url)
                    } else {
                        this.ruleForm.banner_img.push(fileList[i].url)
                    }
                }
                
            },
            handleErr(err, file, fileList) {
                
                
                
            },
            submitForm(ruleForm) {




                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        

                        
                        this.$axios.post('store/menu/getMenuEdit', {
                            token: this.token,
                            bid: this.bussiness.bid,
                            menuid: this.globId,
                            number: this.ruleForm.number,
                            name: this.ruleForm.name,
                            classid: this.ruleForm.classid,
                            price: this.ruleForm.price,
                            sort: this.ruleForm.sort,
                            enable: this.ruleForm.status,
                            content: this.ruleForm.desc,
                            banner_img: this.ruleForm.banner_img
                        }, response => {
                            

                            if (response.data.code == 0) {
                                this.$notify({
                                    title: '成功',
                                    message: '菜品修改成功',
                                    type: 'success'
                                });
                                this.$router.push({ path: '/foodrecord' })
                            }
                        })
                        // this.$api.post('/store/menu/getMenuEdit', {
                        //     token: this.token,
                        //     bid: this.bussiness.bid,
                        //     menuid: this.globId,
                        //     number: this.ruleForm.number,
                        //     name: this.ruleForm.name,
                        //     classid: this.ruleForm.classid,
                        //     price: this.ruleForm.price,
                        //     sort: this.ruleForm.sort,
                        //     enable: this.ruleForm.status,
                        //     content: this.ruleForm.desc,
                        //     banner_img: this.ruleForm.banner_img
                        // }, response => {

                        //     

                        //     if (response.data.code == 0) {
                        //         this.$notify({
                        //             title: '成功',
                        //             message: '菜品修改成功',
                        //             type: 'success'
                        //         });
                        //         this.$router.push({ path: '/foodrecord' })
                        //     }
                        // })

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
                this.changeBannerImg = true
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
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