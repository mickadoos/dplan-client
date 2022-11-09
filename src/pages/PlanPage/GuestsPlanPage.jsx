import "./GuestsPlanPage.css";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams, Link } from "react-router-dom";
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
        resp.data.declined.map(guest => {
          return allGuests.push(guest)
        })
        setGuests(allGuests)
    })}
  },[isLoggedIn])

  return (
    <div>
      <h1>Guests Page</h1>
      <Link to={"/plans/"+planId+"/invite"} className="btn btn-primary">Invite People</Link>
      {guests.length === 0 && <p>Still no guests for this plan</p>}
      {guests.map(guest => {
                return <GuestComponent guest={guest} planId = {planId} key={guest._id}/>
            })}  
    </div>
  );
}

export default GuestsPlanPage;