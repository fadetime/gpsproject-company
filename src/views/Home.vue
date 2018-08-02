<template>
<div class="home">
    <div class="emptyarea-top">
        <!-- 顶部占位符 -->
    </div>
    <div style="padding-top:100px" v-if="!allinfo">
        <img src="../../public/img/ebuyLogo.png" width="300px">
    </div>
    <div v-else>
        <md-card md-with-hover style="width:80%;margin:10px auto;" v-for="(x,no) in allinfo" :key="no">
            <md-ripple>
                <div class="card-text" style="padding:20px 20px 5px 20px">
                    <div class="card-text-left">
                        <span>Client: </span>
                    </div>
                    <div class="card-text-right">
                        <span>{{x.clientbname}}</span>
                    </div>
                </div>

                <div class="card-text">
                    <div class="card-text-left">
                        <span>Address:</span>
                    </div>
                    <div class="card-text-right">
                        <span>{{x.clientbaddress}}</span>
                    </div>
                </div>

                <div class="card-text">
                    <div class="card-text-left">
                        <span>Contact: </span>
                    </div>
                    <div class="card-text-right">
                        <span>{{x.clientbphone}}</span>
                    </div>
                </div>

                <div class="card-text">
                    <div class="card-text-left">
                        <span>Progress: </span>
                    </div>
                    <div class="card-text-right">
                        <span>{{no+1}}</span>
                        <span>/</span>
                        <span>{{allinfo.length}}</span>
                    </div>
                </div>

                <div class="card-text" style="padding:5px 20px 20px 20px">
                    <div class="card-text-left">
                        <span>State: </span>
                    </div>
                    <div class="card-text-right">
                        <span style="color:#f9cf97" v-if="!x.finishdate">Shipping</span>
                        <span style="color:#99cc33" v-else>finish</span>
                    </div>
                </div>
            </md-ripple>
        </md-card>
    </div>

    <div class="emptyarea-top">
        <!-- 底部占位符 -->
    </div>
</div>
</template>

<script>
import axios from "axios";
import addConfig from "../assets/js/addConfig.js";

export default {
    name: "home",
    data() {
        return {
            allinfo: []
        };
    },
    created() {
        this.getTodayInfo();
    },
    methods: {
        getTodayInfo() {
            let startdate = new Date().toDateString();
            let username = localStorage.getItem('username')
            axios
                .post(addConfig.serveradd + "/client-company", {
                    startdate: startdate,
                    username: username
                })
                .then(doc => {
                    this.allinfo = doc.data.doc;
                    this.$store.commit("newvalue", this.allinfo.length);
                })
                .catch(err => {
                    console.log(err);
                });

        }
    }
};
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
