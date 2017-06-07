<template>
    <div class="receive-file" :class='{"into": dropState=="over"}'>
        <div class="f-head"></div>
        <div class="receive-area" drag-over="handleDragOver" @dragenter="dragover" @drop="drop">
            <div class="receive-info">
                <span class="receive-title">
                    <i class="iconfont icon-sketch"></i>
                    Add Sketch 43 file
                </span>
            </div>
            <input type="file" @change="onFileChange">
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
        'dropState'
    ]),
  },
  methods: {
    ...mapMutations([
        'DROP_OVER', 'DROP_END'
    ]),
    onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        let file = files[0]
        this.$emit('change', file)
    },
    dragover(e) {
        this.DROP_OVER();
        e.stopPropagation();
    },
    drop(e) {
        this.DROP_END();
        e.stopPropagation();
    }
  }
}
</script>

<style scoped>
.electron .f-head{
    display: block
}
.electron .receive-area input {
    top: 40px;
}
.f-head{
    -webkit-app-region: drag;
    height: 40px;
    position: absolute;
    top: 0;
    right: 0;
    left: 60px;
    display: none;
    background-color: rgba(255,255,255,0)
}
.receive-file{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: #f5f5f5
}
.receive-file.into{
    box-shadow: 0 0 35px rgba(0,0,0,.5) inset;
}
.receive-area{
    width: 100%;
    height: 100%;
}
.receive-area input{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    cursor: pointer;
    opacity: 0;
    width: 100%;
    height: 100%;
}
.receive-info {
    width: 400px;
    height: 250px;
    border: 1px dashed #666;
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 0 30px rgba(0,0,0,.2);
    transform: translate(-50%, -50%);
}
.receive-title {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.receive-title i {
    font-size: 60px;
    height: 50px;
    color: #bbb
}
</style>
