<template>
    <div class="orderDetail" v-loading="loading" style="width: 100%;min-height: 100%;">
        <div class="orderDetailTop">
            订单号: <span class="orderId orderInfo">{{number}}</span>
            订单时间：<span class="orderTime orderInfo">{{time}}</span>
            订单发起人：<span class="orderSource orderInfo">{{tel}}</span>
        </div>
        <h3 class="caiDanTit">菜单</h3>
        <div class="oderDetailBottom">
            <div class="oderDetailBottomLf">
                <h4 class="oderDetailBottomTit">套餐</h4>
                <ul class="taoCanContent">
                    <li v-for="(item,index) in taoCanData" :key="index">
                        <span class="foodName">今日特惠套餐</span>
                        <span class="foodCountBox">*<span class="foodCount">{{item.num}}</span>份</span>
                        <span>￥<span class="foodMoney">{{item.price}}</span>元</span>
                    </li>
                </ul>
            </div>

            <div class="oderDetailBottomRi">
                <h4 class="oderDetailBottomTit"><span>单点</span></h4>
                <ul class="danDianContent">
                    <li v-for="(item,index) in danDian" :key="index">
                        <span class="foodName">{{item.name}}</span>
                        <span class="foodCountBox">*<span class="foodCount">{{item.num}}</span>份</span>
                        <span>￥<span class="foodMoney">{{item.price}}</span>元</span>
                    </li>


                </ul>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading:true,
                number:'',
                tel:'',
                time:'',
                taoCanData:[],
                danDian:[]
            }
        },
        created() {
            this.token = this.$Cookies.get('token');
            this.bussiness = JSON.parse(this.$Cookies.get('bussiness'));
            this.globId = this.$route.query.globId;
            this.leixing = this.$route.query.leixing;
            this.loading = true
            this.$axios.post('/store/Order/getOrderForm', {
                    token: this.token,
                    bid: this.bussiness.bid,
                    oid: this.globId,
                    leixing: this.leixing,
            }, response => {
                
                this.number = response.data.data.number
                this.tel = response.data.data.tel
                this.time = response.data.data.time
                this.taoCanData = response.data.taocan
                this.danDian = response.data.danpin
                
                
                this.loading=false
            })
        },
        methods: {
            
        },

    }
</script>

<style>
    .orderDetailTop {
        font-size: 14px;
        color: #333;
        height: 55px;
        line-height: 55px;
        border-top: 1px dashed #ccc;
        border-bottom: 1px dashed #ccc;
    }

    .orderInfo {
        margin-right: 100px;
    }

    .caiDanTit {
        font-size: 16px;
        font-weight: 400;
        margin-top: 30px;
    }

    .oderDetailBottomLf {
        font-size: 16px;
    }

    .oderDetailBottom {
        display: flex;
        display: -ms-flexbox;
    }

    .oderDetailBottom h4 {
        font-size: 16px;
        font-weight: 700;
        margin-top: 15px;
        color: red;
    }

    .taoCanContent li {
        margin-bottom: 15px;
    }

    .foodName {
        font-weight: 400;
        margin-right: 100px;
        display: inline-block;
        width: 120px;
    }

    .foodName {
        color: #ff9900;
        font-size: 16px;
        font-weight: 600;
    }

    .oderDetailBottomRi {
        margin-left: 300px;
        font-size: 16px;
    }

    .taoCanContent li {
        margin-bottom: 15px;
    }

    .danDianContent li {
        margin-bottom: 15px;
    }

    .oderDetailBottomTit {
        margin-bottom: 10px;
    }

    .foodCountBox {
        margin-right: 100px;
    }
</style>