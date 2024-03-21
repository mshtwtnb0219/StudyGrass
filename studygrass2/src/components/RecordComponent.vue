<template>
    <div class="button-container">
        <!-- ボタンを押したら router-linkを発動-->
        <button  @click="transitionResister" class="record-button">記録する</button>
    </div>

</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();

// 記録画面遷移メソッド
function transitionResister() {
    console.log(router.currentRoute.value.path);
    router.push('/register');
}

</script>

<style scoped>

.button-container {
    position: fixed;
    bottom: 20px; /* 下からの距離 */
    right: 20px; /* 右からの距離 */
}

.record-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.record-button:hover {
    background-color: #0056b3;
}
</style>