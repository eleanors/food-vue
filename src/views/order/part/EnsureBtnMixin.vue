<script>

    export default {
        name: 'EnsureBtn',

        data: function(){
                return {
                        // 确认菜品列表是否可见
                        miniFoodVisible: false,
                        timeout: null
                }
        },

        mounted: function(){
                this.initEvent()
        },

        methods: {
                initEvent: function(){
                    let elemBtn = this.$refs.ensureBtn

                    elemBtn.addEventListener('mouseenter', this.showMiniFood)
                    elemBtn.addEventListener('mouseleave', this.hideMiniFood)
                },

                showMiniFood: function(){

                    clearTimeout(this.timeout)
                    this.timeout = setTimeout( ()=> {
                            this.miniFoodVisible = true
                    }, 250)
                },

                hideMiniFood: function(){

                    clearTimeout(this.timeout)
                    this.timeout = setTimeout( ()=> {
                            this.miniFoodVisible = false
                    }, 250)
                },
        }
    }
</script>