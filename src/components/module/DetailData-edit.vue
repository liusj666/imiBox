<template>
  <el-dialog title="编辑自定义属性" :visible.sync="dialogVisible" size="tiny">
    <el-form :model="form">
      <el-form-item label="属性名称" :label-width="formLabelWidth">
        <el-input v-model="form.Key" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="属性值" :label-width="formLabelWidth">
        <el-input v-model="form.Value" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="btn-footer">
      <el-button type="primary" @click="editData">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </div>
  </el-dialog>

</template>

<script>
  export default {
    data () {
      return {
        dialogVisible: false,
        form: {
          Key: '',
          Value: ''
        },
        formLabelWidth: '100px'
      }
    },
    methods: {
      open (data) {
        this.form.Key = data.Key
        this.form.Value = data.Value
        this.dialogVisible = true
      },
      editData () {
        this.$emit('callback-detail-data-edit', this.form)
        this.dialogVisible = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
