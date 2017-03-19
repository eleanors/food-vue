<template>

    <div class="view-search">
        <ui-row :gutter="10">
               <ui-col :span="5"><span class="title">顾客手机</span><ui-input v-model="input" placeholder="请输入内容"></ui-input></ui-col>
               <ui-col :span="5"><span class="title t-r">桌号</span><ui-input v-model="input" placeholder="请输入内容"></ui-input></ui-col>
               <ui-col :span="5"><span class="title t-r">日期</span><ui-input v-model="input" placeholder="请输入内容"></ui-input></ui-col>
               <ui-col :span="5">
                      <span class="title">订单状态</span>
                      <ui-select v-model="value" placeholder="请选择">
                            <ui-option v-for="(item, index) in options" :label="item.label" :value="item.value" :key="index"></ui-option>
                      </ui-select>
               </ui-input></ui-col>
               <ui-col :span="4"><ui-button type="primary" size="large" icon="search">查询</ui-button></ui-col>
        </ui-row>
    </div>
</template>


<script>


export default {
        name: 'view-search',

        data: function(){
                return {
                    input: '',
                    options: [{
                              value: '0',
                              label: '已完成'
                            }, {
                              value: '1',
                              label: '未完成'
                            }, {
                              value: '2',
                              label: '已受理'
                            }, {
                              value: '3',
                              label: '未受理'
                    }],
                    value: ''
                }
        },

        methods: {

        },

        components: {}
}
</script>


<style lang="scss">

.view-search {
    padding: 40px 10px;
    margin-bottom: 20px;
    background: #fff;

    .el-col > .el-input, .el-col > .el-select {
        width: 70%;
    }

    .el-input__icon+.el-input__inner {
        padding-right: 0
    }
    .el-col {
        white-space: nowrap;
    }
    .title {
        display: inline-block;
        width: 56px;
        margin-right: 10px;
    }
}
</style>