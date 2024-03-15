<template>

    <div id="heatmap">
        <calendar-heatmap  
        :values="[
            { date: '2024-1-1', count: 0 },
            { date: '2024-1-2', count: 1 },
            { date: '2024-1-3', count: 2 },
            { date: '2024-1-4', count: 3 },
            { date: '2024-1-5', count: 4 },
            { date: '2024-1-6', count: 5 },
            { date: '2024-1-7', count: 6 },
        ]" :end-date="Date()"></calendar-heatmap>

    </div>


</template>

<script setup>
import { CalendarHeatmap } from 'vue3-calendar-heatmap'


</script>

<style>
#heatmap {
    /* 文字サイズ */
    font-size: 10px;
    /* heatmapサイズ */
    transform: scale(0.7);
    /* 中央に基準を縮小 */
    transform-origin: center; 
}
</style>