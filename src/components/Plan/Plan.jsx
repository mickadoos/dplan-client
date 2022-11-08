import "./Plan.css"
import { Link } from "react-router-dom";

export default function Plan ({plan}) {
    return(
        <div className="card col-3 m-3">
            <img src={plan.planImage} className="card-img-top" alt={plan.title} />
            <div className="card-body">
                <h5 className="card-title">{plan.title}</h5>
                <p className="card-text">{plan.description}</p>
                <p className="card-text">{plan.date}</p>
                <p className="card-text">{plan.time}</p>
                <p className="card-text">{plan.location}</p>
                <Link to={"/plans/"+plan._id}>View details</Link>
            </div>
        </div>
    );
}