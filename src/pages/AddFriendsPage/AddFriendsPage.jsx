import "./AddFriendsPage.css";
import { useEffect } from "react";
import { useState } from "react";
import userService from "../../services/user.service.js"
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import PersonAddFriends from "../../components/Person/PersonAddFriends";

let friendsSearch;

function AddFriendsPage() {

  const { isLoggedIn, user } = useContext(AuthContext);
  const [addFriends, setAddFriends] = useState([])
  const [update, setUpdate] = useState(0)

    const updatePeople = (num) => {
      setUpdate(num)
    }

    useEffect(()=>{
      if (isLoggedIn){
        userService.getAllUsers(user.username)
        .then (result =>{
          friendsSearch = result.data
          setAddFriends(friendsSearch)
        })
        .catch((err) => console.log(err))
      }    
    },[isLoggedIn, update])

    console.log("addFriends: ", addFriends)

    const formOnChangeHandle = (e) => {
      console.log("e: ", e.target.value)
      let searchFriend = [...friendsSearch]
      setAddFriends(searchFriend.filter(friend => {
        return (friend.name.toLowerCase().includes(e.target.value.toLowerCase()) || friend.username.toLowerCase().includes(e.target.value.toLowerCase()))
      }))
      console.log("searchFriend: ", searchFriend)
    }


  return (
    <div>
      {/* <p>{user && user.username}</p> */}
      <h1>Add Friends page</h1>
      <form onChange={formOnChangeHandle}>
        <input placeholder="Search users"/>
      </form>
      {addFriends.length === 0 && <p>No results</p>}
      {addFriends.map(person => {
                return <PersonAddFriends person={person} updatePeople={updatePeople} key={person._id}/>
            })}  
    </div>
  );
}

export default AddFriendsPage;