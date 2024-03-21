<template>
  <div id="app">


    <header>
      <img src="./assets/logo.png">
      <h1>My Awesome App</h1>
    </header>


    <router-view></router-view>
  </div>
</template>


<script setup>

</script>

<style>
/* アプリ全体のCSSはここに記載する */
/* ヘッダーのスタイル */
header {
  background-color: #00ced1; /* ヘッダーの背景色 */
  color: #000; /* ヘッダーのテキストカラー */
  padding: 20px; /* ヘッダーの余白 */
  text-align: center; /* テキストを中央揃え */
}

/* ヘッダータイトルのスタイル */
h1 {
  margin: 10px 0 0; /* ヘッダーのタイトルのマージンを設定 */
  font-size: 24px; /* ヘッダータイトルのフォントサイズ */
}

/* ロゴのスタイル */
img {
  width: 100px; /* ロゴの幅 */
  height: auto; /* ロゴの高さを自動調整 */
}
</style>