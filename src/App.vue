<template>
    <TimerView :style="{
        zoom: smoothScale
    }" />
    <div class="float">
        <div>
            <button class="btn circle-btn" @click="UpScale">+</button>
            <button class="btn" @click="FullScreen">{{ fullScreen ? "取消全屏" : "全屏" }}</button>
            <button class="btn circle-btn" @click="DownScale">-</button>
        </div>
        {{ scale > 0 ? "所有操作请双击" : "Surprise!" }}
    </div>
    <StartPage />
</template>

<script setup lang="ts">
import { ref } from "vue";
import TimerView from "./TimerView.vue";
import StartPage from "./components/startPage/StartPage.vue";

import { window } from "@tauri-apps/api";
import { useTransition, TransitionPresets } from "@vueuse/core";

let scale = ref(1);

const smoothScale = useTransition(scale, {
    duration: 500,
    transition: TransitionPresets.easeInOutQuad,
});

const UpScale = () => {
    scale.value *= 1.2;
};

const DownScale = () => {
    scale.value /= 1.2;
};

const fullScreen = ref(false);

const FullScreen = () => {
    fullScreen.value = !fullScreen.value;
    window.getCurrent().setFullscreen(fullScreen.value);
};

FullScreen();

</script>

<style scoped>
.btn {
    display: inline-block;
    margin: 5px 5px;

    font-size: 1em;
    line-height: 1em;

    color: #fff;

    padding: 0.5em 0.7em;
    background-color: #212121;
    border: 1px solid #fff4;
    border-radius: 10em;
}

.circle-btn {
    width: 2em;
    height: 2em;
    border-radius: 50%;
    padding: 0;
}
</style>