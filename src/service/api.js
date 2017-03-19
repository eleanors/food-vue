//上传图片
export const upload = {
	img: '/v3/photo/upload' // 新增建店申请
}

// 新建店铺
export const shop = {
	addShop: '/v1/addShop', // 新增建店申请
	updateShop: '/v1/updateShop', // 店铺信息修改
	updateShopSetUp: '/v1/updateShopSetUp', // 店铺展示设置
	updateShopPlan: '/v1/updateShopPlan', // 店铺模式设置
	getShopInfo: '/v1/getShopInfo', // 店铺信息记录查询
	shopTypes: '/v1/getShopTypes', // 店铺餐饮类型
	getProvince: '/v1/getAllProvince', // 所有省、直辖市查询
	getCity: '/v1/getCityByProvinceId', // 根据省、直辖市ID查询所属城市
	getDistrict: '/v1/getDistrictByCityId', // 根据城市ID查询所属区、县
	getCircle: '/v1/getBusinessCircl', // 根据区、县ID查询所关联的商圈
	updateSetUp:'/v1/updateShopSetUp', // 店铺展示设置
	updatePlan:'/v1/updateShopPlan' // 店铺模式设置
}

// 订单管理

export const order = {
    orderViewList: '/v1/order/findItemOrderListPage',      // 订单列表
    getShopCategoryList: '/v1/order/queryShopItemList',    // 点菜下单列表
    getOrderInfomation: '/v1/order/queryOrderInfomation',  // 单个订单详情
    updateReserveDate: '/v1/order/updateReserveDate',      // 更新约定时间
    updateMetenNumber: '/v1/order/updateMetenNumber',      // 更新用餐人数
    updateLinkTelPhone: '/v1/order/updateLinkTelPhone',    // 更新联系方式
    updateTableNo: '/v1/order/updateTableNo',              // 更新桌号(包间)
    updateOrderRemark: '/v1/order/updateOrderRemark',      // 更新备注
    OrderVerification: '/v1/order/queryOrderVerification', // 验证订单
    retreatFood: '/v1/order/retreatFood',                  // 退菜
    ensureAddFood: '/v1/order/addShopItemInfo',            // 确认加菜
    OrderRecord: '/v1/order/queryPurchaseOrderRecordPage',          // 限时抢购类订单记录

    tableRoomInfoList: '/v1/order/findShopTableRoomInfoList'		//包间桌号信息
}

// 桌台管理
export const desk = {}

// 菜品管理
export const meal = {
	getShopItems: '/v1/shopItem/getShopItems', // 菜品列表
	addShopItem: '/v1/shopItem/addShopItem', // 新增菜品
	getShopItemById: '/v1/shopItem/getShopItemById', // 当前菜品信息
	updateShopItem: '/v1/shopItem/updateShopItem', // 编辑菜品
	deleteShopItem: '/v1/shopItem/deleteShopItem', // 删除菜品
	getShopCategorys: '/v1/shopItem/getShopCategorys', // 店铺菜品类别
	getShopItemStatus: '/v1/shopItem/getShopItemStatus', // 店铺菜品状态
	pepperLevel: '/v1/shopItem/getShopItemPepperLevel' // 菜品辣度
}

// 菜品类别
export const mealCate = {
	cateList: '/v1/shopCategoryList', // 类别列表
	platCate: '/v1/platfromCategory', // 系统提供主类别（二级树形结构）
	getShopCate: '/v1/getShopByCategoryIdList', // 用户已经选择的系统类别
	addShopCate: '/v1/addShopCategoryList', // 新选择的类别
	addPerCate: '/v1/addShopCategory', // 添加类别
	cateInfo: '/v1/selectShopPlatformById', // 根据id查询类别
	updateCate: '/v1/updateShopCategory', // 编辑类别
	delCate: '/v1/deleteShopPlatformById' // 删除类别
}

// 员工管理
export const employee = {
	getEmployee: '/v1/findShopEmployeePage', // 员工列表
	updateEmployee: '/v1/addOrUpdateEmployee', // 新增员工、编辑员工
	findEmployee: '/v1/findShopEmployee', // 当前员工信息
	delEmployee: '/v1/deleteShopEmployee' // 删除员工
}

// 顾客管理
export const customer = {
	customerList: '/v1/getCustomerListBySelective' // 顾客列表
}

// 结账管理
export const account = {

	queryWithdrawListPage: '/v1/turnover/findShopTablePage',
	saveShareRevenue: '/v1/turnover/saveShareRevenue',
	queryCustomerList: '/v1/turnover/queryCustomerList',
	queryTurnoverList: '/v1/turnover/queryTurnoverList',
	queryTurnoverDetailList: '/v1/turnover/queryTurnoverDetailList',
	saveTaking: '/v1/turnover/saveTaking',
	setWithdrawPassword: ' /turnover/setWithdrawPassword'

}

//桌台管理
export const deskManage = {
	findShopTablePage: '/v1/findShopTablePage.do',
	saveShopTable: '/v1/saveShopTable.do',
	updateShopTable: '/v1/updateShopTable',
	deleteShopTable: '/v1/deleteShopTable.do',
	getShopTable: '/v1/getShopTable.do',
	getShopTableType: '/v1/getShopTableType.do'
}

// 套餐管理
export const packages = {
	queryPackageListPage: '/v1/package/queryPackageListPage',
	addPackage: '/v1/package/addPackage',
	deletePackage: '/v1/package/deletePackage',
	updatePackage: '/v1/package/updatePackage',
	deletePackage: '/v1/package/deletePackage',
  queryShopItemList:'/v1/order/queryShopItemList',
}

// 收藏记录
export const collect = {
	collectList: '/v1/record/cllectionRecordList' // 收藏列表
}

// 红包记录
export const packet = {
	packetList: '/v1/redPacket/queryRedPacketList', // 红包列表
	packetRecList: '/v1/redPacket/queryReceiveRedPacketList' // 红包领取列表
}

// 登录 注册
export const auth = {
		login: '/v1/shop/login',
		register: '/v1/shop/register',
		sendAuthCode: '/v1/shop/sendAuthCode'
}