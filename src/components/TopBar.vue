<template>
<div id="topbar">
    <div class="topusername" style="box-shadow: 0px 1px 5px;">
        <div class="topusername-left"></div>
        <div class="topusername-center">
            <span v-if="$store.state.username">{{$store.state.username}}</span>
            <span v-else>请重新登陆</span>
        </div>
        <div class="topusername-right">
            <img src="../../public/icons/refresh.png" alt="refresh" id="arrow">
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'topBar'
}
</script>

<style scoped>
.topusername {
    background-color: #d74342;
    padding: 10px;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    word-wrap: break-word;
    position: fixed;
    z-index: 9;
    width: 100%;
    top: 0;
}

.topusername-left {
    flex-basis: 20%;
    margin: 0 auto;
}

.topusername-center {
    color: #fff;
    font-size: 20px;
    flex-basis: 50%;
    margin: 0 auto;
}

.topusername-center span {
    line-height: 30px;
}

.topusername-right {
    flex-basis: 20%;
    margin: 0 auto;
}

.topusername-right img {
    width: 25px;
}
</style>
