import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import List from '@/components/List'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/list',
      name: 'List',
      component: List,
      children: [{
        path: 'add',
        name: 'Add',
        component: resolve => require(['../components/Add.vue'], resolve)
      }]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
