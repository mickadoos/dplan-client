import "./EditPlanPage.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import planService from "../../services/plan.service";

function EditPlanPage() {
  const {planId} = useParams();
  const [plan, setPlan] = useState({});

  const [title, setTitle] = useState("");
  const [planImage, setPlanImage] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);


  const navigate = useNavigate();

  useEffect(()=>{
    planService.getPlan(planId)
    .then(response => {
        setPlan(response.data);
    })

}, [planId])

const handleTitle = (e) => setTitle(e.target.value);

const handleEditSubmit = (e) => {
  e.preventDefault();
  const uploadData = new FormData();
  uploadData.append('title', title)
  // uploadData.append('planImage', planImage)
  // uploadData.append('description', description)
  // uploadData.append('date', date)
  // uploadData.append('time', time)
  // uploadData.append('location', location)
  
  console.log('UPLOAD DATA', uploadData)
  planService
  .editPlan(uploadData)
  .then((response) => {

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
                {/* <h5 className="card-title">{plan.title}</h5> */}
                <p className="card-text">{plan.description}</p>
                <p className="card-text">{plan.date}</p>
                <p className="card-text">{plan.time}</p>
                <p className="card-text">{plan.location}</p>
                {/* <a href="#" className="btn btn-danger">Go somewhere</a> */}

                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                    Update
                </button>

                <form onSubmit={handleEditSubmit}>
                <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Title</label>
                <input type="text"  
                    name="title" 
                    // value={plan.title}
                    onChange={handleTitle} className="form-control" id="formGroupExampleInput" placeholder="Title"/>
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