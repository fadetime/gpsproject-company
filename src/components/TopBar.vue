<template>
<div id="topbar">
    <div class="topusername" style="box-shadow: 0px 1px 5px;">
        <div class="topusername-left"></div>
        <div class="topusername-center">
            <span v-if="$store.state.username">{{$store.state.username}}</span>
            <span v-else>请重新登陆</span>
        </div>
        <div class="topusername-right" @click="reload">
            <img src="../../public/icons/refresh.png" alt="refresh" id="arrow">
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import addConfig from "../assets/js/addConfig.js";
import _ from "lodash";

export default {
    name: "topBar",
    mounted() {
        this.reload();
    },
    methods: {
        reload() {
            let arrow = document.querySelector("#arrow");
            arrow.style.transform = "rotate(360deg)";
            arrow.style.transition = "0.5s";
            setTimeout(() => {
                arrow.style.transform = "rotate(0deg)";
                arrow.style.transition = "0.5s";
            }, 300);

            let startdate = new Date().toDateString();
            let username = localStorage.getItem("username");
            axios
                .post(addConfig.serveradd + "/client-company", {
                    startdate: startdate,
                    username: username
                })
                .then(doc => {
                    let allinfo = doc.data.doc;
                    allinfo = _.orderBy(allinfo, ["finishdate"], ["desc"]);
                    this.$store.dispatch("getTodayInfo", allinfo);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
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
