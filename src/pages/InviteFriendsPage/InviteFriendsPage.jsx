import "./InviteFriendsPage.css";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams } from "react-router-dom";
import userService from "../../services/user.service.js"
import PersonInvite from "../../components/Person/PersonInvite";
import AlertModal from "../../components/Alerts/AlertModal";

function InviteFriendsPage() {

  const {planId} = useParams();
  const { isLoggedIn, user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [update, setUpdate] = useState(0)

  const [AlertMsg, setAlertMsg] = useState(null);

  const updatePeople = (num, username) => {
    setAlertMsg({
      title: `Invitation successfully sent to ${username}`,
      message: `${username} will now have an invitation to this plan!`,
    })
    setUpdate(num)
  }

  useEffect(()=>{
    if (isLoggedIn){
      userService.getUserFriends(user.username) 
      .then (result =>{
        let friendsNotInvited = result.data.friends.filter(friend => {
          let friendInPlan = false
          friend.plans.forEach (plan => {
            if(plan._id === planId){
              friendInPlan = true
            }
          })
          return !friendInPlan
        })
        setFriends(friendsNotInvited)        
      })
    }   
  },[isLoggedIn, update])

  const errorHandler = () => {
    setAlertMsg(null);
  };

  return (
    <div className="inviteFriendsDiv">
      <h1>Invite People</h1>
      <div className = "contentContainerInvite">
      {friends.length === 0 && <p>You have no more friends to invite</p>}
      {friends.map(friend => {
                return <PersonInvite friend={friend} updatePeople={updatePeople} key={friend._id}/>
            })} 
      </div>
      {AlertMsg && (
        <AlertModal
          title={AlertMsg.title}
          message={AlertMsg.message}
          onErrorClick={errorHandler}
        />
      )}
    </div>
  );
}

export default InviteFriendsPage;