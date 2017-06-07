<template id="layer">

  <div class="layer" v-bind:style='styles'
    :data-name="layer.name"
    :data-id="layer.do_objectID">

    <layer v-if="layer.isVisible" v-for="child in layer.layers" v-bind:key="layer.do_objectID" :layer="child" :scale="scale"></layer>

  </div>

</template>
<script>
export default {
  name: 'layer',
  props: ['layer', 'scale'],
  data() {
    return {
        styles: {}
    }
  },
  mounted() {
    this.styles = {
        'position': 'absolute',
        'left': this.layer.frame.x * this.scale + "px",
        'top': this.layer.frame.y * this.scale + "px",
        'width': this.layer.frame.width * this.scale + "px",
        'height': this.layer.frame.height * this.scale + "px" ,
        'visibility': this.layer.isVisible ? "visibile" : "hidden"
    }
  }
}
</script>
<style>
  .layer.active{
    outline: 2px solid #4cc1fc;
  }
</style>
