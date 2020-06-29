<template>
    <div class="content">
        <el-dialog title="添加管理员" :visible.sync="addAdmin" width="30%" :before-close="handleClose">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="用户管理" name="first">
                    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="管理员名称:" prop="name" style="width: 90%;margin-left:auto;margin-right:auto">
                            <el-input v-model="ruleForm.name" placeholder="请输入管理员名称"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号:" prop="name" style="width: 90%;margin-left:auto;margin-right:auto">
                            <el-input v-model="ruleForm.name" placeholder="请输入管理员名称"></el-input>
                        </el-form-item>
                        <el-form-item label="密码:" prop="name" style="width: 90%;margin-left:auto;margin-right:auto">
                            <el-input v-model="ruleForm.name" placeholder="请输入管理员名称"></el-input>
                        </el-form-item>
                        <el-form-item label="拥有权限:" prop="name" style="width: 90%;margin-left:auto;margin-right:auto">
                            <el-tree :data="data" show-checkbox node-key="id" ref="tree" highlight-current
                                :props="defaultProps">
                            </el-tree>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                            <el-button @click="handleClose">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="配置管理" name="second">
                    <el-table :data="adminData" style="width: 100%">
                        <el-table-column label="姓名" align="center">
                            <template slot-scope="scope">
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                </div>
                                yy
                            </template>
                        </el-table-column>
                        <el-table-column label="账号" align="center">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.date }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">添加</el-button>
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
        <h2 class="editfoodrecordTit">新增店铺</h2>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">

            <el-form-item label="门店名称:" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入套餐名称"></el-input>
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
                            style="margin-right: 5%;width: 100%;">
                            <el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label-width="0px" prop="licensecitycode" style="width: 30%;">
                        <el-select v-model="ruleForm.licensecitycode" @change="choseCity" placeholder="市级地区"
                            style="margin-right: 5%;width: 100%;">
                            <el-option v-for="item in shi1" :key="item.id" :label="item.value" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label-width="0px" prop="licenseareacode" style="width: 30%;">
                        <el-select v-model="ruleForm.licenseareacode" @change="choseBlock" placeholder="区级地区"
                            style="width: 100%;">
                            <el-option v-for="item in qu1" :key="item.id" :label="item.value" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-form-item>
            <el-form-item label="信用代码:" prop="creditcode" style="width: 100%;">
                <el-input v-model="ruleForm.creditcode" placeholder="请输入社会统一信用代码"></el-input>
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
                    <el-input v-model="ruleForm.representativecode" placeholder="请输入法定代表人证件号"></el-input>
                </el-form-item>
                <el-form-item label="营业期限:" prop="licenseendtime" style="width: 50%;">
                    <el-date-picker v-if="ruleForm.licenseendtime!=='-1'" v-model="ruleForm.licenseendtime"
                        style="width: 100%;" type="date" align="right" placeholder="请输入营业期限"
                        :picker-options="pickerOptions" value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <el-input v-if="ruleForm.licenseendtime=='-1'" :value="ruleForm.licenseendtime=='-1'?'永久':''"
                        @focus="yongjiuFocus"></el-input>

                </el-form-item>
            </div>
            <div class=" flexBox">
                <el-form-item label="证件类型:" prop="name" style="width: 50%;">
                    <el-select v-model="ruleForm.representativetype" placeholder="请选择证件类型" style="width: 100%;">
                        <el-option value="1" label="身份证">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="经营范围:" prop="sphere" style="width: 50%;">
                    <el-input v-model="ruleForm.sphere" placeholder="请输入经营范围"></el-input>
                </el-form-item>
            </div>
            <div class="flexBox">
                <el-form-item label="法人姓名:" prop="representativename" style="width: 50%;">
                    <el-input v-model="ruleForm.representativename" placeholder="请输入法定代表人姓名"></el-input>
                </el-form-item>
                <el-form-item label="成立时间:" prop="licensestarttime" style="width: 50%;">
                    <el-date-picker v-model="ruleForm.licensestarttime" style="width: 100%;" type="date"
                        placehostlder="请输入成立时间" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </div>
            <el-form-item label="电话:" prop="tel" style="width: 100%;">
                <el-input v-model="ruleForm.tel" placeholder="请输入您的电话"></el-input>
            </el-form-item>
            <div class="flexBox">
                <el-form-item label="营业执照:">
                    <el-upload class="avatar-uploader" action="https://store.galaxyhigh.cn/store/server/upDataImg"
                        :show-file-list="false" :on-success="handleAvatarSuccess1" :limit="1" :multiple="true">
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
                        :show-file-list="false" :on-success="handleAvatarSuccess3" :limit="1" :multiple="true">
                        <img v-if="ruleForm.weisheng" :src="ruleForm.weisheng" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </div>
            <div class="shenfenzheng">
                <el-form-item label="身份证正面:">
                    <el-upload class="avatar-uploader" action="https://store.galaxyhigh.cn/store/server/upDataImg"
                        :show-file-list="false" :on-success="handleAvatarSuccess4">
                        <img v-if="ruleForm.representativeimgright" :src="ruleForm.representativeimgright"
                            class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="身份证反面:" style="margin-left: 80px;">
                    <el-upload class="avatar-uploader" action="https://store.galaxyhigh.cn/store/server/upDataImg"
                        :show-file-list="false" :on-success="handleAvatarSuccess5">
                        <img v-if="ruleForm.representativeimgleft" :src="ruleForm.representativeimgleft" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </div>

            <el-form-item label="店铺图片:">
                <el-upload action="https://store.galaxyhigh.cn/store/server/upDataImg" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess"
                    :limit="5" :multiple="true">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="cancelSureHandel">取消</el-button>
            </el-form-item>
        </el-form>

    </div>

