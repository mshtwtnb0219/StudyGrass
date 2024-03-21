<template>
    <div>
        <!-- ボタンを押したら router-linkを発動-->
        <button  @click="transitionResister">記録する</button>
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


</style>