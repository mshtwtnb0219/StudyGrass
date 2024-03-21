<template>
    <!-- ヒートマップ -->
    <div id="heatmap">
        <calendar-heatmap :values="heatmapData" :end-date="new Date()" :tooltip="true"></calendar-heatmap>
    </div>
</template>

<script setup>
import { CalendarHeatmap } from 'vue3-calendar-heatmap'
import { onMounted ,reactive} from 'vue'
import { db } from '../main.js'
import { collection, getDocs, query } from 'firebase/firestore';

// ヒートマップのデータ
const heatmapData = reactive([]);

//ページが読み込まれたタイミングでfirestoreから値を取得する
onMounted(async () => {

    // //コレクションの参照を取
    const q = query(collection(db, "record"));
    //コレクション内の全てのドキュメントを取得
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

        // 各値をコンソールに出力しておく
        const data = doc.data();

        heatmapData.push({ date: data.addDay, count: data.weight });
        console.log('----ここまで----')
       

    });
});
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