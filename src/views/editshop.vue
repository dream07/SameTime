<template>
    <div class="content edit" >
        <el-dialog title="添加管理员" :visible.sync="addAdmin" width="30%" :before-close="handleClose">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="用户管理" name="first">
                    <el-form ref="addAdminForm" :model="addAdminForm" :rules="rules" label-width="100px"
                        class="demo-ruleForm">
                        <el-form-item label="管理员名称:" prop="adminName"
                            style="width: 90%;margin-left:auto;margin-right:auto">
                            <el-input v-model="addAdminForm.adminName" placeholder="请输入管理员名称"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号:" prop="adminTel"
                            style="width: 90%;margin-left:auto;margin-right:auto">
                            <el-input v-model="addAdminForm.adminTel" placeholder="请输入手机号作为账号"></el-input>
                        </el-form-item>
                        <el-form-item label="密码:" prop="adminPassword"
                            style="width: 90%;margin-left:auto;margin-right:auto">
                            <el-input v-model="addAdminForm.adminPassword" placeholder="默认密码123456"></el-input>
                        </el-form-item>
                        <el-form-item label="拥有权限:" prop="quanxian"
                            style="width: 90%;margin-left:auto;margin-right:auto">
                            <el-tree :data="data" show-checkbox node-key="id" ref="tree" highlight-current
                                :props="defaultProps">
                            </el-tree>
                        </el-form-item>
                        <!-- <el-button @click="getCheckedKeys">通过key获取</el-button> -->
                        <!-- <el-button @click="setCheckedKeys">通过 key 设置</el-button> -->
                        <el-form-item>
                            <el-button type="primary" @click="adminForm('addAdminForm')">立即创建</el-button>
                            <el-button @click="handleClose">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="配置管理" name="second">
                    <el-table :data="addAdminData" style="width: 100%">
                        <el-table-column label="姓名" align="center">
                            <template slot-scope="scope">
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                </div>

                            </template>
                        </el-table-column>
                        <el-table-column label="账号" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.tel }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="handleAdd(scope.row.id)">添加</el-button>
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
        <el-dialog title="修改管理员" :visible.sync="editAdmin" width="30%" :before-close="handleClose">
            <el-form ref="editAdminForm" :model="editAdminForm" :rules="rules" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="拥有权限:" prop="quanxian" style="width: 90%;margin-left:auto;margin-right:auto">
                    <el-tree :data="data" show-checkbox node-key="id" ref="tree1" highlight-current
                        :props="defaultProps">
                    </el-tree>
                </el-form-item>
                <!-- <el-button @click="getCheckedKeys">通过key获取</el-button> -->
                <!-- <el-button @click="setCheckedKeys">通过 key 设置</el-button> -->
                <el-form-item>
                    <el-button type="primary" @click="editAdForm('editAdminForm')">立即修改</el-button>
                    <el-button @click="handleClose">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <h2 class="editfoodrecordTit">修改店铺</h2>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">

            <el-form-item label="门店名称:" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入套餐名称" disabled></el-input>
            </el-form-item>
            <el-form-item label="门店地址:" prop="address">
                <div class="amap-wrapper" v-if='mapShow'>
                    <div class="amap-page-container" style="width:900px;height: 300px;margin: 0 auto 22px auto;">
                        <el-amap-search-box class="search-box" :search-option="searchOption"
                            :on-search-result="onSearchResult">
                        </el-amap-search-box>
                        <el-amap vid="amap" :plugin="plugin" class="amap-box" :zoom="zoom" :mapStyle="mapStyle" :events="events">
                            <el-amap-marker v-for="marker in markers" :position="marker.position" :key="marker.id"
                                :events="marker.events" :icon="marker.icon" animation="AMAP_ANIMATION_DROP">
                            </el-amap-marker>
                            <el-amap-info-window v-if="window" :position="windows[0].position"
                                :visible="windows[0].visible" :offset="windows[0].offset">
                                <div id="content">{{address}}</div>
                                <el-button type="text" @click="infoClick" style="padding: 0;">导入经纬度</el-button>
                            </el-amap-info-window>
                        </el-amap>
                    </div>
                </div>
            </el-form-item>
            <div style="margin: -35px 0 10px 100px;color: red;">请通过地图选点来选择店铺精确位置，点击锚点以导入经纬度度（如果导入失败，请手动选择）</div>
            <el-form-item label="所在区域:">
                <div class="flexBox">
                    <el-form-item label-width="0px" style="width: 30%;" prop="provice">
                        <el-select v-model="ruleForm.provice" @change="choseProvince" placeholder="省级地区"
                            style="margin-right: 5%;width: 100%;">
                            <el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label-width="0px" prop="city" style="width: 30%;">
                        <el-select v-model="ruleForm.city" @change="choseCity" placeholder="市级地区"
                            style="margin-right: 5%;width: 100%;">
                            <el-option v-for="item in shi1" :key="item.id" :label="item.value" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label-width="0px" prop="area" style="width: 30%;">
                        <el-select v-model="ruleForm.area" @change="choseBlock" placeholder="区级地区" style="width: 100%;">
                            <el-option v-for="item in qu1" :key="item.id" :label="item.value" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-form-item>

            <!-- <div class="flexBox">
               
                
            </div> -->
            <el-form-item label="精度:" prop="lon" style="width: 100%;">
                <el-input v-model="ruleForm.lon	" placeholder="精度"></el-input>
            </el-form-item>
            <el-form-item label="纬度:" prop="lat" style="width: 100%;">
                <el-input v-model="ruleForm.lat" placeholder="纬度"></el-input>
            </el-form-item>
            <el-form-item label="详细地址:" prop="address">
                <el-input v-model="ruleForm.address" placeholder="请输入详细地址"></el-input>
            </el-form-item>
            <el-form-item label="执照注册地:">
                <div class="flexBox">
                    <el-form-item label-width="0px" style="width: 30%;" prop="licenseprovincecode">
                        <el-select v-model="ruleForm.licenseprovincecode" @change="choseProvince" placeholder="省级地区"
                            style="margin-right: 5%;width: 100%;" disabled>
                            <el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label-width="0px" prop="licensecitycode" style="width: 30%;">
                        <el-select v-model="ruleForm.licensecitycode" @change="choseCity" placeholder="市级地区"
                            style="margin-right: 5%;width: 100%;" disabled>
                            <el-option v-for="item in shi1" :key="item.id" :label="item.value" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label-width="0px" prop="licenseareacode" style="width: 30%;">
                        <el-select v-model="ruleForm.licenseareacode" @change="choseBlock" placeholder="区级地区"
                            style="width: 100%;" disabled>
                            <el-option v-for="item in qu1" :key="item.id" :label="item.value" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-form-item>
            <el-form-item label="信用代码:" prop="creditcode" style="width: 100%;">
                <el-input v-model="ruleForm.creditcode" placeholder="请输入社会统一信用代码" disabled></el-input>
            </el-form-item>
            <div class="flexBox">
                <el-form-item label="营业时间:" prop="dateTime" style="width: 50%;">
                    <el-time-picker is-range v-model="ruleForm.dateTime" range-separator="至" start-placeholder="开始时间"
                        end-placeholder="结束时间" placeholder="选择时间范围" style="width: 100%;" format='HH:mm' @change="onPick"
                        value-format="HH:mm">
                    </el-time-picker>

                </el-form-item>
                <el-form-item label="人均消费:" prop="avg" style="width: 50%;">
                    <el-input v-model="ruleForm.avg" placeholder="请输入人均消费"></el-input>
                </el-form-item>
            </div>
            <div class="flexBox">
                <el-form-item label="最低消费:" prop="low" style="width: 50%;">
                    <el-input v-model="ruleForm.low" placeholder="请输入最低消费"></el-input>
                </el-form-item>
                <el-form-item label="联系人:" prop="realname" style="width: 50%;">
                    <el-input v-model="ruleForm.realname" placeholder="请输入联系人"></el-input>
                </el-form-item>
            </div>
            <div class="flexBox">
                <el-form-item label="证件号:" prop="representativecode" style="width: 50%;">
                    <el-input v-model="ruleForm.representativecode" placeholder="请输入法定代表人证件号" disabled></el-input>
                </el-form-item>
                <el-form-item label="营业期限:" prop="licenseendtime" style="width: 50%;">
                    <el-date-picker v-if="ruleForm.licenseendtime!=='-1'" v-model="ruleForm.licenseendtime"
                        style="width: 100%;" type="date" align="right" unlink-panels range-separator="至"
                        placeholder="请输入营业期限" value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <el-input v-if="ruleForm.licenseendtime=='-1'" :value="ruleForm.licenseendtime=='-1'?'永久':''"
                        @focus="yongjiuFocus"></el-input>
                </el-form-item>
            </div>
            <div class="flexBox">
                <el-form-item label="证件类型:" prop="name" style="width: 50%;">
                    <el-select v-model="ruleForm.representativetype" placeholder="请选择证件类型" style="width: 100%;">
                        <el-option value="1" label="身份证" disabled>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="经营范围:" prop="sphere" style="width: 50%;">
                    <el-input v-model="ruleForm.sphere" placeholder="请输入经营范围" disabled></el-input>
                </el-form-item>
            </div>
            <div class="flexBox">
                <el-form-item label="法人姓名:" prop="representativename" style="width: 50%;">
                    <el-input v-model="ruleForm.representativename" placeholder="请输入法定代表人姓名" disabled></el-input>
                </el-form-item>
                <el-form-item label="成立时间:" prop="licensestarttime" style="width: 50%;">
                    <el-date-picker v-model="ruleForm.licensestarttime" style="width: 100%;" type="date"
                        placehostlder="请输入成立时间" value-format="yyyy-MM-dd" disabled>
                    </el-date-picker>
                </el-form-item>
            </div>
            <el-form-item label="电话:" prop="tel" style="width: 50%;">
                <el-input v-model="ruleForm.tel" placeholder="请输入您的电话"></el-input>
            </el-form-item>
            <el-form-item label="店铺状态:">
                <el-switch v-model="ruleForm.type" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
            <div class="flexBox">
                <el-form-item label="营业执照:">
                    <el-upload class="avatar-uploader" action="https://store.galaxyhigh.cn/store/server/upDataImg"
                        :show-file-list="false" :on-success="handleAvatarSuccess1" :limit="1" :multiple="true" disabled>
                        <img v-if="ruleForm.zhizhao" :src="ruleForm.zhizhao" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="店铺logo:">
                    <el-upload class="avatar-uploader" action="https://store.galaxyhigh.cn/store/server/upDataImg"
                        :show-file-list="false" :on-success="handleAvatarSuccess2" :limit="1" :multiple="true">
                        <img v-if="ruleForm.logo" :src="ruleForm.logo" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="卫生许可证:">
                    <el-upload class="avatar-uploader" action="https://store.galaxyhigh.cn/store/server/upDataImg"
                        :show-file-list="false" :on-success="handleAvatarSuccess3" :limit="1" :multiple="true" disabled>
                        <img v-if="ruleForm.weisheng" :src="ruleForm.weisheng" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </div>
            <div class="shenfenzheng">
                <el-form-item label="身份证正面:">
                    <el-upload class="avatar-uploader" action="https://store.galaxyhigh.cn/store/server/upDataImg"
                        :show-file-list="false" :on-success="handleAvatarSuccess4" disabled>
                        <img v-if="ruleForm.representativeimgright" :src="ruleForm.representativeimgright"
                            class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="身份证反面:" style="margin-left: 80px;">
                    <el-upload class="avatar-uploader" action="https://store.galaxyhigh.cn/store/server/upDataImg"
                        :show-file-list="false" :on-success="handleAvatarSuccess5" disabled>
                        <img v-if="ruleForm.representativeimgleft" :src="ruleForm.representativeimgleft" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </div>

            <el-form-item label="店铺图片:">
                <el-upload action="https://store.galaxyhigh.cn/store/server/upDataImg" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess"
                    :limit="5" :multiple="true" :file-list='filelist' :on-exceed="onexceed">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>

            <el-form-item label="管理员列表:" prop="tableData">
                <el-button icon='el-icon-folder-add' size="mini" @click="addAdmin=true">添加管理员</el-button>
                <el-table :data="tableData" style="width: 920px">
                    <template slot="empty">
                        <!-- <el-link type="primary" @click="addAdmin=true">添加管理员</el-link> -->
                    </template>
                    <el-table-column label="账号:" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.tel }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="名称:" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="添加时间:" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.addtime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态:" align="center">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.enable" :active-value="1" :inactive-value="0"
                                @change="enableChange(scope.row.id)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作:" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                            <el-popconfirm confirmButtonText='确定' cancelButtonText='再想想' icon="el-icon-info"
                                iconColor="red" title="确定删除该管理员吗" @onConfirm="handleDelete(scope.row.id,scope.$index)">
                                <el-button size="mini" type="danger" slot="reference" style="margin-left: 10px;">删除
                                </el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="editForm('ruleForm')">立即修改</el-button>
                <el-button @click="cancelSureHandel">取消</el-button>
            </el-form-item>
        </el-form>

    </div>

