<template>
	<div class="employee-add">
		<ui-dialog title="添加员工" v-model="dialogAdd">
			<ui-form :model="reqAdd" :rules="rules" ref="reqAdd">
				<ui-form-item label="员工姓名" :label-width="formLabelWidth" prop="employeeName">
					<ui-input v-model="reqAdd.employeeName" auto-complete="off"></ui-input>
				</ui-form-item>

				<ui-form-item label="登录账户" :label-width="formLabelWidth" prop="loginName">
					<ui-input v-model="reqAdd.loginName" auto-complete="off"></ui-input>
				</ui-form-item>

				<ui-form-item label="密码" :label-width="formLabelWidth" prop="password">
					<ui-input v-model="reqAdd.password" auto-complete="off" type="password"></ui-input>
				</ui-form-item>

				<ui-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPass">
					<ui-input v-model="reqAdd.checkPass" auto-complete="off" type="password"></ui-input>
				</ui-form-item>

				<ui-form-item label="手机号码" :label-width="formLabelWidth" prop="phoneNumber">
					<ui-input v-model="reqAdd.phoneNumber" auto-complete="off"></ui-input>
				</ui-form-item>

				<ui-form-item label="设置权限" :label-width="formLabelWidth" prop="privilege">
					<ui-select v-model="reqAdd.privilege" placeholder="请选择权限">
						<ui-option v-for="(item, index) in priLists" :label="item.label" :value="item.type" :key="index"></ui-option>
					</ui-select>
				</ui-form-item>

				<!--管理员权限类别-->
				<div class="pri-wrap" v-if="reqAdd.privilege == '0'">
					<ui-form-item label="" :label-width="formLabelWidth" prop="category">
						<ui-checkbox-group v-model="categoryList" v-for="(item,index) in manageLists" :key="index" class="pri-checkbox">
							<ui-checkbox :label="item.value">{{item.name}}</ui-checkbox>
						</ui-checkbox-group>
					</ui-form-item>

					<ui-form-item label="状态" :label-width="formLabelWidth">
						<ui-radio class="radio" v-model="reqAdd.status" label="0">启用</ui-radio>
						<ui-radio class="radio" v-model="reqAdd.status" label="1">停用</ui-radio>
					</ui-form-item>
				</div>

				<!--服务员-->
				<div class="pri-wrap" v-if="reqAdd.privilege == '1'">
					<ui-form-item label="状态" :label-width="formLabelWidth">
						<ui-radio class="radio" v-model="reqAdd.workState" label="0">在职</ui-radio>
						<ui-radio class="radio" v-model="reqAdd.workState" label="1">离职</ui-radio>
					</ui-form-item>
					<ui-form-item>
						<p class="t-c">请在服务员APP端登录</p>
					</ui-form-item>
				</div>

				<!--店长权限类别-->
				<div class="pri-wrap" v-if="reqAdd.privilege == '2'">
					<ui-form-item label="" :label-width="formLabelWidth" prop="category">
						<ui-checkbox-group v-model="categoryList" v-for="(item,index) in shopLists" :key="index" class="pri-checkbox">
							<ui-checkbox :label="item.value">{{item.name}}</ui-checkbox>
						</ui-checkbox-group>
					</ui-form-item>

					<ui-form-item label="状态" :label-width="formLabelWidth">
						<ui-radio class="radio" v-model="reqAdd.workState" label="0">在职</ui-radio>
						<ui-radio class="radio" v-model="reqAdd.workState" label="1">离职</ui-radio>
					</ui-form-item>
				</div>

			</ui-form>
			<div slot="footer" class="dialog-footer">
				<ui-button v-on:click="dialogAdd = false">取 消</ui-button>
				<ui-button type="primary" v-on:click="add">确 定</ui-button>
			</div>
		</ui-dialog>
	</div>
</template>

<script>
	import xhr from 'service'
	import { employee } from 'service/api'
	import { mapGetters } from 'vuex'

	export default {

		data: function() {
			//自定义验证规则
			//密码
			var validatePassword = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.reqAdd.password !== '') {
						this.$refs.reqAdd.validateField('checkPass');
					}
					callback();
				}
			};

			//确认密码
			var validateCheck = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value != this.reqAdd.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};

			//选择权限
			var validatePrivilege = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请选择权限'));
				}
			};

			//选择权限类别
			var validateCategory = (rule, value, callback) => {
				/*if(value === '') {
					callback(new Error('请至少选择一种权限类别'));
				}*/
			}

			return {
				//表单验证
				rules: {
					employeeName: [
						{ required: true, message: '请输入员工姓名', trigger: 'blur' }
					],
					loginName: [
						{ required: true, message: '请输入登录账户', trigger: 'blur' }
					],
					password: [
						{ required: true, validator: validatePassword, trigger: 'blur' }
					],
					checkPass: [
						{ required: true, validator: validateCheck, trigger: 'blur' }
					],
					phoneNumber: [
						{ required: true, message: '请输入手机号码', trigger: 'blur' }
					],
					privilege: [
						{ required: true, validator: validatePrivilege, trigger: 'change' }
					],
					category: [
						{ validator: validateCategory, trigger: 'change' }
					]
				},

				//模态框
				dialogAdd: true,

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

				//选择的权限类别
				categoryList: [],

				//发送新增员工请求
				reqAdd: {
					session: '',
					shopId: '',
					employeeName: '',
					loginName: '',
					password: '',
					phoneNumber: '',
					privilege: '',
					category: '',
					workState: '0',
					status: '0',
					createByUserId: 1,
					updateByUserId: 2,

					//确认密码，只为验证使用
					checkPass: ''
				}
			};
		},

		watch: {
			//动态控制模态框显示隐藏
			dialogAdd() {
				this.$parent.isShowAdd = false;
			},

			reqAdd: {
				handler: 'changePrivilege',
				deep: true

			}
		},

		computed: {
			...mapGetters(['session', 'shopId'])
		},

		created: function() {

		},

		methods: {
			//选择权限
			changePrivilege(val, oldVal) {
				//选择权限一改变，清空选择的类别
				this.categoryList = [];

				//如果是管理员，默认在职
				if(val.privilege == 0) {
					val.workState = '0';
				}
			},

			//添加员工
			add: function() {
				this.$refs.reqAdd.validate((valid) => {
					if(valid) {
						this.$message({
							message: '添加员工成功！',
							type: 'success'
						});
					} else {
						this.$message({
							message: '请完善信息！',
							type: 'error'
						});
						return false;
					}
				})

				//设置权限

				//如果不是管理员，status为空
				/*if(this.privilege != 0) {
					this.reqAdd.status = '';
				}*/

				//如果不是服务员，必须选择权限类别
				if(this.reqAdd.privilege != 1) {
					//设置提交的权限类别形式（1,2,3）
					if(this.categoryList.length) {
						let cate = '';
						for(let i = 0; i < this.categoryList.length; i++) {
							cate += this.categoryList[i] + ',';
						}
						this.reqAdd.category = cate.substring(0, cate.length - 1);
					} else {
						/*this.$message({
							message: '请选择权限类别！',
							type: 'error'
						});*/
						return false;
					}
				}

				this.reqAdd.session = this.session;
				this.reqAdd.shopId = this.shopId;
				xhr({
					url: employee.updateEmployee,
					options: this.reqAdd
				}).then((res) => {
					if(res.ok) {
						this.$message({
							message: '添加成功！',
							type: 'success'
						});
						this.dialogAdd = false;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.employee-add .el-select {
		width: 100%;
	}
	
	.pri-checkbox {
		display: inline-block;
		width: 33.33%;
	}
</style>