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
  const { isLoggedIn } = useContext(AuthContext);
  const [friends, setFriends] = useState([])

    useEffect(()=>{
      if (isLoggedIn){
        userService.getUserFriends(username)
        .then (result =>{
          friendsSearch = []
          friendsSearch = result.data.friends
          setFriends(friendsSearch)
        })
      }    
    },[isLoggedIn])

    const formOnChangeHandle = (e) => {
      let searchFriend = [...friendsSearch]
      setFriends(searchFriend.filter(friend => {
        return (friend.name.toLowerCase().includes(e.target.value.toLowerCase()) || friend.username.toLowerCase().includes(e.target.value.toLowerCase()))
      }))
    }


  return (
    <div>
      <h1>{username} Friends page</h1>
      <div className="input-group rounded">
        <form className = "searchBar" onChange={formOnChangeHandle}>
          <input type="search" className="form-control rounded" placeholder="Search friends" />
        </form>
      </div>
      <p className="totalFriends">Total friends: {friends.length}</p>
      <div className = "contentContainer">
      {friends.length === 0 && <p>You still have no friends</p>}
      {friends.map(friend => {
                return <PersonUserFriends friend={friend} key={friend._id}/>
            })}  
      </div>
    </div>
  );
}

export default ProfileFriendsPage;