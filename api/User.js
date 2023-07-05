class User{
    constructor(access_token_spf, refresh_token_spf, token_app, email, type){
        this.access_token_spf = access_token_spf,
        this.refresh_token_spf = refresh_token_spf
        this.token_app = token_app,
        this.email = email,
        this.type = type
    } 
    
    setEmail(email){
      this.email = email
    }
  
    setType(type) {
    this.type = type
    }
  
    setToken_spf({access_token, refresh_token }){
      console.log(access_token, refresh_token);
        this.access_token_spf = access_token
        this.refresh_token_spf = refresh_token
    }
    setToken_app(token){
        this.token_app = token
    }
  
    logout(){
      this.access_token_spf = null,
      this.refresh_token_spf = null,
      this.token_app = null
    }
  }
  

  module.exports = User