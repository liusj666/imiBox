<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  body,html{
    margin: 0px;
    min-height: 100vh;
    overflow-x: hidden;
  }

  div.el-tabs--border-card > .el-tabs__content {
    padding: 0px;
  }
</style>
