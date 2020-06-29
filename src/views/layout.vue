<template>
    <div class="body">
        <el-container>
            <lfaside></lfaside>
            <el-container class="flexcolom">
                <topheader @handleCommand="handleCommand"></topheader>
                <el-main style="background-color: #eee;">
                    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>代理列表</el-breadcrumb-item>
                    </el-breadcrumb> -->

                    <transition name="main" mode="out-in">
                        <router-view ref="child2Container"></router-view>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import lfaside from './layout/aside'
    import topheader from './layout/header'
    export default {
        data() {
            return {
                tableData: [
                    {
                        date: '2016-05-02',
                        name: '申霄彬',
                        address: '河南省郑州市金水区俭学街',
                        tel: 18790908321,
                        grade: '省级代理',
                        share: 100
                    },
                    {
                        date: '2016-05-02',
                        name: '申霄彬',
                        address: '河南省郑州市金水区俭学街',
                        tel: 18790908321,
                        grade: '省级代理',
                        share: 100
                    },
                    {
                        date: '2016-05-02',
                        name: '申霄彬',
                        address: '河南省郑州市金水区俭学街',
                        tel: 18790908321,
                        grade: '省级代理',
                        share: 100
                    },
                    {
                        date: '2016-05-02',
                        name: '申霄彬',
                        address: '河南省郑州市金水区俭学街',
                        tel: 18790908321,
                        grade: '省级代理',
                        share: 100
                    },
                    {
                        date: '2016-05-02',
                        name: '申霄彬',
                        address: '河南省郑州市金水区俭学街',
                        tel: 18790908321,
                        grade: '省级代理',
                        share: 100
                    },
                    {
                        date: '2016-05-02',
                        name: '申霄彬',
                        address: '河南省郑州市金水区俭学街',
                        tel: 18790908321,
                        grade: '省级代理',
                        share: 100
                    },
                    {
                        date: '2016-05-02',
                        name: '申霄彬',
                        address: '河南省郑州市金水区俭学街',
                        tel: 18790908321,
                        grade: '省级代理',
                        share: 100
                    },
                    {
                        date: '2016-05-02',
                        name: '申霄彬',
                        address: '河南省郑州市金水区俭学街',
                        tel: 18790908321,
                        grade: '省级代理',
                        share: 100
                    }

                ]
            }
        },
        components: {
            lfaside,
            topheader
        },
        // created() {
        //     this.$router.push('/index')
        // },
        methods: {
            handleCommand(command) {
                
            //    
                this.$refs.child2Container.dataInit(command);
                // this.$refs.child2Container.foodrecordInit();
                
            },
            handleEdit(index, row) {
                
            },
            handleDelete(index, row) {
                
            }

        }
    }
</script>


<style lang="scss" scoped>
    el-main {
        height: 100%;
        background-color: #eee !important;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
    .flexcolom {
        flex-direction: column;
    }
    /* .el-main {
        padding: 0;
    } */
</style>