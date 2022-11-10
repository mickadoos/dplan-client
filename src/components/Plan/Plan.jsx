import "./Plan.css"
import { Link } from "react-router-dom";

export default function Plan ({plan}) {
    console.log("plan: ", plan._id._id)
    return(
        <div className="card col-3 m-3">
            <img src={plan._id.planImage === undefined? plan.planImage : plan._id.planImage} className="card-img-top" alt={plan._id.planImage === undefined? plan.planImage : plan._id.planImage} />
            <div className="card-body">
                <h5 className="card-title">{plan._id.title === undefined? plan.title : plan._id.title}</h5>
                <p className="card-text">{plan._id.description === undefined? plan.description : plan._id.description}</p>
                <p className="card-text">{plan._id.date === undefined? plan.date : plan._id.date}</p>
                <p className="card-text">{plan._id.time === undefined? plan.time : plan._id.time}</p>
                <p className="card-text">{plan._id.location === undefined? plan.location : plan._id.location}</p>
                <p className="card-text">{plan.status === undefined? "" : `Status: ${plan.status}`}</p>
                <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`}>View details</Link>
            </div>
        </div>
    );
}