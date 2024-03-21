<template>
    <!-- ヒートマップ -->
    <div id="cal-heatmap"></div>

</template>

<script setup>
//import { CalendarHeatmap } from 'vue3-calendar-heatmap'
import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css';
import { onMounted } from 'vue'
import { db } from '../main.js'
import { collection, getDocs, query } from 'firebase/firestore';

// ヒートマップのデータ
const heatmapData = [];

//ページが読み込まれたタイミングでfirestoreから値を取得する
onMounted(async () => {

    // //コレクションの参照を取
    const q = query(collection(db, "record"));
    //コレクション内の全てのドキュメントを取得
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

        // 各値をコンソールに出力しておく
        const data = doc.data();
        console.log(data.addDay);

        heatmapData.push({ date: data.addDay, count: data.weight });

        console.log('----ここまで----')
    });
    // cal-heatmapの生成
    const cal = new CalHeatmap();
    cal.paint(
        {
            itemSelector: document.getElementById('cal-heatmap'),
            domain: {
                type: 'month',
                gutter: 5,
                label: {
                    text: 'MMM',
                    textAlign: 'start',
                    position: 'top'
                }
            },
            subDomain: {
                type: 'ghDay',
                gutter: 5,
                width: 17,
                height: 17,
                radius: 3,
                label: null
            },
            date: {
                start: new Date('2024-01-01')
            },
            data: {
                source: heatmapData,
                x: 'date',
                y: 'count'
            },
            scale: {
                color: {
                    type: 'threshold',
                    range: ['#F0FFF0', '#C1FFC1', '#9AFF9A', '#7CCD7C', '#4EEE94', '#32CD32', '#228B22'],
                    domain: [0,1,2,3,4,5,6]
                }
            }
            
        }
    );


});
</script>
<style>
#cal-heatmap {
    /* 文字サイズ */
    font-size: 10px;
    /* heatmapサイズ */
    transform: scale(0.7);
    /* 中央に基準を縮小 */
    transform-origin: center;
}
</style>