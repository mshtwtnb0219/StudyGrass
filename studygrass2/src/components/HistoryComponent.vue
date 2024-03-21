<template>
    <div id="history-list">
        <div class="history-frame" v-for="(item, index) in items" :key="index">
            <div class="item-date">学習日：{{ item.addDay }}</div>
            <div class="item-details">
                <div class="item-item">学習内容：{{ item.item }}</div>
                <div class="item-time">学習時間：{{ item.studyTime }}分</div>
            </div>
            <div class="item-comment">コメント：{{ item.comment }}</div>
        </div>
    </div>
    <!-- ページネーション -->
    <button @click="previousPage" :disabled="currentPage === 1" class="pagination-button">前のページ</button>
    <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">次のページ</button>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { db } from '../main.js'
import { collection, getDocs, query } from 'firebase/firestore';

// ページング用の変数
const currentPage = ref(1);
const itemsPerPage = 10;
const totalItems = ref(0);
const displayedItems = ref([]);

// totalPages の計算をリアクティブに行う
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage)); // 修正された行

//ページが読み込まれたタイミングでfirestoreから値を全件取得する
onMounted(async () => {
    // コレクションの参照
    const q = query(collection(db, "record"));
    //コレクション内の全てのドキュメントを取得
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // オブジェクトを取得
        const data = doc.data();
        // 一覧表示用の空配列に値をpushする
        displayedItems.value.push(data);
        //console.log(data.addDay);
    });
    // addDay プロパティを基準に降順にソート
    displayedItems.value.sort((a, b) => new Date(b.addDay) - new Date(a.addDay));
    totalItems.value = displayedItems.value.length; // データの読み込みが完了した後に totalItems を設定する
})

// 表示するアイテム
const items = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    return displayedItems.value.slice(startIndex, startIndex + itemsPerPage);
});

// 前のページへ移動
const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

// 次のページへ移動
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

</script>

<style scoped>
.history-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    /* ページの高さいっぱいに表示 */
}

.history-frame {
    margin-bottom: 20px;
    /* 各枠組みの下部に20pxの余白を追加 */
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: auto;
    /* 横方向の中央揃え */
}

.item-date {
    font-weight: bold;
}

.item-comment {
    margin-top: 5px;
    color: #666;
}

.item-details {
    display: flex;
    /* 子要素を横並びにする */
    align-items: center;
    /* 子要素を垂直方向に中央揃え */
}

.item-item {
    flex: 1;
    /* item.item が可変幅になるように設定 */
}

.item-time {
    margin-left: 10px;
    /* item.item と item.studyTime の間隔を追加 */
    font-size: 12px;
    color: #888;
}

.pagination-button {
    margin-top: 10px;
    padding: 8px 16px;
    font-size: 14px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.pagination-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.pagination-button:not(:disabled):hover {
    background-color: #0056b3;
}
</style>
