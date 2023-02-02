<template>
  <div id="outline" >
    <canvas id='threeCanvas' class='threeRender'></canvas>
  </div>
</template>

<script>
import Root from './src/root.js'

export default {
  name: 'ThreeJs',

  async mounted() {
    new Root(this.$store)
  }
}
</script>

<style scoped>
.threeRender {
}

#outline {
  z-index: -1000000;
  position: absolute;
  top: 0;
  right: 0;
  background: #010305;
  width: 75%;
  height: 100%;
  pointer-events: all;
  overflow: hidden;
}
</style>

<style>
.lil-gui.root {
  opacity: 0.2;
  transition: opacity 250ms;
}
.lil-gui {
  background-color: rgba(31, 31, 31, 0.4);
}

.lil-gui.root:hover {
  opacity: 1;
  transition: opacity 250ms;
}


</style>
