<template>
    <div class="canvas">
        <div class="view-wrap" style="text-align: center" v-if="sketchData.type != 'sketch'">
            <img :src="sketchData.uri" alt="">
        </div>
        <div class="view-wrap sketch-wrap" v-if="sketchData.type == 'sketch'">
            <div
                @mouseover="hover" @mouseleave="out" @click="click"
                v-bind:style='{ position: "relative",
                    backgroundImage: "url(" + sketchData.uri + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundSize: "" + sketchData.canvasWidth + "px " + sketchData.canvasHeight + "px", width: "" + sketchData.canvasWidth + "px", height: "" + sketchData.canvasHeight + "px"}'>

                <div v-for="(l, index) in sketchData.layerData" v-bind:style='{ color: "white",
                    position: "absolute",
                    left: "" + (l.frame.x * sketchData.scale) + "px",
                    top: "" + (l.frame.y * sketchData.scale) + "px",
                    width: "" + l.frame.width * sketchData.scale + "px",
                    height: "" + (l.frame.height * sketchData.scale) + "px" ,
                    boxSizing: "border-box"}'>
                    <span class="layer-title">{{l.name}}</span>
                    <layer v-for="child in l.layers" v-bind:key="child.do_objectID" :layer="child" :scale="sketchData.scale"></layer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import layer from './layer'
export default {
  data() {
    return {
        map: {},
        currDom: null,
        selectDom: null
    }
  },
  mounted () {
    if (this.sketchData.type != 'sketch') {
        return
    }
    const toMap = (layer) => {
        layer.forEach(item => {
            this.map[item.do_objectID] = item;
            if (item.layers) {
                toMap(item.layers)
            }
        })
    }
    toMap(this.sketchData.layerData);
  },
  computed: {
    ...mapState([
        'sketchData'
    ]),
  },
  methods: {
    ...mapMutations([
        'UPDATE_PROPERTY'
    ]),
    hover(e) {
        const { target } = e;
        if (target.classList.contains('layer') && this.currDom != target) {
            const ID = target.dataset['id'];
            if (ID && this.map[ID]) {
                this.UPDATE_PROPERTY(this.map[ID])
                console.log(this.map[ID])
            }
            if (this.currDom && this.currDom != this.selectDom) {
                this.currDom.classList.remove('active')
            }
            target.classList.add('active')
            this.currDom = target
        }
    },
    out(e) {
        if (this.currDom) {
            this.currDom.classList.remove('active')
        }
        if (this.selectDom) {
            this.currDom = this.selectDom;
            const ID = this.currDom.dataset['id'];
            if (ID && this.map[ID]) {
                this.UPDATE_PROPERTY(this.map[ID])
            }
        } else { 
            this.currDom = null
            this.UPDATE_PROPERTY(null)
        }
    },
    click(e) {
        if (this.selectDom) {
            this.selectDom.classList.remove('active')
            if (this.selectDom != this.currDom) {
                this.selectDom = this.currDom
            }else{
                this.selectDom = null
            }
        }else{
            this.selectDom = this.currDom;
        }
    }
  },
  components: {
      layer
  }
}
</script>

<style scoped>
.canvas{
  position: absolute;
  right: 0;
  top: 40px;
  bottom: 0;
  left: 0;
  background-color: #fff;
}
.view-wrap{
  position: absolute;
  top: 0;
  bottom: 10px;
  left: 10px;
  right: 0;
  padding-top: 30px;
  overflow: scroll;
}
.view-wrap.sketch-wrap{
  right: 210px;
}
.layer-title{
  color: #999;
  position: absolute;
  left: 0;
  top: -25px;
  font-size: 13px;
  font-weight: lighter;
  white-space: nowrap;
}
</style>
