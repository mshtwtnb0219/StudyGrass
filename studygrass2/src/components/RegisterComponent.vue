<template>

    <div class="register">
        <form>
            <p v-if="errMsg">学習日・学習内容・学習時間を入力してください（＾ω＾）・・・</p>
            <label>学習日：</label>
            <input type="date" id="date" v-model="dateVal" required>
            <br>
            <label>学習内容※</label>
            <select id="select" v-model="selectVal">
                <option v-for="(value, label) in dorpdownOptions" :key="label" :value="value">{{ value }}</option>
            </select>
            <label>学習時間※</label>
            <input type="number" id="number" min="1" v-model="numVal">
            <span>分</span>
            <br>
            <label>ひとこと：</label>
            <textarea id="scrollable-textarea" v-model="textVal"></textarea>
        </form>
        <button @click="addData()">登録</button>
        <!-- ボタンを押したら router-linkを発動-->
        <button @click="transitionHome()">ｷｬﾝｾﾙ</button>
    </div>
    <p>記録画面(=ﾟωﾟ)ﾉ</p>

</template>
<script setup>
import { useRouter } from 'vue-router'
import { db } from '../main.js'
import { collection, addDoc } from 'firebase/firestore'
import { ref } from 'vue'
import {timeCount } from '@/common/common.js'



// 入力フォームのデータを保持するリアクティブな変数
const dateVal = ref('');
const selectVal = ref('');
const numVal = ref('');
const textVal = ref('');

// 入力チェック用のフラグ
const errMsg = ref(false);


// selectOption(暫定)
const dorpdownOptions = {
    option1: 'java',
    option2: 'html/css',
    option3: 'javascript',
    option4: 'php',
    option5: 'springboot',
    option6: 'AWS',
    option7: 'Linux',
    option8: 'Typescript',
    option9: 'python',
    option10: 'SQL'
};



// <script setup>でuseRouter()をインスタンス化する
const router = useRouter();
// ｷｬﾝｾﾙボタン(HomeComponetに遷移)
function transitionHome() {
    router.push('/');
}

// 登録(DBにアクセスする)
async function addData() {

    // 入力チェックをする
    if (dateVal.value == "" || selectVal.value == "" || numVal.value == "") {
        errMsg.value = true;
        return;
    }

    // heatmapのcountを学習時間から判定する
    const weight = timeCount(numVal.value);
    // firestoreに保存するオブジェクトを作成する
    const value = {
        addDay: dateVal.value,
        item: selectVal.value,
        studyTime: numVal.value,
        weight: weight,
        comment: textVal.value,
        systemTime: Date(),
    };

    await addDoc(collection(db, "record"), value)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

    // 入力チェック用のフラグをfalseにする(チェック→正常の場合にエラーメッセージが残存するため)
    errMsg.value = false;

    // HomeComponetに遷移
    router.push('/');

}

</script>

<style scoped>
.register {
    border: 1px solid #000;
    /* 枠線を追加 */
    width: 700px;
    /* 適切な幅を指定 */
    padding: 20px;
    /* 枠と内容の間の余白を追加 */
    text-align: center;
    /* 内容を中央揃えにする */
    margin: 0 auto;
    /* 左右を自動的に中央揃えにする */
}

/* スクロール可能なテキストエリアのスタイル */
#scrollable-textarea {
    width: 200px;
    /* テキストエリアの幅 */
    height: 100px;
    /* テキストエリアの高さ */
    overflow: scroll;
    /* スクロールバーを表示させる */
    resize: none;
    /* テキストエリアのリサイズを無効にする */
}
</style>