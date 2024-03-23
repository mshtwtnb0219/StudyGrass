<template>
    <div class="login-container">
        <h2>Login</h2>
        <p :class="{ 'error-message': isError }">メールアドレスまたはパスワードが誤っています</p>
        <input type="email" v-model="email" placeholder="Email" class="input-field">
        <input type="password" v-model="password" placeholder="Password" class="input-field">
        <button @click="Login" class="login-button">ﾛｸﾞｲﾝ</button>

        <p>メールアドレスは demo@gmail.com</p>
        <p>パスワードは test1234</p>
    </div>

    <div>
    <ChildComponent :message="parentMessage" />
  </div>

</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';



const parentMessage = 'Hello from parent!';

const email = ref('');
const password = ref('');
const isError = ref(false);
const router = useRouter();

// authオブジェクトを取得
const auth = getAuth();

// ログインボタン押下処理
const Login = async () => {
    try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        // homeComponent に遷移する
        router.push('/home');
    } catch (err) {
        console.log(err);
        isError.value = true;
    }
}
</script>

<style scoped>
/* ログインコンテナのスタイル */
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: calc(100vh - 100px);
    /* ヘッダーの高さを考慮 */
    margin-top: 50px;
    /* 上部の余白 */
}

/* エラーメッセージのスタイル */
.error-message {
    color: red;
    margin-bottom: 10px;
    visibility: hidden;
    /* 初期状態で非表示 */
}

/* エラーが発生した場合のエラーメッセージのスタイル */
.error-message.error {
    visibility: visible;
    /* エラーが発生した場合に表示 */
}

/* 入力フィールドのスタイル */
.input-field {
    width: 300px;
    height: 40px;
    margin-bottom: 10px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
}

/* ログインボタンのスタイル */
.login-button {
    width: 200px;
    height: 40px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
}

/* ログインボタンのホバースタイル */
.login-button:hover {
    background-color: #0056b3;
}
</style>