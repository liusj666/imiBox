<template>
  <div>
    <el-dialog title="新增设备组" :visible.sync="dialogVisible" size="tiny">
      <el-form :model="form">
        <el-form-item label="设备组名称" :label-width="formLabelWidth">
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
        <el-button type="primary" @click="addGroup">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <detailDataAdd ref="detailDataAdd"
                   @callback-detail-data-add="callbackDetailDataAdd"></detailDataAdd>

    <detailDataEdit ref="detailDataEdit"
                    @callback-detail-data-edit="callbackDetailDataEdit"></detailDataEdit>
  </div>
</template>

<script>
  import detailDataAdd from '../module/DetailData-add.vue'
  import detailDataEdit from '../module/DetailData-edit.vue'

  export default {
    components: {
      detailDataAdd,
      detailDataEdit
    },
    data () {
      return {
        dialogVisible: false,
        form: {
          Id: '',
          Name: '',
          DeviceList: []
        },
        formLabelWidth: '100px',
        Detail: [],
        activeRow: ''
      }
    },
    methods: {
      callbackDetailDataAdd (data) {
        this.Detail.push(data)
      },
      callbackDetailDataEdit (data) {
        this.activeRow.Key = data.Key
        this.activeRow.Value = data.Value
      },
      open () {
        this.Detail = []
        this.dialogVisible = true
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
      addGroup () {
        let params = {
          Name: this.form.Name,
          State: 0,
          Details: JSON.stringify(this.Detail),
          DeviceList: []
        }
        this.$axios.post('api/updateDeviceGroupInfo', params).then(response => {
          let data = response.data.data
          params.Id = data
          this.$emit('callback-device-group-data-add', params)
          this.dialogVisible = false
          // success callback
        }, response => {
          // error callback
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
