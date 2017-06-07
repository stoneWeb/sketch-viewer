<template>
    <div class="slide-tool">
      <ul v-if="property">
        <li><strong>{{property.name}}</strong></li>
        <li v-if="position"><strong>Postion</strong><span><i>{{position.x}}</i><i>x</i></span><span><i>{{position.y}}</i><i>y</i></span></li>
        <li v-if="size"><strong>Size</strong><span><i>{{size.width}}</i><i>width</i></span><span><i>{{size.height}}</i><i>height</i></span></li>
        <li v-if="transform"></li>
        <li>more data ...<br/> To be continued ...</li>
      </ul>
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex';
    const fNum = num => {
        return !/^\d+\.\d+/.test(num+"") ? num : num.toFixed(2)*1
    }
    export default {
        data() {
            return {
                position: null,
                size: null,
                transform: null,
            }
        },
        watch: {
            property() {
                if (this.property) {
                    const { frame } = this.property
                    this.position = {x: fNum(frame.x), y: fNum(frame.y)}
                    this.size = {width: fNum(frame.width), height: fNum(frame.height)}
                }
            }
        },
        computed: {
            ...mapState([
                'property'
            ]),
        },
        methods: {
            ...mapMutations([

            ]),
        }
    }
</script>

<style scoped>
.slide-tool {
    position: absolute;
    right: 0;
    top: 40px;
    bottom: 0;
    width: 200px;
    z-index: 100;
    border-left: 1px solid #d5d5d5;
    border-top: 1px solid #d5d5d5;
    background-color: #e6e6e6;
    -webkit-user-select: text;
    user-select: text;
}
.slide-tool {
    padding: 10px;
    font-size: 13px;
}
.slide-tool li {
    display: flex;
    align-items: center;
    padding: 5px 0;
}
.slide-tool li strong {
    font-weight: normal;
    min-width: 50px;
}
.slide-tool li span{
    display: flex;
    flex-direction: column;
    width: 60px;
    align-items: center
}
.slide-tool li span i{
    font-style: normal;
    line-height: 16px;
}
</style>