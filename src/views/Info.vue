<template>
<div id="info">
    <div class="emptyarea-top">
        <!-- 顶部占位符 -->
    </div>

    <div>
        <md-card style="width:80%;margin:10px auto;">
            <div class="card-item">
                <div class="card-item-title">
                    <span>address</span>
                </div>
                <div class="card-item-body">
                    <md-icon style="color:#d74342">room</md-icon>
                    <span v-if="$store.state.username">{{$store.state.useraddress}}</span>
                    <span v-else>您未登陆</span>
                </div>
            </div>

            <div class="card-item">
                <div class="card-item-title">
                    <span>phone</span>
                </div>
                <div class="card-item-body">
                    <md-icon style="color:#d74342">phone</md-icon>
                    <span v-if="$store.state.username">{{$store.state.userphone}}</span>
                    <span v-else>您未登陆</span>
                </div>
            </div>

            <div class="card-item">
                <div class="card-item-title">
                    <span>postcode</span>
                </div>
                <div class="card-item-body">
                    <md-icon style="color:#d74342">markunread_mailbox</md-icon>
                    <span v-if="$store.state.username">{{$store.state.userpostcode}}</span>
                    <span v-else>您未登陆</span>
                </div>
            </div>

            <div class="card-item">
                <div class="card-item-title">
                    <span>email</span>
                </div>
                <div class="card-item-body">
                    <md-icon style="color:#d74342">email</md-icon>
                    <span v-if="$store.state.username">{{$store.state.useremail}}</span>
                    <span v-else>您未登陆</span>
                </div>
            </div>

        </md-card>
    </div>

</div>
</template>

<style scoped>
.card-title {
    font-size: 20px;
    height: 40px;
    line-height: 40px;
    background-color: #f7f7f7;
    box-shadow: 0px 1px 2px 0px;
    text-align: left;
    padding-left: 20px
}

.card-title span {
    text-align: left;
}

.card-item {
    padding: 20px 0;
    border-bottom: 1px solid #eee;
}

.card-item-title {
    text-align: left;
    padding: 0 0 15px 20px;
    font-size: 20px
}

.card-item-title span {
    color: #989898
}

.card-item-body {
    text-align: left;
    padding-left: 30px;
}

.card-item-body span {
    padding-left: 10px;
    font-size: 18px
}
</style>
