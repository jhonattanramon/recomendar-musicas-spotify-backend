class User{
    constructor(access_token_spf, refresh_token_spf, token_app){
        this.access_token_spf = access_token_spf,
        this.refresh_token_spf = refresh_token_spf
        this.token_app = token_app
    }   

    setToken_spf({access_token, refresh_token }){
        this.access_token_spf = access_token
        this.refresh_token_spf = refresh_token

        console.log(this.access_token_spf);
    }

    setToken_app(token){
        this.token_app = token
    }
}

module.exports = User