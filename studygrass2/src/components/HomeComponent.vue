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


.container {
    display: flex; /* Flexboxを使用して要素を横並びに配置 */
    justify-content: center; /* 横方向の中央揃え */
}

/* 各コンポーネントのスタイル */
.grass, .history, .record {
    flex: 1; /* 自動幅調整 */
    padding: 0 10px; /* 必要に応じて余白を追加 */
}
</style>