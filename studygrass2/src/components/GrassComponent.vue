<template>
    <!-- ヒートマップとドーナツグラフを包む親要素 -->
    <h1>学習カレンダー</h1>
    <div class="chart-container">

        <!-- ヒートマップ -->
        <div id="cal-heatmap"></div>
        <!-- ドーナツグラフ -->
        <div>
            <canvas id="chartCanvas" width="500" height="300"></canvas>
        </div>
    </div>
</template>

<script setup>
import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css';
import { onMounted, ref, nextTick } from 'vue'
import { db } from '../main.js'
import { collection, getDocs, query } from 'firebase/firestore';
import Chart from 'chart.js/auto';

// ヒートマップのデータ
const heatmapData = [];

// ドーナツグラフのデータ
const dountGrapData = [];
// 各科目ごとにstudyTimeを合算するためのオブジェクト
const sumByItem = {};
// データをリアクティブな変数として宣言
const dountGrapDataItems = ref([]);

//ページが読み込まれたタイミングでfirestoreから値を取得する
onMounted(async () => {

    await nextTick(); // DOMが更新されるのを待つ

    // コレクションの参照
    const q = query(collection(db, "record"));
    //コレクション内の全てのドキュメントを取得
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

        // 各値をコンソールに出力しておく
        const data = doc.data();
        // ヒートマップ表示データをpush
        heatmapData.push({ date: data.addDay, count: data.weight });
        // ドーナツグラフの表示データをpush
        dountGrapData.push({ item: data.item, studyTime: data.studyTime });

    });
    console.log('----cal-heatmap開始----')
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
                label: {
                    position: 'after', // 曜日を日付の後に表示
                    format: function (date) {
                        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; // 曜日の配列
                        return days[date.getDay()]; // 日付から曜日を取得して返す
                    }
                }
            },
            columnLabelFormats: {
        '': 'ddd' // 曜日の形式を指定
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
                    domain: [0, 1, 2, 3, 4, 5, 6]
                }
            }

        }
    );
    console.log('----cal-heatmap終了----')

    console.log('chart.js（ドーナツグラフ)開始')



    // firesotreから取得したデータでTop5の学習時間の科目を取得する
    dountGrapData.forEach((value) => {
        if (!sumByItem[value.item]) {
            sumByItem[value.item] = 0;
        }
        sumByItem[value.item] += value.studyTime;
    })

    // オブジェクトの配列に変換
    const sumArray = Object.keys(sumByItem).map((key) => ({ item: key, studyTime: sumByItem[key] }));
    // studyTimeでソート
    sumArray.sort((a, b) => b.studyTime - a.studyTime);
    // 上位5つの要素を取得し、新しいオブジェクトの配列を作成
    let count = 0;
    sumArray.forEach((val) => {
        if (count < 5) {
            dountGrapDataItems.value.push(val);
        } else {
            return; // 6番目の要素でループを抜け出す
        }
        count++;
    })

    // Canvas要素のrefを定義
    console.log(dountGrapDataItems.value)


    const chartCanvas = document.getElementById("chartCanvas");

    // Chart.jsを使用してドーナツグラフを描画
    const chart = new Chart(chartCanvas, {
        type: 'doughnut',
        data: {
            labels: dountGrapDataItems.value.map(item => item.item),
            datasets: [{
                label: 'Top 5 Items',
                data: dountGrapDataItems.value.map(item => item.studyTime),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: false, // グラフのレスポンシブオプションを無効にする（固定サイズ）
            plugins: {
                legend: {
                    position: 'bottom' // 凡例の位置を下部に設定
                }
            }, tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return `${data.labels[tooltipItem.index]}: ${data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]} hours`;
                    }
                }
            }

        }


    });
    console.log(chart)
    console.log('chart.js（ドーナツグラフ)終了')


});
</script>
<style>
.chart-container {
    display: flex;
    /* Flexboxを使用して要素を横並びに配置 */
    align-items: center;
    /* 中央揃え */
    justify-content: center;
    /* 中央揃え */
}

.heatmap {
    /* ヒートマップのスタイル */
    flex: 1;
    /* 自動幅調整 */
}

.chart {
    /* ドーナツグラフのスタイル */
    width: 500px;
    /* 固定幅 */
    height: 300px;
    /* 固定高さ */
}
</style>