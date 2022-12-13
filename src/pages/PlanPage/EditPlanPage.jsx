import "./EditPlanPage.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import planService from "../../services/plan.service";
import spotifyIcon from "../../assets/spotifyIcon.png";
import picsIcon from "../../assets/picsIcon.png"
import linkIcon from "../../assets/linkIcon.png"
import locationIcon from "../../assets/locationIcon.webp"
// Google Maps Places Autcomplete import
import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


function EditPlanPage() {
  const {planId} = useParams();
  const [plan, setPlan] = useState({});

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [latitud, setLatitud] = useState(null);
  const [longitud, setLongitud] = useState(null);
  const [planImage, setPlanImage] = useState("");
  const [musicList, setMusicList] = useState("");
  const [photoCloud, setPhotoCloud] = useState("");
  const [interestingLinks, setInterestingLinks] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [errorMessage, setErrorMessage] = useState(undefined);


  const navigate = useNavigate();

  useEffect(()=>{
    planService.getPlan(planId)
    .then(response => {
        setPlan(response.data);
        setTitle(response.data.title)
        setDescription(response.data.description)
        setDate(response.data.date)
        setTime(response.data.time)
        setLocation(response.data.location)
        setMusicList(response.data.musicList);
        setPhotoCloud(response.data.photoCloud);
        setInterestingLinks(response.data.interestingLinks);
    })

}, [planId])

const handleTitle = (e) => setTitle(e.target.value);
const handleDescription = (e) => setDescription(e.target.value);
const handleDate = (e) => setDate(e.target.value);
const handleTime = (e) => setTime(e.target.value);
const handleLocation = (e) => setLocation(e.target.value);
const handlePlanImage = (e) => setPlanImage(e.target.files[0]);
const handleMusicList = (e) => setMusicList(e.target.value);
const handlePhotoCloud = (e) => setPhotoCloud(e.target.value);
const handleInterestingLinks = (e) => setInterestingLinks(e.target.value);
const handlePrivacy = (e) => setPrivacy(e.target.value);


const cancelEdit = () => {navigate("/plans/" + planId)};
const deletePlan = () => {
  planService
  .deletePlan(planId)
  .then(response => {
    navigate("/plans")
  })
  .catch((error) => {
    const errorDescription = error.response.data.message;
    setErrorMessage(errorDescription);
  })
}

const handleImageSubmit = (e) => {
  e.preventDefault();
  const uploadData = new FormData();
  uploadData.append('planImage', planImage)

  planService
  .editPlan(planId, uploadData)
  .then((response) => {
    navigate("/plans/" + planId)
  })
  .catch((error) => {
    const errorDescription = error.response.data.message;
    setErrorMessage(errorDescription);
  });
}

const handleEditSubmit = (e) => {
  e.preventDefault();
  const planBody = {
    title,
    description, 
    date,
    time,
    location,
    musicList,
    photoCloud,
    interestingLinks,
    latitud,
    longitud,
    privacy
  }
  
  planService
  .editPlan(planId, planBody)
  .then((response) => {
    navigate("/plans/" + planId, {
      state: {
        title: "Plan edited successfully!",
        message: `The plan: ${title} has been edited!`
      }
    })
  })
  .catch((error) => {
    const errorDescription = error.response.data.message;
    setErrorMessage(errorDescription);
  });

}

    
//GOOGLE MAPS
    
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState({
  lat: null,
  lng: null
})

  const handleSelect = async value => {
  const results = await geocodeByAddress(value);

  const latLng = await getLatLng(results[0])
  setAddress(value)
  setCoords(latLng)
  setLatitud(latLng.lat)
  setLongitud(latLng.lng)

}

  return (
    <div className="editPlanDiv">
      <h1>Edit Plan</h1>
      <div className="">
        <div className="">
          <img className="planImage" src={plan.planImage} alt={plan.title} /><br/>
          {/* <!-- Button trigger modal --> */}
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Edit wallpaper
          </button>

          {/* <!-- Modal --> */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Edit plan image
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <form
                  onSubmit={handleImageSubmit}
                  encType="multipart/form-data"
                >
                  <div className="modal-body">
                    <input
                      type="file"
                      name="planImage"
                      onChange={handlePlanImage}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Save changes
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <form onSubmit={handleEditSubmit}>
            <div className="gen titleDivEdit">
              <label htmlFor="formGroupExampleInput" className="titlePlan">
                Title:{" "}
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleTitle}
                className="titlePlan"
                id="formGroupExampleInput"
                placeholder={plan.title}
              />
            </div>
            <div className="gen descriptionDivEdit">
              <label htmlFor="formGroupExampleInput" className="titlePlan">
                Description:{" "}
              </label>
              <textarea
                type="textArea"
                name="description"
                value={description}
                onChange={handleDescription}
                className="planDescription"
                id="descriptionLabel"
                placeholder={plan.description}
              />
            </div>
            <div className="gen dateDiv">
              <label htmlFor="dateLabel" className="titlePlan">
                Date & Time:{" "}
              </label><br/>
              <input
                type="date"
                name="date"
                
                min={new Date().toLocaleDateString('en-ca')}
                value={date}
                onChange={handleDate}
                className="date"
                id="dateLabel"
                placeholder={plan.date}
                required
              />
            </div>
            <div className="gen time">
              {/* <label htmlFor="formGroupExampleInput" className="form-label">
                Time:{" "}
              </label> */}
              <input
                type="time"
                name="time"
                value={time}
                onChange={handleTime}
                className="date"
                placeholder={plan.time}
                required
              />
            </div>
            <div className="gen locationDiv">
            <img src={locationIcon} alt="location icon" className="iconPng"/>

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
                className: 'location-search-input',
              })}
              className='location' placeholder={plan.location} name="location" onSelect={handleLocation} id="locationLabel"
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
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

          
            <br></br>
            <div className="gen linksDiv">
              <img src={spotifyIcon} alt="music icon" className="iconPng"/>
              <input type="text" className="location" name="musicList" placeholder={plan.musicList} onChange={handleMusicList}/>
            </div>
            <div className="gen linksDiv">
              <img src={picsIcon} alt="pics icon" className="iconPng"/>
              <input type="text" className="location" name="photoCloud" placeholder={plan.photoCloud} onChange={handlePhotoCloud}/>
            </div>
            <div className="gen linksDiv">
              <img src={linkIcon} alt="link icon" className="iconPng"/>
              <input type="text" className="location" name="interestingLinks" placeholder={plan.interestingLinks} onChange={handleInterestingLinks}/>
            </div>
            <div>
          <input type="radio" id="public" name="privacy" value="public" onChange={handlePrivacy}/>
          <label htmlFor="public">public</label>
          <input type="radio" id="private" name="privacy" value="private" onChange={handlePrivacy}/>
          <label htmlFor="private">private</label>
          <p>{plan.privacy}</p>
          </div>

            <div className="twoButs">
              <button className="btn btn-primary but" type="submit">Edit Plan</button>
              <br/>
              <button
                className="btn btn-secondary but"
                type="button"
                onClick={cancelEdit}
              >
                Cancel changes
              </button>
            </div>
            <button
              className="btn btn-danger"
              type="button"
              onClick={deletePlan}
            >
              Delete Plan
            </button>
          </form>
        </div>

        {/* modal */}
      </div>
      {errorMessage && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {errorMessage}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
    </div>
  );
}

export default EditPlanPage;