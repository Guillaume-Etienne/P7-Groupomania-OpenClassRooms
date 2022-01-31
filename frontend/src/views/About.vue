<template>
<!--Espace personnel utilisateur-->
    <div id="moncompte" >
        <h2>Mon compte</h2>
        <div class="layout">                       
            <h4>Votre nom : {{ afficheNom  }}</h4>
            <h4>Votre email : {{ afficheMail  }}</h4>
            <button @click= "deco" class="btn btn-danger sup">Se déconnecter</button>
            <button @click= "deleteUser" class="btn btn-danger sup">Supprimer votre compte</button>           
        </div>
        <br>        
    </div>
    
</template>

<script>

import axios from 'axios'
var userDuSto=localStorage.getItem('userId')
console.log("userduSto : " + userDuSto)
//var userDuStoParse=JSON.parse(userDuSto)


export default {
    name: 'moncompte',
    
    data(){
     

    return {
        //data:JSON.parse(localStorage.get('user')),
        userId:userDuSto,//Parse.userId,        
        user:"",
        afficheNom:"",
        afficheMail:""
    }
},
mounted(){
    //Appel de l'api pour l'affichage des informations de l'utilisateur
    
     axios.get(`http://localhost:3000/api/auth/${userDuSto}`)
        .then(response => {          
          this.user = response.data          
          this.afficheNom = this.user.userName
          this.afficheMail = this.user.userEmail
        })
        .catch(error => console.log(error))
},
methods:{

    deleteUser : function () {//Fonction qui permet à l'utilisateur de supprimer son compte 
    console.log('fonction suppression user lancée pour : '+userDuSto)
        if(confirm('Voulez vous vraiment supprimer le compte ?'),confirm('Cette opération est irreversible !')){
          axios.delete(`http://localhost:3000/api/auth/${userDuSto}`)
       .then (() => { 
          localStorage.clear()
          alert('votre compte a bien été supprimé !')
          window.location.href = " http://localhost:8080/#/"                    
       })
       .catch(() =>{
         console.log('Votre compte n\'a pas pu être supprimé !')
       }) 
        }
    },

         deco: function(){// Déconnextion
            if(window.confirm('Voulez-vous vraiment vous déconnecter ?')){
              localStorage.clear()
              this.$router.push("/")
            } 
      }
}


}

</script>