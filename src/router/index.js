import Vue from 'vue'
import Router from 'vue-router'

const Demo = r => require.ensure([], () => r(require('@/pages/tabbar/Demo')), 'Demo')
const Shouye = r => require.ensure([], () => r(require('@/pages/tabbar/shouye/Shouye')), 'Shouye')
const Fujin = r => require.ensure([], () => r(require('@/pages/tabbar/fujin/Fujin')), 'Fujin')
const Quan = r => require.ensure([], () => r(require('@/pages/tabbar/quan/Quan')), 'Quan')
const User = r => require.ensure([], () => r(require('@/pages/tabbar/user/User')), 'User')
const Login = r => require.ensure([], () => r(require('@/pages/login/Login')), 'Login')
const Publish = r => require.ensure([], () => r(require('@/pages/publish/Publish')), 'Publish')
const Detail = r => require.ensure([], () => r(require('@/pages/detail/Detail')), 'Detail')
const Secret = r => require.ensure([], () => r(require('@/pages/secret/Secret')), 'Secret')
const SecretCreate = r => require.ensure([], () => r(require('@/pages/secret/SecretCreate')), 'SecretCreate')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/shouye',
      name: 'Demo',
      component: Demo,
      children:[
      	{
      		path: 'shouye',
      		component: Shouye,
          meta: {
            i: 0
          }
      	},
        {
          path: 'fujin',
          component: Fujin,
          meta: {
            i: 1,
            requireAuth: true
          }
        },
        {
          path: 'quan',
          component: Quan,
          meta: {
            i: 2,
            requireAuth: true
          }
        },
        {
          path: 'user',
          component: User,
          meta: {
            i: 3,
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/publish',
      name: 'Publish',
      component: Publish,
      meta: {
        requireAuth: true,
        jsApiList: ['getLocalImgData', 'chooseImage']
      }
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/secret',
      name: 'Secret',
      component: Secret,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/secret/create',
      name: 'SecretCreate',
      component: SecretCreate,
      meta: {
        requireAuth: true
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
