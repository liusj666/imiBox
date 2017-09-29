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
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row, pointsInfo)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pointEdit :pointInfo="pointInfo" ref="pointEdit"
               @callback-point-data-edit="callbackPointDataEdit"></pointEdit>

  </div>
</template>

<script>
  import pointEdit from '../../module/Point-edit.vue'

  export default {
    components: {
      pointEdit
    },
    data () {
      return {
        pointInfo: '',
        activePoint: ''
      }
    },
    computed: {
      pointsInfo () {
        return this.$store.state.contentDevice.pointInfo
      }
    },
    mounted () {
    },
    methods: {
      callbackPointDataEdit (data) {
        this.activePoint.PointName = data.PointName
        this.activePoint.TagName = data.TagName
        this.activePoint.IsVariable = data.IsVariable
        this.activePoint.IsReadonly = data.IsReadonly
        this.activePoint.Enable = data.Enable
        this.activePoint.Description = data.Description
        this.activePoint.PointDetail = data.PointDetail
      },
      handleEdit (index, row) {
        this.activePoint = row
        this.$refs.pointEdit.open(row)
      },
      handleDelete (index, row, rows) {
        row.State = 1
        this.$axios.post('api/updatePointInfo', row).then(response => {
          rows.splice(index, 1)
          // success callback
        }, response => {
          // error callback
        })
      }
    }
  }
</script>

<style scoped>

</style>
