import echarts from 'echarts'
const install = function (Vue) {
    Object.defineProperties(Vue.prototype, {
        $chart: {
            get() {
                return {
                    //画一条简单的线
                    line1: function (id) {
                        this.chart1 = echarts.init(document.getElementById(id));
                        this.chart1.clear();

                        this.chart1.setOption({

                            tooltip: {
                                trigger: 'item',
                                formatter: '{a} <br/>{b} : {c} ({d}%)'
                            },
                            legend: {
                                // orient: 'vertical',
                                left: 'center',
                                data: ['销售额', '退款额', '服务费'],
                                top: '20px'
                            },
                            series: [
                                {
                                    name: '营业概括',
                                    type: 'pie',
                                    radius: '55%',
                                    center: ['50%', '55%'],
                                    data: [],
                                    emphasis: {
                                        itemStyle: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]/*  */
                        });
                        
                        
                    },
                    line2: function (id) {
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();

                        const optionData = {

                            tooltip: {
                                trigger: 'item',
                                formatter: '{a} <br/>{b} : {c} ({d}%)'
                            },
                            legend: {
                                // orient: 'vertical',
                                left: 'center',
                                data: ['优惠券'],
                                top: '20px'
                            },
                            series: [
                                {
                                    name: '销售减免',
                                    type: 'pie',
                                    radius: '55%',
                                    center: ['50%', '55%'],
                                    data: [
                                        { value: 335, name: '优惠券' }
                                    ],
                                    emphasis: {
                                        itemStyle: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]/*  */
                        };

                        this.chart.setOption(optionData);
                    },
                    line3: function (id) {
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();

                        const optionData = {

                            tooltip: {
                                trigger: 'item',
                                formatter: '{a} <br/>{b} : {c} ({d}%)'
                            },
                            legend: {
                                // orient: 'vertical',
                                left: 'center',
                                data: ['支付宝', '微信'],
                                top: '20px'
                            },
                            series: [
                                {
                                    name: '付款概况',
                                    type: 'pie',
                                    radius: '55%',
                                    center: ['50%', '55%'],
                                    data: [
                                        { value: 300, name: '支付宝' },
                                        { value: 250, name: '微信' },
                                    ],
                                    emphasis: {
                                        itemStyle: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]/*  */
                        };
                        this.chart.setOption(optionData);
                    }
                    
                }
                
            }
        }
    })
    
}


export default {
    install
}