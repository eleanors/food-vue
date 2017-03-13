//   定义路由
const routes = [{
		name: 'Home',
		path: '/',
		meta: {
			title: '首页'
		},
		component: require('../views/Index.vue')
	},
	// 订单管理
	{
		name: 'OrderManage',
		path: '/order',
		meta: {
			title: '订单管理'
		},
		component: require('../views/order/Index.vue'),
		children: [{
			name: 'viewOrder',
			path: 'view',
			meta: {
				title: '查看订单'
			},
			component: require('../views/order/View.vue'),
			children: [{
				name: 'OrderList',
				path: 'detail',
				meta: {
					title: '订单详情'
				},
				component: require('../views/order/Detail.vue')
			}]
		}, {
			name: 'AddFood',
			path: 'addfood',
			meta: {
				title: '添加菜品'
			},
			component: require('../views/order/AddFood.vue')
		}, {
			name: 'OrderVerify',
			path: 'verify',
			meta: {
				title: '订单验证'
			},
			component: require('../views/order/Verify.vue')
		}, {
			name: 'OrderRecord',
			path: 'record',
			meta: {
				title: '抢购记录'
			},
			component: require('../views/order/Record.vue')
		}]
	},
	{
		name: 'OrderDetail',
		path: '/order/view/detail/:orderNo',
		meta: {
			title: '订单详情'
		},
		component: require('../views/order/Detail.vue')
	},
	// 菜品管理
	{
		name: 'MealManage',
		path: '/meal',
		meta: {
			title: '菜品管理'
		},
		component: require('../views/meal/Meal.vue')
	},
	// 菜品类别
	{
		name: 'MealCate',
		path: '/mealCate',
		meta: {
			title: '菜品类别'
		},
		component: require('../views/meal/MealCate.vue')
	},
	// 桌台管理
	{
		name: 'DeskManage',
		path: '/desk',
		meta: {
			title: '桌台管理'
		},
		component: require('../views/desk/Desk.vue')
	},
	// 顾客管理
	{
		name: 'CustomManage',
		path: '/customer',
		meta: {
			title: '顾客管理'
		},
		component: require('../views/customer/Customer.vue')
	},

	// 员工管理
	{
		name: 'EmployManage',
		path: '/employ',
		meta: {
			title: '账户管理'
		},
		component: require('../views/Employ.vue')
	},
	// 套餐管理
	{
		name: 'PackageManage',
		path: '/package',
		meta: {
			title: '套餐管理'
		},
		component: require('../views/package/Package.vue')
	},
  // 结账管理
  {
    name: 'AccountManage',
    path: '/account',
    meta: {
      title: '结账管理'
    },
    component: require('../views/account/Account.vue')
  },
	{
		name: 'NotFound',
		path: '/404',
		meta: {
			title: '未找到'
		},
		component: require('../views/NotFound.vue')
	},
	{
		path: '*',
		redirect: '/'
	}
]
export default routes

