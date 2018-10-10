<template>
    <div id="detailpage">
        <div class="topusername" style="box-shadow: 0px 1px 5px;">
            <div class="topusername-left" @click="turnback">
                <img src="../../public/icons/left.png" alt="exit">
                <span>返回</span>
            </div>
            <div class="topusername-center">
                <span v-if="$store.state.tempArr">{{allClientInfo.name}}</span>
                <span v-else>信息错误请返回首页</span>
            </div>
            <div class="topusername-right"></div>
        </div>
        <div class="emptyarea-top">
            <!-- 顶部占位符 -->
        </div>
        <div style="padding-top:100px" v-if="!allClientInfo">
            <img src="../../public/img/ebuyLogo.png" width="300px">
        </div>
        <div v-else>
            <md-card md-with-hover style="width:80%;margin:10px auto;" v-for="(x,no) in allClientInfo.array" :key="no">
                <md-ripple>
                    <div style="background-color: #d74342;width: 50px;height: 50px;border-radius: 0 0 50px 0;box-shadow: 1px 1px 5px;position: absolute;" @click="openImage(x)">
                        <span style="font-size:20px;color:#fff;font-weight: 800;line-height: 40px;">{{no+1}}</span>
                    </div>
                    <div class="card-text" style="padding:5px 20px;border-bottom: 1px solid #eee;" @click="openImage(x)">
                        <div class="card-text-title" style="margin:0 auto;line-height: 40px;">
                            <span style="text-align:right;font-size:18px">{{x.clientbname}}</span>
                        </div>
                    </div>

                    <div style="width: 46px;height: 46px;box-shadow: 1px 1px 5px;position: absolute;right:14px;top:2px;border-radius: 100%;overflow: hidden;" @click="openImage(x)">
                        <img :src="x.image | imgurl" alt="clientPic" style="width: 100%;height: 100%;object-fit: contain;" onerror="this.src='/img/ebuyLogo.png'">
                    </div>
                    <div @click="openDetailDialog(x)">
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
                                <span>{{allClientInfo.array.length}}</span>
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

        <!-- image dialog start -->
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div v-if="imageDialog" class="imageDialog" @click="imageDialog= false">
                <div>
                    <img :src="imageSrc | imgurl" alt="detailimg">
                </div>

            </div>
        </transition>
        <!-- image dialog end -->

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
                <span style="font-size:18px">{{detailName}}</span>
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
export default {
  data() {
    return {
      imageDialog: false,
      detailDialog: false,
      imageSrc: '',
      detailName:'',
      detailTime:'',
      detailPhoto:''
    }
  },
  computed: {
    allClientInfo() {
      return this.$store.state.tempArr
    }
  },
  methods: {
    turnback() {
      this.$router.push('/')
    },
    openImage(item) {
      console.log('1')
      this.imageDialog = true
      this.imageSrc = item.image
    },
    openDetailDialog(item) {
      this.detailName = item.clientbname
      this.detailTime = item.finishdate
      this.detailPhoto = item.finishphoto
      this.detailDialog = true
    }
  }
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
  z-index: 10;
  width: 100%;
  top: 0;
}

.topusername-left {
  flex-basis: 20%;
  margin: 0 auto;
}

.topusername-left img {
  width: 20px;
  padding-bottom: 4px;
}

.topusername-left span {
  font-size: 18px;
  color: #fff;
  line-height: 30px;
}

.topusername-center {
  color: #fff;
  font-size: 18px;
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

.card-text {
  text-align: left;
  padding: 5px 20px;
  font-size: 16px;
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
  min-width: 160px;
  padding-left: 10px;
}

.imageDialog {
  background-color: #000;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 30;
}

.imageDialog div {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
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
