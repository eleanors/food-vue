<template>

    <ui-dialog title="EEEE" v-model="isVisible" size="tiny" top="30%">
          <div class="modal-content">
                <div class="table-wrap">
                       {{content}}
                </div>
          </div>
          <span slot="footer" class="dialog-footer">
                <ui-button v-on:click="isVisible = false">取 消</ui-button>
                <ui-button type="primary" v-on:click="ensure">确 定</ui-button>
          </span>
    </ui-dialog>
</template>

<script>

    export default {


            data: function(){
                    return {
                        isVisible: false,
                        title: '',
                        content: ''
                    }
            },

            methods: {

                    ensure: function(){

                    }
            }
    }
</script>