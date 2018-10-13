<template>
<div id="history">
    <div class="emptyarea-top">
        <!-- 顶部占位符 -->
    </div>
    <div style="width:300px;margin:0 auto">
        <md-datepicker v-model="selectedDate" md-immediately md-closed="getTodayInfo()" :md-disabled-dates="disabledDates">
            <label>请选择日期</label>
        </md-datepicker>
    </div>

    <div style="padding-top:80px" v-if="!selectedDate">
        <img src="../../public/img/ebuyLogo.png" width="300px">
    </div>

    <div v-else>
        <div  v-if="allinfo.length == 0" style="padding-top:100px;font-size:15px">
            <div>
                <md-icon class="md-size-2x">sentiment_dissatisfied</md-icon>
            </div>
            <div style="padding-top:10px">
                <span>未找到当日信息</span>
            </div>
        </div>
        <md-card md-with-hover style="width:80%;margin:10px auto;" v-for="(x,no) in allinfo" :key="no" v-else>
            <md-ripple>
                <div @click="openDetail(x)">

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
                </div>
            </md-ripple>
        </md-card>
        

    </div>
    <div class="emptyarea-top">
        <!-- 顶部占位符 -->
    </div>

    <!-- detail dialog start -->
    <md-dialog :md-active.sync="detailDialog">

        <div class="dialogtop" style="box-shadow: 0px 1px 5px;">
            <div class="dialogtop-left" @click="detailDialog = false">
                <img src="../../public/icons/left.png" alt="exit">
                <span>返回</span>
            </div>
            <div class="dialogtop-center">
                <span>确认完成</span>
            </div>
            <div class="dialogtop-right"></div>
        </div>

        <div class="emptyarea-top">
            <!-- 顶部占位符 -->
        </div>

        <div style="padding-top:40px">
            <div class="photoarea" v-if="!detailPhoto">
                <img src="../../public/img/640.gif" alt="shipping">
            </div>
            <div class="photoarea" v-else>
                <img :src="detailPhoto | imgurl" alt="missionimage">
            </div>
        </div>

        <div class="namearea">
            <span style="font-size:20px">{{detailName}}</span>
        </div>

        <div v-if="!detailTime">
            <div class="bottom-false">
                <span>运送中，请耐心等待</span>
            </div>
        </div>
        <div v-else>
            <div class="bottom-true">
                <span>已完成</span>
                <br>
                <span>{{detailTime | datefilter}}</span>
                <br>
                <span>{{detailTime | timefilter}}</span>
            </div>
        </div>
    </md-dialog>
    <!-- detail dialog end -->

</div>
</template>

<script>
import axios from 'axios'
import addConfig from "../assets/js/addConfig.js";

export default {
    data() {
        return {
            selectedDate: '',
            allinfo: [],
            detailDialog: false,
            detailName: '',
            detailTime: '',
            detailPhoto: '',
            disabledDates: date => {
                const day = date.getTime()
                let today = (new Date()).getTime()
                let configday = 15 * 24 * 3600 * 1000
                let enableday = today - configday
                return day < enableday
            }
        }
    },
    watch: {
        selectedDate: function () {
            let startdate = new Date(this.selectedDate).toDateString();
            let username = localStorage.getItem('username')
            axios
                .post(addConfig.serveradd + "/client-company", {
                    startdate: startdate,
                    username: username
                })
                .then(doc => {
                    if(doc.data.doc){
                        doc.data.doc.forEach(x => {
                            x.array.forEach(y => {
                                this.allinfo.push(y)
                            });
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    methods: {
        openDetail(item) {
            this.detailName = item.clientbname
            this.detailTime = item.finishdate
            this.detailPhoto = item.finishphoto
            this.detailDialog = true
        }
    }
}
</script>

<style scoped>
.card-text {
    text-align: left;
    padding: 5px 20px;
    font-size: 18px;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    word-wrap: break-word;
}

.card-text-left {
    flex-basis: 30%;
    text-align: right;
}

.card-text-right {
    flex-basis: 70%;
    padding-left: 10px;
    min-width: 180px;
}

.dialogtop {
    background-color: #d74342;
    padding: 10px;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
    word-wrap: break-word;
    position: fixed;
    z-index: 101;
    width: 100%;
    top: 0;
    font-size: 18px;
    color: #fff;
    line-height: 30px;
}

.dialogtop-left {
    flex-basis: 20%;
    margin: 0 auto;
}

.dialogtop-left img {
    width: 20px;
    padding-bottom: 3px;
}

.dialogtop-center {
    flex-basis: 50%;
    margin: 0 auto;
    text-align: center;
}

.dialogtop-right {
    flex-basis: 20%;
    margin: 0 auto;
}

.photoarea {
    margin: 0 auto;
    text-align: center;
    border: 3px dashed #696969;
    width: 250px;
    height: 250px;
    background-color: #eee;
}

.photoarea img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.bottom-false {
    margin: 40px auto;
    text-align: center;
    border: 3px solid #696969;
    border-radius: 40px;
    padding: 20px 0;
    background-color: #f9cf97;
    font-size: 15px;
    width: 250px;
}

.bottom-true {
    margin: 40px auto;
    text-align: center;
    border: 3px solid #696969;
    border-radius: 40px;
    padding: 20px 0;
    background-color: #99cc33;
    font-size: 15px;
    width: 250px;
}

.namearea {
    text-align: center;
    padding-top: 30px;
    height: 90px;
    line-height: 58px;
    font-weight: bold;
    background-image: url(../../public/img/wood.jpg);
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: 250px 74px;
}
</style>
