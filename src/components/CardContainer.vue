<template>
    <div class="main" :style="{
        width: parentWidth + 'px',
        height: `calc(${parentHeight}px + 2.4em )`,
    }" ref="containerParent">
        <div ref="containerChild" style="width: max-content; margin: auto; height: max-content;">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTransition, TransitionPresets } from "@vueuse/core";
import { onMounted, ref } from "vue";

const props = withDefaults(defineProps<{
    padding?: string,
    borderRadius?: string,
    blur?: string,
}>(), {
    padding: "1em",
    blur: "var(--backdrop-filter-blur)",
    borderRadius: "1.5em",
});

const containerParent = ref();
const containerChild = ref();

const childWidth = ref(500);
const childHeight = ref(100);
const parentWidth = useTransition(childWidth, {
    duration: 1000,
    transition: TransitionPresets.easeInOutQuad,
});
const parentHeight = useTransition(childHeight, {
    duration: 1000,
    transition: TransitionPresets.easeInOutQuad,
});

// 监听containerChild宽度发生变化
const observer = new ResizeObserver(() => {
    childWidth.value = containerChild.value.clientWidth;
    childHeight.value = containerChild.value.clientHeight;
});

onMounted(() => {
    observer.observe(containerChild.value);
    childWidth.value = containerChild.value.clientWidth;
    childHeight.value = containerChild.value.clientHeight;
});

defineExpose({
    main: containerParent,
});
</script>

<style scoped>
.main {
    /* position: absolute; */

    transition: background-color 0.7s, color 0.7s;

    text-align: center;

    border: 1px solid #fff2;
    border-radius: v-bind("props.borderRadius");

    padding: v-bind("props.padding");

    box-shadow: 0 0 3em #0006;

    background-color: #0005;

    width: max-content;
}

.main:active {
    background-color: #0003;
}
</style>