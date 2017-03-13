////////////////////////////////////////////////////////////////////////////////////////////
//     /v2/ ===>   REAL 数据
//     /v2/ ===>   RAP  数据
//     /v3/ ===>   图片地址
////////////////////////////////////////////////////////////////////////////////////////////


// 订单管理

export const order = {

    orderViewList: '/v1/order/findItemOrderListPage',

    getShopCategoryList: '/v2/order/queryShopItemList',

    getOrderInfomation: '/v2/order/queryOrderInfomation',

    updateReserveDate: '/v2/order/updateReserveDate',
    updateMetenNumber: '/v2/order/updateMetenNumber',
    updateLinkTelPhone: '/v2/order/updateLinkTelPhone',
    updateTableNo: '/v2/order/updateTableNo',
    updateOrderRemark: '/v2/order/updateOrderRemark',


    OrderVerification: '/v2/order/queryOrderVerification',

    retreatFood: '/v2/order/retreatFood',

    ensureAddFood: '/v2/order/addShopItemInfo',

    OrderRecord: '/v2/order/queryOrderRecord'
}

// 桌台管理
export const desk = {

}

// 菜品管理
export const meal = {
	getShopItems: 'shopItem/getShopItems',
	addShopItem: 'shopItem/addShopItem',
	getShopItemById: 'shopItem/getShopItemById',
	updateShopItem: 'shopItem/updateShopItem',
	deleteShopItem: 'shopItem/deleteShopItem',
	getShopCategorys: 'shopItem/getShopCategorys',
	getShopItemStatus: 'shopItem/getShopItemStatus'
}

// 菜品类别
export const mealCate = {
	cateList: 'shopCategoryList',
	platCate: 'platfromCategory',
	getShopCate: 'getShopByCategoryIdList',
	addShopCate: 'addShopCategoryList',
	addPerCate: 'addShopCategory',
	cateInfo: 'selectShopPlatformById',
	updateCate: 'updateShopCategory',
	delCate: 'deleteShopPlatformById'
}

// 员工管理
export const employee = {

}

// 顾客管理
export const custom = {

}

// 结账管理
export const account = {

}

// 套餐管理
export const packages = {
  getQueryPackage:'package/queryPackageListPage'
}
