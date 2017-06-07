<template>
    <div class="header">
        <div class="header-drag">
          <i class="sketch-icon"></i> {{file.name}}
          <a href="javascript:;" title="clear file" @click="DEL_FILE()"><i class="iconfont icon-qingchu"></i></a>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  mounted () {
      
  },
  computed: {
    ...mapState([
        'file'
    ]),
  },
  methods: {
    ...mapMutations([
        'DEL_FILE'
    ])
  }
}
</script>

<style scoped>
.header {
  height: 40px;
  font-size: 16px;
  color: #666;
  position: absolute;
  background: -webkit-gradient(linear, 0 0,0 bottom, from(#f5f5f5), to(#e6e6e6));  
  border-bottom: 1px solid #ddd;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.header-drag{
  line-height: 40px;
  position: absolute;
  left: 60px;
  right: 60px;
  top: 0;
  bottom: 0;
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
  -webkit-app-region: drag;
}
.header a{
  position: absolute;
  color: #666;
  text-decoration: none;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  top: 0;
  right: -45px;
  -webkit-app-region: no-drag;
}
.header a:hover{
  background-color: #f5f5f5
}
.sketch-icon{
    width: 18px;
    height: 18px;
    background: url(../assets/app-icon.png) no-repeat;
    background-size: cover;
    display: inline-block;
    margin-right: 5px;
}
</style>
