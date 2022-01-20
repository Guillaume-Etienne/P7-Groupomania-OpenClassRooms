<template>
<!--Espace personnel utilisateur-->
    <div id="moncompte" >
        <h2>Mon espace</h2>
        <div class="layout">
            <h4>Votre identifiant secret : {{userId}}</h4>
            <p> Votre Clef (on ne devrait pas montrer ça aux enfants) : {{ token }}</p>
            <button @click= "updateuser" class="btn btn-dark suc">Modifer vos information</button>
            <button @click= "deleteUser" class="btn btn-danger sup">Supprimer votre compte</button>             
        </div>
    </div>
    
</template>

<script>

import axios from 'axios'
var userDuSto=localStorage.getItem('user')
var userDuStoParse=JSON.parse(userDuSto)
console.log('L\'ID du parsé dans le sto : ' + userDuStoParse.userId)

axios.get(`http://localhost:3000/api/getoneuser/${data.userId}`)
        .then(response => {
          console.log(response.data)
          this.user = response.data
        
         
        })
        .catch(error => console.log(error)) 

export default {
    name: 'moncompte',
    data(){
      userId:"";
      token:""

    return {
        //data:JSON.parse(localStorage.get('user')),
        userId:userDuStoParse.userId,
        token:userDuStoParse.token
    }
},
/*
mounted(){
    //Appel de l'api pour l'affichafe des informations de l'utilisateur
    let data = JSON.parse(this.$localStorage.get('user'))
     axios.get(`http://localhost:3000/api/getoneuser/${data.userId}`)
        .then(response => {
          console.log(response.data)
          this.user = response.data
        
         
        })
        .catch(error => console.log(error)) 

},
*/
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

         deco: function(){// Fonction qui permet à l'utilisateur de se déconnecter
            if(window.confirm('Voulez-vous vraiment vous déconnecter ?')){
              this.$localStorage.remove('user');
              window.location.href = " http://localhost:8080/#/home";
              location.reload(true);
            } 
      },

      updateuser : function() {//Fonction qui permet à l'utilisateur de modifier ses informations

          let iduser = this.data.userId

         window.location.href = `http://localhost:8080/#/updateuser?id=${iduser}`
         location.reload(true);


      }
}


}

</script>