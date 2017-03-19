<template>

<div class="site-container">

        <div class="site-header">

                <img src="~images/login/img_header.png" >
                <h4>餐厅端登录中心</h4>
        </div>
        <div class="site-main">
            <div class="content">
                <div class="left"></div>
                <div class="right">
                    <!-- 登录 -->
                    <transition name="fade">
                    <div class="form-wrap form-login" v-show="isLogin">
                        <img src="~images/login/icon_login.png" /><span class="title">登录</span>
                        <form v-on:submit.prevent>
                            <div class="form-group">
                                <input type="text" class="username form-control" v-model="login.username" autocomplete="off" placeholder="请输入用户名">
                                <a href="javascript:void(0)" class="icon-del" for="username"></a>
                            </div>
                            <div class="form-group">
                                <input type="password" class="password form-control" v-if="isPassword" v-model="login.password" autocomplete="off" placeholder="请输入密码">
                                <input type="text" class="password form-control" v-else v-model="login.password" autocomplete="off" placeholder="请输入密码">
                                <a href="javascript:void(0)" class="icon-eye" v-bind:class="{open:!isPassword}" v-on:click="isPassword=!isPassword" for="password"></a>
                            </div>
                            <div class="forget">
                                <a href="#" v-on:click.prevent="forgetPwdHandle">忘记密码?</a>
                                <a href="#" v-on:click.prevent="registeHandle">注册</a>
                            </div>
                            <button class="btn btn-logon" v-on:click.prevent="loginHandle">登&nbsp;录</button>
                        </form>
                    </div>
                    </transition>

                    <!-- 注册 -->
                    <transition name="fade">
                    <div class="form-wrap form-regist" v-show="isRegister">
                        <span class="back" v-on:click="backHandle"><img class="back" src="~images/login/icon_back.png" /></span><span class="title">注册</span>
                        <form v-on:submit.prevent>
                            <div class="form-group">
                                <input type="text" maxLength="11" onlynumber class="phone form-control" v-model="register.phone" autocomplete="off" placeholder="手机号">
                                <button class="verify-btn" v-on:click="sendCode" v-text="timeText"></button>
                            </div>

                            <div class="form-group">
                                <input type="text" class="verify form-control" autocomplete="off" v-model="register.code" placeholder="请输入验证码">
                            </div>

                            <div class="form-group">
                                <input type="password" class="password form-control" autocomplete="off" v-model="register.password" placeholder="请输入密码">
                            </div>

                            <div class="form-group">
                                <input type="password" class="password form-control" v-model="register.checkpwd" autocomplete="off" placeholder="请再次确认新密码">
                            </div>
                            <button class="btn btn-logon register" v-on:click.prevent="registerHandle">完&nbsp;成</button>
                        </form>
                    </div>
                    </transition>

                    <!-- 忘记密码 -->
                    <transition name="fade">
                    <div class="form-wrap form-forget" v-show="isForget">
                        <span class="back" v-on:click="backHandle"><img class="back" src="~images/login/icon_back.png" /></span><span class="title">忘记密码</span>
                        <form v-on:submit.prevent>
                            <div class="form-group">
                                <input type="text" maxLength="11" onlynumber class="phone form-control" autocomplete="off" placeholder="手机号">
                                <button class="verify-btn">获取验证码</button>
                            </div>

                            <div class="form-group">
                                <input type="text" class="verify form-control" autocomplete="off" placeholder="请输入验证码">
                            </div>

                            <div class="form-group">
                                <input type="password" class="password form-control" autocomplete="off" placeholder="请输入密码">
                            </div>

                            <div class="form-group">
                                <input type="password" class="password form-control" autocomplete="off" placeholder="请再次确认新密码">
                            </div>
                            <button class="btn btn-logon register" id="submit">完&nbsp;成</button>
                        </form>
                    </div>
                    </transition>

                </div>
            </div>
        </div>

        <div class="site-footer">
            <ul class="about">
                <li>
                    <div class="bussines">
                        <strong>商家咨询来电</strong>
                        <span class="span">029-85000000</span>
                        <span>周一到周日09:0-21:00</span>
                        <span id="division"></span>
                    </div>
                </li>
                <li>
                    <div class="bussines">
                        <strong>商家邮箱</strong>
                        <span class="span">quanmeishi@futeng.com</span>
                        <span class="division"></span>
                    </div>
                </li>
            </ul>
            <h5>&copy;2017 全美食 quanmeishi.com 陕ICP证000000号</h5>
        </div>
