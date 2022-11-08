import "./EditPlanPage.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import planService from "../../services/plan.service";

function EditPlanPage() {
  const {planId} = useParams();
  const [plan, setPlan] = useState({});

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
    })

}, [planId])

const handleTitle = (e) => setTitle(e.target.value);
const handleDescription = (e) => setDescription(e.target.value);
const handleDate = (e) => setDate(e.target.value);
const handleTime = (e) => setTime(e.target.value);
const handleLocation = (e) => setLocation(e.target.value);
const handlePlanImage = (e) => setPlanImage(e.target.files[0]);

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
    <div>
      <h1>Edit Plan page</h1>
      <div className="card text-center">
            <div className="card-body">
            <img src={plan.planImage} alt={plan.title} />
               {/* <!-- Button trigger modal --> */}
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <form onSubmit={handleImageSubmit} encType="multipart/form-data">
      <div className="modal-body">
      <input type="file" name="planImage" onChange={handlePlanImage}/>
      </div>
      <div className="modal-footer">
        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
      </form>

    </div>
  </div>
</div>
                <form onSubmit={handleEditSubmit}>
                <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Title: </label>
                <input type="text"  
                    name="title" 
                    // value={plan.title}
                    onChange={handleTitle} className="form-control" id="formGroupExampleInput" placeholder={plan.title}/>
                </div>
                <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Description: </label>
                <input type="text"  
                    name="description" 
                    // value={plan.title}
                    onChange={handleDescription} className="form-control" id="formGroupExampleInput" placeholder={plan.description}/>
                </div>
                <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Date: </label>
                <input type="date"  
                    name="date" 
                    // value={plan.date}
                    onChange={handleDate} className="form-control" id="formGroupExampleInput" placeholder={plan.date}/>
                </div>
                <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Time: </label>
                <input type="time"  
                    name="time" 
                    // value={plan.time}
                    onChange={handleTime} className="form-control" id="formGroupExampleInput" placeholder={plan.time} required/>
                </div>
                <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Location: </label>
                <input type="text"  
                    name="location" 
                    // value={plan.title}
                    onChange={handleLocation} className="form-control" id="formGroupExampleInput" placeholder={plan.location}/>
                </div>
                 <button type="submit">Edit Plan</button>
                </form>
            </div>

            {/* <div className="card-footer text-muted">
                {plan.pricePerDay} €/day
            </div> */}

            {/* modal */}
            
            </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

    </div>
  );
}

export default EditPlanPage;