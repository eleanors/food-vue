const pannel = [{
  icon: 'icon-order',
  title: '订单管理',
  link: '/order',
  expanded: false,
  children: [{
    title: '查看订单',
    link: '/order/view'
  }, {
    title: '添加菜品',
    link: '/order/addFood'
  }, {
    title: '订单验证',
    link: '/order/verify'
  }, {
    title: '抢购记录',
    link: '/order/record'
  }]
}, {

  icon: 'icon-desk',
  title: '桌台管理',
  link: '/desk',
  expanded: false

}, {

  icon: 'icon-meal',
  title: '菜品管理',
  link: '/meal'
}, {

  icon: 'icon-account',
  title: '套餐管理',
  link: '/package'
}, {

  icon: 'icon-employ',
  title: '员工管理',
  link: '/employ'
}, {

  icon: 'icon-custom',
  title: '顾客管理',
  link: '/customer'
}, {

  icon: 'icon-account',
  title: '结账管理',
  link: '/account',
  expanded: false,
  children: [{
    title: '订单列表',
    link: '/account/list'
  }, {
    title: '顾客列表',
    link: '/account/customer'
  }, {
    title: '分成收入',
    link: '/account/divide'
  }]
}, {

  icon: 'icon-collect',
  title: '收藏记录',
  link: '/collect'
}, {

  icon: 'icon-packet',
  title: '红包记录',
  link: '/packet'
}]

export default pannel