</div>
</template>


<script>
import xhr from 'service/'
import { auth } from 'service/api'
import { mapActions } from 'vuex'
export default {
        data: function () {
                return {
                        isLogin: true,
                        isRegister: false,
                        isForget: false,


                        // 密码是否可见
                        isPassword: true,

                        interval: null,
                        time: 60,
                        timeText: '获取验证码',
                        readonly: false,
                        isLock: false,

                        login: {

                                username: '',
                                password: ''
                        },

                        register: {
                                phone: '',
                                code: '',
                                password: '',
                                checkpwd: ''
                        },

                        forget: {
                                phone: '',
                                code: '',
                                password: '',
                                checkpwd: ''
                        }
                }
        },

        methods: {

                // 忘记密码页
                forgetPwdHandle: function(){
                        this.isForget = true;
                        this.isLogin = false;
                },

                // 注册页
                registeHandle: function(){
                        this.isRegister = true;
                        this.isLogin = false;
                },

                // 返回上一页
                backHandle: function(){
                        this.isRegister = false;
                        this.isForget = false;
                        this.isLogin = true
                },

                validator: function(){
                        if(this.login.username == ''){
                                this.message({
                                    type: 'warning',
                                    message: '用户名不能为空'
                                })
                                return false;
                        }
                        if(this.login.password == ''){
                                this.message({
                                    type: 'warning',
                                    message: '密码不能为空'
                                })
                                return false;
                        }
                        return true;
                },

                tickTime: function(){
                        this.time--
                        this.timeText = this.time + '秒'
                        if(this.time < 1) {
                                this.time = 60
                                this.isLock = false
                                this.timeText = '重新获取'
                                this.interval&&clearInterval(this.interval)
                        }
                },

                isPhone: function(){
                        if(!(/^1[34578]\d{9}$/.test(this.register.phone))){
                                this.message({
                                    type: 'warning',
                                    message: '手机号不正确'
                                })
                                return false;
                        }
                        return true;
                },

                sendCode: function(){
                        if(!this.isLock && this.isPhone()){
                                this.isLock = true
                                this.interval = setInterval(this.tickTime, 1e3)
                                xhr({
                                        url: auth.sendAuthCode,
                                        options: {
                                                account: this.register.phone
                                        }
                                }).then( response=>{


                                }, response=> {
                                        console.log(response)
                                })
                        }
                },

                loginHandle: function(){
                        this.validator() && xhr({
                                url: auth.login,
                                options: {
                                        account: this.login.username,
                                        pwd: this.login.password
                                }
                        }).then( response=>{
                                if(response.returnMap){
                                    this.setShopId(response.returnMap.shopId)
                                    this.setShopSession(response.returnMap.session)
                                    if(response.returnMap.shopId){
                                            return this.$router.push({name: 'Manage'});
                                    }
                                    this.$router.push({name: 'SetShop'})
                                }
                        }, response=>{

                        })
                },

                registerHandle: function(){
                        xhr({
                                url: auth.register,
                                options: {
                                        account: this.register.phone,
                                        pwd: this.register.password,
                                        authCode: this.register.code
                                }
                        }).then( response=>{

                                this.isLogin= true,
                                this.isRegister= false
                        })
                },

                forgetHandle: function(){

                },
                
                ...mapActions(['setShopSession','setShopId'])
        }
}

</script>


