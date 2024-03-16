<template>
    <p>記録画面(=ﾟωﾟ)ﾉ</p>
        <!-- ボタンを押したら router-linkを発動-->
        <button  @click="transitionHome">戻る</button>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();
function transitionHome() {
    router.push('/');
}
</script>