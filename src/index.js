import Vue from "vue"
import canvasCircular from './components/canvasCircular.vue';

canvasCircular.install = Vue => Vue.component(canvasCircular.name, canvasCircular);
Vue.use(canvasCircular);

export default canvasCircular;