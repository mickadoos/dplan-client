import "./AddFriendsPage.css";
import { useEffect } from "react";
import { useState } from "react";
import userService from "../../services/user.service.js"
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import PersonAddFriends from "../../components/Person/PersonAddFriends";


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
          setAddFriends(result.data)
        })
        .catch((err) => console.log(err))
      }    
    },[isLoggedIn, update])


  return (
    <div>
      <p>{user && user.username}</p>
      <h1>Add Friends page</h1>
      {addFriends.length === 0 && <p>No more people to add</p>}
      {addFriends.map(person => {
                return <PersonAddFriends person={person} updatePeople={updatePeople} key={person._id}/>
            })}  
    </div>
  );
}

export default AddFriendsPage;