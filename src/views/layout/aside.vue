<template>
  <div>
    <el-aside width="auto" id="asideNav">

      <div class="logo-name">
        <p class="asideTit" v-if="$store.getters.logoShow">同时</p>
        <p class="asideTit" v-else>SameTime商家管理系统</p>
      </div>
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        background-color="#03152A" text-color="#ffffff" active-text-color="#ffffff"
        :collapse="$store.getters.isCollapse" :router="$store.getters.uniquerouter">
        <!-- <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>首页</span>
          </template> -->
        <!-- <el-menu-item index="1"> <i class="el-icon-menu"></i>
            <span slot="title">代理列表</span></el-menu-item> -->
        <!-- </el-submenu> -->
        <el-menu-item index="/index">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu :index="item.id" v-for="(item,index) in asideList" :key="index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item :index="childrenitem.url" v-for="(childrenitem,childenindex) in asideList[index].child"
            :key="childrenitem.id">
            <i class="el-icon-menu"></i>
            <span slot="title">{{childrenitem.name}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
  import { addRouter } from "../../router/index";
  export default {
    // name: "aside",
    data() {
      return {
        isCollapse: '',
        asideList: []
      }

    },
    watch: {
      '$route': function (val) {
        

        this.selectmenu(val)
      }
    },
    created() {
      this.token = this.$Cookies.get('token');
      this.bussiness = JSON.parse(this.$Cookies.get('bussiness'));
      this.dataInit()
      
    },
    methods: {
      dataInit(command) {
        if (command) {
          
          this.bussiness = command
          
        }
        this.$axios.post('/store/Login/getRootData', {
          token: this.token,
          bid: this.bussiness.bid
        }, response => {
          this.asideList = response.data.data
        })
        
      },
      selectmenu(key) {
        
        let router = addRouter
        let name = ''
        

        let navTitle = function (path, routerARR) {
          
          
          for (let i = 0; i < routerARR.length; i++) {
            if (routerARR[i].children.length > 0 || routerARR[i].path === path) {
              if (routerARR[i].path === path && routerARR[i].children.length < 1) {
                name = routerARR[i].name
                break
              }
              navTitle(path, routerARR[i].children)
            }
          }
          return name
        }
        this.$store.dispatch('addTab', {
          title: navTitle(key.path, router),
          path: key.path,
          query: key.query
        })
      },
      handleOpen(key, keyPath) {
        
      },
      handleClose(key, keyPath) {
        
      },

    }
  }

</script>
<style lang="scss">
  .el-aside {
    display: flex;
    flex-direction: column;
    width: 200px;
    background-color: #061528;
    color: #eee;
    /*隐藏滚动条，当IE下溢出，仍然可以滚动*/
    -ms-overflow-style: none;
    /*火狐下隐藏滚动条*/
    overflow: -moz-scrollbars-none;
    height: 100%;
    scrollbar-width: none;
  }

  /* 左边导航样式 */
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    height: 100%;
  }

  .el-menu {
    border-right: none;
    flex: 1;
  }

  .el-container {
    height: 100%;
  }

  .navBtn {
    font-size: 30px;
    cursor: pointer;
    color: #fff;
  }

  .asideTit {
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 16px;
    color: #5e6d82;
    font-weight: 400;
  }



  .el-menu-item {
    /* height: 70px; */
    /* line-height: 70px; */
  }

  .el-menu span {
    color: rgba(255, 255, 255, .7);
  }




  .is-opened>.el-submenu__title>.el-icon-arrow-down {
    color: #ffffff;
    font-weight: 500;
    font-size: 18px;
  }

  .el-menu-item {
    /* background-color: #020f1d !important; */
    /* border-bottom: 1px solid #020f1d; */

  }

  .el-menu-item:hover {
    color: #ffffff !important;
    background-color: #375573 !important;
  }

  .el-menu-item.is-active {
    background-color: #56a9ff !important
  }

  .el-menu-item:hover span {
    color: #fff;
  }

  .el-menu-item.is-active span {
    color: #fff;
  }

  .el-menu--collapse>.el-menu-item.is-active i {
    color: #fff;
  }
</style>