export const TokenAuth = `
mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
        token
        refreshToken
        payload
        refreshExpiresIn
    }
}`;

export const CheckIn = `
mutation CheckIn($appID: Int!){
  checkIn(appID: $appID){
    status
  }
}
`;

export const Register = `mutation ($email: String!, $username: String!, $password: String!){
  createUser(email: $email, username: $username, password: $password){
    user{
      id
    }
  }
}`;

export const verifyUserMutation = `mutation ($usernames: [String]){
  approveUsers(usernames: $usernames){
    status
  }
}`;

export const addToPlatformMutation = `mutation ($usernames: [String], $platform: String!){
  addToPlatform(usernames: $usernames, platform: $platform){
    status
  }
}`;
