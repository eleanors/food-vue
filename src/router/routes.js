// 定义路由
const routes = [{
  name: 'Home',
  path: '/',
  meta: {
    title: '首页',
    requireAuth: true
  },
  component: require('../views/Index.vue'),
  children: [
    // 订单管理
    {
      name: 'Manage',
      path: 'index',
      meta: {
        title: '全美食餐厅',
        requireAuth: true
      },
      component: require('../views/Welcome.vue')
    },
    {
      name: 'OrderManage',
      path: 'order',
      meta: {
        title: '订单管理',
        requireAuth: true
      },
      component: require('../views/order/View.vue'),
      children: []
    },
    // 查看订单
    {
      name: 'viewOrder',
      path: 'order/view',
      meta: {
        title: '查看订单',
        requireAuth: true
      },
      component: require('../views/order/View.vue')
    },
    // 点菜下单
    {
      name: 'AddFood',
      path: 'order/addfood',
      meta: {
        title: '点菜下单',
        requireAuth: true
      },
      component: require('../views/order/AddFood.vue')
    },
    // 订单验证
    {
      name: 'OrderVerify',
      path: 'order/verify',
      meta: {
        title: '订单验证',
        requireAuth: true
      },
      component: require('../views/order/Verify.vue')
    },
    // 抢购记录
    {
      name: 'OrderRecord',
      path: 'order/record',
      meta: {
        title: '抢购记录',
        requireAuth: true
      },
      component: require('../views/order/Record.vue')
    },
    // 订单详情
    {
      name: 'OrderDetail',
      path: 'order/view/detail/:orderNo',
      meta: {
        title: '订单详情',
        requireAuth: true
      },
      component: require('../views/order/Detail.vue')
    },
    // 添加菜品
    {
      name: 'OrderAdd',
      path: 'order/view/detail/:orderNo/add',
      meta: {
        title: '添加菜品',
        requireAuth: true
      },
      component: require('../views/order/Add.vue')
    },
    // 建店
    {
      name: 'SetShop',
      path: 'setShop',
      meta: {
        title: '开通店铺',
        requireAuth: true
      },
      component: require('../views/shop/SetShop.vue')
    },
    // 更新店铺
    {
      name: 'UpdateShop',
      path: 'updateShop',
      meta: {
        title: '更新店铺',
        requireAuth: true
      },
      component: require('../views/shop/UpdateShop.vue')
    },
    // 菜品管理
    {
      name: 'MealManage',
      path: 'meal',
      meta: {
        title: '菜品管理',
        requireAuth: true
      },
      component: require('../views/meal/Meal.vue')
    },
    // 菜品类别
    {
      name: 'MealCate',
      path: 'mealCate',
      meta: {
        title: '菜品类别',
        requireAuth: true
      },
      component: require('../views/meal/MealCate.vue')
    },
    // 桌台管理
    {
      name: 'DeskManage',
      path: 'desk',
      meta: {
        title: '桌台管理',
        requireAuth: true
      },
      component: require('../views/desk/Desk.vue')
    },
    // 顾客管理
    {
      name: 'CustomManage',
      path: 'customer',
      meta: {
        title: '顾客管理',
        requireAuth: true
      },
      component: require('../views/customer/Customer.vue')
    },
    // 结账管理
    {
      name: 'AccountManage',
      path: 'account',
      meta: {
        title: '结账管理',
        requireAuth: true
      },
      component: require('../views/account/Index.vue')
    },
    // 订单列表
    {
      name: 'OrderList',
      path: 'account/list',
      meta: {
        title: '订单列表',
        requireAuth: true
      },
      component: require('../views/account/Order.vue')
    },
    // 分成收入
    {
      name: 'DivideManage',
      path: 'account/divide',
      meta: {
        title: '分成收入',
        requireAuth: true
      },
      component: require('../views/account/History.vue')
    },
    // 顾客列表
    {
      name: 'CustomerManage',
      path: 'account/customer',
      meta: {
        title: '顾客列表',
        requireAuth: true
      },
      component: require('../views/account/Customer.vue')
    },
    // 员工管理
    {
      name: 'EmployManage',
      path: 'employ',
      meta: {
        title: '员工管理',
        requireAuth: true
      },
      component: require('../views/employee/Employee.vue')
    },
    // 套餐管理
    {
      name: 'PackageManage',
      path: 'package',
      meta: {
        title: '套餐管理',
        requireAuth: true
      },
      component: require('../views/package/Package.vue')
    },
    // 收藏记录
    {
      name: 'Collect',
      path: 'collect',
      meta: {
        title: '收藏记录',
        requireAuth: true
      },
      component: require('../views/collect/Collect.vue')
    },
    // 红包记录
    {
      name: 'Packet',
      path: 'packet',
      meta: {
        title: '红包记录',
        requireAuth: true
      },
      component: require('../views/packet/Packet.vue')
    },
    // 红包领取记录
    {
      name: 'Receive',
      path: 'receive',
      meta: {
        title: '红包领取记录',
        requireAuth: true
      },
      component: require('../views/packet/Receive.vue')
    }]
},
  // 登录页 注册页
  {
    name: 'Auth',
    path: '/auth',
    meta: {
      title: '注册',
        requireAuth: true
    },
    component: require('../views/Auth.vue')
  },
  // 未找到
  {
    name: 'NotFound',
    path: '/404',
    meta: {
      title: '未找到',
      requireAuth: true
    },
    component: require('../views/NotFound.vue')
  },
  {
    path: '*',
    redirect: '/index'
  }
]
export default routes
