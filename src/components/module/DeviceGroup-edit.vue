<template>
  <el-dialog title="编辑设备组" :visible.sync="dialogVisible" size="tiny">
    <el-form :model="form" :rules="rules" ref="deviceGroupEditForm">
      <el-form-item prop="Name" label="设备组名称" :label-width="formLabelWidth">
        <el-input v-model="form.Name" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <el-table
      :data="Detail"
      style="width: 100%">
      <el-table-column
        prop="Key"
        label="属性"
        width="150">
      </el-table-column>
      <el-table-column
        prop="Value"
        label="值"
        width="150">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            @click="editDetailData(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="deleteDetailData(scope.$index, Detail)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="btn-footer">
      <el-button type="primary" @click="addDetailData">新增自定义属性</el-button>
      <el-button type="primary" @click="editGroup">确 定</el-button>
      <el-button type="primary" @click="deleteGroup">删 除</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </div>
  </el-dialog>

</template>

<script>
  export default {
    data () {
      return {
        rules: {
          Name: [
            {required: true, message: '请输入设备组名称', trigger: 'blur'}
          ]
        },
        dialogVisible: false,
        form: {
          Name: ''
        },
        formLabelWidth: '100px',
        Detail: [],
        activeRow: ''
      }
    },
    methods: {
      open (data) {
        this.dialogVisible = true
        this.form.Name = data.Name
        this.form.Id = data.Id
        if (data.Details !== null && data.Details !== '' && data.Details !== undefined) {
          this.Detail = JSON.parse(data.Details)
        }
      },
      addDetailData () {
        this.$refs.detailDataAdd.open()
      },
      editDetailData (index, row) {
        this.activeRow = row
        this.$refs.detailDataEdit.open(row)
      },
      deleteDetailData (index, rows) {
        rows.splice(index, 1)
      },
      deleteGroup () {
        this.$confirm('此操作将永久删除该设备组, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.form.State = 1
          this.$axios.post('api/updateDeviceGroupInfo', this.form).then(response => {
            if (response.data.success === true) {
              let data = response.data.data
              this.form.Id = data
              this.$emit('callback-device-group-data-delete', this.form)
              this.dialogVisible = false
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
      editGroup () {
        this.$refs['deviceGroupEditForm'].validate((valid) => {
          if (valid) {
            this.form.State = 2
            this.$axios.post('api/updateDeviceGroupInfo', this.form).then(response => {
//          let data = response.data.data
              this.$emit('callback-device-group-data-edit', this.form)
              this.dialogVisible = false
              // success callback
            }, response => {
              // error callback
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
