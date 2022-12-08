import "./NewPlanPage.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import planService from  '../../services/plan.service'
import { AuthContext } from "../../context/auth.context";
// Google Maps Places Autcomplete import
import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import NewPlanMap from "../../components/Maps/NewPlanMap";

function NewPlanPage() {

  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [planImage, setPlanImage] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [musicList, setMusicList] = useState("");
  const [photoCloud, setPhotoCloud] = useState("");
  const [interestingLinks, setInterestingLinks] = useState("");
  // const [tags, setTags] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);


  const navigate = useNavigate();
  
  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleImage = (e) => setPlanImage(e.target.files[0]);
  const handleDate = (e) => setDate(e.target.value);
  const handleTime = (e) => setTime(e.target.value);
  const handleLocation = (e) => setLocation(e.target.value);
  const handleMusicList = (e) => setMusicList(e.target.value);
  const handlePhotoCloud = (e) => setPhotoCloud(e.target.value);
  const handleInterestingLinks = (e) => setInterestingLinks(e.target.value);
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
    uploadData.append('musicList', musicList)
    uploadData.append('photoCloud', photoCloud)
    uploadData.append('interestingLinks', interestingLinks)

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

  //GOOGLE MAPS
    
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
  lat: null,
  lng: null
})

  const handleSelect = async value => {
  const results = await geocodeByAddress(value);

  const latLng = await getLatLng(results[0])
  console.log(latLng)
  setAddress(value)
  setCoordinates(latLng)
}

  

  return (
    <div className="newPlanDiv">
      <h1>Create Plan</h1>
        <form onSubmit={handleNewPlamSubmit} encType="multipart/form-data">
          <div className="gen titleDiv">
            <input type="title" className="titlePlan" name="title" placeholder="Title" value={title} onChange={handleTitle} />
          </div>
          <div className="gen descriptionDiv">
            <textarea
              type="textArea"
              className = "planDescription"
              placeholder="Description"
              name="description"
              value={description}
              onChange={handleDescription}
            />
          </div>
          <div className="gen dateDiv">
            <p className="dateTitle">Date & Time:</p>
            <input type="date" className="date" min={new Date().toISOString().split("T")[0]} id="datePickerId" onChange={handleDate}/>
          </div>
          <div className="gen time">
            <input type="time" className="date" id="appt" name="time" onChange={handleTime} required/>
          </div>
          <div className="gen locationDiv">
            {/* <input type="text" className="location" name="location" placeholder="Location" onChange={handleLocation}/> */}
         

          <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div 
          key={suggestions.description}
          >
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
              className='location' name="location" onSelect={handleLocation}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active w-50 m-auto'
                  : 'suggestion-item w-50 m-auto';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: 'lightblue', cursor: 'pointer' }
                  : { backgroundColor: 'white', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      </div>
      {/* <NewPlanMap></NewPlanMap> */} 
          {/* <div>
            <label>Plan Image:</label>
            <input type="file" name="planImage" onChange={handleImage}/>
            <br></br>
          </div> */}
          <br></br>
          <div className="planImage">
            <label className="form-label planImageTitle" htmlFor="customFile">Plan Image</label>
            <input type="file" className="form-control" name="planImage" id="planImage" onChange={handleImage} />
            <br></br>
          </div>
          <div className="gen locationDiv">
            <input type="text" className="location" name="musicList" placeholder="Spotify List" onChange={handleMusicList}/>
          </div>
          <div className="gen locationDiv">
            <input type="text" className="location" name="photoCloud" placeholder="Photos Cloud" onChange={handlePhotoCloud}/>
          </div>
          <div className="gen locationDiv">
            <input type="text" className="location" name="interestingLinks" placeholder="Link of interest" onChange={handleInterestingLinks}/>
          </div>
          <br></br>
          <div className="gen button">
            <button type="submit" className="btn btn-primary">Create Plan</button>
          </div>
      </form>
      {errorMessage && 
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
        {errorMessage}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      }
    </div>
  );
}

export default NewPlanPage;