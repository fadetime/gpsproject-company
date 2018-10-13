<template>
    <div class="home">
        <div style="position:fixed;top:-20px;width:100%;height:70px;background-color:#fff;z-index:8"></div>
        <div class="emptyarea-top">
            <!-- 顶部占位符 -->
        </div>
        <div style="padding-top:100px" v-if="!allinfo">
            <img src="../../public/img/ebuyLogo.png" width="200px">
            <br>
            <span>~无配送任务~</span>
        </div>
        <div v-else>

            <md-card md-with-hover style="width:80%;margin:10px auto;" v-for="(item,index) in allinfo" :key="index">
                <md-ripple>
                    <div @click="openDetail(item)">
                        <div class="card-text" style="padding:10px;border-bottom: 1px solid #eee;">
                            <div style="margin: 0 auto;">
                                <span style="font-size:18px">{{item.name}}</span>
                            </div>
                        </div>

                        <div class="card-text" style="padding:10px 0 10px 30px">
                            <div>
                                <span style="font-size:16px;color: #989898">用户数量</span>
                            </div>
                        </div>

                        <div class="card-text" style="padding:5px 20px 5px 40px">
                            <div class="card-text-left">
                                <div class="allclientnumicon"></div>
                            </div>
                            <div class="card-text-right" style="padding-left:50px">
                                <span style="font-size:16px">共 {{item.array.length}} 个</span>
                            </div>
                        </div>

                        <div class="card-text" style="padding:10px 0 10px 30px">
                            <div>
                                <span style="font-size:16px;color: #989898">完成数量</span>
                            </div>
                        </div>

                        <div class="card-text" style="padding:5px 20px 5px 40px">
                            <div class="card-text-left">
                                <div class="assignmenticon"></div>
                            </div>
                            <div class="card-text-right" style="padding-left:50px">
                                <span style="font-size:16px">共 {{finishNumber[index]}} 个</span>
                            </div>
                        </div>

                        <div class="card-text" style="padding:20px 0 10px 30px">
                            <div>
                                <span style="font-size:16px;color: #989898">订单时间</span>
                            </div>
                        </div>

                        <div class="card-text" style="padding:5px 20px 20px 40px">
                            <div class="card-text-left">
                                <div class="date_rangeicon"></div>
                            </div>
                            <div class="card-text-right" style="padding-left:50px">
                                <span style="font-size:16px">{{item.missiondate | datefilter}}</span>
                            </div>
                        </div>

                        <div style="display: -webkit-flex;display: flex;-webkit-flex-flow: row;flex-flow: row;padding: 0 0 10px 0;justify-content: center;">
                            <div v-for="(x,n) in item.array" :key="n" style="overflow:hidden;width:50px;height:50px;margin: 0 5px;box-shadow: 1px 1px 5px;" v-if="n < 5">
                                <img :src="x.image | imgurl" alt="x.clientbname" style="height:100%;width:100%;object-fit:contain" v-on:error.once="loadDefault($event)">
                            </div>
                        </div>
                        <div class="card-text" style="padding:10px 0;border-top:1px solid #eee">
                            <div style="margin:0 auto;color:#707070;font-size:16px">
                                <span>>>></span>
                                <span> 点击查看详情 </span>
                                <span>>>></span>
                            </div>
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
import axios from 'axios'
import addConfig from '../assets/js/addConfig.js'
import _ from 'lodash'

export default {
  name: 'home',
  data() {
    return {
      detailDialog: false,
      finishNumber: [],
      imgDefault: '/img/ebuyLogo.png'
    }
  },
  computed: {
    allinfo() {
      return this.$store.state.todayAllInfo
    }
  },
  watch: {
    allinfo: function() {
      this.countFinishNum()
    }
  },
  created() {
    this.countFinishNum()
  },
  methods: {
    countFinishNum() {
      let indexNum = -1
      let countNum = 0
      this.allinfo.forEach(x => {
        indexNum += 1
        x.array.forEach(y => {
          if (y.finishdate) {
            countNum += 1
          }
        })
        this.finishNumber[indexNum] = countNum
      })
    },
    loadDefault(e) {
      e.currentTarget.src = this.imgDefault
    },

    openDetail(item) {
      this.$store.dispatch('setTempArr', item)
      this.$router.push('/detailpage')
    }
  }
}
</script>

<style scoped>
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

.allclientnumicon {
  background: #d74342;
  mask-image: url(../../public/icons/baseline-assignment_late-24px.svg);
  -webkit-mask-image: url(../../public/icons/baseline-assignment_late-24px.svg);
  width: 24px;
  height: 24px;
}

.date_rangeicon {
  background: #d74342;
  mask-image: url(../../public/icons/baseline-date_range-24px.svg);
  -webkit-mask-image: url(../../public/icons/baseline-date_range-24px.svg);
  width: 24px;
  height: 24px;
}

.assignmenticon {
    background: #d74342;
    mask-image: url(../../public/icons/baseline-assignment_turned_in-24px.svg);
    -webkit-mask-image: url(../../public/icons/baseline-assignment_turned_in-24px.svg);
    width: 24px;
    height: 24px;
}
</style>
