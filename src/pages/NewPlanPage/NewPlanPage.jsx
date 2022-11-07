import "./NewPlanPage.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import planService from  '../../services/plan.service'
import { AuthContext } from "../../context/auth.context";

function NewPlanPage() {

  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [planImage, setPlanImage] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  // const [tags, setTags] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);


  const navigate = useNavigate();
  
  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleImage = (e) => setPlanImage(e.target.files[0]);
  const handleDate = (e) => setDate(e.target.value);
  const handleTime = (e) => setTime(e.target.value);
  const handleLocation = (e) => setLocation(e.target.value);
  // const handleTags = (e) => setTags(e.target.value);

  const handleNewPlamSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    // const requestBody = { email, password, name, username, gender, country, phoneNumber, birthdate, profileImage: uploadData}; //UPDATE MODEL
  
    const uploadData = new FormData();
    uploadData.append('title', title)
    uploadData.append('description', description)
    uploadData.append('planImage', planImage)
    uploadData.append('date', date)
    uploadData.append('time', time)
    uploadData.append('location', location)
    
    // uploadData.append('location', location)
    // uploadData.append('tags', tags)

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */

    // Or using a service
    planService
      .addPlan(user.username, uploadData)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/plans");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  

  return (
    <div>
      <h1>New Plan page</h1>
        <form onSubmit={handleNewPlamSubmit} encType="multipart/form-data">
        <label>Title:</label>
        <input type="title" name="title" value={title} onChange={handleTitle} />

        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={handleDescription}
        />

      <label>Plan Image:</label>
      <input type="file" name="planImage" onChange={handleImage}/>
      <br></br>

      <label>Date:</label>
      <input type="date" id="datePickerId" onChange={handleDate}/>

      <label htmlFor="appt">Choose a time for your meeting:</label>
<input type="time" id="appt" name="time" onChange={handleTime} required/>
 {/* min="09:00" max="18:00" */}
{/* <small>Office hours are 9am to 6pm</small> */}

<label>Location:</label>
      <input type="text" name="location" onChange={handleLocation}/>

        <button type="submit">Create Plan</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

    </div>
  );
}

export default NewPlanPage;