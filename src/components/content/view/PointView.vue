<template>
  <div>
    <el-table
      :data="pointsInfo"
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
        label="点位编码"
        width="200">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.TagName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="点位名称"
        width="200">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.PointName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="点位值"
                       width="200">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.Value}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="采集时间">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.Timestamp }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pointInfo: [],
        activePoint: ''
      }
    },
    computed: {
      pointsInfo () {
        this.pointInfo = this.$store.state.contentDevice.pointInfo
        return this.pointInfo.filter(item => item.Enable === true)
      }
    },
    mounted () {
      this.initWebSocket()
    },
    methods: {
      updateData (data) {
        this.pointInfo.forEach(function (pitem, pindex, array) {
          if (pitem.PointId === data.Value.TagId) {
            pitem.Timestamp = data.Timestamp
            pitem.Value = data.Value.Value
          }
        })
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

<style scoped>

</style>
