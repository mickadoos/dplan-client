import "./InviteFriendsPage.css";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams, Link } from "react-router-dom";
import userService from "../../services/user.service.js"
import PersonInvite from "../../components/Person/PersonInvite";

function InviteFriendsPage() {

  const {planId} = useParams();
  const { isLoggedIn, user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [friends2, setFriends2] = useState([]);
  const [update, setUpdate] = useState(0)

  const updatePeople = (num) => {
    setUpdate(num)
  }

  useEffect(()=>{
    if (isLoggedIn){
      userService.getUserFriends(user.username) 
      .then (result =>{

        let friendsNotInvited = [...result.data.friends]
        console.log("FRIENDS NOT INVITED 0: ",friendsNotInvited)
        friendsNotInvited.forEach(friend => {
          friend.plans.forEach(plan => {
            if(plan._id === planId){
              console.log("INSIDE IF!!! - planFriend/Plan/friend: ", plan._id, planId, friend)
              let index = friendsNotInvited.indexOf(friend)
              console.log("INDEX OF YABEL", index)
              friendsNotInvited.splice(index, 1)
            }
          })
        })
        console.log("FRIENDS NOT INVITED 1: ",friendsNotInvited)
        setFriends(result.data.friends)
        setFriends2(friendsNotInvited)
        
      })
    }   
  },[isLoggedIn, update])

  return (
    <div>
      <h1>Invite People</h1>
      {friends2.length === 0 && <p>You have no more friends to invite</p>}
      {friends2.map(friend => {
                return <PersonInvite friend={friend} updatePeople={updatePeople} key={friend._id}/>
            })}  
    </div>
  );
}

export default InviteFriendsPage;