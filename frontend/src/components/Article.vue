<template>
    <div id="messdiv" class="msg" > <!-- @onclick pour faire apparaître la div "détail" -->
        <div class="messauthor">
          <p class="namepost">De : {{ name }}</p>
          <p class="datepost">Le : {{ creationdate }}</p>
        </div>        
        <p class="textpost">{{ articlecontent }}</p>
        <img id="imgpost" alt="Clavier" src="../assets/AZERTY.jpg">
        <p @click="seeCommentaires" > ...</p>
        <div v-show="seeDetails" id="details">
            <h3>Commentaires</h3>         
                              <!-- -->
            <div class="comments" v-for="commentaire in commentaires" :key="commentaire.commentid">
                <p>Le : {{ commentaire.creationdate }}, par : {{ commentaire.userid }} (Name : {{ name }})  </p>
                <p>{{ commentaire.content}}</p>
                <button
                    @click="deletemess(mess.idMESSAGES)"                    
                    type="button"
                    class="btn btn-danger btn-sm sup"
                    id="icon"
                >
                <!-- ajouter dans le button la ligne (adaptée bien sûr) v-if="data.username == mess.username || data.status == 'admin'" -->
                    Supprimer ce commentaire
                </button>
                
            <!-- liste des commentaires, pour chacuns : bouton "si proprio ou amdmin" effacer comm-->
            </div>
            <form
                id="formtog"
                method="POST"
                class="from-group"
                @submit.prevent="sendMessage"                
            >
                <div class="form-group">
                    <label class="messa" for="message">
                
                    </label>
                    <textarea
                    class="form-control"
                    name="message"
                    id="message"
                    cols="30"
                    rows="5"
                    v-model="message"
                    >
                    </textarea>
                </div> 
                <button type="submit" id="envoi" class="btn btn-danger">
                  Envoyer
                </button>
            </form>
        </div>
    </div>
</template>


<script>
import axios from "axios"
var toto = 35

export default {
    props:["name", "articleid", "articlecontent", "picture", "creationdate"],
    data() {
        return {
            commentaires:[],
            seeDetails:false,
            message:""
        }
    },
  mounted() {
    //Appel à l'api pour l'affichage de tous les messages
    axios
      .get('http://localhost:3000/api/comments/getbyarticle/${toto}')
      .then(response => {
        this.commentaires = response.data;
      })
      .catch(error => console.log(error))
  },
    methods:{
        seeCommentaires(){
            this.seeDetails=!this.seeDetails
            if (this.seeDetails){
                if (!this.commentaires){}// axios.get this.commentaire = response.data}
            }
        }
    }
}

</script>

<style scoped>
.messauthor {
  padding-left: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
