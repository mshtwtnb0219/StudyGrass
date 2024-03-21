<template>

    <div class="register">
        <form>
            <p>記録画面(=ﾟωﾟ)ﾉ</p>
            <p v-if="errMsg">学習日・学習内容・学習時間を入力してください（＾ω＾）・・・</p>
            <label>学習日※</label>
            <input type="date" id="date" v-model="dateVal" required>
            <br>
            <label>学習内容※</label>
            <select id="select" v-model="selectVal">
                <option v-for="(value, label) in dorpdownOptions" :key="label" :value="value">{{ value }}</option>
            </select>
            <label>学習時間※ 分単位</label>
            <input type="number" id="number" min="1" v-model="numVal">

            <br>
            <label>ひとこと：</label>
            <textarea id="scrollable-textarea" v-model="textVal"></textarea>
        </form>
        <button @click="addData()">登録</button>
        <!-- ボタンを押したら router-linkを発動-->
        <button @click="transitionHome()">ｷｬﾝｾﾙ</button>
    </div>


</template>
<script setup>
import { useRouter } from 'vue-router'
import { db } from '../main.js'
import { collection, addDoc } from 'firebase/firestore'
import { ref } from 'vue'
import { timeCount, dorpdownOptions } from '@/common/common.js'



// 入力フォームのデータを保持するリアクティブな変数
const dateVal = ref('');
const selectVal = ref('');
const numVal = ref('');
const textVal = ref('');

// 入力チェック用のフラグ
const errMsg = ref(false);

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
    border: 2px solid #ccc;
    border-radius: 10px;
    width: 500px;
    margin: 20px auto;
    padding: 20px;
    text-align: center;
}

.register form {
    margin-bottom: 20px;
}

.register label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.register input,
.register select {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.register textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    resize: vertical;
}

.register button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.register button:hover {
    background-color: #0056b3;
}

.register button+button {
    margin-left: 10px;
}
</style>