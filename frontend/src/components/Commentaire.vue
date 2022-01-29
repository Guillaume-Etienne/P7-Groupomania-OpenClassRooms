<template>
    <div id="commdiv" class="com" > 
        <div class="messauthor">
          <p class="namepost">De : {{ name }}</p>
          <p class="datepost">Le : {{ formattedDate }}</p>
        </div>        
        <p class="textcom">{{ commentaire.content }}</p>        
        <button
            @click="deletecom(mess.idMESSAGES)"                    
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
      
    //Appel à l'api pour l'affichage des commentaires
    axios
      .get('http://localhost:3000/api/comments/getbyarticle/35')
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
