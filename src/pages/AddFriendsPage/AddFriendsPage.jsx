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


    const formOnChangeHandle = (e) => {
      let searchFriend = [...friendsSearch]
      setAddFriends(searchFriend.filter(friend => {
        return (friend.name.toLowerCase().includes(e.target.value.toLowerCase()) || friend.username.toLowerCase().includes(e.target.value.toLowerCase()))
      }))
    }


  return (

    <div>
      <h1 className = "title">Add Friends</h1>
      <div className="input-group rounded">
        <form className = "searchBar" onChange={formOnChangeHandle}>
          <input type="search" className="form-control rounded" placeholder="Search users" />
        </form>
      </div>
      <div className = "contentContainerAddF">
      {addFriends.length === 0 && <p>No results</p>}
      {addFriends.map(person => {
        if(person.username !== 'moderador'){
                return <PersonAddFriends person={person} updatePeople={updatePeople} key={person._id}/>
  }
            })}  
      </div>
    </div>
  );
}

export default AddFriendsPage;