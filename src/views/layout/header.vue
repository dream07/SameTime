<template>
    <div class="header">
        <el-dialog title="修改密码" :visible.sync="editPwd" width="30%" :before-close="handleClose">
            <el-form label-width="100px" class="demo-ruleForm">
                <el-form-item label="验证方式">
                    <el-select v-model="pwdType" placeholder="请选择验证方式" style="width: 100%;" @change="yanzhengType">
                        <el-option label="密码验证" value="pwdForm">密码验证</el-option>
                        <el-option label="手机号验证" value="telForm">手机号验证</el-option>
                    </el-select>
                </el-form-item>
                <el-form :model="pwdForm" :rules="rules1" ref="pwdForm" label-width="100px" class="demo-ruleForm"
                    v-if="pwdType==='pwdForm'">
                    <el-form-item label="原密码" prop="oldPassword">
                        <el-input type="password" v-model="pwdForm.oldPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input type="password" v-model="pwdForm.newPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="confirmPassword">
                        <el-input type="password" v-model="pwdForm.confirmPassword"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="passwordHandel('pwdForm')">立即修改</el-button>
                        <el-button @click="handleClose">取消</el-button>
                    </el-form-item>

                </el-form>
                <el-form :model="telForm" :rules="rules2" ref="telForm" label-width="100px" class="demo-ruleForm"
                    v-if="pwdType==='telForm'">
                    <el-form-item label="手机号" prop="tel">
                        <el-input v-model="telForm.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="yanzheng" class="yanzhengmaBox">
                        <el-input v-model="telForm.yanzheng" style="width: 120px;margin-right: 10px;"></el-input>
                        <el-button type="text" v-show="show" @click="getCode(telForm)">发送验证码</el-button>
                        <el-button type="text" v-show="!show" @click="getCode" class="count">{{count}}s</el-button>
                    </el-form-item>
                    <el-form-item label="新密码" prop="telnewPassword">
                        <el-input type="password" v-model="telForm.telnewPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="telconfirmPassword">
                        <el-input type="password" v-model="telForm.confirmPassword"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="mobileHandel('telForm')">立即修改</el-button>
                        <el-button @click="handleClose">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-form>
        </el-dialog>
        <el-dialog title="绑定支付宝" :visible.sync="zhifubaoTan" width="30%" :before-close="handleClose">
            <el-form :model="zhifubao" :rules="rules" ref="zhifubao" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="姓名" prop="zfb_realname">
                        <el-input v-model="zhifubao.zfb_realname"></el-input>
                    </el-form-item>
                    <el-form-item label="支付宝账号" prop="zfb_zhanghao">
                        <el-input v-model="zhifubao.zfb_zhanghao"></el-input>
                    </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="zhifubaoForm('zhifubao')">立即绑定</el-button>
                    <el-button @click="handleClose">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-header>
            <i :class="[$store.getters.isCollapse?'el-icon-s-unfold navBtn':'el-icon-s-fold navBtn']"
                @click="hanndleCollapse()"></i>
            <div class="rightUser">
                <div class="userCopy">超级管理员</div>
                <el-dropdown class="shopChange" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{currentShop}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" style="max-height: 300px;overflow-y: scroll;">
                        <el-dropdown-item :command="item" v-for="(item,index) in shopList">{{item.name}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown @command="userConfig">
                    <span class="el-dropdown-link">
                        admin<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="editPwd">修改密码</el-dropdown-item>
                        <el-dropdown-item command="wanshan">完善提现信息</el-dropdown-item>
                        <el-dropdown-item command="loginOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-avatar size="medium" :src="userAvater">user</el-avatar>
            </div>
        </el-header>
        <tab-nav></tab-nav>
    </div>
</template>

<script>
    import tabNav from './tabNav'
    export default {
        data() {
            return {
                userAvater:'',
                zhifubaoTan:false,
                wanshan:false,
                show: true,
                count: '',
                timer: null,
                currentShop: '',
                shopList: [],
                isCollapse: false,
                editPwd: false,
                pwdForm: {
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                },
                telForm: {
                    tel: '',
                    yanzheng: '',
                    telnewPassword: '',
                    confirmPassword: ''
                },
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                },
                zhifubao:{
                    zfb_realname:'',
                    zfb_zhanghao:''
                },
                pwdType: 'pwdForm',
                rules:{
                    zfb_realname:[
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    zfb_zhanghao:[
                        { required: true, message: '请输入支付宝账号', trigger: 'blur' },
                    ],
                },
                rules1: {
                    oldPassword: [
                        { required: true, message: '请输入原密码', trigger: 'change' },
                    ],
                    newPassword: [
                        { required: true, message: '请输入新密码', trigger: 'change' }
                    ],
                    confirmPassword: [
                        { required: true, message: '请再次输入新密码', trigger: 'change' }
                    ],
                },
                rules2: {
                    telnewPassword: [
                        { required: true, message: '请输入新密码', trigger: 'change' }
                    ],
                    telconfirmPassword: [
                        { required: true, message: '请再次输入新密码', trigger: 'change' }
                    ],
                    tel: [
                        { required: true, message: '请输入手机号码', trigger: 'change' }
                    ],
                    yanzheng: [
                        { required: true, message: '请输入验证码', trigger: 'change' }
                    ],
                }
            };
        },
        components: {
            tabNav
        },

        created() {
            var token = this.$Cookies.get('token');
            this.token = this.$Cookies.get('token');
            
            
            var bussiness = JSON.parse(this.$Cookies.get('bussiness'));
            this.token = this.$Cookies.get('token');
            
            
            this.bussiness = JSON.parse(this.$Cookies.get('bussiness'));
            this.$axios.post('/store/Index/getBusinessList', {
                token: token
            }, response => {
                if (typeof (bussiness) == 'number') {
                    this.userAvater = response.data.data.info[0].logo
                    this.currentShop = response.data.data.info[0].name;
                } else {
                    this.userAvater = response.data.data.info[0].logo
                    this.currentShop = bussiness.name;
                }
                this.shopList = response.data.data.info
            })
        },
        methods: {
           
            getCode(telForm) {
                if(this.telForm.tel=='') {
                    this.$message.error('请输入手机号')
                    return;
                }
                const TIME_COUNT = 60;
                if (!this.timer) {
                    this.$axios.post('/store/User/getMobileCode', {
                        token: this.token,
                        tel:this.telForm.tel
                    }, response => {
                        
                    })
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }
            },

           
            passwordHandel(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/store/User/getPasswordEdit', {
                            token: this.token,
                            yuan: this.pwdForm.oldPassword,
                            password: this.pwdForm.newPassword,
                            comfirm: this.pwdForm.confirmPassword,
                        }, response => {
                            
                            if (response.data.code == 0) {
                                this.$notify({
                                    title: '成功',
                                    message: '密码修改成功',
                                    type: 'success'
                                });
                                this.editPwd = false
                                // this.$router.push({ path: '/bestseller' })
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        })
                    }
                })
            },
            zhifubaoForm(formName) {
                
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/store/User/getTixianEdit', {
                            token: this.token,
                            bid: this.bussiness.bid,
                            zfb_realname:this.zhifubao.zfb_realname,
                            zfb_zhanghao:this.zhifubao.zfb_zhanghao
                        }, response => {
                            
                            if(response.data.code==0) {
                                this.$notify({
                        title: '成功',
                        message: '绑定成功',
                        type: 'success'
                    });
                    this.zhifubaoTan = false
                            
                            
                            } else {
                                
                                return false;
                            }
                        });
                    }
                })
            },
            mobileHandel(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/store/User/getUserForget', {
                            token: this.token,
                            tel: this.telForm.tel,
                            code: this.telForm.yanzheng,
                            password: this.telForm.telnewPassword,
                            comfirm: this.telForm.confirmPassword
                        }, response => {
                            
                            if (response.data.code == 0) {
                                this.$notify({
                                    title: '成功',
                                    message: '密码修改成功',
                                    type: 'success'
                                });
                                this.editPwd = false
                                // this.$router.push({ path: '/bestseller' })
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        })
                    }
                })
            },
            yanzhengType(val) {
                // var formName = val;
                // 
                // this.$refs[formName].resetFields();
                // // this.$refs[telForm].resetFields();
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
            },
            hanndleCollapse() {
                
                this.$store.dispatch('collapse')
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this._data.editPwd = false
                        this._data.zhifubaoTan = false
                        
                        done();
                    })
                    .catch(_ => { });
            },
            handleCommand(command) {
                this.$emit('handleCommand', command);
                
                this.currentShop = command.name;
                this.userAvater = command.logo
                this.$store.dispatch('setbussiness', command).then(() => {
                    this.$emit('ee', 'cc12345')
                }).catch(res => {
                    that.$message({
                        showClose: true,
                        message: res,
                        type: 'error'
                    })
                })
            },
            userConfig(command) {
                
                switch (command) {
                    case 'loginOut':
                        this.$router.push({ name: 'login' });
                        $store.dispatch('tabnavBox',[])
                        localStorage.clear();
                        
                        this.$Cookies.remove('token');
                        this.$Cookies.remove('bussiness');
                        break;
                    case 'editPwd':
                        this._data.editPwd = true
                        break;
                    case 'wanshan':
                    this.token = this.$Cookies.get('token');
                        
                        
                        this.bussiness = JSON.parse(this.$Cookies.get('bussiness'));
                        this._data.zhifubaoTan = true
                        this.$axios.post('/store/User/getTixianForm', {
                            token: this.token,
                            bid: this.bussiness.bid

                        }, response => {
                            
                            this.zhifubao.zfb_realname = response.data.data.zfb_realname,
                                this.zhifubao.zfb_zhanghao = response.data.data.zfb_zhanghao
                        })
                        // this.$router.push({ name: 'login' })
                        break;
                    default:
                        break;
                }

            }
        },

    }

</script>

<style>
    .yanzhengmaBox .el-form-item__content {
        display: flex;
    }

    .header .el-dialog__body {
        padding-right: 30px;
    }

    .el-header {
        width: 100%;
        background-color: #061528;
        height: 50px;
        color: #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .el-avatar {
        margin-left: 30px;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #e0e0e0;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .rightUser {
        display: flex;
        align-items: center;
    }

    .userCopy {
        margin-right: 30px;
        color: #aaa;
    }

    .shopChange {
        margin-right: 20px;
    }

    .el-dropdown-link {
        color: #e0e0e0 !important;
    }
</style>