import "./ProfileFriendsPage.css";
import { useEffect } from "react";
import { useState } from "react";
import userService from "../../services/user.service.js"
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import PersonUserFriends from "../../components/Person/PersonUserFriends";


function ProfileFriendsPage() {

  const { isLoggedIn, user } = useContext(AuthContext);
  const [friends, setFriends] = useState([])

    useEffect(()=>{
      if (isLoggedIn){
        userService.getUserFriends(user.username)
        .then (result =>{
          setFriends(result.data.friends)
        })
      }    
    },[isLoggedIn])


  return (
    <div>
      <h1>{user && user.username} Friends page</h1>
      {friends.length === 0 && <p>You still have no friends</p>}
      {friends.map(friend => {
                return <PersonUserFriends friend={friend} key={friend._id}/>
            })}  
    </div>
  );
}

export default ProfileFriendsPage;