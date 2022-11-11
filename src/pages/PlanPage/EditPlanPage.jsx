import "./EditPlanPage.css";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context"
import planService from "../../services/plan.service";


function EditPlanPage() {
  const {planId} = useParams();
  const [plan, setPlan] = useState({});
  const {isLoggedIn, user, isLoading} = useContext(AuthContext);


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [planImage, setPlanImage] = useState("");
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
    })

}, [planId])

const handleTitle = (e) => setTitle(e.target.value);
const handleDescription = (e) => setDescription(e.target.value);
const handleDate = (e) => setDate(e.target.value);
const handleTime = (e) => setTime(e.target.value);
const handleLocation = (e) => setLocation(e.target.value);
const handlePlanImage = (e) => setPlanImage(e.target.files[0]);

const cancelEdit = () => {navigate("/plans/" + planId)};
const deletePlan = () => {
  console.log('USER-------', user)
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
    location
  }
  
  planService
  .editPlan(planId, planBody)
  .then((response) => {
    navigate("/plans/" + planId)
  })
  .catch((error) => {
    const errorDescription = error.response.data.message;
    setErrorMessage(errorDescription);
  });

}


  return (
    <div className="newPlanDiv">
      <h1>Edit Plan</h1>
      <div className="">
        <div className="">
          <img className="planImage" src={plan.planImage} alt={plan.title} /><br/>
          {/* <!-- Button trigger modal --> */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Edit photo
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
            <div className="gen titleDiv">
              <label htmlFor="formGroupExampleInput" className="titlePlan">
                Title:{" "}
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleTitle}
                className="planDescription"
                id="formGroupExampleInput"
                placeholder={plan.title}
              />
            </div>
            <div className="gen descriptionDiv">
              <label htmlFor="formGroupExampleInput" className="titlePlan">
                Description:{" "}
              </label>
              <input
                type="textArea"
                name="description"
                value={description}
                onChange={handleDescription}
                className="planDescription"
                id="formGroupExampleInput"
                placeholder={plan.description}
              />
            </div>
            <div className="gen dateDiv">
              <label htmlFor="formGroupExampleInput" className="titlePlan">
                Date & Time:{" "}
              </label><br/>
              <input
                type="date"
                name="date"
                value={date}
                onChange={handleDate}
                className="date"
                id="formGroupExampleInput"
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
                id="formGroupExampleInput"
                placeholder={plan.time}
                required
              />
            </div>
            <div className="gen locationDiv">
              <label htmlFor="formGroupExampleInput" className="titlePlan">
                Location:{" "}
              </label>
              <input
                type="text"
                name="location"
                value={location}
                onChange={handleLocation}
                className="location"
                id="formGroupExampleInput"
                placeholder={plan.location}
              />
            </div>
            <button className="btn btn-success" type="submit">Edit Plan</button>
            <br/>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={cancelEdit}
            >
              Cancel changes
            </button><br/><br/><br/>
            <button
              className="btn btn-danger"
              type="button"
              onClick={deletePlan}
            >
              Delete Plan
            </button>
          </form>
        </div>

        {/* <div className="card-footer text-muted">
                {plan.pricePerDay} €/day
            </div> */}

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