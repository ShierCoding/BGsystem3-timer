<template>
    <div class="btn"><slot></slot></div>
</template>

<style scoped>
.btn {
    display: inline-block;
    padding: 0.3em 0.7em;
    background-color: #212121;
    border: 1px solid #fff4;
    border-radius: .5em;
    cursor: pointer;
    transition: .5s;

    font-size: 1.2em;
}

.btn:active {
    background-color: #0001;
}
</style>