import axios from 'axios';

class PlanService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005/api/plans"
    });

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

  // POST - CREATE PLAN (PLAN IS AN OBJECT)
  addPlan(username, plan) {
    return this.api.post('/' + username + '/newPlan', plan)
  }

  //GET PLANS
  getPlans() {
    return this.api.get('/')
  }

  // GET PLAN BY ID
  getPlan(planId) {
    return this.api.get('/' + planId)
  }

  getGuests(planId) {
    return this.api.get('/' + planId + '/guests')
  }


  // EDIT PLAN (PLAN IS AN OBJECT, RECOLLIR L'ID DEL PARAMS.)
  editPlan(planId, plan) {
    return this.api.put('/' + planId, plan)
  }

  // DELETE PLAN 
  deletePlan(planId) {
    return this.api.delete('/' + planId)
  }

  acceptPlan(planId, username) {
    return this.api.post('/' + planId + '/' + username + '/accept')
  }

  declinePlan(planId,username) {
    return this.api.post('/' + planId + '/' + username + '/decline')
  }

  getGuestsFriends(planId, username){
    return this.api.get('/' + planId + '/' + username +'/invite')
  }

  inviteGuestsFriends(planId, idPerson){
    return this.api.post('/' + planId + '/' + idPerson +'/invite')
  }
}

// Create one instance of the service
const planService = new PlanService();

export default planService;