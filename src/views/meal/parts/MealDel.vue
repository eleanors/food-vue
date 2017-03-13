<template>
	<div class="view-del">
		<ui-dialog title="删除菜品" v-model="dialogDel" size="tiny">
			<span>确认删除该菜品？</span>
			<span slot="footer" class="dialog-footer">
		    	<ui-button v-on:click="dialogDel = false">取消</ui-button>
		    	<ui-button type="primary" v-on:click="del">确定</ui-button>
  			</span>
		</ui-dialog>
	</div>
</template>

<script>
	import xhr from 'service'
	import { meal } from 'service/api'

	const session = 'MTg0MDQ5ODU5MzY7NzU3MEZBN0QzNEQxRjkxOTU5QzRGRTc3OTE2MzIxRTQ7MQ';
	const shopId = 13;

	export default {
		data: function() {
			return {
				dialogDel: true,

				//删除菜品的信息
				reqDel: {
					session: session,
					id: this.delId
				}
			};
		},

		//删除菜品的id
		props: ['delId'],

		watch: {
			//动态控制模态框显示隐藏
			dialogDel: function() {
				this.$emit('delModalTrans');
			}
		},

		methods: {
			//删除菜品
			del() {
				xhr({
					url: meal.deleteShopItem,
					options: this.reqDel
				}).then((res) => {
					if(res.info == 1) {
						alert('删除成功！');
						this.dialogDel = false;
					}
				})
			}

		}
	}
</script>

<style lang="scss">

</style>