<template>
    <div class="me-chat chat">
        <div class="content">
            {{ props.content }}
        </div>
        <div class="avatar">
            <img src="../assets/me.png" alt="">
        </div>
    </div>

</template>

<script setup>
import {ref} from 'vue'
const props = defineProps(['content'])




</script>

<style scoped>

.me-chat .content {
    margin-left: auto;
    margin-right: 20px;
}


</style>