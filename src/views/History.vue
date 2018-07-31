<template>
<div id="history">
    <div class="emptyarea-top">
        <!-- 顶部占位符 -->
    </div>

    <div style="padding-top:100px" v-if="!allinfo">
        <img src="../../public/img/ebuyLogo.png" width="300px">
    </div>
    <div v-else>
        <!-- <md-card md-with-hover style="width:80%;margin:10px auto;" v-for="(x,no) in item.missionclient" :key="no"> -->
        <md-card md-with-hover style="width:80%;margin:10px auto;">
            <md-ripple>
                <div class="card-text" style="padding:20px 20px 5px 20px">
                    <div class="card-text-left">
                        <span>Client: </span>
                    </div>
                    <div class="card-text-right">
                        <span>123</span>
                        <!-- <span>{{x.clientbname}}</span> -->
                    </div>
                </div>

                <div class="card-text">
                    <div class="card-text-left">
                        <span>Address:</span>
                    </div>
                    <div class="card-text-right">
                        <span>123</span>
                        <!-- <span>{{x.clientbaddress}}</span> -->
                    </div>
                </div>

                <div class="card-text">
                    <div class="card-text-left">
                        <span>Contact: </span>
                    </div>
                    <div class="card-text-right">
                        <span>123</span>
                        <!-- <span>{{x.clientbphone}}</span> -->
                    </div>
                </div>

                <div class="card-text">
                    <div class="card-text-left">
                        <span>Progress: </span>
                    </div>
                    <div class="card-text-right">
                        <span>1</span>
                        <!-- <span>{{no+1}}</span> -->
                        <span>/</span>
                        <span>123</span>
                        <!-- <span>{{item.missionclient.length}}</span> -->
                    </div>
                </div>

                <div class="card-text" style="padding:5px 20px 20px 20px">
                    <div class="card-text-left">
                        <span>State: </span>
                    </div>
                    <div class="card-text-right">
                        <!-- <span style="color:#f9cf97" v-if="!x.finishdate">Shipping</span> -->
                        <span style="color:#f9cf97">finish</span>
                    </div>
                </div>
            </md-ripple>
        </md-card>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            allinfo:true
        }
    }
}
</script>

<style scoped>
.card-text {
    text-align: left;
    padding: 5px 20px;
    font-size: 20px;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    word-wrap: break-word;
}

.card-text-left {
    flex-basis: 36%;
}

.card-text-right {
    flex-basis: 60%;
    min-width: 180px;
}
</style>
