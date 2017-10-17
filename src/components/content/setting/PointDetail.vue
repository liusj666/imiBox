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
            v-if="scope.row.Enable==false"
            size="small"
            type="info"
            @click="changePointEnable(scope.$index, scope.row)">启用
          </el-button>
          <el-button
            v-if="scope.row.Enable==true"
            size="small"
            type="info"
            @click="changePointEnable(scope.$index, scope.row)">禁用
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
      changePointEnable (index, row) {
        this.$axios.post('box/changePointEnable', row).then(response => {
          if (response.data.success === true) {
            row.Enable = !row.Enable
          } else {
            if (response.data.data === 'verifed') {
              this.$router.push({
                name: 'Login'
              })
            } else {
              this.$message({
                type: 'warning',
                message: response.data.message
              })
            }
          }
          // success callback
        }, response => {
          // error callback
        })
      },
      handleEdit (index, row) {
        this.activePoint = row
        this.$refs.pointEdit.open(row)
      },
      handleDelete (index, row, rows) {
        this.$confirm('此操作将永久删除该点位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          row.State = 1
          this.$axios.post('box/updatePointInfo', row).then(response => {
            if (response.data.success === true) {
              rows.splice(index, 1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              if (response.data.data === 'verifed') {
                this.$router.push({
                  name: 'Login'
                })
              } else {
                this.$message({
                  type: 'warning',
                  message: response.data.message
                })
              }
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
      }
    }
  }
</script>

<style scoped>

</style>
