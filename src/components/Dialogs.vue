<template lang="html">
  <div class="dialog-box" :class="{'show': show}">
    <div class="dialog-mask" @click="maskClick()"></div>
    <div class="dialog-main">
      <h2 class="dialog-title">{{config.title}}</h2>
      <div class="dialog-content" :style="{'max-height': maxHeight+'px'}">
        {{config.content}}
      </div>
      <div class="dialog-btn">
        <a href="javascript:;" v-if="config.type=='confirm'" @click="cancel()">cancel</a>
        <a href="javascript:;" class="dialog-ok" @click="ok()">ok</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      maxHeight: 100,
      show: false,
      config: {
        title: 'Alert',
        content: 'content',
        type: 'alert',
        callback: () => {}
      }
    }
  },
  mounted () {
    this.maxHeight = window.innerHeight - 120
    let _config = {
      title: 'Alert',
      content: 'content',
      type: 'alert',
      callback: () => {}
    }
    window.alert = (cfg) => {
      return new Promise((resolve, reject) => {
        let callback = (type) => {
          if (type === 'ok') {
            resolve()
          } else {
            reject()
          }
        }
        if (typeof cfg.content === 'string') {
          cfg.type = 'alert'
          cfg.callback = callback
          this.config = Object.assign(_config, cfg)
        } else {
          this.config = Object.assign(_config, {content: cfg, type: 'alert', callback})
        }
        this.show = true
      })
    }
    window.confirm = (cfg) => {
      return new Promise((resolve, reject) => {
        let callback = (type) => {
          if (type === 'ok') {
            resolve()
          } else {
            reject()
          }
        }
        if (typeof cfg.content === 'string') {
          cfg.type = 'confirm'
          cfg.callback = callback
          this.config = Object.assign(_config, cfg)
        } else {
          this.config = Object.assign(_config, {content: cfg, type: 'confirm', callback})
        }
        this.show = true
      })
    }
  },
  methods: {
    maskClick () {
      this.config.callback(this.config.type === 'alert' ? 'ok' : 'cancel')
      this.show = false
    },
    cancel () {
      this.config.callback('cancel')
      this.show = false
    },
    ok () {
      this.config.callback('ok')
      this.show = false
    }
  }
}
</script>

<style>
.dialog{
  position: relative;
  z-index: 10000;
}
.dialog-box.show{
  transform: translateX(0);
}
.dialog-box.show .dialog-main{
  opacity: 1;
  transform: translate(-50%,-50%) scale(1);
}
.dialog-title{
  margin: 0;
  font-size: 16px;
  line-height: 40px;
  white-space: nowrap;
  padding: 0 20px;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid #f1f1f1;
  background-color: #f8f8f8
}
.dialog-content{
  padding: 20px;
  min-height: 80px;
  overflow-x: hidden;
  overflow-y: scroll;
  font-size: 16px;
  color: #777;
  text-align: center;
}
.dialog-main{
  max-width: 400px;
  width: 80%;
  background-color: #fff;
  border-radius: 6px;
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 0;
  transition: transform 200ms;
  transform: translate(-50%,-50%) scale(0);
  box-shadow: 0 2px 5px rgba(0,0,0,.3);
  overflow: hidden;
}
.dialog-ok{
  color: #26a2ff
}
.dialog-btn{
  height: 40px;
  display: -webkit-flex;
  display: flex;
  border-top: 1px solid #f4f4f4;
}
.dialog-btn a{
  flex: 1;
  line-height: 40px;
  text-align: center;
  text-decoration: none;
}
.dialog-btn a:nth-child(2){
  border-left: 1px solid #f4f4f4
}
.dialog-mask{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.5)
}
.dialog-box{
  position: fixed;
  z-index: 10000;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transform: translateX(100%);
}
</style>
