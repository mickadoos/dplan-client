import "./AddFriendsPage.css";
import { useEffect } from "react";
import { useState } from "react";
import userService from "../../services/user.service.js"
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import PersonComponent from "../../components/Person/Person.Component";


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
      }    
    },[isLoggedIn, update])


  return (
    <div>
      <p>{user && user.username}</p>
      <h1>Add Friends page</h1>
      {addFriends.length === 0 && <p>No more people to add</p>}
      {addFriends.map(person => {
                return <PersonComponent person={person} updatePeople={updatePeople} key={person._id}/>
            })}  
    </div>
  );
}

export default AddFriendsPage;