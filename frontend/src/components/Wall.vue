<template>
  <div id="wall">    
    <div class="getMessag">
      <h3 id="mess">Les messages</h3>
      <Article v-for="message in messages" :key="message.articleid" v-bind="message"> </Article>
    </div>    
  </div>
</template>

<script>
import axios from "axios"
import Article from "./Article.vue"

export default {
  name: "wall",
  components:{
    Article
  },

  data() {
    return {      
      messages: []
    }
  },
  mounted() {
    //Appel à l'api pour l'affichage de tous les messages
    axios
      .get("http://localhost:3000/api/articles")
      .then(response => {
        this.messages = response.data;
      })
      .catch(error => console.log(error));

    //let data = JSON.parse(localStorage.get("user"));
    /*Appel à l'Api pour l'affichage des informations utilisateurs
    axios
      .get(`http://localhost:3000/api/getoneuser/${data.userId}`)
      .then(response => {
        this.user = response.data;
      })
      .catch(error => console.log(error));
      */
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.messauthor {
  padding-left: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}
#messdiv {  
  color: #2c3e50;
  margin-top: 10px;
  width: 90%;
  padding: 1px;  
  border-radius: 20px;
  box-shadow: 0 0 1em #D9D9D9;  
}

#imgpost {
  width: 50%;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>




