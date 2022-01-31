<template>
    <div id="commdiv" class="com" >
        <div class="comcontent">      
            <div class="messauthor">
                <p class="namepost">Commentaire de : {{ name }}, le {{ formattedDate }}</p>
            </div>               
            <p class="textcom">{{ content }}</p>
        </div>      
        <button
            @click="deletecom(commentid)"                    
            type="button"
            class="btn btn-danger btn-sm sup"
            id="icon"        >
        <!-- ajouter dans le button la ligne (adaptée bien sûr) v-if="data.username == mess.username || data.status == 'admin'" -->
            Supprimer ce commentaire
        </button>
    </div>
</template>

<script>
import axios from "axios"
/* tout ce qui concerne le isAdmin  ... ne fonctionne pas
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
*/

export default {
    props:["name", "commentid","userid", "articleid", "content", "creationdate"],
    emits:["reloadCommentaire"],
    data() {
        return {
            commentaires:[],
            seeDetails:false,
            commentaire:"",
            isAdmin:false         
        }
    },
    computed: {        
        formattedDate() {
            let date = new Date(this.creationdate)
            let day = Number(date.getDate()) >= 10 ? date.getDate() : '0'+date.getDate()
            return `${day}/${date.getMonth()}2/${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}`
        }        
    },
    methods : {
        deletecom (comToDelete) {//Fonction qui envoi la réponse de l'utilisateur au serveur            
        
        console.log("deletecom lancée pour : "+ comToDelete)        
        if (confirm("êtes vous sûr de vouloir supprimer ce message ?")) {
            axios.delete(`http://localhost:3000/api/comments/${comToDelete}`,{
                    headers:{
                    "Authorization":"Bearer: "+localStorage.getItem('token')
                    }
                })
                .then ((response) => {
                    console.log('suppression ok by Front ')
                    this.$emit("reloadCommentaire")  
        
                })
                .catch(() => console.log('Echec à la suppression mais pas sûre en vrai')) 
        }
    }
}
}

</script>

<style scoped>
button {
  background-image: linear-gradient(to right, #8898f3 0%, #a924dd  51%, #2f4eff  100%);
   margin: 10px;
            padding: 10px 20px;
            text-align: center;
            text-transform: uppercase;
            transition: 0.5s;
            background-size: 200% auto;
            color: white;            
            box-shadow: 0 0 20px #eee;
            border-radius: 10px;
            
  }
button:hover {
  background-position: right center; /* change the direction of the change here */
            color: #fff;
            text-decoration: none;
  border-radius: 5px;
}
.comcontent {
  background-color: white;  
  color: #2c3e50;
  margin-top: 15px;
  margin-left: 5px;
  margin-right: 5px;
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
  color: rgb(43, 7, 172);
}

.textcom {
 margin-top: 1px;
 text-align: start;
 padding-left: 20px;
}
</style>
