class User {
  constructor(access_token, refresh_token, data_user) {
    this.access_token = access_token,
    this.refresh_token = refresh_token,
    this.dataUser = data_user,
    this.response = null,
    this.infor = null
  }

  setInforToken({responseToken}){
    this.infor = responseToken
  }

  setToken({ access_token, refresh_token }) {
    this.access_token = access_token;
    this.refresh_token = refresh_token;
  }
  setDataUser({  data }) {
    this.dataUser = JSON.parse(data);
  }

  logout() {
    (this.access_token = null), (this.refresh_token = null), (this.id = null);
  }
}

module.exports = User;
