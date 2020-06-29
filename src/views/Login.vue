<template>
    <div class="body">

        <img class="bgone" src="../assets/picture/1.jpg" />
        <img class="pic" src="../assets/picture/a.png" />

        <div class="table">
            <form action="" target="stop">
                <div class="wel">同时商家运营管理系统</div>
                <div class="wel1">SAME TIME THE BUSINESS OPERATION MANAGEMENT SYSTEM</div>

                <div class="user">
                    <div id="yonghu"><img src="../assets/picture/yhm.png" style="width: 30px;height: 30px;"/></div>
                    <input type="text" name="phone" placeholder="请输入手机号" v-model.trim="phone" maxlength="11" autocomplete="off"/>

                </div>
                <div class="password">
                    <div id="yonghu"><img src="../assets/picture/mm.png" style="width: 30px;height: 30px;"/></div>
                    <input type="password" name="password" placeholder="请输入密码" v-model.trim="password" autocomplete="off"/>
                </div>

                <input class="btn" type="submit" name="登录" value="登录" @click="submit" style="padding: 0;" />
            </form>
            <iframe name="stop" style="display:none;"></iframe>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                phone: '',
                password: ''
            }
        },

        methods: {
            submit() {
                var phone = this.phone;
                var password = this.password;
                if (phone == '') {
                    this.$message({
                        showClose: true,
                        message: '手机号不能为空',
                        type: 'error'
                    });
                    return false;
                } else if (password == '') {
                    this.$message({
                        showClose: true,
                        message: '密码不能为空',
                        type: 'error'
                    });
                    return false;
                } else {
                    let that = this
                    var phone = phone;
                    if (!(/^1[3456789]\d{9}$/.test(phone))) {
                        that.$message({
                            showClose: true,
                            message: '手机号格式有误',
                            type: 'error'
                        })
                        return false;
                    }
                    this.$axios.post('/store/login/getLoginData', {
                        tel: phone,
                        password: password
                    }, response => {
                        
                        if (response.data.code !== -1) {
                            that.$store.dispatch('setToken', response.data.data.token).then(() => {
                            }).catch(res => {
                                that.$message({
                                    showClose: true,
                                    message: res,
                                    type: 'error'
                                })
                            })
                            that.$store.dispatch('setbussiness', response.data.data.buss).then(() => {
                                that.$router.push({ path: '/index' })
                            }).catch(res => {
                                that.$message({
                                    showClose: true,
                                    message: res,
                                    type: 'error'
                                })
                            })
                            
                        } else {
                            
                            that.$message({
                                showClose: true,
                                message: response.data.msg,
                                type: 'error'
                            })
                            
                        }
                    });
                }
            }

        },
    }
</script>

<style scoped>
    * {
        font-family: "微软雅黑";
        font-size: 16px;
        border: 0;
        padding: 0;
        margin: 0;
        color: #666;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    .bgone {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
    }

    .pic {
        width: 492px;
        height: auto;
        position: absolute;
        top: 35px;
        right: 453px;
        left: 0;
        bottom: 0;
        margin: auto;
        z-index: 1;
    }

    .table {
        background-color: #FFFFFF;
        width: 960px;
        height: 465px;
        position: absolute;
        top: 5%;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        box-shadow: 5px 5px 15px #888;
    }

    .password {
        position: absolute;
        top: 12.8rem;
        right: 4rem;
        display: flex;
    }

    .btn {
        position: absolute;
        top: 18.5rem;
        right: 3.9rem;
        border: none;
        color: #fff;
        width: 373px;
        text-align: center;
        background-color: #1592ef;
        text-indent: 0rem;
        border-radius: 10px;
        text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.2);
        box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.2);
        font-size: 20px;
        height: 50px;
        cursor: pointer;
    }

    .wel {
        width: 960px;
        height: 35px;
        color: #fff;
        font-size: 30px;
        position: absolute;
        top: -7rem;
        text-align: center;

    }

    .wel1 {
        width: 960px;
        height: 35px;
        color: #fff;
        font-size: 12.38px;
        position: absolute;
        top: -4rem;
        text-align: center;

    }

    input {
        height: 55px;
        width: 373px;
        padding-left: 55px;
        outline: none;
        background: #eef6fd;
        border-bottom: 2px #d6e7fa solid;
    }

    .password input {
        border: 0;
    }

    .user {
        position: absolute;
        top: 7.8rem;
        right: 4rem;
        display: flex;
    }

    #yonghu img {
        height: 30px;
        position: absolute;
        left: 10px;
        top: 13px;
    }
</style>