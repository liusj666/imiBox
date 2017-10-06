<template>
  <div class="device-detail">
    <div class="content-main">
      <div class="content-header">
        <div class="group-btn">
          <el-button type="primary" icon="plus" @click="addGroup">新增采集组</el-button>
          <el-button type="primary" icon="edit" @click="editGroup">编辑采集组</el-button>
        </div>
        <div class="point-btn">
          <el-button type="primary" icon="plus" @click="addPoint">新增点位</el-button>
        </div>
      </div>
      <div class="group-tabs">
        <el-tabs :active-name="active" type="border-card" @tab-click="selectGroup">
          <el-tab-pane v-for="item in groupsInfo " :key="item.GroupId" :label=item.GroupName :name="item.GroupId">
            <pointDetail></pointDetail>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <groupAdd ref="groupAdd"
              @callback-group-data-add="callbackGroupDataAdd"></groupAdd>

    <groupEdit ref="groupEdit"
               @callback-group-data-edit="callbackGroupDataEdit"
               @callback-group-data-delete="callbackGroupDataDelete"></groupEdit>

    <pointAdd ref="pointAdd"
              @callback-point-data-add="callbackPointDataAdd"></pointAdd>
  </div>
</template>

<script>
  import * as types from '../../../store/mutation-types'
  import pointDetail from './PointDetail.vue'
  import groupAdd from '../../module/Group-add.vue'
  import groupEdit from '../../module/Group-edit.vue'
  import pointAdd from '../../module/Point-add.vue'

  export default {
    components: {
      pointDetail,
      groupAdd,
      groupEdit,
      pointAdd
    },
    data () {
      return {
        groupInfo: '',
        active: '',
        activeGroupIndex: ''
      }
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
      callbackPointDataAdd (data) {
        if (this.groupInfo[this.activeGroupIndex].Points === undefined) {
          this.groupInfo[this.activeGroupIndex].Points = []
          this.groupInfo[this.activeGroupIndex].Points.push(data)
        } else {
          this.groupInfo[this.activeGroupIndex].Points.push(data)
        }
      },
      callbackGroupDataDelete () {
        this.groupInfo.splice(this.activeGroupIndex, 1)
      },
      callbackGroupDataEdit (data) {
        this.groupInfo[this.activeGroupIndex].GroupName = data.GroupName
        this.groupInfo[this.activeGroupIndex].GroupEnable = data.GroupEnable
        this.groupInfo[this.activeGroupIndex].GroupDescription = data.GroupDescription
        this.groupInfo[this.activeGroupIndex].GroupDetail = data.GroupDetail
      },
      callbackGroupDataAdd (data) {
        this.groupInfo.push(data)
      },
      addPoint () {
        this.$refs.pointAdd.open()
      },
      editGroup () {
        this.$refs.groupEdit.open(this.groupInfo[this.activeGroupIndex])
      },
      addGroup () {
        this.$refs.groupAdd.open()
      },
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
          this.$store.dispatch(types.CONTENT_SELECTED_GROUP, {pointInfo: this.groupInfo[this.activeGroupIndex].Points})
        } else {
          this.groupInfo[this.activeGroupIndex].Points = []
          this.$store.dispatch(types.CONTENT_SELECTED_GROUP, {pointInfo: []})
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
