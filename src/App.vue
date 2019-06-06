<template>
  <div id="app">
    <div>普通圆环</div>
    <canvas-circular canvasID="dome1" :count="count" :tatol="10" ></canvas-circular>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div>分割圆环</div>
    <canvas-circular canvasID="dome2" :openLineDash="true" :count="count" :tatol="10" ></canvas-circular>

    <br>
    <br>
    <br>
    <br>
    <br>

    <div>带文字圆环</div>
    <canvas-circular canvasID="dome3" font="40px Arial" :text="count*10+'%'" fontY="110" :openLineDash="true" :count="count" :tatol="10" ></canvas-circular>

  </div>
</template>

<script>
import { setInterval } from 'timers';

export default {
  name: 'app',
  data() {
    return {
      count: 0,
    }
  },
  created() {
    this.drowCanvas()
  },
  methods: {
    drowCanvas() {
      let i = 0;
      setInterval(() => {
        i+=1
        if (this.count>=6){
          this.count = 6
          return ;
        }
        this.count+=i
      },100)
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 20px;
  font-weight: bold;
}
div{
  margin-bottom: 10px;
}
</style>