<style lang="scss">

    .site-container {
            width: 100%;
            height: 100%;
            background: #fff;

            /**站点Header**/
           .site-header {
                width: 1200px;
                height: 80px;
                margin: 0 auto;

                img, h4 {
                        display: inline-block;
                        margin-top: 10px;
                        vertical-align: bottom;
                }
           }

           /**Banner 登录 注册**/
           .site-main {
                width: 100%;
                height: 570px;
                background: url('~images/login/img_bg.png') no-repeat center;


                .content {
                        width: 1200px;
                        height: 100%;
                        margin: 0 auto;


                        .left {
                            float: left;
                            width: 50%;
                            height: 100%;
                            background: url('~images/login/img_foods.png') no-repeat center;
                        }
                        .right {
                            float: right;
                            width: 50%;
                            height: 100%;
                            position: relative;
                        }
                }

                .form-wrap {
                        float: right;
                        width: 300px;
                        padding: 28px 25px;
                        border-radius: 5px;

                        position: absolute;
                        top: 50%;
                        right: 0;

                        background: #fff;

                        img {
                            vertical-align: middle;
                        }

                        &.form-login{
                            margin-top: -156px;
                        }
                        &.form-regist, &.form-forget{
                            margin-top: -192px;
                        }
                }

                .title {
                        font-size: 20px;
                        vertical-align: middle;
                        margin-left: 20px;
                }

                .back {
                        display: inline-block;
                        width: 30px;
                        height: 30px;
                        vertical-align: middle;
                        cursor: pointer;
                }

                form {
                    margin-top: 20px;
                }

                .form-control:focus {
                    border-color: #ffcc00;
                    outline: 0;
                    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px #ffd426;
                    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px #ffd426;
                }

                .form-group {
                    position: relative;
                    margin: 0 0 5px 0;

                    input {
                        width: 100%;
                        height: 48px;
                        padding-left: 48px;
                        padding-right: 48px;
                        outline: none;
                        border: 1px solid #ccc;
                    }
                }


                .username {
                    background: url('~images/login/icon_user.png') no-repeat 16px center;
                }

                .password {
                    background: url('~images/login/icon_password.png') no-repeat 16px center;
                }

                .phone {
                    background: url('~images/login/icon_phone.png') no-repeat 16px center;
                }

                .verify {
                    background: url('~images/login/icon_verify.png') no-repeat 16px center;
                }

                .icon-eye {
                    position: absolute;
                    right: 20px;
                    width: 16px;
                    height: 16px;
                    top: 50%;
                    margin-top: -8px;
                    background: url('~images/login/icon_eye.png') no-repeat center;
                    background-size: 100%;
                    z-index: 1;
                    &.open {
                        background: url('~images/login/icon_eye_open.png') no-repeat center;
                        background-size: 100%;
                    }
                }

                .verify-btn {
                    width: 90px;
                    display: block;
                    position: absolute;
                    right: 0;
                    top: 0;
                    height: 48px;
                    line-height: 48px;
                    background: #ffcc00;
                    border: none;
                    color: #fff;
                    text-align: center;
                    border-radius: 3px;
                    cursor: pointer;

                    &.disabled {
                        background: #c3c3c3;
                    }

                    &.disabled:focus {
                        border: none;
                        outline: none;
                    }
                }

                .forget {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    a {
                        text-decoration: none;
                        cursor: pointer;
                        font-size: 14px;
                        color: #666;
                        margin-top: 10px;
                        transition: color .2s ease .2s;

                        &:hover {
                            color: #ffcc00
                        }
                    }
                }

                .btn-logon {
                    background: #ffcc00;
                    margin-top: 20px;
                    width: 100%;
                    height: 48px;
                    font-size: 18px;

                    &:hover,
                    &:focus {
                        background: #ffbb00;
                        color: #fff;
                    }
                }
           }

            /**站点简介**/
           .site-footer {

                .about {
                    margin: 0 auto;
                    width: 570px;
                    display: flex;
                    justify-content: space-between;

                    li {
                        height: 60px;
                        margin-top: 15px;
                    }

                    li strong, li span {
                        white-space: nowrap;
                        margin-left: 40px;
                        font-size: 10px;
                        line-height: .7;
                        text-align: left;
                    }

                    .span {
                        font-weight: 700;
                    }

                    li:first-child .bussines:before {
                        content: '';
                        display: inline-block;
                        width: 60px;
                        height: 60px;
                        background: url('~images/login/img_phone.png') no-repeat;
                        float: left;
                    }

                    li:last-child .bussines:before {
                        content: '';
                        display: inline-block;
                        width: 60px;
                        height: 60px;
                        background: url('~images/login/img_email.png') no-repeat;
                        float: left;
                    }
                }

                .bussines {
                    width: 270px;
                    position: relative;
                    span {
                        color: #666666;
                    }

                    .division {
                        position: absolute;
                        left: 40px;
                        top: 0;
                        display: inline-block;
                        width: 1px;
                        border: 1px dotted #ccc;
                        height: 69px;
                    }
                }

                h5 {
                    font-size: 14px;
                    margin: 110px auto;
                    text-align: center;
                }
           }
    }
</style>