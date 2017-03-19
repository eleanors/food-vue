<template>
	<div class="employee-edit">
		<ui-dialog title="编辑员工" v-model="dialogEdit">
			<ui-form>
				<ui-form-item label="创建时间" :label-width="formLabelWidth">
					<p>{{createDate}}</p>
				</ui-form-item>

				<ui-form-item label="员工姓名" :label-width="formLabelWidth">
					<ui-input v-model="reqEdit.employeeName" auto-complete="off"></ui-input>
				</ui-form-item>

				<ui-form-item label="登录账户" :label-width="formLabelWidth">
					<ui-input v-model="reqEdit.loginName" auto-complete="off"></ui-input>
				</ui-form-item>

				<ui-form-item label="密码" :label-width="formLabelWidth">
					<ui-input v-model="reqEdit.password" auto-complete="off" type="password"></ui-input>
				</ui-form-item>

				<ui-form-item label="手机号码" :label-width="formLabelWidth">
					<ui-input v-model="reqEdit.phoneNumber" auto-complete="off"></ui-input>
				</ui-form-item>

				<ui-form-item label="设置权限" :label-width="formLabelWidth">
					<ui-select v-model="privilege" placeholder="请选择权限">
						<ui-option v-for="(item, index) in priLists" :label="item.label" :value="item.type" :key="index"></ui-option>
					</ui-select>
				</ui-form-item>

				<!--管理员权限类别-->
				<div class="pri-wrap" v-if="privilege == '0'">
					<ui-form-item label="" :label-width="formLabelWidth">
						<ui-checkbox-group v-model="category" v-for="(item,index) in manageLists" :key="index" class="pri-checkbox">
							<ui-checkbox :label="item.value">{{item.name}}</ui-checkbox>
						</ui-checkbox-group>
					</ui-form-item>

					<ui-form-item label="状态" :label-width="formLabelWidth">
						<ui-radio class="radio" v-model="reqEdit.status" label="0">启用</ui-radio>
						<ui-radio class="radio" v-model="reqEdit.status" label="1">停用</ui-radio>
					</ui-form-item>
				</div>

				<!--服务员-->
				<div class="pri-wrap" v-if="privilege == '1'">
					<ui-form-item label="状态" :label-width="formLabelWidth">
						<ui-radio class="radio" v-model="reqEdit.workState" label="0">在职</ui-radio>
						<ui-radio class="radio" v-model="reqEdit.workState" label="1">离职</ui-radio>
					</ui-form-item>
					<ui-form-item>
						<p class="t-c">请在服务员APP端登录</p>
					</ui-form-item>
				</div>

				<!--店长权限类别-->
				<div class="pri-wrap" v-if="privilege == '2'">
					<ui-form-item label="" :label-width="formLabelWidth">
						<ui-checkbox-group v-model="category" v-for="(item,index) in shopLists" :key="index" class="pri-checkbox">
							<ui-checkbox :label="item.value">{{item.name}}</ui-checkbox>
						</ui-checkbox-group>
					</ui-form-item>

					<ui-form-item label="状态" :label-width="formLabelWidth">
						<ui-radio class="radio" v-model="reqEdit.workState" label="0">在职</ui-radio>
						<ui-radio class="radio" v-model="reqEdit.workState" label="1">离职</ui-radio>
					</ui-form-item>
				</div>

			</ui-form>
			<div slot="footer" class="dialog-footer">
				<ui-button v-on:click="dialogEdit = false">取 消</ui-button>
				<ui-button type="primary" v-on:click="edit">确 定</ui-button>
			</div>
		</ui-dialog>
	</div>
</template>

