<template>
  <div id="wall">    
    <div class="getMessag">
      <h3 id="mess">Les messages</h3>
      <div id="messdiv" class="msg" v-for="mess in msg" :key="mess.articleid">
        <p class="nameus">{{ mess.usserid }}</p>
        <p class="text">{{ mess.articlecontent }}</p>
        <!-- images et dates de création -->
        
        <!--<div class="buttoon">
          <button @click= "updatemess(mess.idMESSAGES)" v-if="data.username == mess.username || data.status =='admin'" type="button" class="btn btn-success btn-sm mod">modifier</button>
        <button
          @click="deletemess(mess.idMESSAGES)"
          v-if="data.username == mess.username || data.status == 'admin'"
          type="button"
          class="btn btn-danger btn-sm sup"
          id="icon"
        >
          <font-awesome-icon icon="trash"/>
        </button>
        <button
          @click="response(mess.idMESSAGES)"
          class="btn btn-danger btn-circle text-uppercase bt"
          id="reply"
        >
          <span class="glyphicon glyphicon-share-alt"></span>Repondre
        </button>
        
        <button
          @click="view(mess.idMESSAGES)"
          class="btn btn-warning btn-circle text-uppercase bt"
          id="voir"
          data-toggle="collapse"
          href="#/viewresponse"
        >
          <span class="glyphicon glyphicon-comment"></span>
          Voir les réponses
        </button>
        -->
      </div>
    </div>    
  </div>
</template>

<script>
import axios from "axios"
var userDuSto="userduSto"
export default {
  name: "wall",
  data() {
    return {
      data: userDuSto,
      message: "",
      msg: "",
      date: "",      
      imess: "",
      update: "",
      user: "",
      gifFile: ""
    }
  },
  mounted() {
    //Appel à l'api pour l'affichage de tous les messages
    axios
      .get("http://localhost:3000/api/articles")
      .then(response => {
        this.msg = response.data;
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
