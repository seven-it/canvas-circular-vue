<template>
  <canvas :id="canvasID" :width="width" :height="height"></canvas>
</template>

<script>
export default {
  name: 'canvas-circular',
  props: {
    width: {
      // canvas 画布宽度
      type: String,
      default: "190"
    },
    height: {
      // canvas 画布高度
      type: String,
      default: "190"
    },
    r: {
      // canvas 圆半径
      type: String,
      default: '90'
    },
    lineWidth: {
      // canvas 线条宽度
      type: String,
      default: "8"
    },
    arcBg: {
      // 背景色
      type: String,
      default: "#969696"
    },
    arcFg: {
      // 前景色
      type: String,
      default: "#3eaf7c"
    },
    font: {
      // 字体样式
      type: String,
      default: "16px sans-serif"
    },
    fontX: {
      // 字体位置 X
      type: String,
      default: "95"
    },
    fontY: {
      // 字体位置 Y
      type: String,
      default: "95"
    },
    fillStyle: {
      // 字体颜色
      type: String,
      default: "#000"
    },
    openLineDash: {
      // 开启分隔线 默认false 不开启
      type: Boolean,
      default: false
    },
    lineDashWidth: {
      // 分割线的宽度
      type: Number,
      default: 2
    },
    lineDashStyle: {
      // 分割线的颜色
      type: String,
      default: "#fff"
    },
    angle: {
      // 圆心角度 默认36 = 360/10 也就是将圆分为10份，包括用来计算没一份的弧长
      type: Number,
      default: 36
    },
    tatol: [String, Number], // 总进度
    count: [String, Number], // 当前进度
    text: {
      // 文字文本
      type: String,
      default: ""
    },
    canvasID: String // canvas的id值
  },
  data() {
    return {
      startAngle: Math.PI * 1.5, // 画圆的起始位置
      endAngle: Math.PI * 2
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.canvasElement = document.getElementById(this.canvasID);
      this.context = this.canvasElement.getContext("2d");
      this.drawCirBd();
    });
  },
  computed: {
    // 通过角度计算每个扇形的弧长
    arcLength() {
      return this.endAngle * this.r * (this.angle / 360);
    }
  },
  watch: {
    // 监听进度值 ，触发canvas重绘
    count: function() {
      this.$nextTick(() => {
        this.drawCirBd();
      });
    }
  },
  methods: {
    // 绘制canvas
    drawCirBd() {
      const context = this.context,
        startAngle = this.startAngle,
        endAngle = this.endAngle;

      let x = this.width / 2,
        y = this.height / 2,
        arcLength = this.arcLength;

      // 每次绘制先清除画布
      context.clearRect(0, 0, this.width, this.height);

      // 是否开启分割线
      if (this.openLineDash) {
        context.setLineDash([
          arcLength - this.lineDashWidth,
          this.lineDashWidth
        ]); // 等分
      }

      // 绘制环形背景色
      context.beginPath();
      context.arc(x, y, this.r, startAngle, startAngle + endAngle, false);
      context.strokeStyle = this.arcBg;
      context.lineWidth = this.lineWidth;
      context.stroke();

      // 计算当前进度的弧度值
      let diffAngle = (this.count / this.tatol) * endAngle;

      // 绘制上层环形背景
      context.beginPath();
      context.arc(x, y, this.r, startAngle, diffAngle + startAngle, false);
      context.strokeStyle = this.arcFg;
      context.lineWidth = this.lineWidth;
      context.stroke();

      this.drawText();
    },

    // 绘制文本
    drawText() {
      const context = this.context;

      // 绘制字体
      context.fillStyle = this.fillStyle;
      context.textAlign = "center";
      context.font = this.font;
      context.fillText(this.text, this.fontX, this.fontY);
    }
  }
};
</script>

<style></style>
