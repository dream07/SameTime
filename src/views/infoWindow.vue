<template>
    <div>
        这是信息窗体
    </div>
</template>

<script>
    export default {

        props: {
            deviceInfo: {
                type: Object,
                default: function () {
                    return {
                        baseInfo: {},
                        extend: []
                    }
                }
            }
        },
        methods: {
            
        },

    }

</script>

<style>

</style>