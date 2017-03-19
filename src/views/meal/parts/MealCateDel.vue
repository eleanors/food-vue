<template>
	<div class="cate-del">
		<ui-dialog title="删除主类别" v-model="dialogDel" size="tiny">
			<span>确认删除该类别？</span>
			<span slot="footer" class="dialog-footer">
		    	<ui-button v-on:click="dialogDel = false">取消</ui-button>
		    	<ui-button type="primary" v-on:click="del">确定</ui-button>
  			</span>
		</ui-dialog>
	</div>
</template>

<script>
	import xhr from 'service'
	import { mealCate } from 'service/api'
	import { mapGetters } from 'vuex'

	export default {
		data: function() {
			return {
				dialogDel: true,
				reqDel: {
					session: '',
					shopId: '',
					id: this.delId
				}
			};
		},

		//删除类别的id
		props: ['delId'],

		watch: {
			//动态控制模态框显示隐藏
			dialogDel: function() {
				this.$parent.isShowDel = false;
			}
		},
				
		computed: {
			...mapGetters(['session','shopId'])
		},

		methods: {
			//删除主类别
			del() {
				this.reqDel.session=this.session;
				this.reqDel.shopId=this.shopId;
				
				xhr({
					url: mealCate.delCate,
					options: this.reqDel
				}).then((res) => {
					if(res.shopCategory.type == '1') {
						this.$message({
							message: '此类别有菜品，不能删除！',
							type: 'error'
						});
					} else if(res.shopCategory.type == '2') {
						this.$message({
							message: '删除成功！',
							type: 'success'
						});
					} else {
						this.$message({
							message: '删除失败！',
							type: 'error'
						});
					}
					this.dialogDel = false;
				})
			}

		}
	}
</script>

<style lang="scss">

</style>