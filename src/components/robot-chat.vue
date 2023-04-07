<template>
    <div class="robot-chat chat">
        <div class="avatar">
            <img src="../assets/robot.gif" alt="">
        </div>
        <div class="content">
            <div v-html="data" class="markdown-body">
            </div>
        </div>

    </div>

</template>

<script setup>
import {shallowRef, watch} from 'vue'
import {marked} from "marked";

const props = defineProps(['content', 'complete'])
let dataArr = [];
let data = shallowRef("")
let count = 0
watch(() => props.content.value, (val) => {
    dataArr = dataArr.concat(val.split(''))
    count = dataArr.length
})
let it = setInterval(() => {
    if (count > 0) {
        data.value += dataArr.shift()
        count--
    }
    if (props.complete.value && count === 0) {
        marked(data.value, (err, out) => {
            console.log(out)
            data.value = out.replace(/<pre>/g, "<pre class='hljs'>")
        })
        clearInterval(it)
    }
}, 50)


</script>

<style scoped>

.robot-chat .content {
    margin-left: 20px;
    margin-right: auto;
}


</style>