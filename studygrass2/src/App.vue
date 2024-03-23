<template>
  <div id="app">
    <header>
      <div class="header-content">
        <div class="header-left">
          <img src="./assets/logo.png">
          <h1>My Awesome App</h1>
        </div>
        <div class="header-right">
          <!-- ログアウトボタン -->
          <button @click="logout" class="logout-button">ログアウト</button>
        </div>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { signOut } from 'firebase/auth';
import { auth } from './main.js';

const router = useRouter();

// ログアウト関数
const logout = async () => {
  try {
    await signOut(auth);
    // ログアウト後、ホームページにリダイレクトする
    router.push('/');
  } catch (error) {
    console.error('ログアウト時にエラーが発生しました:', error.message);
  }
};
</script>

<style scoped>
/* ヘッダーのスタイル */
header {
  background-color: #00ced1;
  color: #000;
  padding: 20px;
}

/* ヘッダー内のコンテンツのスタイル */
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* ヘッダー左側の要素のスタイル */
.header-left {
  display: flex;
  align-items: center;
}

/* ロゴのスタイル */
img {
  width: 100px;
  height: auto;
}

/* ヘッダー右側の要素のスタイル */
.header-right {
  display: flex;
  align-items: center;
}

/* ログアウトボタンのスタイル */
.logout-button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  outline: none;
}

/* ログアウトボタンのホバースタイル */
.logout-button:hover {
  background-color: #c82333;
}
</style>
