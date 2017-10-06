<template>
  <div class="main-box l-full">
    <header class="main-header">
      <img src="../../static/images/logo.png" style="height: 60px;width: 180px;">
      <div class="header-menu">
        <div class="function-btn">
          <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                   @select="functionSelect">
            <el-menu-item index=1>首页</el-menu-item>
            <el-menu-item index=2>点位列表</el-menu-item>
            <el-menu-item index=3>数据监控</el-menu-item>
            <el-menu-item index=4>参数设置</el-menu-item>
          </el-menu>
        </div>
        <div class="system-btn">
          <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                   @select="sysSelect">
            <el-menu-item index="fullScreen">全屏</el-menu-item>
            <el-submenu index="2">
              <template slot="title">系统</template>
              <el-menu-item index="changePassword">修改密码</el-menu-item>
              <el-menu-item index="restart">重启服务</el-menu-item>
              <el-menu-item index="loginout">注销</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </div>
    </header>
    <div class="main-body">
      <div class="inner l-full">
        <div class="main-nav">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
          <div class="device-tree">
            <el-tree
              class="filter-tree"
              :data="deviceTree"
              :highlight-current=true
              node-key="Id"
              :props="defaultProps"
              @node-click="deviceSelect"
              accordion
              :filter-node-method="filterNode"
              ref="deviceGroupTree"
            >
            </el-tree>
          </div>
          <el-button icon="edit" @click="showEditDevice"></el-button>
        </div>
        <div class="main-content">
          <div class="group-point">
            <router-view></router-view>
          </div>

          <div class="main-footer">
            <p class="footer-text">&copy; 2017 杭州吉利易云科技有限公司</p>
          </div>
        </div>
      </div>
    </div>
    <deviceList :deviceGroupInfo="deviceTree" ref="deviceList"></deviceList>
    <changePassword ref="changePassword"></changePassword>
  </div>
</template>

<script>
  import * as types from '../store/mutation-types'
  import deviceList from './content/setting/DeviceList.vue'
  import changePassword from './ChangePassword.vue'

  export default {
    components: {
      deviceList,
      changePassword
    },
    data () {
      return {
        defaultProps: {
          children: 'DeviceList',
          label: 'Name'
        },
        dialogFormVisible: false,
        activeIndex: '1',
        deviceTree: [],
        filterText: ''
      }
    },
    watch: {
      filterText (val) {
        this.$refs.deviceGroupTree.filter(val)
      }
    },
    mounted () {
      this.getDevicesList()
    },
    methods: {
      filterNode (value, data) {
        if (!value) return true
        return data.Name.indexOf(value) !== -1
      },
      showEditDevice () {
        this.$refs.deviceList.open()
      },
      getDevicesList () {
        this.$axios.get('api/getDevicesListNew').then(response => {
          let data = response.data.data
          this.deviceTree = data
          // success callback
        }, response => {
          // error callback
        })
      },
      functionSelect (key, keyPath) {
        this.$store.dispatch(types.MAIN_HEADER_SELECTED_ITEM, {selectedItem: key})
        if (key === '3') {
          this.$router.push({
            name: 'DeviceView'
          })
        } else if (key === '2') {
          this.$router.push({
            name: 'DeviceSetting'
          })
        }
      },
      deviceSelect (data, node) {
        if (node.childNodes.length === 0) {
          let key = data.Id
          var params = {Id: key}
          this.$axios.post('api/getDeviceDetailNew', params).then(response => {
            let data = response.data.data
            this.$store.dispatch(types.CONTENT_SELECTED_DEVICE, {groupInfo: data})
            // success callback
          }, response => {
            // error callback
          })
          this.$store.dispatch(types.MAIN_SIDEBAR_SELECTED_DEVICEID, {selectedDeviceId: key})
          let info = {
            deviceId: key
          }
          window.webSocket.send(JSON.stringify(info))
          let selectItem = this.$store.state.mainHeader.selectedItem
          if (selectItem !== '2' && selectItem !== '3') {
            this.$router.push({
              name: 'DeviceView'
            })
          }
        }
      },
      sysSelect (key) {
        if (key === 'changePassword') {
          this.$refs.changePassword.open()
        } else if (key === 'restart') {
          this.$axios.get('api/restart').then(response => {
            if (response.data.success === false) {
              this.$message(response.data.message)
            } else {
              this.$message(response.data.message)
            }
            // success callback
          }, response => {
            // error callback
          })
        } else if (key === 'fullScreen') {
          this.requestFullScreen()
        }
      },
      requestFullScreen () {
        var de = document.documentElement
        if (de.requestFullscreen) {
          de.requestFullscreen()
        } else if (de.mozRequestFullScreen) {
          de.mozRequestFullScreen()
        } else if (de.webkitRequestFullScreen) {
          de.webkitRequestFullScreen()
        }
      }
    }
  }
</script>

<style scoped>
  .el-tree {
    border: none;
    background-color: #eef1f6;
  }

  .el-tabs--border-card {
    border: none;
  }

  .device-tree {
    flex: 1;
  }

  .group-point {
    flex: 1;
  }

  .footer-text {
    color: #999 !important;
  }

  .main-footer {
    /*border-top: 1px;*/
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 2em;
  }

  .header-menu {
    display: flex;
    justify-content: space-between;
    flex: 1;
  }

  .main-header {
    background-color: #324157;
    display: flex;
    border-bottom: 5px solid #1AA094;
  }

  .main-box {
    display: flex;
    min-height: 100vh;
    flex-direction: column;

  }

  .l-full {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

  .main-body {
    display: flex;
    flex: 1;
    position: relative;
    overflow: hidden;
  }

  .main-body .inner {
    display: flex;
    width: 100%;
    flex-flow: row;
  }

  .main-content {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    overflow: auto;

  }

  .main-nav {
    /* 导航放到最左边 */
    order: -1;
    /* 两个边栏的宽度设为12em */
    flex: 0 0 12em;
    background-color: #eef1f6;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
  }
</style>
