import "./GuestsPlanPage.css";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams, Link } from "react-router-dom";
import planService from "../../services/plan.service.js"
import GuestComponent from "../../components/Person/PersonGuests";

let guestsSearch = [];

function GuestsPlanPage() {

  const {planId} = useParams();
  const { isLoggedIn, user } = useContext(AuthContext);
  const [guests, setGuests] = useState();
  
  useEffect (() => {
    if(isLoggedIn){
      planService.getGuests(planId)
      .then (resp => {
        console.log("GUESTS FRONT: ",resp.data.accepted)
        // const allGuests = []
        if(resp.data.invited.length > 0){
        resp.data.invited.map(guest => {
          return guestsSearch.push(guest)
        })}
        if(resp.data.accepted.length > 0){
        resp.data.accepted.map(guest1 => {
          return guestsSearch.push(guest1)
        })}
        if(resp.data.denied.length > 0){
        resp.data.denied.map(guest2 => {
          return guestsSearch.push(guest2)
        })}
        console.log("guestsSearch: ", guestsSearch)
        setGuests(guestsSearch)
      })}
      
  },[isLoggedIn])

  const formOnChangeHandle = (e) => {
    console.log("e: ", e.target.value)
    let searchFriend = [...guestsSearch]
    setGuests(searchFriend.filter(friend => {
      console.log("searchFriend dins: ", friend)

      return (friend.name.toLowerCase().includes(e.target.value.toLowerCase()) || friend.username.toLowerCase().includes(e.target.value.toLowerCase()))
    }))
    console.log("searchFriend: ", searchFriend)
  }

  return (
    <div>
      <h1>Guests Page</h1>
      <Link to={"/plans/"+planId+"/invite"} className="btn btn-primary">Invite People</Link>
      <form onChange={formOnChangeHandle}>
        <input placeholder="Search users"/>
      </form>
      {guests?.length === 0 && <p>Still no guests for this plan</p>}
      {guests?.map(guest => {
                return <GuestComponent guest={guest} planId = {planId} key={guest._id}/>
            })}  
    </div>
  );
}

export default GuestsPlanPage;