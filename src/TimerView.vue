<template>
    <div>
        <div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);" class="container">
            <CardContainer @dblclick="timeOnly ? (showSecond = !showSecond) : null" ref="container" :style="{
                zoom: props.zoom
            }">
                <div style="margin: 1.2em 3em; width: max-content;">
                    <div class="timer" v-show="!timeOnly">{{ format(((+dueTime) - timer) % (24 * 60 * 60 * 1000)) }}</div>

                    <div v-show="more && !timeOnly">
                        <span style="font-size: 1.5em;">{{ new Time(currentTime).format("yyyy.MM.dd") }}</span>&nbsp;
                        <span style="font-size: 2em;">{{ new Time(currentTime).format("HH:mm:ss") }}</span>
                    </div>

                    <div v-show="timeOnly" class="time">
                        {{ new Time(currentTime).format(showSecond ? "HH:mm" : "HH:mm:ss") }}
                    </div>
                </div>
            </CardContainer>

            <div style="margin: 1em;"></div>

            <div style="display: flex; gap: .8em; justify-content: center; align-content: center;" class="shadow">

                <TimerSelector v-show="!timeOnly" ref="selectorRef" class="timer-selector" />

                <TimerButton v-show="!timeOnly" @dblclick="more = !more">{{ more ? "更少" : "更多" }}</TimerButton>

                <TimerButton v-show="more" @dblclick="timeOnly = !timeOnly">{{ timeOnly ? "显示更多" : "仅显示时间" }}</TimerButton>
            </div>

            <div style="margin: 1em;"></div>

        </div>
    </div>
</template>

<script setup lang="ts">
import CardContainer from "./components/CardContainer.vue";
import TimerButton from "./components/TimerButton.vue";
import TimerSelector from "./components/TimerSelector.vue";
import { onMounted, ref, watch } from "vue";


import { Time } from "./utils";


const format = (ms: number) => {
    ms += 1000;

    if (ms < 0) return "时间到";

    let s = Math.floor(ms / 1000);
    let m = Math.floor((s / 60) % 60);
    let h = Math.floor(s / 60 / 60);
    s %= 60;

    if (h > 0) return `${h}时 ${m}分 ${s}秒`;
    if (m > 0) return `${m}分 ${s}秒`;
    return `${s}秒`;
};

const more = ref(false);
const timeOnly = ref(false);
const showSecond = ref(false);


const timer = ref(0);

// 截至时间
const dueTime = ref(new Date());

const selectorRef = ref();

const currentTime = ref(new Date());

const setTime = () => {
    dueTime.value.setHours(selectorRef.value.time.hours);
    dueTime.value.setMinutes(selectorRef.value.time.minutes);
    dueTime.value.setSeconds(selectorRef.value.time.seconds);
    console.log(dueTime.value);
};

onMounted(() => {
    console.log(selectorRef.value.time);

    setTime();

    watch(() => selectorRef.value.time, () => {
        setTime();
        timer.value = +Date.now();
    });

    timer.value = +Date.now();
    setInterval(() => {
        timer.value = +Date.now();
        currentTime.value = new Date();
    }, 1000);
});

const shadow = ref("#0007");

const container = ref();

const props = withDefaults(defineProps<{
    zoom?: number
}>(), {
    zoom: 1
});
</script>

<style scoped>
.timer {
    font-size: 4em;
    font-weight: bold;
    word-spacing: -15px;
    width: max-content;
    margin: auto;
}

.container {
    text-shadow: 0 0 .2em v-bind("shadow");

    text-align: center;
}

.time {
    font-size: 8em;
    font-weight: bold;
    text-shadow: 0 0 .2em v-bind("shadow");
}
</style>