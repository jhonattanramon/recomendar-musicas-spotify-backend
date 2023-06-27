
let token;
const SetToken = ({access_token, refresh_token}) => {
    console.log(access_token);
    return token = {
        access_token: access_token,
        refresh_token: refresh_token
    }
}
module.exports = { SetToken, token}