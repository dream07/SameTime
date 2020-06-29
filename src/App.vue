<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>

    </div>
</template>


<script>
    export default {
        data() {
            return {
                pickerOptions: {
                    shortcuts: [{
                        text: '????',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '?????',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '?????',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                name: 'app',

            }
        },
        mounted() {
            //????????localStorage??????
            
            localStorage.getItem("userMsg") && this.$store.replaceState(JSON.parse(localStorage.getItem("userMsg")));
            //???????vuex???????localStorage?
            window.addEventListener("beforeunload", () => {
                localStorage.setItem("userMsg", JSON.stringify(this.$store.state))
            })
            var ms_ie = false;
            var ua = window.navigator.userAgent;
            var old_ie = ua.indexOf('MSIE ');
            var new_ie = ua.indexOf('Trident/');

            if ((old_ie > -1) || (new_ie > -1)) {
                ms_ie = true;
            }

            if (ms_ie) {
                document.documentElement.className += " ie";
            }

        },
    }
</script>

<style>
    * {
        /* font-family: "????"; */
        /* font-size: 16px; */
        border: 0;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    html {
        height: 100%;
        overflow: hidden;
    }

    body {
        height: 100%;
    }

    html,
    body,
    #app {
        height: 100%;
        padding: 0 !important;
    }

    .body {
        height: 100%;
    }

    /* //谷歌适用 */
    ::-webkit-scrollbar {
        display: none;
    }

    li {
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    .el-main {
        background-color: #f2f2f2 !important;
        -ms-overflow-style: none;
        /*????????*/
        scrollbar-width: none;
        height: 100%;
    }

    .ie .el-main>div {
        padding-bottom: 120px;
    }

    .ie .foodBotBox {
        margin-bottom: 110px;
    }

    .el-main::-webkit-scrollbar {
        display: none;
    }


    .el-table__header {
        width: 100% !important;
    }

    .el-table__body {
        width: 100% !important;
    }
</style>