</template>


<script>
    import axios from 'axios';
     
// import Vue from 'vue'
// import AMap from 'vue-amap'
// Vue.use(AMap)
//   AMap.initAMapApiLoader({
//         key: '383dcb6ce4f12e17006449a5b006245c',
//         plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor'],
//         v: '1.4.4'
//     });

    export default {
        data() {
            let self = this;
            return {
                editShopShow:false,
                editAdmin: false,
                mapShow:false,
                adminData: [],
                filelist: [],
                addAdminData: [],
                addAdminForm: {
                    adminName: '',
                    adminTel: '',
                    adminPassword: '',
                    root: ''
                },
                editAdminForm: {
                    root: ''
                },
                data: [{
                    id: '1-0',
                    label: '菜品管理',
                    children: [{
                        id: '1-7',
                        label: '菜品类别',
                    }, {
                        id: '1-8',
                        label: '菜品档案',
                    }, {
                        id: '1-9',
                        label: '菜品口味',
                    }, {
                        id: '1-10',
                        label: '规格管理',
                    }
                    ]
                }, {
                    id: '2-0',
                    label: '订单管理',
                    children: [{
                        id: '2-11',
                        label: '餐饮订单'
                    }, {
                        id: '2-12',
                        label: '退款订单'
                    }]
                }, {
                    id: '3-0',
                    label: '数据报表',
                    children: [{
                        id: '3-13',
                        label: '营业统计'
                    }, {
                        id: '3-14',
                        label: '收银流水'
                    }, {
                        id: '3-15',
                        label: '菜品销量'
                    }]
                }, {
                    id: '4-0',
                    label: '促销活动',
                    children: [{
                        id: '4-16',
                        label: '特价折扣'
                    }, {
                        id: '4-17',
                        label: '店铺折扣'
                    }, {
                        id: '4-18',
                        label: '套餐热卖'
                    }, {
                        id: '4-19',
                        label: '优惠券设置'
                    }]
                }, {
                    id: '5-0',
                    label: '门店管理',
                    children: [{
                        id: '5-20',
                        label: '门店列表'
                    }, {
                        id: '5-21',
                        label: '桌位管理'
                    }]
                }, {
                    id: '6-0',
                    label: '设置',
                    children: [{
                        id: '6-22',
                        label: '银行卡'
                    }, {
                        id: '6-23',
                        label: '管理员列表'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                activeName: 'first',
                imageUrl1: '',
                imageUrl2: '',
                imageUrl3: '',
                imageUrl4: '',
                imageUrl5: '',
                value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
                mapJson: '/mock/map.json',
                province: [],
                sheng: '',
                shi: '',
                shi1: [],
                qu: '',
                qu1: [],
                city: '',
                block: '',
                initProvice: '',
                initCity: '',
                initArea: '',
                initAddress: '',
                ruleForm: {
                    name: '',
                    provice: '',
                    city: '',
                    creditcode: '',
                    area: '',
                    address: '',
                    realname: '',
                    tel: '',
                    zhizhao: '',
                    logo: '',
                    weisheng: '',
                    type: '',
                    licenseprovincecode: '',
                    licensecitycode: '',
                    licenseareacode: '',
                    licensestarttime: '',
                    licenseendtime: '',
                    sphere: '',
                    representativetype: '',
                    representativename: '',
                    representativecode: '',
                    representativeimgright: '',
                    representativeimgleft: '',
                    hour_m_start: '',
                    hour_m_end: '',
                    dateTime: [],
                    avg: '',
                    low: '',
                    type: '',
                    lon: '',
                    lat: '',
                    banner: []
                },
                tableData: [],
                dialogImageUrl: '',
                dialogVisible: false,
                rules: {
                    adminName: [
                        { required: true, message: '管理员名称不能为空', trigger: 'blur' }
                    ],
                    adminTel: [
                        { required: true, message: '管理员手机号不能为空', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '店铺名称不能为空', trigger: 'blur' }
                    ],
                    provice: [
                        { required: true, message: '请选择省', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择市', trigger: 'blur' }
                    ],
                    area: [
                        { required: true, message: '请选择区', trigger: 'blur' }
                    ],
                    licenseprovincecode: [
                        { required: true, message: '请选择省', trigger: 'blur' }
                    ],
                    licensecitycode: [
                        { required: true, message: '请选择市', trigger: 'blur' }
                    ],
                    licenseareacode: [
                        { required: true, message: '请选择区', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入详细地址', trigger: 'blur' }
                    ],
                    lon: [
                        { required: true, message: '精度不能为空', trigger: 'blur' }
                    ],
                    lat: [
                        { required: true, message: '纬度不能为空', trigger: 'blur' }
                    ],
                    avg: [
                        { required: true, message: '人均消费不能为空', trigger: 'blur' }
                    ],
                    low: [
                        { required: true, message: '最低消费不能为空', trigger: 'blur' }
                    ],
                    realname: [
                        { required: true, message: '联系人不能为空', trigger: 'blur' }
                    ],
                    creditcode: [
                        { required: true, message: '信用代码不能为空', trigger: 'blur' }
                    ],
                    dateTime: [
                        { required: true, message: '营业时间不能为空', trigger: 'blur' }
                    ],
                    representativecode: [
                        { required: true, message: '法定代表人证件号不能为空', trigger: 'blur' }
                    ],
                    licenseendtime: [
                        { required: true, message: '营业期限不能为空', trigger: 'blur' }
                    ],
                    sphere: [
                        { required: true, message: '经营范围不能为空', trigger: 'blur' }
                    ],
                    representativename: [
                        { required: true, message: '法定代表人姓名不能为空', trigger: 'blur' }
                    ],
                    licensestarttime: [
                        { required: true, message: '成立时间不能为空', trigger: 'blur' }
                    ],
                    tel: [
                        { required: true, message: '电话不能为空', trigger: 'blur' }
                    ]



                },
                foodChecked: [],
                addAdmin: false,
                changeBannerImg: false,
                checkList: [],
                checkdata: false,
                // center: [121.539693, 31.126667],
                zoom: 16,
                mapStyle: "amap://styles/8b6be8ec497009e17a708205348b899a", //设置地图样式
                markers: [],
                windows: [{
                    position: [121.539693, 121.539693],
                    content: "",//内容
                    offset: [1, -25],//窗体偏移
                    visible: false//初始是否显示
                }],
                window: '',
                infoevents: {
                    click(e) {

                    }
                },
                searchOption: {
                    city: '',
                    citylimit: true
                },
                adminId: '',
                mapStyle: "amap://styles/8b6be8ec497009e17a708205348b899a", //设置地图样式
                lng: 0,
                ditu:'',
                lat: 0,
                loaded: false,
                address: '',
                proviceInit: '',
                cityInit: '',
                areaInit: '',
                addressInit: '',
                proviceCode: '',
                cityCode: '',
                areaCode: '',
                events: {
                    click(e) {
                        let { lng, lat } = e.lnglat;
                        self.lng = lng;
                        self.lat = lat;
                        let address = ''
                        // if (AMap) {
                        //     console.log('有map');
                        //     this.$axios.post('/store/Server/addFormData', {
                        //         text:AMap
                        //     }, response => {
                        //         console.log(response);

                        //     })
                        // } else {
                        //     this.$axios.post('/store/Server/getFormData', {

                        //     }, response => {
                        //         console.log(response);

                        //     })
                        // }
                        
                        
                        var geocoder = new AMap.Geocoder({
                            radius: 1000,
                            extensions: "all"
                        });
                        
                        geocoder.getAddress([lng, lat], function (status, result) {
                            if (status === 'complete' && result.info === 'OK') {
                                self.proviceInit = result.regeocode.addressComponent.province
                                self.cityInit = result.regeocode.addressComponent.city
                                self.areaInit = result.regeocode.addressComponent.district
                                // this.initProvice=result.regeocode:
                                if (result && result.regeocode) {
                                    self._data.address = result.regeocode.formattedAddress;
                                    self.$nextTick();
                                    var address = result.regeocode.formattedAddress

                                    self.addressInit = result.regeocode.formattedAddress
                                    //             geocoder.getLocation(address, function (status, result) {
                                    //     
                                    //     

                                    //     // if (status === 'complete' && result.info === 'OK') {
                                    //     //     
                                    //     //     

                                    //     //     // if (result && result.regeocode) {
                                    //     //     //     self._data.address = result.regeocode.formattedAddress;
                                    //     //     //     self.$nextTick();
                                    //     //     // }
                                    //     // }
                                    // })
                                }
                            }
                        })




                        let marker = {
                            position: [lng, lat]
                        };

                        // self._data.windows.visible = false;
                        self._data.window = false;
                        // self._data.markers = [];
                        self._data.markers.push({
                            position: [lng, lat],
                            events: {
                                click() {

                                    self._data.windows.visible = false; //关闭窗体
                                    self._data.window = false;
                                    self.$nextTick(() => {
                                        self._data.windows.visible = true;//点击点坐标，出现信息窗体
                                        self._data.windows = [];
                                        self._data.window = true;
                                        self._data.windows.push({
                                            position: [lng, lat],

                                            offset: [1, -25],//窗体偏移
                                            visible: true//初始是否显示
                                        })
                                    });
                                }
                            }
                        });
                    }
                },
                plugin: [{
                    pName: 'Geolocation',
                    events: {
                        init(o) {

                            // o 是高德地图定位插件实例
                            o.getCurrentPosition((status, result) => {


                                // if (result && result.position) {
                                //     self.lng = result.position.lng;
                                //     self.lat = result.position.lat;
                                //     self.center = [self.lng, self.lat];
                                //     self.loaded = true;
                                //     self.$nextTick();
                                // }
                            });
                        }
                    }
                }]
            };
        },
        
        mounted() {

//             window.addEventListener('beforeunload', e => {
//                 this.editShopShow = false
//                 setTimeout(() => {
//                     this.$router.push('/editshop')
//                 }, 500);
                
//             })
//             document.oncontextmenu = function(){
// 　　            return false;
//             }
//             document.onkeydown = function (e) {
//                     var evt = window.event || e;
//                     var code = evt.keyCode || evt.which;
//                     if (code == 116) {
//                         if (evt.preventDefault) {
//                             evt.preventDefault();
//                         } else {
//                             evt.keyCode = 0;
//                             evt.returnValue = false
//                         }
//                     }
//                 }
            // window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
//          
            // if (AMap) {
                // console.log('有map');
               
            // } 
            // else {
            //     this.$axios.post('/store/Server/getFormData', {

            //     }, response => {
            //         console.log(response);

            //     })
            // }
            // localStorage.setItem("ditu",AMap)
            // console.log(localStorage.getItem("ditu"));

           
            // document.onkeydown = function (e) {
            //     var evt = window.event || e;
            //     var code = evt.keyCode || evt.which;
            //     if (code == 116) {
            //         if (evt.preventDefault) {
            //             evt.preventDefault();
            //         } else {
            //             evt.keyCode = 0;
            //             evt.returnValue = false
            //         }
            //     }
            // }
            // console.log(AMap);
            // var json = eval("(" + AMap + ")");
            // console.log(json);
            // console.log(JSON.parse(JSON.stringify(AMap)));
            // localStorage.setItem('AMap',JSON.stringify(AMap))
            // console.log(localStorage.getItem('AMap'));
            // console.dir(AMap);
            // console.log(JSON.stringify(AMap));
            // var jsonAMap = JSON.stringify(AMap)
            // var json = eval("(" + jsonAMap + ")");
            // console.log(json);
           
                this.token = this.$Cookies.get('token');
            this.globId = this.$route.query.globId;
            
             
                
          
              
            
            
            this.$axios.post('/store/Discount/getBusinessForm', {
                token: this.token,
                bid: this.globId,
            }, response => {
                
                
                this.getAreaCode(response.data.data.provice, response.data.data.city, response.data.data.area)
                this.ruleForm.name = response.data.data.name;
                // this.ruleForm.provice = response.data.data.provice;
                // this.ruleForm.city = response.data.data.city;
                // this.ruleForm.area = response.data.data.area;
                this.ruleForm.address = response.data.data.address;
                this.ruleForm.realname = response.data.data.realname;
                this.ruleForm.tel = response.data.data.tel;
                this.ruleForm.zhizhao = response.data.data.zhizhao;
                this.ruleForm.logo = response.data.data.logo;
                this.ruleForm.creditcode = response.data.data.creditcode,
                    this.ruleForm.weisheng = response.data.data.weisheng;
                this.ruleForm.licenseprovincecode = response.data.data.licenseprovince;
                this.ruleForm.licensecitycode = response.data.data.licensecity;
                this.ruleForm.licenseareacode = response.data.data.licensearea;
                this.ruleForm.licensestarttime = response.data.data.licensestarttime;
                this.ruleForm.licenseendtime = response.data.data.licenseendtime;
                this.ruleForm.sphere = response.data.data.sphere;
                this.ruleForm.representativetype = response.data.data.representativetype;
                this.ruleForm.representativename = response.data.data.representativename;
                this.ruleForm.representativecode = response.data.data.representativecode;
                this.ruleForm.representativeimgright = response.data.data.representativeimgright;
                this.ruleForm.representativeimgleft = response.data.data.representativeimgleft;
                this.ruleForm.hour_m_start = response.data.data.hour_m_start;
                this.ruleForm.hour_m_end = response.data.data.hour_m_end;
                this.ruleForm.avg = response.data.data.avg;
                this.ruleForm.low = response.data.data.low;
                this.ruleForm.type = response.data.data.type;
                this.ruleForm.lon = response.data.data.lon;
                this.ruleForm.lat = response.data.data.lat;
                this.ruleForm.type = response.data.data.type;
                for (var i = 0; i < response.data.data.banner.length; i++) {
                    this.filelist.push({ url: response.data.data.banner[i] })
                }
                this.ruleForm.hour_m_start = response.data.data.hour_m_start
                this.ruleForm.hour_m_end = response.data.data.hour_m_end
                this.ruleForm.dateTime = [response.data.data.hour_m_start, response.data.data.hour_m_end]
                this.ruleForm.banner = response.data.data.banner
                this.mapShow = true
                

            })
            // this.choseBlock()
            this.$axios.post('/store/Discount/getBussinessuserList', {
                token: this.token,
                bid: this.globId,
            }, response => {
                this.editShopShow = true
               setTimeout(() => {
                   this.getLocation();
                    this.getCityData()
               }, 0);
                    
                
                
               
                this.tableData = response.data.data
            })
            
            this.getCityData()
           
            
        },
         destroyed() {
            document.onkeydown = undefined
        document.oncontextmenu = undefined

        },
        methods: {
            beforeunloadFn() {
                // console.log('刷新');
                // this.$router.push({path:'/editshop'})
               
               
            },
            yongjiuFocus() {
                this.ruleForm.licenseendtime = ''
            },
            getCheckedKeys() {




                return this.$refs.tree.getCheckedKeys();

            },
            setCheckedKeys(array) {
                this.$refs.tree.setCheckedKeys(array);
            },
            cancelSureHandel() {
                this.$confirm('确认取消？')
                    .then(_ => {
                        this.$router.go(-1)
                        done();
                    })
                    .catch(_ => { });
            },
            editAdForm() {
                this.editAdminForm.root = this.$refs.tree1.getCheckedKeys()
                this.$axios.post('/store/Discount/getUserEdit', {
                    token: this.token,
                    bid: this.globId,
                    id: this.adminId,
                    root: this.editAdminForm.root
                }, response => {

                    if (response.data.code == 0) {
                        this.$notify({
                            title: '成功',
                            message: '管理员编辑成功',
                            type: 'success'
                        });
                        this.editAdmin = false
                        this.$axios.post('/store/Discount/getBussinessuserList', {
                            token: this.token,
                            bid: this.globId,
                        }, response => {

                            this.tableData = response.data.data
                            // if (response.data.code == 0) {
                            //     this.$notify({
                            //         title: '成功',
                            //         message: '店铺修改成功',
                            //         type: 'success'
                            //     });
                            //     this.$router.push({ path: '/shoplist' })
                            // } else {
                            //     this.$message.error(response.data.msg)
                            // }
                        })
                    } else {
                        this.$message.error(response.data.msg)
                    }
                })
            },
            handleAdd(id) {
                this.$axios.post('/store/Discount/getBussinessuseryAdd', {
                    token: this.token,
                    bid: this.globId,
                    uid: id
                }, response => {

                    if (response.data.code == 0) {
                        this.$notify({
                            title: '成功',
                            message: '管理员新增成功',
                            type: 'success'
                        });
                        this.addAdmin = false
                        this.$axios.post('/store/Discount/getBussinessuserList', {
                            token: this.token,
                            bid: this.globId,
                        }, response => {

                            this.tableData = response.data.data
                            // if (response.data.code == 0) {
                            //     this.$notify({
                            //         title: '成功',
                            //         message: '店铺修改成功',
                            //         type: 'success'
                            //     });
                            //     this.$router.push({ path: '/shoplist' })
                            // } else {
                            //     this.$message.error(response.data.msg)
                            // }
                        })
                    } else {
                        this.$message.error(response.data.msg)
                    }
                })
            },
            handleDelete(id, index) {
                this.$axios.post('/store/Discount/getUserDel', {
                    token: this.token,
                    bid: this.globId,
                    id: id
                }, response => {

                    if (response.data.code == 0) {
                        this.$notify({
                            title: '成功',
                            message: '管理员删除成功',
                            type: 'success'
                        });
                        this.tableData.splice(index, 1)
                    } else {
                        this.$message.error(response.data.msg)
                    }
                })
            },
            handleEdit(id) {
                this.adminId = id
                this.editAdmin = true
                this.$axios.post('/store/Discount/getUserForm', {
                    token: this.token,
                    bid: this.globId,
                    id: id
                }, response => {

                    // this.tableData = response.data.data
                    this.$refs.tree1.setCheckedKeys(response.data.data.root);
                    // if (response.data.code == 0) {
                    //     this.$notify({
                    //         title: '成功',
                    //         message: '店铺修改成功',
                    //         type: 'success'
                    //     });
                    //     this.$router.push({ path: '/shoplist' })
                    // } else {
                    //     this.$message.error(response.data.msg)
                    // }
                })
            },

            handleAvatarSuccess1(res, file) {
                this.ruleForm.zhizhao = res.img
            },
            handleAvatarSuccess2(res, file) {
                this.ruleForm.logo = res.img
            },
            handleAvatarSuccess3(res, file) {
                this.ruleForm.weisheng = res.img
            },
            handleAvatarSuccess4(res, file) {
                this.ruleForm.representativeimgright = res.img
            },
            handleAvatarSuccess5(res, file) {
                this.ruleForm.representativeimgleft = res.img
            },
            onexceed(files, fileList) {
                this.$message.error('只能上传五张店铺图片')
            },
            handleSuccess(response, file, fileList) {


                // this.ruleForm.banner_img.push(response.url)

                // fileList.push(response.url)

                // var i = 0;
                this.ruleForm.banner = [];
                for (var i = 0; i < fileList.length; i++) {

                    // if (this.changeBannerImg) {
                    if (fileList[i].response) {
                        this.ruleForm.banner.push(fileList[i].response.url)
                    } else {
                        this.ruleForm.banner.push(fileList[i].url)
                    }

                    // } 
                    // else {
                    //     this.ruleForm.banner.push(fileList[i].url)
                    // }
                }

                return;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                // if (!isJPG) {
                //     this.$message.error('上传头像图片只能是 JPG 格式!');
                // }
                // if (!isLt2M) {
                //     this.$message.error('上传头像图片大小不能超过 2MB!');
                // }
                return isJPG && isLt2M;
            },
            handleClick(tab, event) {

                if (tab.index == 1) {
                    this.$axios.post('/store/User/getUserList', {
                        token: this.token,
                        bid: this.globId,
                    }, response => {

                        this.addAdminData = response.data.data
                        // if (response.data.code == 0) {
                        //     this.$notify({
                        //         title: '成功',
                        //         message: '店铺修改成功',
                        //         type: 'success'
                        //     });
                        //     this.$router.push({ path: '/shoplist' })
                        // } else {
                        //     this.$message.error(response.data.msg)
                        // }
                    })
                }

            },
            // 加载china地点数据，三级
            getAreaCode(provice, city, area) {
                
                var that = this

                axios.get(this.mapJson).then(function (response) {

                    if (response.status == 200) {
                        var data = response.data
                        // 省市区数据分类
                        for (var item in data) {
                            if (item.match(/0000$/)) {//省
                                console.log(item);
                                if (provice == item) {
                                    that.choseProvince(item)
                                    
                                    that.ruleForm.provice = item
                                }
                            } else if (item.match(/00$/)) {//市
                                if (city == item) {
                                    that.choseCity(item)

                                    that.ruleForm.city = item
                                }
                            } else {//区
                                if (area == item) {
                                    that.choseBlock(item)
                                    that.ruleForm.area = item
                                }
                            }
                        }
                        // this.ruleForm.provice = this.ruleForm.provice;
                        // this.ruleForm.city = this.ruleForm.city;
                        // this.ruleForm.area = this.ruleForm.area;
                    }
                    else {

                    }
                })
            },
            getCodeArea(provice, city, area) {
                var that = this
                axios.get(this.mapJson).then(function (response) {

                    if (response.status == 200) {
                        var data = response.data
                        // 省市区数据分类
                         var havecity = false;
                        for (var item in data) {
                           
                            if (item.match(/0000$/)) {//省
                                // console.log(item);
                                if (provice == data[item]) {
                                    that.choseProvince(item)
                                    // console.log(data[item]);
                                    that.ruleForm.provice = item
                                }
                            } else if (item.match(/00$/)) {//市
                                
                                if (city == data[item]) {
                                    that.choseCity(item)
                                    that.ruleForm.city = item
                                    havecity = true
                                } 
                                
                            } else {//区
                                if (area == data[item]) {
                                    that.choseBlock(item)
                                    that.ruleForm.area = item
                                }
                            }
                        }
                        if(havecity==false) {
                                    that.choseCity('')
                                    that.ruleForm.city = that.provinceBoxCode
                                }
                        // this.ruleForm.provice = this.ruleForm.provice;
                        // this.ruleForm.city = this.ruleForm.city;
                        // this.ruleForm.area = this.ruleForm.area;
                    }
                    else {

                    }
                })
            },
            getCityData() {
                var that = this
                axios.get(this.mapJson).then(function (response) {

                    if (response.status == 200) {
                        var data = response.data
                        that.province = []
                        that.city = []
                        that.block = []
                        // 省市区数据分类
                        for (var item in data) {
                            if (item.match(/0000$/)) {//省
                                that.province.push({ id: item, value: data[item], children: [] })
                            } else if (item.match(/00$/)) {//市
                                that.city.push({ id: item, value: data[item], children: [] })
                            } else {//区
                                that.block.push({ id: item, value: data[item] })
                            }
                        }
                        // 分类市级
                        for (var index in that.province) {
                            for (var index1 in that.city) {
                                if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                                    that.province[index].children.push(that.city[index1])
                                }
                            }
                        }
                        // 分类区级
                        for (var item1 in that.city) {
                            for (var item2 in that.block) {
                                if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
                                    that.city[item1].children.push(that.block[item2])
                                }
                            }
                        }

                        // that.ruleForm.provice = '410000'
                        // that.ruleForm.city = '410100'
                        // this.ruleForm.area
                        // that.choseProvince('410000')
                        // that.choseCity(that.ruleForm.city)
                    }
                    else {

                    }
                }).catch(function (error) { })
            },
            // 选省
            choseProvince(e) {

                this.provinceBox = e
                for (var index2 in this.province) {


                    if (e === this.province[index2].id) {
                        this.provinceBoxCode = this.province[index2].id
                        this.shi1 = this.province[index2].children
                        this.shi = this.province[index2].children[0].value
                        this.qu1 = this.province[index2].children[0].children
                        this.qu = this.province[index2].children[0].children[0].value
                        this.E = this.qu1[0].id
                    }
                }
            },
            // 选市
            choseCity(e) {
                if(e=='') {
                    console.log('等于空');
                    e=this.provinceBox
                } 
                for (var index3 in this.city) {
                    if (e === this.city[index3].id) {
                        this.qu1 = this.city[index3].children
                        this.qu = this.city[index3].children[0].value
                        this.E = this.qu1[0].id

                    }
                }
            },
            // 选区
            choseBlock(e) {
                this.E = e;

            },
            adminForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        ddAdminForm.root = this.getCheckedKeys()
                        this.$axios.post('/store/Discount/getBussinessuserAdd', {
                            token: this.token,
                            bid: this.globId,
                            name: this.addAdminForm.adminName,
                            tel: this.addAdminForm.adminTel,
                            password: this.addAdminForm.adminPassword,
                            root: this.addAdminForm.root

                        }, response => {

                            if (response.data.code == 0) {
                                this.$notify({
                                    title: '成功',
                                    message: '管理员添加成功',
                                    type: 'success'
                                });
                                this.addAdmin = false
                                this.$axios.post('/store/Discount/getBussinessuserList', {
                                    token: this.token,
                                    bid: this.globId,
                                }, response => {
                                    this.tableData = response.data.data
                                })
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        })
                    }
                })
            },
            enableChange(id) {
                this.$axios.post('/store/Discount/getUserType', {
                    token: this.token,
                    bid: this.globId,
                    id: id
                }, response => {

                })
            },
            editForm(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        if (this.ruleForm.logo == '') {
                            this.$message.error('店铺logo还未上传')
                            return;
                        } else if (this.ruleForm.banner.length == 0) {
                            this.$message.error('店铺图片还未上传')
                            return;
                        }
                        this.$axios.post('/store/Discount/getBusinessEdit', {
                            token: this.token,
                            bid: this.globId,
                            name: this.ruleForm.name,
                            provice: this.ruleForm.provice,
                            city: this.ruleForm.city,
                            area: this.ruleForm.area,
                            address: this.ruleForm.address,
                            realname: this.ruleForm.realname,
                            tel: this.ruleForm.tel,
                            zhizhao: this.ruleForm.zhizhao,
                            logo: this.ruleForm.logo,
                            weisheng: this.ruleForm.weisheng,
                            creditcode: this.ruleForm.creditcode,
                            licenseprovincecode: this.ruleForm.licenseprovincecode,
                            licensecitycode: this.ruleForm.licensecitycode,
                            licenseareacode: this.ruleForm.licenseareacode,
                            licensestarttime: this.ruleForm.licensestarttime,
                            licenseendtime: this.ruleForm.licenseendtime,
                            sphere: this.ruleForm.sphere,
                            representativetype: this.ruleForm.representativetype,
                            representativename: this.ruleForm.representativename,
                            representativecode: this.ruleForm.representativecode,
                            representativeimgright: this.ruleForm.representativeimgright,
                            representativeimgleft: this.ruleForm.representativeimgleft,
                            hour_m_start: this.ruleForm.hour_m_start,
                            hour_m_end: this.ruleForm.hour_m_end,
                            avg: this.ruleForm.avg,
                            low: this.ruleForm.low,
                            lon: this.ruleForm.lon,
                            lat: this.ruleForm.lat,
                            type: this.ruleForm.type,
                            banner: this.ruleForm.banner,
                        }, response => {

                            if (response.data.code == 0) {
                                this.$notify({
                                    title: '成功',
                                    message: '店铺修改成功',
                                    type: 'success'
                                });
                                this.$router.push({ path: '/shoplist' })
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        })
                    } else {

                        return false;
                    }
                })
            },

            addChecked(index) {
                if (this._data.foodList[index].checked == true) {

                    this._data.foodList[index].checked = false;
                } else {

                    this._data.foodList[index].checked = true;
                }



            },
            handleRemove(file, fileList) {
                this.ruleForm.banner = []
                for (var i = 0; i < fileList.length; i++) {
                    this.ruleForm.banner.push(fileList[i].url)
                }

                this.changeBannerImg = true
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this._data.addAdmin = false
                        done();
                    })
                    .catch(_ => { });
            },
            infoClick() {
                
                var proviceInit = this.proviceInit
                var cityInit = this.cityInit
                var areaInit = this.areaInit


                console.log(proviceInit);
                console.log(cityInit);
                console.log(areaInit);
                this.getCodeArea(proviceInit, cityInit, areaInit)
                this.ruleForm.address = this.addressInit;
                this.ruleForm.lon = this.lng
                this.ruleForm.lat = this.lat






            },
            daoruHandel() {


            },
            onPick(date) {

                if (date == null) {
                    this.ruleForm.hour_m_start = ''
                    this.ruleForm.hour_m_end = ''
                    return
                }
                this.ruleForm.hour_m_start = date[0];
                this.ruleForm.hour_m_end = date[1]
            },

            getLocation() {
                const self = this;
                AMap.plugin('AMap.Geolocation', function () {
                    var geolocation = new AMap.Geolocation({
                        // 是否使用高精度定位，默认：true
                        enableHighAccuracy: true,
                        // 设置定位超时时间，默认：无穷大
                        timeout: 10000,
                    })

                    geolocation.getCurrentPosition()
                    AMap.event.addListener(geolocation, 'complete', onComplete)
                    AMap.event.addListener(geolocation, 'error', onError)

                    function onComplete(data) {
                        // data是具体的定位信息

                    }

                    function onError(data) {
                        // 定位出错

                        self.getLngLatLocation()
                    }
                })
            },

            onSearchResult(pois) {
                let latSum = 0;
                let lngSum = 0;
                if (pois.length > 0) {
                    pois.forEach(poi => {
                        let { lng, lat } = poi;
                        lngSum += lng;
                        latSum += lat;
                        // this.markers.push([poi.lng, poi.lat]);
                    });

                    let center = {
                        lng: lngSum / pois.length,
                        lat: latSum / pois.length
                    };
                    this.center = [center.lng, center.lat];
                }
            }
        }

    };
</script>
<style>
    .content .el-dialog__body {
        padding: 21px;
        padding-top: 0;
    }

    .edit .el-tabs__content {
        margin-left: 2px;
    }

    .el-tabs__content {
        margin-left: -19px;
    }

    .avatar-uploader .el-upload {
        background-color: #fff;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .flexBox {
        display: flex;
        justify-content: space-between;
    }

    .amap-demo {
        height: 300px;
    }

    .search-box {
        position: absolute !important;
        top: 16px;
        left: 20px;
    }

    .amap-page-container {
        position: relative;
        ;
    }

    .addshop {
        width: 1000px;
        margin: 0 auto;
    }

    .amap-wrapper {
        /* width: 1440px; */
        /* height: 600px; */
    }

    .amap-info-content {
        padding-top: 20px
    }

    .daoru {
        color: #409EFF;
        cursor: pointer;
    }

    .daoru:hover {
        color: #66B1FF;
    }

    .content {
        width: 1000px;
        margin: 0 auto;
    }
</style>