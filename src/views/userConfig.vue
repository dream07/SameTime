<template>
    <div class="body">
        <el-container>
            <lfaside></lfaside>
            <el-container class="flexcolom">
                <topheader></topheader>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <!-- <el-breadcrumb-item>代理列表</el-breadcrumb-item> -->
                    </el-breadcrumb>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column label="姓名"  align="center">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    <p>姓名: {{ scope.row.name }}</p>
                                    <p>住址: {{ scope.row.address }}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column label="手机号"  align="center">
                            <template slot-scope="scope">
                                <i class="el-icon-phone"></i>
                                <span style="margin-left: 10px">{{ scope.row.tel }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="代理级别"  align="center">
                            <template slot-scope="scope">
                                <i class="el-icon-s-data"></i>
                                <span style="margin-left: 10px">{{ scope.row.grade }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="加入时间" align="center">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.date }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="邀请人数"  align="center">
                            <template slot-scope="scope">
                                <i class="el-icon-user"></i>
                                <span style="margin-left: 10px">{{ scope.row.share }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="地址"  align="center">
                            <template slot-scope="scope">
                                <i class="el-icon-s-home"></i>
                                <span style="margin-left: 10px">{{ scope.row.address }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" >
                            <template slot-scope="scope">
                                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
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
                    tel:18790908321,
                    grade:'省级代理',
                    share:100
                },
                {
                    date: '2016-05-02',
                    name: '申霄彬',
                    address: '河南省郑州市金水区俭学街',
                    tel:18790908321,
                    grade:'省级代理',
                    share:100
                },
                {
                    date: '2016-05-02',
                    name: '申霄彬',
                    address: '河南省郑州市金水区俭学街',
                    tel:18790908321,
                    grade:'省级代理',
                    share:100
                },
                {
                    date: '2016-05-02',
                    name: '申霄彬',
                    address: '河南省郑州市金水区俭学街',
                    tel:18790908321,
                    grade:'省级代理',
                    share:100
                },
                {
                    date: '2016-05-02',
                    name: '申霄彬',
                    address: '河南省郑州市金水区俭学街',
                    tel:18790908321,
                    grade:'省级代理',
                    share:100
                },
                {
                    date: '2016-05-02',
                    name: '申霄彬',
                    address: '河南省郑州市金水区俭学街',
                    tel:18790908321,
                    grade:'省级代理',
                    share:100
                },
                {
                    date: '2016-05-02',
                    name: '申霄彬',
                    address: '河南省郑州市金水区俭学街',
                    tel:18790908321,
                    grade:'省级代理',
                    share:100
                },
                {
                    date: '2016-05-02',
                    name: '申霄彬',
                    address: '河南省郑州市金水区俭学街',
                    tel:18790908321,
                    grade:'省级代理',
                    share:100
                }

            ]
            }
        },
        components: {
            lfaside,
            topheader
        },
        methods: {
            handleEdit(index, row) {
                
            },
            handleDelete(index, row) {
                
            }

        }
    }
</script>


<style>
    el-main {
        height: 100%;
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    .flexcolom {
        flex-direction: column;
    }
</style>