</template>


<script>
    import axios from 'axios';
    export default {
        data() {
            let self = this;
            return {
                pickerOptions: {
                    shortcuts: [{
                        text: '永久',
                        onClick(picker) {
                            picker.$emit('pick', ['', '']);
                            self.ruleForm.licenseendtime = '-1';
                            
                        }
                    }]
                },
                adminData: [],
                mapShow:false,
                data: [{
                    id: 1,
                    label: '菜品管理',
                    children: [{
                        id: 7,
                        label: '菜品类别',
                    }, {
                        id: 8,
                        label: '菜品档案',
                    }, {
                        id: 9,
                        label: '菜品口味',
                    }, {
                        id: 10,
                        label: '规格管理',
                    }
                    ]
                }, {
                    id: 2,
                    label: '订单管理',
                    children: [{
                        id: 11,
                        label: '餐饮订单'
                    }, {
                        id: 12,
                        label: '退款订单'
                    }]
                }, {
                    id: 3,
                    label: '数据报表',
                    children: [{
                        id: 11,
                        label: '营业统计'
                    }, {
                        id: 12,
                        label: '收银流水'
                    }, {
                        id: 13,
                        label: '菜品销量'
                    }]
                }, {
                    id: 4,
                    label: '促销活动',
                    children: [{
                        id: 14,
                        label: '特价折扣'
                    }, {
                        id: 15,
                        label: '店铺折扣'
                    }, {
                        id: 16,
                        label: '套餐热卖'
                    }, {
                        id: 17,
                        label: '优惠券设置'
                    }]
                }, {
                    id: 5,
                    label: '门店管理',
                    children: [{
                        id: 18,
                        label: '门店列表'
                    }, {
                        id: 19,
                        label: '桌位管理'
                    }]
                }, {
                    id: 6,
                    label: '设置',
                    children: [{
                        id: 20,
                        label: '系统设置'
                    }, {
                        id: 21,
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
                    area: '',
                    creditcode: '',
                    address: '',
                    realname: '',
                    tel: '',
                    zhizhao: '',
                    logo: '',
                    weisheng: '',
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
                        { required: true, message: '营业期限不能为空', trigger: 'blur' },
                        { required: true, message: '营业期限不能为空', trigger: 'change' }
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
                checkList: [],
                checkdata: false,
                center: [121.539693, 31.126667],
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
                mapStyle: "amap://styles/8b6be8ec497009e17a708205348b899a", //设置地图样式
                lng: 0,
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
        mounted () {
            this.token = this.$Cookies.get('token');
            setTimeout(() => {
                this.mapShow = true;
                 this.getLocation();
            this.getCityData()
            }, 1000);
           
            // this.choseBlock()
        },
        
        
        methods: {
            cancelSureHandel() {
                this.$confirm('确认取消？')
                    .then(_ => {
                        this.$router.go(-1)
                        done();
                    })
                    .catch(_ => { });
            },
            handleEdit(index, row) {
                
            },
            handleDelete(index, row) {
                
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
            handleSuccess(response, file, fileList) {
                // this.ruleForm.banner_img.push(fileList.response.url)
                this.ruleForm.banner = [];
                for (var i = 0; i < fileList.length; i++) {
                    this.ruleForm.banner.push(fileList[i].response.url)

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
                
            },
            // 加载china地点数据，三级
            getAreaCode(provice, city, area) {
                var that = this
                axios.get(this.mapJson).then(function (response) {
                    
                    if (response.status == 200) {
                        var data = response.data
                        // 省市区数据分类
                        var havecity = false;
                        for (var item in data) {
                            if (item.match(/0000$/)) {//省
                                if (provice == data[item]) {
                                    that.choseProvince(item)
                                    
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
                    }
                    else {
                        
                    }
                })
            },
            yongjiuFocus() {
                this.ruleForm.licenseendtime = ''
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

            submitForm(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        switch ('') {
                            case this.ruleForm.zhizhao:
                                this.$message.error('营业执照还未上传')
                                break;
                            case this.ruleForm.logo:
                                this.$message.error('店铺logo还未上传')
                                break;
                            case this.ruleForm.weisheng:
                                this.$message.error('卫生许可证还未上传')
                                break;
                            case this.ruleForm.representativeimgright:
                                this.$message.error('身份证正面还未上传')
                                break;
                            case this.ruleForm.representativeimgleft:
                                this.$message.error('身份证反面还未上传')
                                break;
                            default:
                                if (this.ruleForm.banner.length == 0) {
                                    this.$message.error('店铺图片还未上传')
                                    return;
                                }
                                this.$axios.post('/store/Discount/getBusinessAdd', {
                                    token: this.token,
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
                                    banner: this.ruleForm.banner,
                                }, response => {
                                    
                                    if (response.data.code == 0) {
                                        this.$notify({
                                            title: '成功',
                                            message: '店铺添加成功',
                                            type: 'success'
                                        });
                                        this.$router.push({ path: '/shoplist' })
                                    } else {
                                        this.$message.error(response.data.msg)
                                    }
                                })
                                break;
                        }


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
            },
            infoClick() {
                var proviceInit = this.proviceInit
                var cityInit = this.cityInit
                var areaInit = this.areaInit
                
                
                
                this.getAreaCode(proviceInit, cityInit, areaInit)
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
        display: -ms-flexbox;
        -ms-flex-pack: justify;
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

    .shenfenzheng {
        display: flex;
        display: -ms-flexbox;
        justify-content: flex-start;
        -ms-flex-pack: start;
    }
</style>