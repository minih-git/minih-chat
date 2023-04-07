<template>
    <div id="app" >
        <div id="chat">
            <component v-for="item in chatList" :is="item.type" :content="item.content"
                       :complete="item.complete"></component>
        </div>
        <form id="content" @submit="submit" >
            <input id="content-input" v-model="myReason" :disabled="!complete[reasonId].value "/>
            <button id="submit" type="submit"  >
                <svg t="1680773974991" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="2628" width="200" height="200">
                    <path d="M233.984 489.472l131.072 92.672c13.824 9.728 32.768 8.192 44.544-3.584l188.416-188.416c9.728-9.728 26.112-9.728 35.84 0 9.728 9.728 9.728 26.112 0 35.84L445.44 614.4c-11.776 11.776-13.824 30.72-3.584 44.544l92.672 131.072c32.768 46.592 104.448 35.84 122.368-18.432l158.208-475.136c17.92-54.272-33.792-105.984-88.064-88.064l-474.624 158.72c-54.272 17.92-64.512 89.6-18.432 122.368z"
                          fill="#CCDAFF" p-id="2629"></path>
                </svg>
            </button>
        </form>
    </div>

</template>
<script setup>
import {ref, shallowReactive, shallowRef} from 'vue'
import RobotChat from "@/components/robot-chat.vue";
import MeChat from "@/components/me-chat.vue";

let chatList = shallowReactive([]);

let myReason = ref('')

const chatId = new Date().getTime() + ''
const sse = new EventSource("/api/sse/connect?uuid=" + chatId);
let content = {}
let complete = {0: ref(true)}
let reasonId = 0;
sse.onmessage = event => {
    if (event.data !== '<连接成功>' && event.data !== '<complete>') {
        content[reasonId].value = event.data.replace(/<&br>/g, "\n")
    }
    if (event.data === '<complete>') {
        complete[reasonId].value = true
    }
}

function submit(e) {
    e.preventDefault()
    if (myReason === '' || myReason.value === '') {
        return
    }
    reasonId++;
    let message = typeof myReason === 'object' ? myReason.value : myReason
    myReason = ''
    chatList.push({
        type: MeChat,
        content: message
    })
    content[reasonId] = ref('')
    complete[reasonId] = ref(false)
    chatList.push({
        type: RobotChat,
        complete: complete[reasonId],
        content: content[reasonId]
    })
    let headers = new Headers();
    headers.append('Content-Type', 'application/xxx-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('chat-id', chatId)
    fetch("/api/openai/chat?message=" + message, {
        headers: headers
    });
}
</script>

<style scoped>
#app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)
}

#chat {
    width: calc(100% - 50px);
    height: 80%;
    padding: 25px;
    overflow: hidden;
    overflow-y: auto;
}

#content {
    padding: 25px;
    display: flex;
    flex-direction: row;
}

#content-input {
    width: 100%;
    height: 55px;
    border: none;
    outline: none;
    padding: 12px;
    border-radius: 12px;
    font-size: 16px;
    color: dimgray;
    resize: none;
    flex: 1;
}

#submit {
    cursor: pointer;
    position: relative;
    background-color: transparent;
    border: none;
    outline: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
}

#submit svg {
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 50%;
    margin-left: 25px;
}

#submit :hover {
    background-color: #eee;
}

#submit :hover {
    background-color: #eee;
}

#submit :active {
    box-shadow: 0 0 0 3px #49c7e1;
    opacity: 0.4
}

::-webkit-scrollbar {
    width: 0 !important;
}

::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
}


</style>