<template>
	<div class="cate-add">
		<ui-dialog title="添加主类别" v-model="dialogAdd">
			<ui-form>
				<ui-form-item label="菜品主类别" :label-width="formLabelWidth">
					<ui-input v-model="reqAdd.categoryTitle" auto-complete="off"></ui-input>
				</ui-form-item>

				<ui-form-item label="排序" :label-width="formLabelWidth">
					<ui-input v-model="reqAdd.orderNum" auto-complete="off"></ui-input>
				</ui-form-item>
			</ui-form>
			<div slot="footer" class="dialog-footer">
				<ui-button v-on:click="dialogAdd = false">取消</ui-button>
				<ui-button type="primary" v-on:click="add">确定</ui-button>
			</div>
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
				//模态框
				dialogAdd: true,

				//label宽度
				formLabelWidth: '120px',

				//发送新增类别请求
				reqAdd: {
					session: '',
					shopId: '',
					platformCategoryId: null,
					categoryTitle: '',
					picUrl: 'aa.jpg',
					orderNum: '',
					status: 1,
					createByUserId: 10,
					updateByUserId: 12
				}
			};
		},

		watch: {
			//动态控制模态框显示隐藏
			dialogAdd: function() {
				this.$parent.isShowAdd = false;
			}
		},

		computed: {
			...mapGetters(['session', 'shopId'])
		},

		methods: {
			//添加类别
			add() {
				this.reqAdd.session = this.session;
				this.reqAdd.shopId = this.shopId;

				xhr({
					url: mealCate.addPerCate,
					options: this.reqAdd
				}).then((res) => {
					this.$message({
						message: '添加成功！',
						type: 'success'
					});
					this.dialogAdd = false;
				})
			}
		}
	}
</script>

<style lang="scss">

</style>