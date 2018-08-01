<template>
<div id="history">
    <div class="emptyarea-top">
        <!-- 顶部占位符 -->
    </div>
    <div style="width:300px;margin:0 auto">
        <md-datepicker v-model="selectedDate" md-immediately md-closed="getTodayInfo()">
            <label>请选择日期</label>
        </md-datepicker>
    </div>

    <div style="padding-top:80px" v-if="!allinfo">
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
                        <!-- <span style="color:#f9cf97" v-if="!x.finishdate">Shipping</span> -->
                        <span style="color:#f9cf97">shipping</span>
                    </div>
                </div>
            </md-ripple>
        </md-card>
    </div>

</div>
</template>

<script>
import axios from 'axios'
import addConfig from "../assets/js/addConfig.js";

export default {
    data() {
        return {
            allinfo: true,
            selectedDate: '',
            allinfo: []
        }
    },
    watch: {
        selectedDate: function () {
            console.log('###')
            let startdate = new Date(this.selectedDate).toDateString();
            let username = localStorage.getItem('username')
            axios
                .post(addConfig.serveradd + "/client-company", {
                    startdate: startdate,
                    username: username
                })
                .then(doc => {
                    this.allinfo = doc.data.doc
                    console.log(this.allinfo)
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    methods: {
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
