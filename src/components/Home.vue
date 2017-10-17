<template>
  <div class="home">
    <div class="Chart">
      <div id="deviceChart" :style="{width:'500px',height:'400px'}"></div>
    </div>

    <div class="Chart">
      <div id="pointChart" :style="{width:'500px',height:'400px'}"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        deviceValue: [],
        pointValue: []
      }
    },
    mounted () {
      this.getDeviceEnableNum()
      this.getPointEnableNum()
    },
    methods: {
      getDeviceEnableNum () {
        //    设备图表
        let deviceChart = this.$echarts.init(document.getElementById('deviceChart'))
        let deviceOption = {
          title: {
            text: '设备启用/禁用统计图',
            left: 'center'
          },
          color: ['rgb(255,69,0)', 'rgb(118,238,0)'],
          series: [{
//          name: '访问来源',
            type: 'pie',
            radius: '55%',
            data: this.deviceValue,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{b} : {c} ({d}%)'
                },
                labelLine: {show: true}
              }
            }
          }]
        }
        this.deviceValue.splice(0, this.deviceValue.length)
        this.$axios.get('box/getDeviceEnableNum').then(response => {
          if (response.data.success) {
            let data = response.data.data
            this.deviceValue.push({
              value: data[0],
              name: '禁用'
            })
            this.deviceValue.push({
              value: data[1],
              name: '启用'
            })
            deviceChart.setOption(deviceOption)
          } else {
          }
          // success callback
        }, response => {
          // error callback
        })
      },
      getPointEnableNum () {
        //    点位图表
        let pointChart = this.$echarts.init(document.getElementById('pointChart'))
        let pointOption = {
          title: {
            text: '点位启用/禁用统计图',
            left: 'center'
          },
          color: ['rgb(255,69,0)', 'rgb(118,238,0)'],
          series: [{
//          name: '访问来源',
            type: 'pie',
            radius: '55%',
            data: this.pointValue,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{b} : {c} ({d}%)'
                },
                labelLine: {show: true}
              }
            }
          }]
        }
        this.pointValue.splice(0, this.pointValue.length)
        this.$axios.get('box/getPointEnableNum').then(response => {
          if (response.data.success) {
            let data = response.data.data
            this.pointValue.push({
              value: data[0],
              name: '禁用'
            })
            this.pointValue.push({
              value: data[1],
              name: '启用'
            })
            pointChart.setOption(pointOption)
          } else {
          }
          // success callback
        }, response => {
          // error callback
        })
      }
    }
  }
</script>

<style scoped>
  .home {
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

</style>
