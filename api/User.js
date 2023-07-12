class User {
  constructor() {
    this.access_token = null,
    this.refresh_token = null,
    this.token_type = null,
    this.expires_in = null,
    this.scope = null,
    this.dataUser = null,
    this.infor = null
  }
  setInforToken(data){
    this.infor = JSON.parse(data)
  }
  setToken({access_token, refresh_token, token_type, expires_in, scope}) {
    this.access_token = access_token;
    this.refresh_token = refresh_token;
    this.token_type = token_type;
    this.expires_in = expires_in;
    this.scope = scope;
  }
  setData({data}) {
    this.dataUser = JSON.parse(data);
  }
  logout() {
    (this.access_token = null), (this.refresh_token = null), (this.id = null);
  }
}

module.exports = User;
