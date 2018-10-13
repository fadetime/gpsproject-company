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
                        <div class="md-bottom-bar-icon baseline-room"></div>
                        <div class="card-item-body-right">
                            <span v-if="$store.state.username">{{$store.state.useraddress}}</span>
                            <span v-else>您未登陆</span>
                        </div>
                    </div>
                </div>

                <div class="card-item">
                    <div class="card-item-title">
                        <span>phone</span>
                    </div>
                    <div class="card-item-body">
                        <div class="md-bottom-bar-icon baseline-phone"></div>
                        <div class="card-item-body-right">
                            <span v-if="$store.state.username">{{$store.state.userphone}}</span>
                            <span v-else>您未登陆</span>
                        </div>
                    </div>
                </div>

                <div class="card-item">
                    <div class="card-item-title">
                        <span>postcode</span>
                    </div>
                    <div class="card-item-body">
                        <div class="md-bottom-bar-icon markunread_mailbox"></div>
                        <div class="card-item-body-right">
                            <span v-if="$store.state.username">{{$store.state.userpostcode}}</span>
                            <span v-else>您未登陆</span>
                        </div>
                    </div>
                </div>

                <div class="card-item">
                    <div class="card-item-title">
                        <span>email</span>
                    </div>
                    <div class="card-item-body">
                        <div class="md-bottom-bar-icon baseline-email"></div>
                        <div class="card-item-body-right">
                            <span v-if="$store.state.username">{{$store.state.useremail}}</span>
                            <span v-else>您未登陆</span>
                        </div>
                    </div>
                </div>

            </md-card>
        </div>

        <div class="bottom">
            <div>
                <md-button class="md-raised " style="width:80%;background-color: #d74342;" @click="buttonMethod('psw')">
                    <span style="color:#fff">修改密码</span>
                </md-button>
            </div>
            <div>
                <md-button class="md-raised " style="width:80%;background-color: yellow;" @click="buttonMethod('logout')">
                    <span>退出登录</span>
                </md-button>
            </div>

        </div>
        <!-- 遮罩层 -->
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
            <div v-if="showDialog" class="dialog" @click.self="showDialog = false">
                <div class="dialog-body">
                    <div style="width:100%;background-color:#d74342;box-shadow: 1px 1px 5px;">
                        <span v-if="isChangePSW" style="font-size:18px;color:#fff;line-height: 32px;">修改密码</span>
                        <span v-else style="font-size:18px;color:#fff;line-height: 32px;">退出登录</span>
                    </div>
                    <div class="dialog-body-center">

                        <div v-if="isChangePSW" style="width:250px;margin:10px auto;box-shadow:1px 1px 5px">
                            <div class="dialog-body-center-item" style="border-bottom: 1px solid #eee;">
                                <div class="dialog-body-center-item-left">
                                    <label for="oldpsw">原始密码</label>
                                </div>
                                <div class="dialog-body-center-item-right">
                                    <input type="password" id="oldpsw" placeholder="请输入原始密码" v-model="oldpassword">
                                </div>
                            </div>
                            <div class="dialog-body-center-item" style="border-bottom: 1px solid #eee;">
                                <div class="dialog-body-center-item-left">
                                    <label for="newpsw">新密码</label>
                                </div>
                                <div class="dialog-body-center-item-right">
                                    <input type="password" id="newpsw" placeholder="请输入新密码" v-model="newpassword">
                                </div>
                            </div>
                            <div class="dialog-body-center-item">
                                <div class="dialog-body-center-item-left">
                                    <label for="confirmpsw">密码确认</label>
                                </div>
                                <div class="dialog-body-center-item-right">
                                    <input id="confirmpsw" type="password" placeholder="请确认密码" v-model="conpassword">
                                </div>
                            </div>
                        </div>

                        <div v-else style="width:250px;margin:10px auto;box-shadow:1px 1px 5px;height:152px;line-height:142px">
                            <span>是否确认退出？</span>
                        </div>

                    </div>
                    <div class="dialog-body-bottom">
                        <md-button class="md-raised" @click="showDialog = false">取消</md-button>
                        <md-button class="md-raised md-primary" @click="confirmChange">确认</md-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 遮罩层 -->
        <!-- 操作提示 -->
        <transition name="custom-classes-transition" enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutUp">
            <div class="errinfo" v-if="showError">
                <span>{{errorInfo}}</span>
            </div>
        </transition>
        <!-- 操作提示 -->
    </div>
