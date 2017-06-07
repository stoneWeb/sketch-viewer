<template>
  <div id="app">
    <top-bar v-if="file"/>
    <side-bar v-if="sketchData && sketchData.type == 'sketch'"/>
    <receive-file v-on:change="changeFile" v-if="!file"/>
    <dialogs/>
    <sketch-canvas v-if="sketchData"/>
    <div class="spinner-wrap" v-show="file && !sketchData"><Spinner :md-size="20"/></div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import TopBar from './components/TopBar'
import SideBar from './components/SideBar'
import SketchCanvas from './components/Canvas'
import ReceiveFile from './components/ReceiveFile'
import util from './util'
import JSZip from 'jszip'
export default {
  name: 'app',
  components: {
    TopBar,
    SideBar,
    ReceiveFile,
    SketchCanvas
  },
  computed: {
    ...mapState([
        'file', 'sketchData'
    ]),
  },
  watch: {
    /*file() {
      console.log(this.file)
    }*/
  },
  mounted() {
    this.INIT_STATE()
  },
  methods: {
    ...mapMutations([
        'INIT_STATE', 'ADD_FILE', 'DEL_FILE', 'FILE_INFO'
    ]),
    changeFile(file) {
      if (!/^(png|jpeg|jpg|sketch)$/.test(file.name.split('.').pop())) {
        alert('only support .png .jpg .sketch')
        return
      }
      this.ADD_FILE(file)
      const ext = RegExp.$1
      const reader = new FileReader()
      const sketchData = { type: ext }
      reader.onload = (e) => {
        var data = e.target.result
        if (ext !== 'sketch') {
          sketchData.uri = data
          this.FILE_INFO(sketchData)
          return
        }
        let zip
        JSZip.loadAsync(data).then(function (z) {
          zip = z
          let previewEntry = zip.files['previews/preview.png']
          return previewEntry.async('base64')
        }).then(base64 => {
          let info = zip.files['document.json']
          return Promise.all([
            util.getImageData('data:image/png;base64,' + base64),
            info.async('string')
          ])
        }).then(([preview, content]) => {
          sketchData.canvasWidth = preview.width
          sketchData.canvasHeight = preview.height
          sketchData.uri = preview.uri
          
          let info = JSON.parse(content)
          let { currentPageIndex, pages } = info
          let path = pages[currentPageIndex]._ref
          return zip.files[path + '.json'].async('string')
        }).then(content => {
          var page = JSON.parse(content)
          let origin = util.getLayerInfo(page.layers)
          sketchData.layerData = origin[2]
          sketchData.scale = sketchData.canvasWidth / origin[0]
          this.FILE_INFO(sketchData)
        }).catch(e => {
          console.log(e)
          this.DEL_FILE()
          alert('Could not load page')
        })
      }
      reader[ext !== 'sketch' ? 'readAsDataURL' : 'readAsArrayBuffer'](file)
    }
  }
}
</script>

<style>
.spinner-wrap{
  position: absolute;
  left: 0;
  top: 50px;
  right: 0;
  bottom: 0;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
