<template>
  <div>
    <el-dialog title="设备编辑" :visible.sync="dialogVisible" size="large">
      <div class="editDeviceBox">
        <div class="deviceGroup">
          <div class="deviceGroupTree">
            <el-menu :default-active="activeGroupKey" class="el-menu-vertical-demo" @select="deviceGroupSelect"
                     theme="light"
                     style="width: 100%" ref="deviceGroupList">
              <el-menu-item v-for="item in diveceGroup" :key="item.Id" :index="item.Id">{{item.Name}}</el-menu-item>
            </el-menu>
          </div>
          <div class="deviceGroupBtn">
            <el-button type="primary" icon="plus" @click="groupAdd"></el-button>
            <el-button type="primary" icon="edit" @click="groupEdit"></el-button>
          </div>
        </div>

        <div class="deviceList">
          <div class="deviceTable">
            <el-table
              :data="deviceList"
              border
              style="width: 100%">
              <el-table-column
                label="序号"
                width="100">
                <template scope="scope">
                  <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="设备名称"
                width="200">
                <template scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.Name }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="驱动类型"
                width="240">
                <template scope="scope">
                  <span style="margin-left: 10px">{{scope.row.DriverType }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="是否启用"
                width="100">
                <template scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.Enable }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="备注"
                width="200">
                <template scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.Description }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template scope="scope">
                  <el-button
                    size="small"
                    @click="handleEdit(scope.$index, scope.row)">编辑
                  </el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="deviceTableBtn">
            <el-button type="primary" icon="plus" @click="deviceAdd">新增设备</el-button>
          </div>
        </div>
      </div>
    </el-dialog>

    <deviceGroupAdd ref="deviceGroupAdd"
                    @callback-device-group-data-add="callbackDeviceGroupDataAdd"></deviceGroupAdd>

    <deviceGroupEdit ref="deviceGroupEdit"
                     @callback-device-group-data-edit="callbackDeviceGroupDataEdit"
                     @callback-device-group-data-delete="callbackDeviceGroupDataDelete"></deviceGroupEdit>

    <deviceAdd ref="deviceAdd" :deviceGroupId="activeGroupKey"
               @callback-device-data-add="callbackDeviceDataAdd"></deviceAdd>

    <deviceEdit ref="deviceEdit" :deviceGroupId="activeGroupKey"
                @callback-device-data-edit="callbackDeviceDataEdit"></deviceEdit>

  </div>
</template>

<script>
  import deviceGroupAdd from '../../module/DeviceGroup-add.vue'
  import deviceGroupEdit from '../../module/DeviceGroup-edit.vue'
  import deviceAdd from '../../module/Device-add.vue'
  import deviceEdit from '../../module/Device-edit.vue'

  export default {
    props: ['deviceGroupInfo'],
    components: {
      deviceGroupAdd,
      deviceGroupEdit,
      deviceAdd,
      deviceEdit
    },
    data () {
      return {
        dialogVisible: false,
        diveceGroup: '',
        deviceList: [],
        groupInfo: '',
        activeGroupKey: '',
        activeGroupIndex: '',
        activeDevice: '',
        driverList: ''
      }
    },
    mounted () {
      this.getDevicesList()
    },
    methods: {
      getDevicesList () {
        this.$axios.get('api/getDriverList').then(response => {
          let data = response.data
          window.driverType = data
          // success callback
        }, response => {
          // error callback
        })
      },
      callbackDeviceDataEdit (data) {
        this.activeDevice.Id = data.Id
        this.activeDevice.Name = data.Name
        this.activeDevice.Description = data.Description
        this.activeDevice.Details = data.Details
        this.activeDevice.DeviceGroupId = data.DeviceGroupId
        this.activeDevice.DriverType = data.DriverType
        this.activeDevice.Enable = data.Enable
        this.activeDevice.StationId = data.StationId
      },
      callbackDeviceDataAdd (data) {
        if (this.diveceGroup[this.activeGroupIndex].DeviceList === undefined) {
          this.diveceGroup[this.activeGroupIndex].DeviceList = []
          this.diveceGroup[this.activeGroupIndex].DeviceList.push(data)
        } else {
          this.diveceGroup[this.activeGroupIndex].DeviceList.push(data)
        }
      },
      callbackDeviceGroupDataDelete () {
        this.diveceGroup.splice(this.activeGroupIndex, 1)
      },
      callbackDeviceGroupDataAdd (data) {
        this.diveceGroup.push(data)
      },
      callbackDeviceGroupDataEdit (data) {
        this.diveceGroup[this.activeGroupIndex].Name = data.Name
      },
      deviceAdd () {
        this.$refs.deviceAdd.open()
      },
      groupAdd () {
        this.$refs.deviceGroupAdd.open()
      },
      groupEdit () {
        this.$refs.deviceGroupEdit.open(this.groupInfo)
      },
      open () {
        this.diveceGroup = this.deviceGroupInfo
        this.activeGroupKey = this.diveceGroup[0].Id
        this.activeGroupIndex = 0
        if (this.diveceGroup.length > 0) {
          if (this.diveceGroup[0].DeviceList !== undefined) {
            this.deviceList = this.diveceGroup[0].DeviceList
          } else {
            this.deviceList = []
          }
        }
        this.dialogVisible = true
      },
      handleEdit (index, row) {
        this.activeDevice = row
        this.$refs.deviceEdit.open(row)
      },
      handleDelete (index, row) {
        this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params =
            {
              State: 1,
              Id: row.Id
            }
          this.$axios.post('api/updateDeviceInfo', params).then(response => {
            if (response.data.success === true) {
              this.diveceGroup[this.activeGroupIndex].DeviceList.splice(index, 1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message({
                type: 'warning',
                message: response.data.msg
              })
            }
            // success callback
          }, response => {
            // error callback
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      deviceGroupSelect (key, keyPath) {
        let index
        for (index in this.diveceGroup) {
          if (this.diveceGroup[index].Id === key) {
            this.activeGroupKey = key
            this.groupInfo = this.diveceGroup[index]
            break
          }
        }
        this.activeGroupIndex = index
        if (this.diveceGroup[index].DeviceList !== undefined) {
          this.deviceList = this.diveceGroup[index].DeviceList
        } else {
          this.deviceList = []
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .editDeviceBox {
    display: flex;
    flex: 1;
    height: 50vh;
  }

  .deviceTable {
    flex: 1;
    overflow-y: auto;
  }

  .deviceGroupTree {
    flex: 1;
    overflow-y: auto;
  }

  .deviceGroup {
    /* 导航放到最左边 */
    order: -1;
    flex: 0 0 12em;
    display: flex;
    flex-direction: column;
    background-color: #eef1f6;
  }

  .deviceList {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 0 auto;
  }

</style>
