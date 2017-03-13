<template>
	<div class="view-del">
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

	const session = 'MTg0MDQ5ODU5MzY7NzU3MEZBN0QzNEQxRjkxOTU5QzRGRTc3OTE2MzIxRTQ7MQ';
	const shopId = 13;

	export default {
		data: function() {
			return {
				dialogDel: true,
				reqDel: {
					session: session,
					id: this.delId
				}
			};
		},

		//删除类别的id
		props: ['delId'],

		watch: {
			//动态控制模态框显示隐藏
			dialogDel: function() {
				this.$emit('delModalTrans');
			}
		},

		methods: {
			//删除主类别
			del() {
				xhr({
					url: mealCate.delCate,
					options: this.reqDel
				}).then((res) => {
					alert('删除成功！');
					this.dialogDel = false;
				})
			}

		}
	}
</script>

<style lang="scss">

</style>