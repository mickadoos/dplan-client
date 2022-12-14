import axios from 'axios';

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL === undefined?"http://localhost:5005/api/users":`${process.env.REACT_APP_SERVER_URL}api/users`});

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // GET CURRENT USER (send user.username from context)
  getUserPlans(username) {
    return this.api.get(`/${username}`)
  }

  // GET USER PROFILE --> retorna 1 user per la vista profile
  getUserProfile(username) {
    return this.api.get(`/${username}/profile`)
  }

  // PUT - EDIT USER PROFILE --> enviem 1 user modificat.
  editProfile(username, userEdited) {
    return this.api.put(`/${username}/edit`, userEdited)
  }

  // GET CURRENT USER (send user.username from context) --> retorna el User amb els friends populats.
  getUserFriends(username) {
    return this.api.get(`/${username}/friends`)
  }

  // GET PER RECOLLIR TOTS ELS USERS MENYS ELS QUE JA SON "AMICS"[friends, requested & toAccept]
  getAllUsers(username) {
    return this.api.get(`/${username}/addFriends`)
  }

  // SEND PETICIÓ D'AMISTAT a la persona adient
  sendFriendRequest(username, idPerson){
    return this.api.post(`/${username}/friendRequest/${idPerson}`)
  }

  acceptFriendRequest(username, idPerson){
    return this.api.post(`/${username}/acceptFriend/${idPerson}/`)
  }

  declineFriendRequest(username, idPerson){
    return this.api.post(`/${username}/declineFriend/${idPerson}/`)
  }
}

// Create one instance of the service
const userService = new UserService();

export default userService;
