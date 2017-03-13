<template>

<div class="view-verify">
       <form  class="verify-form" role="form">
             <input type="text" name="order-code" class="code fs-16" v-model="code" placeholder="请输入验证码" autocomplete="off" />
             <button type="button" class="btn-code" v-on:click.prevent="sendCode">确认</button>
       </form>
</div>
</template>


<script>

import xhr from 'service'
import { order } from 'service/api'


export default {
    data: function(){
        return {
            code: ''
        }
    },

    methods: {

        validator: function(){
            if(this.code == ''){
                this.message({
                    type: 'warning',
                    message:'请输入验证码'
                })
                return false;
            }
            return true
        },

        sendCode: function(){

            this.validator() && xhr({
                url: order.OrderVerification,
                options: {
                        verif_code: this.code
                }
            }).then( response => {

                    if(response.queryOrderVerification[0].orderNo){
                            this.$router.push({
                                    name: 'OrderDetail',
                                    params: {
                                        orderNo: response.queryOrderVerification[0].orderNo
                                    }
                            })
                    }
            })
        }
    }
}
</script>


<style lang="scss">
.view-verify {

    width: 100%;
    height: 100%;
    background: #fff;
    overflow: hidden;
}
.verify-form {

    width: 372px;
    height: 188px;
    position: relative;
    top: 50%;
    margin: -94px auto 0;
}


.view-verify input[name="order-code"]{
   width: 368px;
   height: 88px;
   padding: 0 30px;
   border: 1px solid #dddddd;
   border-radius: 16px;
   outline: none;
}

.view-verify .btn-code{
    width: 100%;
    height: 40px;

      display: inline-block;
      padding: 6px 12px;
      font-weight: normal;
      line-height: 1.42857143;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      cursor: pointer;
      user-select: none;
      background-image: none;
      border-radius: 4px;
      outline: none;
      border: none;
      color: #fff;
      margin: 42px 0 0;
      background: #2db165;
      &:active {
            background-image: none;
            outline: 0;
            box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
      }
}


</style>