<template>
    <div id="commdiv" class="com" >        
        <div class="messauthor">
          <p class="namepost">De : {{ name }}, le {{ formattedDate }}</p>          
        </div>        
        <p class="textcom">{{ content }}</p>        
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
    props:["name", "commentid","userid", "articleid", "content", "creationdate"],
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
        },
        dynamicProps() {
            if(this.currentTab == 'Views') {
                return { views:this.views }
            }
            return null
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
  color: rgb(43, 7, 172);
}

.textcom {
 margin-top: 1px;
 text-align: start;
 padding-left: 20px;
}
</style>
