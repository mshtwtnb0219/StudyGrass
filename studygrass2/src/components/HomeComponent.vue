<template>
    <div class="record">
        <RecordComponent></RecordComponent>
    </div>
    <div class="grass">
        <GrassComponent></GrassComponent>
    </div>
    <div class="history">
        <HistoryComponent></HistoryComponent>
    </div>

        

</template>

<script setup>
import HistoryComponent from './HistoryComponent.vue';
import RecordComponent from './RecordComponent.vue';
import GrassComponent from './GrassComponent.vue';




</script>

<style scoped>
.record {
    border: 1px solid #000; /* 枠線を追加 */
  width: 700px; /* 適切な幅を指定 */
  padding: 20px; /* 枠と内容の間の余白を追加 */
  text-align: center; /* 内容を中央揃えにする */
  margin: 0 auto; /* 左右を自動的に中央揃えにする */

}
</style>