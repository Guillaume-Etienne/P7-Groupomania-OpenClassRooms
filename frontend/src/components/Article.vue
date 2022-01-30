<template>
    <div id="messdiv" class="msg" > 
        <div class="messauthor">
          <p class="namepost">Publication de : {{ name }}</p>
          <p class="datepost">Le : {{ formattedDate }}</p>
        </div>        
        <p class="textpost">{{ articlecontent }}</p>
        <img class="imgpost" alt="Pas d'image" :src="picture">
        
        <!-- Bouton de suppression : passer l'id de l'Article dans la fonction 'deleteArticle' --> 
        <!-- ajouter dans le button la ligne (adaptée bien sûr) v-if="data.username == mess.username || data.status == 'admin'" -->
        <button                    
            v-if="isAdmin"
            @click="deleteArticle(articleid)"
            type="button"                    
        >                
            Supprimer cette publication
        </button>
        <p @click="seeCommentaires" > ...</p> <!-- @onclick pour faire apparaître la div "détail" -->
        <div v-show="seeDetails" class="details">
            <h3>Commentaires</h3>         
                              <!-- -->
            <Commentaire v-for="commentaire in commentaires" :key="commentaire.commentid" v-bind="commentaire"> </Commentaire>
            <h4>Ajouter un Commentaire</h4>
            <form
                id="formtog"
                method="POST"
                class="from-group"
                @submit.prevent="sendComment"                
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
import Commentaire from "./Commentaire.vue"

// tout ce qui concerne le isAdmin  ... ne fonctionne pas
var userConnectedIsAdmin=localStorage.getItem('admin')
console.log('userConnectedIsAdmin : ' +userConnectedIsAdmin)
let isAdminJs=false
if (userConnectedIsAdmin=1){
    isAdminJs=true
    console.log('utilisateur Admin !')
    }
    else{
        isAdminJs=false
        console.log('utilisateur pas Admin !')
    }
console.log('isAdmin : ' + isAdminJs)
// fin du isAdmin

export default {
    name: "messdiv",
    components:{
        Commentaire
    },
    props:["name", "articleid", "articlecontent", "picture", "creationdate"],
    data() {
        return {
            commentaires:[],
            seeDetails:false,
            message:"",
            isAdmin:isAdminJs         
        }
    },
    computed: {        
        formattedDate() {
            let date = new Date(this.creationdate)
            let day = Number(date.getDate()) >= 10 ? date.getDate() : '0'+date.getDate()
            return `${day}/${date.getMonth()}2/${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}`
        },
        dynamicProps() {
            if(this.currentTab == 'Views') {
                return { views:this.views }
            }
            return null
        }
    }, 
    
  mounted() {
      console.log('trouver le article id : '+ this.articleid)
    //Appel à l'api pour l'affichage des commentaires
    axios
      .get(`http://localhost:3000/api/comments/getbyarticle/${this.articleid}`)
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
        },
        deleteArticle: function (artToDelete) {// Passer l'id à péter fils            
        
        console.log("deleteArticle lancée pour : "+ artToDelete)        
        if (confirm("êtes vous sûr de vouloir supprimer cet article ?")) {
            axios.delete(`http://localhost:3000/api/articles/${artToDelete}`)
                .then ((response) => {
                    console.log('suppression ok by Front ')    
        
                })
                .catch(() => console.log('Echec à la suppression')) 
            }
        },
        
        sendComment: function () {//Fonction qui envoi la réponse de l'utilisateur au serveur 
            
        let userConnected=localStorage.getItem('userId')
        console.log("userconnected détecté : "+ userConnected)
        let idUSERS = userConnected
        let idArticle = this.articleid
        if (this.message === ""){
          alert('Vous n\'avez rien écris vous ne pouvez pas envoyé un message vide !')
        } else{
           axios.post('http://localhost:3000/api/comments',
        {
          userid : idUSERS,
          articleid : idArticle,
          commentcontent: this.message          
        },{
          headers: {
            'Content-type': 'application/json',
            'Authorization' : `Bearer`
              }
        })
        .then (() => { 
            console.log('commentaire envoyé')
            this.message ==="";
            alert('votre commentaire a bien été envoyé !')
            window.location.href = "http://localhost:8080/#/"
            location.reload(true)
       })
       .catch(() =>{
         console.log('la réponse n\'a pas été envoyé')
       }) 
        }
       
      }
    }
}

</script>

<style scoped>
.details {
  background-color: aliceblue;  
  color: #2c3e50;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 1px;  
  border-radius: 20px;
  box-shadow: 0 0 1em #D9D9D9;  
}
.messauthor {
  padding-left: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.datepost {
    margin-left: 10px;
    color: rgb(43, 7, 172);
}

.textpost {
 margin-top: 1px;
 text-align: start;
 padding-left: 20px;
}

.imgpost {
    width: 90%;
    max-width: 100%;
}
</style>
