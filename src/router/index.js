import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import MainLayout from '@/components/MainLayout'
import Home from '@/components/Home'
import DeviceSetting from '@/components/content/setting/DeviceDetail'
import DeviceView from '@/components/content/view/DeviceView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'MainLayout',
      component: MainLayout,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'deviceSetting',
          name: 'DeviceSetting',
          component: DeviceSetting
        },
        {
          path: 'deviceView',
          name: 'DeviceView',
          component: DeviceView
        }
      ]
    }
  ]
})
