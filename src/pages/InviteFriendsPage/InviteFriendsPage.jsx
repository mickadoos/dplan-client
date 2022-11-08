import "./InviteFriendsPage.css";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams, Link } from "react-router-dom";
import userService from "../../services/user.service.js"
import PersonInvite from "../../components/Person/PersonInvite";

function InviteFriendsPage() {

  // const {planId} = useParams();
  const { isLoggedIn, user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [update, setUpdate] = useState(0)

  const updatePeople = (num) => {
    setUpdate(num)
  }

  useEffect(()=>{
    if (isLoggedIn){
      userService.getUserFriends(user.username) 
      .then (result =>{
        setFriends(result.data.friends)
      })
    }   
  },[isLoggedIn, update])

  return (
    <div>
      <h1>Invite People</h1>
      {friends.length === 0 && <p>You have no more friends to invite</p>}
      {friends.map(friend => {
                return <PersonInvite friend={friend} updatePeople={updatePeople} key={friend._id}/>
            })}  
    </div>
  );
}

export default InviteFriendsPage;