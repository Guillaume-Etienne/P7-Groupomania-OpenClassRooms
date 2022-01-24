<template>
  <div id="nav">    
    <router-link to="/">Home  |</router-link>
    <router-link v-if="!auth" to="/Signin">Créer un compte  |</router-link>
    <router-link v-if="!auth" to="/Login">Se connecter  |</router-link>
    <router-link v-if="auth" to="/about">Mon profil    |</router-link>
    <router-link v-if="auth" to="/newarticle">Créer un nouveau message</router-link>
  </div>
  <router-view/>
</template>

<script>
export default {
       
    data(){
     
      return {auth:false}
    },
    created(){
      if (localStorage.getItem("token")==null){
        this.auth=false
      }else{
        this.auth=true
      }
    }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav img{
  width: 40px;
  transform: translateY(10px);
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #da381c;
}
</style>
