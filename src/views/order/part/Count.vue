<template>

        <div class="cancel-title">
                <span class="fs-16">退菜份数</span>
                <span class="count-input">
                       <a class="decrease" v-bind:class="{'disabled': minDisabled}" v-on:click.prevent="decrease">-</a>
                       <input type="text" name="number" class="value fs-14" :value="currentValue" ref="input"
                       v-on:input="handleInput" v-on:blur="handleBlur">
                       <a class="increase" v-bind:class="{'disabled': maxDisabled}" v-on:click.prevent="increase">+</a>
                </span>
        </div>
</template>

<script>

export default {

    data: function(){
        return {
                currentValue: 0
        }
    },

    props: {

        min: {
            type: Number,
            default: 0
        },

        max: {
            type: Number,
            default: 10
        },

        value: {
            type: Number,
            default: 0
        },

        step: {
            type: Number,
            default: 1
        },

        change: {
            type: Function,
            default: ()=>{}
        }
    },

    computed: {
        minDisabled: function(){
            return this._decrease(this.value) < this.min
        },
        maxDisabled: function(){
            return this._increase(this.value) > this.max
        }
    },

    watch: {

        value: {
            immediate: true,
            handler: function(value){
                let newValue = parseInt(value)
                if(isNaN(newValue)) return;
                if(newValue >= this.max) newValue = this.max;
                if(newValue <= this.min) newValue = this.min;
                this.currentValue = newValue;
                this.$emit('input', newValue)
            }
        }
    },

    methods: {

        increase: function(){
            if(this.maxDisabled) return;
            const value = this.value || 0;
            const newval = this._increase(value);
            if(newval > this.max) return;
            this.setCurrentVal(newval)
        },

        decrease: function(){
            if(this.minDisabled) return;
            const value = this.value || 0;
            const newval = this._decrease(value)
            if(newval < this.min) return;
            this.setCurrentVal(newval)
        },

        _decrease: function(value){
            if(typeof value !== 'number') return this.currentValue;
            return parseInt(value - this.step);
        },

        _increase: function(value){
            if(typeof value !== 'number') return this.currentValue;
            return parseInt(value + this.step);
        },

        setCurrentVal: function(newval){
            const value = this.currentValue
            if(newval <= this.min) newval = this.min;
            if(newval >= this.max) newval = this.max;
            if(newval == value) return;
            this.$emit('change', newval);
            this.$emit('input', newval);
            this.currentValue = newval;
        },

        handleInput: function(value){
            const newval = Number(value)
            if(!isNaN(newval)){
                this.setCurrentVal = newval
            }
        },

        handleBlur: function(){
            const value = this.$refs.input.value
            this.setCurrentVal(parseFloat(value))
        }
    }
}
</script>


<style lang="scss" >

    .cancel-title {
        margin-bottom: 16px;
    }

    .count-input {
        height: 31px;
        width: 120px;
        font-size: 0;
        display: inline-block;
        vertical-align: middle;
        border: 1px solid #ddd;
        overflow: hidden;


        a, .value {
            display: inline-block;
            text-align: center;
            height: 100%;
            line-height: 25px;
            vertical-align: top;
        }

        a {
            display: inline-block;
            width: 24px;
            color: #b5b1ae;
            font-size: 20px;
            background: #edeae5;
            text-decoration: none;
        }

        .decrease, .increase{
            cursor: pointer;
        }

        .increase.disabled, .decrease.disabled {
            cursor: default
        }

        .value {
            width: 70px;
            height: 31px;
            border: none;
            outline: none;
        }
    }
</style>