<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/icon-above-font.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
img {
  width: 400px;
  height: 200px;
  object-fit:cover;
  border-radius: 20px;
  box-shadow: 0 0 1em #D9D9D9;
  animation: loader-container 0.5s;
  animation-fill-mode:unset;
}
@keyframes loader-container{
    0%{
        display:none;
        height:0;
        transform:scale(0);
    }

    100%{
        display:inline-block;
        
        transform:scale(1);
    }
}
</style>