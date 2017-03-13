const pannel = [{
       icon: 'icon-order',
       title: '订单管理',
       link: '/order',
       expanded: true,
       children: [{
            title: '查看订单',
            link: '/order/view'
       },{
            title: '添加菜品',
            link: '/order/addfood'
       },{
            title: '订单验证',
            link: '/order/verify'
       },{
            title: '抢购记录',
            link: '/order/record'
       }]
},{

       icon: 'icon-desk',
       title: '桌台管理',
       link: '/desk',
       expanded: false,
       children: [{
            title: '查看订单',
            link: '/order/view'
       },{
            title: '添加菜品',
            link: '/order/addFood'
       }]
},{

       icon: 'icon-meal',
       title: '菜品管理',
       link: '/meal'
},{

       icon: 'icon-employ',
       title: '员工管理',
       link: '/employ'
},{

       icon: 'icon-custom',
       title: '顾客管理',
       link: '/custom'
},{

       icon: 'icon-account',
       title: '结账管理',
       link: '/employ'
}]

export default pannel