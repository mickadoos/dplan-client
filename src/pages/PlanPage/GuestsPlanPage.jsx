import "./GuestsPlanPage.css";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams, Link, useNavigate } from "react-router-dom";
import planService from "../../services/plan.service.js"
import GuestComponent from "../../components/Person/PersonGuests";

let guestsSearch = [];

function GuestsPlanPage() {
  const navigate = useNavigate();

  const {planId} = useParams();
  const { isLoggedIn, user } = useContext(AuthContext);
  const [guests, setGuests] = useState();
  const [reset, setReset] = useState(false)

  
  useEffect (() => {
    if(isLoggedIn){
      planService.getGuests(planId)
      .then (resp => {
        console.log("GUESTS FRONT: ",resp.data)
        // const allGuests = []
        guestsSearch = []
        if(resp.data.invited.length > 0){
        resp.data.invited.map(guest => {
          return guestsSearch.push(guest)
        })}
        if(resp.data.accepted.length > 0){
        resp.data.accepted.map(guest1 => {
          return guestsSearch.push(guest1)
        })}
        if(resp.data.declined.length > 0){
        resp.data.declined.map(guest2 => {
          return guestsSearch.push(guest2)
        })}
        console.log("guestsSearch: ", guestsSearch)
        setGuests(guestsSearch)
      })}
      
  },[isLoggedIn, reset])

  const formOnChangeHandle = (e) => {
    console.log("e: ", e.target.value)
    let searchFriend = [...guestsSearch]
    setGuests(searchFriend.filter(friend => {
      console.log("searchFriend dins: ", friend)

      return (friend.name.toLowerCase().includes(e.target.value.toLowerCase()) || friend.username.toLowerCase().includes(e.target.value.toLowerCase()))
    }))
    console.log("searchFriend: ", searchFriend)
  }

  const confirmedHandler = () => {
    setGuests(guestsSearch.filter(guest => {
      return guest.plans.some(pla => (pla._id === planId && pla.status === "confirmed"))
    }))
    console.log("guestsSearch: ", guestsSearch)
  }

  const declinedHandler = () => {
    setGuests(guestsSearch.filter(guest => {
      return guest.plans.some(pla => (pla._id === planId && pla.status === "declined"))
    }))
    console.log("guestsSearch: ", guestsSearch)
  }

  const pendingHandler = () => {
    setGuests(guestsSearch.filter(guest => {
      return guest.plans.some(pla => (pla._id === planId && pla.status === "pending"))
    }))
    console.log("guestsSearch: ", guestsSearch)
  }

  const resetHandler = () => {
    setReset(!reset)
  }

  const cancelEdit = () => {navigate("/plans/" + planId)};


  return (
    <div>
      <h1>Guests Page</h1>
      <Link to={"/plans/"+planId+"/invite"} className="btn btn-primary invite">Invite People</Link>
      <div className="input-group rounded">
        <form className = "searchBar" onChange={formOnChangeHandle}>
          <input type="search" className="form-control rounded" placeholder="Search users" />
        </form>
      </div>
      <section className="buttonsStatus">
          <button className="butGen btn btn-dark" onClick={resetHandler}>All Guests</button>
          <button className="butGen btn btn-success" onClick={confirmedHandler}>Confirmed</button>
          <button className="butGen btn btn-danger" onClick={declinedHandler}>Declined</button>
          <button className="butGen btn btn-secondary" onClick={pendingHandler}>Pending</button>
      </section>
      <div className = "contentContainer">
      {guests?.length === 0 && <p>Still no guests for this plan</p>}
      {guests?.map((guest, k) => {
                return <GuestComponent guest={guest} planId = {planId} key={k}/>
            })}  
      </div>
    </div>
  );
}

export default GuestsPlanPage;