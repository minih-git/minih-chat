import {createApp} from 'vue'
import App from './App.vue'
import './assets/main.css'
import {marked} from "marked";
import hljs from "highlight.js";
import 'highlight.js/styles/atom-one-dark.css'
const render = new marked.Renderer()
marked.setOptions({
    renderer: render, // 这是必填项
    gfm: true,
    pedantic: false,
    sanitize: false,
    highlight: function (code, lang,callback) {
        console.log(hljs.highlightAuto(code).value)
        callback(null, hljs.highlightAuto(code).value)
    }
})
const app = createApp(App)
app.mount('#app')