<template>

    <div class="register">
        <form>
            <label>学習日</label>
            <input type="date">
            <br>
            <label>学習内容</label>
            <option>

            </option>
            <br>
            <label>ひとこと</label>
            <input type="text" class="scrollable-textarea">
        </form>
        <button @click="addData()">登録</button>
        <!-- ボタンを押したら router-linkを発動-->
        <button @click="transitionHome()">ｷｬﾝｾﾙ</button>
    </div>

    <p>記録画面(=ﾟωﾟ)ﾉ</p>

</template>
<script setup>
import { useRouter } from 'vue-router'
import {db} from '../main.js'
import { collection,addDoc} from 'firebase/firestore';


// <script setup>でuseRouter()をインスタンス化する
const router = useRouter();
// ｷｬﾝｾﾙボタン(HomeComponetに遷移)
function transitionHome() {
    router.push('/');
}

// 登録(DBにアクセスする)
function addData() {

    const value = {
        id:1,
        item:"java",
        wight:1,
        studyTime:60,
        systemTime:Date()
    };

    addDoc(collection(db, "record"), value)
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });

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
.scrollable-textarea {
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