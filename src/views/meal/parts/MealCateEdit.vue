<template>
	<div class="view-edit">
		<ui-dialog title="编辑主类别" v-model="dialogEdit">
			<ui-form>
				<ui-form-item label="菜品主类别" :label-width="formLabelWidth">
					<ui-input v-model="reqEdit.categoryTitle" auto-complete="off" :disabled="editDisable"></ui-input>
				</ui-form-item>

				<ui-form-item label="排序" :label-width="formLabelWidth">
					<ui-input v-model="reqEdit.orderNum" auto-complete="off"></ui-input>
				</ui-form-item>
			</ui-form>
			<div slot="footer" class="dialog-footer">
				<ui-button v-on:click="dialogEdit = false">取消</ui-button>
				<ui-button type="primary" v-on:click="edit">确定</ui-button>
			</div>
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
				//模态框
				dialogEdit: true,
				
				//label宽度
				formLabelWidth: '120px',
				
				//名称是否可编辑
				editDisable: false,
				
				//请求当前类别的信息
				reqInfo: {
					session: session,
					id: this.editId
				},
				
				//编辑信息
				reqEdit: {
					session: session,
					shopId: shopId,
					id: this.editId,
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
		
		props: ['editId'],
		
		watch: {
			//动态控制模态框显示隐藏
			dialogEdit: function() {
				this.$emit('editModalTrans');
			}
		},

		created: function() {
			//请求当前类别的信息
			xhr({
				url: mealCate.cateInfo,
				options: this.reqInfo
			}).then((res) => {
				if(res.shopCategory) {
					var info = res.shopCategory;
					this.reqEdit.categoryTitle = info.categoryTitle;
					this.reqEdit.orderNum = info.orderNum;

					if(info.platformCategoryId != null) {
						this.editDisable = true;
					}
				}
			})
		},

		methods: { 
			//编辑类别
			edit() {
				xhr({
					url: mealCate.updateCate,
					options: this.reqEdit
				}).then((res) => {
					alert('编辑主类别成功');
					this.dialogEdit = false;
					this.editDisable = false;
				})
			}
		}
	}
</script>

<style lang="scss">

</style>