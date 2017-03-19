<template>
	<div class="employee-del">
		<ui-dialog title="删除员工" v-model="dialogDel" size="tiny">
			<span>确认删除该员工？</span>
			<span slot="footer" class="dialog-footer">
		    	<ui-button v-on:click="dialogDel = false">取消</ui-button>
		    	<ui-button type="primary" v-on:click="del">确定</ui-button>
  			</span>
		</ui-dialog>
	</div>
</template>

<script>
	import xhr from 'service'
	import { employee } from 'service/api'
	import { mapGetters } from 'vuex'

	export default {
		data: function() {
			return {
				dialogDel: true,

				//删除员工的信息
				reqDel: {
					session: '',
					shopId: '',
					id: this.delId
				}
			};
		},

		//删除员工的id
		props: ['delId'],

		watch: {
			//动态控制模态框显示隐藏
			dialogDel: function() {
				this.$parent.isShowDel = false;
			}
		},

		computed: {
			...mapGetters(['session', 'shopId'])
		},

		methods: {
			//删除员工
			del() {
				this.reqDel.session = this.session;
				this.reqDel.shopId = this.shopId;

				xhr({
					url: employee.delEmployee,
					options: this.reqDel
				}).then((res) => {
					if(res.success) {
						this.$message({
							message: '删除成功！',
							type: 'success'
						});
						this.dialogDel = false;
					}
				})
			}

		}
	}
</script>

<style lang="scss">

</style>