import "./GuestsPlanPage.css";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams } from "react-router-dom";
import planService from "../../services/plan.service.js"
import GuestComponent from "../../components/Person/PersonGuests";

function GuestsPlanPage() {

  const {planId} = useParams();
  const { isLoggedIn, user } = useContext(AuthContext);
  const [guests, setGuests] = useState([]);
  
  useEffect (() => {
    if(isLoggedIn){
      planService.getGuests(planId)
      .then (resp => {
        console.log("GUESTS FRONT: ",resp.data)
        const allGuests = []
        resp.data.invited.map(guest => {
          return allGuests.push(guest)
        })
        resp.data.accepted.map(guest => {
          return allGuests.push(guest)
        })
        resp.data.denied.map(guest => {
          return allGuests.push(guest)
        })
        setGuests(allGuests)
        console.log("GUESTS INVITE: ",allGuests)
    })}
  },[isLoggedIn])

  return (
    <div>
      <h1>Guests Page</h1>
      {guests.length === 0 && <p>Still no guests for this plan</p>}
      {guests.map(guest => {
                return <GuestComponent guest={guest} key={guest._id}/>
            })}  
    </div>
  );
}

export default GuestsPlanPage;