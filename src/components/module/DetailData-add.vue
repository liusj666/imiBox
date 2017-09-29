<template>
  <el-dialog title="新增自定义属性" :visible.sync="dialogVisible" size="tiny">
    <el-form :model="form">
      <el-form-item label="属性名称" :label-width="formLabelWidth">
        <el-input v-model="form.Key" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="属性值" :label-width="formLabelWidth">
        <el-input v-model="form.Value" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="btn-footer">
      <el-button type="primary" @click="addData">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </div>
  </el-dialog>

</template>

<script>
  export default {
    data () {
      return {
        dialogVisible: false,
        form: {},
        formLabelWidth: '100px'
      }
    },
    methods: {
      open () {
        this.form.Key = ''
        this.form.Value = ''
        this.dialogVisible = true
      },
      addData () {
        let data = {
          Key: this.form.Key,
          Value: this.form.Value
        }
        this.$emit('callback-detail-data-add', data)
        this.dialogVisible = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
