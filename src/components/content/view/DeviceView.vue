<template>
  <div class="device-view">
    <div class="group-tabs">
      <el-tabs :active-name="active" type="border-card" @tab-click="selectGroup">
        <el-tab-pane v-for="item in groupsInfo " :key="item.GroupId" :label=item.GroupName :name="item.GroupId">
          <pointView></pointView>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import * as types from '../../../store/mutation-types'
  import pointView from './PointView.vue'

  export default {
    components: {
      pointView
    },
    data () {
      return {
        data: '',
        groupInfo: '',
        active: '',
        activeGroupIndex: 0
      }
    },
    mounted () {
    },
    computed: {
      groupsInfo () {
        this.groupInfo = this.$store.state.contentDevice.groupInfo
        if (this.groupInfo.length > 0) {
          this.activeGroupIndex = 0
          this.active = this.groupInfo[0].GroupId
          this.$store.dispatch(types.CONTENT_SELECTED_GROUPID, {selectedGroupId: this.active})
          if (this.groupInfo[0].Points !== undefined) {
            this.$store.dispatch(types.CONTENT_SELECTED_GROUP, {pointInfo: this.groupInfo[0].Points})
          } else {
            this.$store.dispatch(types.CONTENT_SELECTED_GROUP, {pointInfo: []})
          }
        }
        return this.groupInfo
      }
    },
    methods: {
      selectGroup (tab, event) {
        let id = tab.name
        this.$store.dispatch(types.CONTENT_SELECTED_GROUPID, {selectedGroupId: id})
        for (let key in this.groupInfo) {
          if (this.groupInfo[key].GroupId === id) {
            this.activeGroupIndex = key
            break
          }
        }
        if (this.groupInfo[this.activeGroupIndex].Points !== undefined) {
          console.log(this.groupInfo[this.activeGroupIndex].Points)
          this.$store.dispatch(types.CONTENT_SELECTED_GROUP, {pointInfo: this.groupInfo[this.activeGroupIndex].Points})
        } else {
          this.groupInfo[this.activeGroupIndex].Points = []
          this.$store.dispatch(types.CONTENT_SELECTED_GROUP, {pointInfo: []})
        }
      },

      initWebSocket () {
        let vm = this
//        收到信息时
        window.webSocket.onmessage = function (e) {
          let data = JSON.parse(e.data)
          vm.updateData(data)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #eef1f6;
  }

  .device-detail {
    display: flex;
    flex-direction: column;
  }

  .content-main {
    flex: 1;
  }
</style>
