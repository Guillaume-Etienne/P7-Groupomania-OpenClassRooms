<template>
<!--Espace personnel utilisateur-->
    <div id="moncompte" >
        <h2>Mon compte</h2>
        <div class="layout">                       
            <h4>Votre nom : {{ afficheNom  }}</h4>
            <h4>Votre email : {{ afficheMail  }}</h4>
            <button @click= "deleteUser" class="btn btn-danger sup">Supprimer votre compte</button>           
        </div>
        <br>
        <div classe=info  v-for="usr in user" :key="usr.userId">          
          <h4>des datas magiques : </h4>
          <p><span>{{usr}}</span></p>
          </div>
    </div>
    
</template>

<script>

import axios from 'axios'
var userDuSto=localStorage.getItem('user')
var userDuStoParse=JSON.parse(userDuSto)
console.log('L\'ID du parsé dans le sto : ' + userDuStoParse.userId)

export default {
    name: 'moncompte',
    
    data(){
     

    return {
        //data:JSON.parse(localStorage.get('user')),
        userId:userDuStoParse.userId,
        token:userDuStoParse.token,
        user:"",
        afficheNom:"",
        afficheMail:""
    }
},
mounted(){
    //Appel de l'api pour l'affichage des informations de l'utilisateur
    
     axios.get(`http://localhost:3000/api/auth/${userDuStoParse.userId}`)
        .then(response => {
          console.log(response.data)
          this.user = response.data
          console.log("le this.user : " + this.user.userName)
          console.table(this.user)
          this.afficheNom = this.user.userName
          this.afficheMail = this.user.userEmail
        })
        .catch(error => console.log(error))
},
methods:{

    deleteUser : function () {//Fonction qui permet à l'utilisateur de supprimer son compte 
        let token = this.data.token
        if(confirm('Voulez vous vraiment supprimer le compte ?'),confirm('Cette opération est irreversible !')){
             axios.post(`http://localhost:3000/api/deleteUser`, {
                 userId: this.data.userId
        },
        {
          headers: {
            'Content-type': 'application/json',
            'Authorization' : `Bearer ${token}`
              }
        })
       .then (() => { 
                    this.$localStorage.remove('user')
                    document.getElementById('moncompte').style.display = 'none'
                    alert('votre compte a bien été supprimé !')
                    window.location.href = " http://localhost:8080/#/home"
                    
       })
       .catch(() =>{
         console.log('Votre compte n\'a pas pu être supprimé !')
       }) 
        }
    },

         deco: function(){// Déconnextion
            if(window.confirm('Voulez-vous vraiment vous déconnecter ?')){
              this.$localStorage.remove('user');
              window.location.href = " http://localhost:8080/#/home";
              location.reload(true);
            } 
      }
}


}

</script>