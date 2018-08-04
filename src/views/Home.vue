<template>
<div class="home">
    <!-- <div class="topusername" style="box-shadow: 0px 1px 5px;">
        <div class="topusername-left"></div>
        <div class="topusername-center">
            <span v-if="$store.state.username">{{$store.state.username}}</span>
            <span v-else>请重新登陆</span>
        </div>
        <div class="topusername-right" @click="refresh">
            <img src="../../public/icons/refresh.png" alt="refresh" id="arrow">
        </div>
    </div> -->
    <div class="emptyarea-top">
        <!-- 顶部占位符 -->
    </div>
    <div style="padding-top:100px" v-if="!allinfo">
        <img src="../../public/img/ebuyLogo.png" width="300px">
    </div>
    <div v-else>
        <md-card md-with-hover style="width:80%;margin:10px auto;" v-for="(x,no) in allinfo" :key="no">
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
        <!-- 底部占位符 -->
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
                <span>{{detailTime | timefilter}}</span>
            </div>
        </div>
    </md-dialog>
    <!-- detail dialog end -->

</div>
</template>

<script>
import axios from "axios";
import addConfig from "../assets/js/addConfig.js";
import _ from 'lodash'
export default {
    name: "home",
    data() {
        return {
            allinfo: [],
            detailDialog: false,
            detailPhoto: '',
            detailName: '',
            detailTime: ''
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
                    this.allinfo = doc.data.doc
                    this.allinfo = _.orderBy(this.allinfo, ['finishdate'], ['desc'])
                    this.$store.commit("newvalue", this.allinfo.length)
                })
                .catch(err => {
                    console.log(err);
                });

        },

        refresh() {
            let arrow = document.querySelector('#arrow')
            arrow.style.transform = 'rotate(360deg)'
            arrow.style.transition = '0.5s'
            setTimeout(() => {
                arrow.style.transform = 'rotate(0deg)'
                arrow.style.transition = '0.5s'
            }, 300)
            this.getTodayInfo()
        },

        openDetail(item) {
            this.detailName = item.clientbname
            this.detailTime = item.finishdate
            this.detailPhoto = item.finishphoto
            console.log(item)
            this.detailDialog = true
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
    font-size: 20px;
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

.namearea {
    text-align:center;
    padding-top:30px; 
    height: 90px;
    line-height: 58px;
    font-weight: bold;
    background-image: url(../../public/img/wood.jpg);
    background-repeat:no-repeat;
    background-position:bottom;
    background-size: 250px 74px;
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
</style>
