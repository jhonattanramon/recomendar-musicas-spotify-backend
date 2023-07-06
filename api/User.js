class User{
    constructor(access_token_spf, refresh_token_spf, id){
        this.access_token = access_token_spf,
        this.refresh_token = refresh_token_spf,
        this.id = id
    } 
    setToken({access_token, refresh_token }){
      console.log(access_token, refresh_token);
        this.access_token = access_token
        this.refresh_token = refresh_token
    }  
    setId({id}){
      this.id = id
    }
    logout(){
      this.access_token = null,
      this.refresh_token = null,
      this.id = null
    }
  }
  

  module.exports = User