</template>

<script>
import axios from "axios"
import config from "../assets/js/addConfig.js";

export default {
  data() {
    return {
      showDialog: false,
      isChangePSW: false,
      oldpassword: '',
      newpassword: '',
      conpassword: '',
      showError:false,
      errorInfo: '',
      _id:''
    }
  },
  methods: {
    buttonMethod(item) {
      this.showDialog = true
      if (item === 'psw') {
        this.isChangePSW = true
      } else {
        this.isChangePSW = false
      }
    },
    confirmChange() {
      if (this.isChangePSW) {
        this.confirmChangePSW()
      } else {
        localStorage.clear()
        let item = null
        this.$store.dispatch('newtoken', item)
        this.$router.push('/login')
      }
    },
    confirmChangePSW() {
      if (!this.oldpassword) {
        this.errorInfo = '请填写原始密码'
        this.showError = true
      } else if (!this.newpassword) {
        this.errorInfo = '请填写新密码'
        this.showError = true
      } else if (!this.conpassword) {
        this.errorInfo = '请确认新密码'
        this.showError = true
      } else if (this.newpassword != this.conpassword) {
        this.errorInfo = '两次输入密码不一致'
        this.showError = true
      } else {
        this._id = localStorage.getItem('_id')
        axios
          .post(config.serveradd + '/client-company/change', {
            oldpassword: this.oldpassword,
            newpassword: this.newpassword,
            conpassword: this.conpassword,
            _id: this._id
          })
          .then(doc => {
            this.oldpassword = ''
            this.errorInfo = doc.data.msg
            this.showError = true
            if (doc.data.code === 0) {
              this.showDialog = false
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
      setTimeout(() => {
        this.showError = false
      }, 2000)
    }
  }
}
</script>

<style scoped>
.card-title {
  font-size: 20px;
  height: 40px;
  line-height: 40px;
  background-color: #f7f7f7;
  box-shadow: 0px 1px 2px 0px;
  text-align: left;
  padding-left: 20px;
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
  font-size: 20px;
}

.card-item-title span {
  color: #989898;
}

.card-item-body {
  text-align: left;
  padding-left: 30px;
  display: flex;
  display: -webkit-flex;
}

.card-item-body span {
  font-size: 18px;
}

.card-item-body-right {
  margin-left: 10px;
  width: 208px;
}

.baseline-room {
  background: #d74342;
  mask-image: url(../../public/icons/baseline-room-24px.svg);
  -webkit-mask-image: url(../../public/icons/baseline-room-24px.svg);
  width: 24px;
  height: 24px;
}

.baseline-phone {
  background: #d74342;
  mask-image: url(../../public/icons/baseline-phone-24px.svg);
  -webkit-mask-image: url(../../public/icons/baseline-phone-24px.svg);
  width: 24px;
  height: 24px;
}

.markunread_mailbox {
  background: #d74342;
  mask-image: url(../../public/icons/baseline-markunread_mailbox-24px.svg);
  -webkit-mask-image: url(../../public/icons/baseline-markunread_mailbox-24px.svg);
  width: 24px;
  height: 24px;
}

.baseline-email {
  background: #d74342;
  mask-image: url(../../public/icons/baseline-email-24px.svg);
  -webkit-mask-image: url(../../public/icons/baseline-email-24px.svg);
  width: 24px;
  height: 24px;
}

.dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 14;
  display: flex;
  align-items: center;
}

.dialog-body {
  background-color: #fff;
  width: 300px;
  height: 260px;
  margin: 0 auto;
}

.dialog-body-center-item {
  display: flex;
  display: -webkit-flex;
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  padding: 10px 5px;
}

.dialog-body-center-item-left {
  flex-basis: 30%;
  text-align: left;
  font-size: 16px;
  line-height: 32px;
}

.dialog-body-center-item-right {
  flex-basis: 70%;
}

.dialog-body-center-item-right input {
  width: 150px;
  border: none;
  height: 32px;
}

.errinfo {
    position: fixed;
    z-index: 19;
    top: 8px;
    background-color: rgba(255, 255, 0, 0.7);
    width: 100%;
}

.errinfo span {
    font-size: 16px;
    line-height: 32px;
    font-weight: 600
}
</style>
