<template>
  <el-dialog title="修改密码" :visible.sync="dialogVisible" size="tiny">
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
    }
  }
}
</script>

<style scoped>

</style>
