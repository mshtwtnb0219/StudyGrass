<template>
    <div class="grass">
        <GrassComponent></GrassComponent>
    </div>
    <div class="history">
        <HistoryComponent></HistoryComponent>
    </div>
    <div class="record">
        <RecordComponent></RecordComponent>
    </div>
</template>

<script setup>
import HistoryComponent from './HistoryComponent.vue';
import RecordComponent from './RecordComponent.vue';
import GrassComponent from './GrassComponent.vue';

</script>
<style scoped>
.grass {
    padding-left: 250px
}
</style>