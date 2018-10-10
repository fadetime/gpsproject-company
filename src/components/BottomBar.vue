<template>
<div id="bottombar">
    <div class="phone-viewport">
        <md-bottom-bar class="md-accent" md-type="shift">
            <md-bottom-bar-item id="bottom-bar-item-home" @click="gohome">
                <div class="md-bottom-bar-icon baseline_home"></div>
                <span class="md-bottom-bar-label">主页</span>
                <i class="badge" v-if="newPosts">{{ newPosts }}</i>
            </md-bottom-bar-item>
            <md-bottom-bar-item id="bottom-bar-item-posts" @click="gomission">
                <div class="md-bottom-bar-icon baseline-history"></div>
                <span class="md-bottom-bar-label">历史</span>
            </md-bottom-bar-item>
            <md-bottom-bar-item id="bottom-bar-item-favorites" @click="goinfo">
                <div class="md-bottom-bar-icon settings_white"></div>
                <span class="md-bottom-bar-label">信息</span>
            </md-bottom-bar-item>
        </md-bottom-bar>
    </div>
</div>
</template>

<script>
export default {
    name: 'Shift',
    data() {
        return {
            // newPosts: ''
        }
    },
    computed:{
        newPosts(){
            return this.$store.state.count
        }
    },
    // watch(){
    //     this.newPosts =$store.state.count
    // },
    methods: {
        gohome() {
            this.$router.push('/')
        },
        gomission() {
            this.$router.push('/history')
        },
        goinfo() {
            this.$router.push('/info')
        }
    }
}
</script>

<style scoped>
#bottombar {
    z-index: 9;
}

.phone-viewport {
    width: 100%;
    display: inline-flex;
    align-items: flex-end;
    overflow: hidden;
    border: 1px solid rgba(#000, .26);
    background: rgba(#000, .06);
}

.phone-viewport {
    display: inline-flex;
    align-items: flex-end;
    overflow: hidden;
    border: 1px solid rgba(#000, .26);
    background: rgba(#000, .06);
}

.badge {
    width: 19px;
    height: 19px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 6px;
    right: 6px;
    background: #fff;
    border-radius: 100%;
    color: #000;
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    letter-spacing: -.05em;
    font-family: 'Roboto Mono', monospace;
}

.baseline_home{
    background: #fff;
    mask-image: url(../../public/icons/baseline-home-36px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-home-36px.svg);
    width: 36px;
    height: 36px;
}

.baseline-history{
    background: #fff;
    mask-image: url(../../public/icons/baseline-history-36px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-history-36px.svg);
    width: 36px;
    height: 36px;
}

.settings_white{
    background: #fff;
    mask-image: url(../../public/icons/baseline-settings-36px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-settings-36px.svg);
    width: 36px;
    height: 36px;
}
</style>

