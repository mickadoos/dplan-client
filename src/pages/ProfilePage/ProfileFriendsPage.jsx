import "./ProfileFriendsPage.css";
import { useEffect } from "react";
import { useState } from "react";
import userService from "../../services/user.service.js"
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams } from "react-router-dom";
import PersonUserFriends from "../../components/Person/PersonUserFriends";

let friendsSearch = [];

function ProfileFriendsPage() {

  const {username} = useParams();
  const { isLoggedIn, user } = useContext(AuthContext);
  const [friends, setFriends] = useState([])

    useEffect(()=>{
      if (isLoggedIn){
        // userService.getUserFriends(user.username) //Current user
        userService.getUserFriends(username) //Any user
        .then (result =>{
          console.log("result.data: ", result.data)
          friendsSearch = []
          friendsSearch = result.data.friends
          setFriends(friendsSearch)
        })
      }    
    },[isLoggedIn])

    const formOnChangeHandle = (e) => {
      console.log("e: ", e.target.value)
      let searchFriend = [...friendsSearch]
      setFriends(searchFriend.filter(friend => {
        console.log("searchFriend dins: ", friend)
  
        return (friend.name.toLowerCase().includes(e.target.value.toLowerCase()) || friend.username.toLowerCase().includes(e.target.value.toLowerCase()))
      }))
      console.log("searchFriend: ", searchFriend)
    }


  return (
    <div>
      <h1>{username} Friends page</h1>
      <form onChange={formOnChangeHandle}>
        <input placeholder="Search your friends"/>
      </form>
      {friends.length === 0 && <p>You still have no friends</p>}
      {friends.map(friend => {
                return <PersonUserFriends friend={friend} key={friend._id}/>
            })}  
    </div>
  );
}

export default ProfileFriendsPage;