<script>
	import xhr from 'service'
	import { employee } from 'service/api'
	import { formatDate } from 'vendor/utils'
	import { mapGetters } from 'vuex'

	export default {

		data: function() {
			return {
				//模态框
				dialogEdit: true,

				//label宽度
				formLabelWidth: '120px',

				//设置权限
				priLists: [{
					type: 0,
					label: '管理员'
				}, {
					type: 1,
					label: '服务员'
				}, {
					type: 2,
					label: '店长'
				}],

				//管理员权限
				manageLists: [{
					value: '1',
					name: '订单管理'
				}, {
					value: '2',
					name: '桌台管理'
				}, {
					value: '3',
					name: '菜品管理'
				}, {
					value: '4',
					name: '套餐管理'
				}, {
					value: '5',
					name: '员工管理'
				}, {
					value: '6',
					name: '顾客管理'
				}, {
					value: '7',
					name: '结账管理'
				}, {
					value: '8',
					name: '收藏记录'
				}, {
					value: '9',
					name: '红包记录'
				}],

				//店长权限
				shopLists: [{
					value: '1',
					name: '红包拓客'
				}, {
					value: '2',
					name: '限时抢购'
				}],

				//选择权限
				privilege: '',

				//选择的权限类别
				category: [],

				//发送新增员工请求
				reqEdit: {
					session: '',
					shopId: '',
					employeeName: '',
					loginName: '',
					password: '',
					phoneNumber: '',
					privilege: '',
					category: '',
					workState: '',
					status: '',
					createByUserId: 1,
					updateByUserId: 2
				},

				//创建时间
				createDate: ''
			};
		},

		watch: {
			//动态控制模态框显示隐藏
			dialogEdit() {
				this.$parent.isShowEdit = false;
			},

			//动态控制权限及员工状态
			privilege() {
				//选择权限一改变，清空选择的类别
				//this.category = [];

				//如果是管理员，默认在职
				if(this.reqEdit.privilege == 0) {
					this.reqEdit.workState = '0';
				}
			}
		},
		
		computed: {
			...mapGetters(['session','shopId'])
		},

		//编辑员工Id
		props: ['editId'],

		created() {
			//请求当前员工信息
			xhr({
				url: employee.findEmployee,
				options: {
					session: this.session,
					shopId: this.shopId,
					id: this.editId
				}
			}).then((res) => {
				if(res.success) {
					let info = res.success;

					//处理创建时间格式
					this.createDate = info.createDate;
					let newDate = parseInt(info.createDate) / 1000;
					this.createDate = formatDate(newDate, 4);

					this.reqEdit.employeeName = info.employeeName;
					this.reqEdit.loginName = info.loginName;
					this.reqEdit.password = info.password;
					this.reqEdit.phoneNumber = info.phoneNumber;
					this.privilege = info.privilege;
					this.reqEdit.workState = info.workState.toString();
					this.reqEdit.status = info.status.toString();

					//权限类别
					if(info.category) {
						let cateList = info.category.split(',');
						for(let i = 0; i < cateList.length; i++) {
							this.category.push(cateList[i]);
						}
					}
				}
			});
		},

		methods: {
			//编辑员工
			edit: function() {
				//设置权限
				this.reqEdit.privilege = this.privilege;

				//如果不是服务员，必须选择权限类别
				if(this.privilege != 1) {
					//设置提交的权限类别形式（1,2,3）
					if(this.category.length) {
						let cate = '';
						for(let i = 0; i < this.category.length; i++) {
							cate += this.category[i] + ',';
						}
						this.reqEdit.category = cate.substring(0, cate.length - 1);
					} else {
						return false;
					}
				}

				this.reqEdit.id = this.editId;
				this.reqEdit.session = this.session;
				this.reqEdit.shopId= this.shopId;

				xhr({
					url: employee.updateEmployee,
					options: this.reqEdit
				}).then((res) => {
					if(res.ok) {
						this.$message({
							message: '编辑成功！',
							type: 'success'
						});
						this.dialogEdit = false;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.employee-edit .el-select {
		width: 100%;
	}
	
	.pri-checkbox {
		display: inline-block;
		width: 33.33%;
	}
</style>