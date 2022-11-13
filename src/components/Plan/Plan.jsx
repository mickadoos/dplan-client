import "./Plan.css"
import { Link } from "react-router-dom";
import {React} from "react";

export default function Plan ({plan}) {
    return(
            // <div className="targeta targetaBgnd">
            //     <div className="details">
            //         <div className="divDetailsA">
            //             <div className="titleDiv"><h5 className="title">{plan._id.title === undefined? plan.title : plan._id.title}</h5></div>
            //             <div className="dateDiv"><p className="dateP">{plan._id.date === undefined? plan.date : plan._id.date} at {plan._id.time === undefined? plan.time : plan._id.time}</p></div>
            //         </div>
            //         <div className="divDetailsB">
            //         {/* Status color + background image color */}
            //             {/* {plan.status === "confirmed" && <div className="statusP"><p className="card-text statusConfirmed">{plan.status === undefined? "" : `${plan.status}`}</p></div>}
            //             {plan.status === "declined" && <div className="statusP"><p className="card-text statusDeclined">{plan.status === undefined? "" : `${plan.status}`}</p></div>}
            //             {plan.status === "pending" && <div className="statusP"><p className="card-text statusPending">{plan.status === undefined? "" : `${plan.status}`}</p></div>}
            //             {plan.status === "admin" && <div className="statusP"><p className="card-text statusAdmin">{plan.status === undefined? "" : `${plan.status}`}</p></div>} */}
            //         {/* Simple style */}
            //             <div className="statusP"><p className="card-text statusP2">{plan.status === undefined? "" : `${plan.status}`}</p></div>
            //             <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className="btn btn-light viewButton">View details</Link>
            //         </div>
            //     </div>
            // </div>



        //  <>   
        // {plan.status === "confirmed" && <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className="targeta targetaBgndConfirmedV2">
        // <div className="details">
        //     <div className="divDetailsA">
        //         <div className="titleDiv"><h5 className="title">{plan._id.title === undefined? plan.title : plan._id.title}</h5></div>
        //         <div className="dateDiv"><p className="dateP">{plan._id.date === undefined? plan.date : plan._id.date} at {plan._id.time === undefined? plan.time : plan._id.time}</p></div>
        //     </div>
        //     <div className="divDetailsB">
        //         <div className="statusP"><p className="card-text statusP2">{plan.status === undefined? "" : `${plan.status.toUpperCase()}`}</p></div>
        //         <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className="btn btn-light viewButton">View details</Link>
        //     </div>
        // </div>
        // </Link>}
        // {plan.status === "declined" && <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className="targeta targetaBgndDeclinedV2">
        // <div className="details">
        //     <div className="divDetailsA">
        //         <div className="titleDiv"><h5 className="title">{plan._id.title === undefined? plan.title : plan._id.title}</h5></div>
        //         <div className="dateDiv"><p className="dateP">{plan._id.date === undefined? plan.date : plan._id.date} at {plan._id.time === undefined? plan.time : plan._id.time}</p></div>
        //     </div>
        //     <div className="divDetailsB">
        //         <div className="statusP"><p className="card-text statusP2">{plan.status === undefined? "" : `${plan.status.toUpperCase()}`}</p></div>
        //         <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className="btn btn-light viewButton">View details</Link>
        //     </div>
        // </div>
        // </Link>}
        // {plan.status === "pending" && <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className="targeta targetaBgndPendingV2">
        // <div className="details">
        //     <div className="divDetailsA">
        //         <div className="titleDiv"><h5 className="title">{plan._id.title === undefined? plan.title : plan._id.title}</h5></div>
        //         <div className="dateDiv"><p className="dateP">{plan._id.date === undefined? plan.date : plan._id.date} at {plan._id.time === undefined? plan.time : plan._id.time}</p></div>
        //     </div>
        //     <div className="divDetailsB">
        //         <div className="statusP"><p className="card-text statusP2">{plan.status === undefined? "" : `${plan.status.toUpperCase()}`}</p></div>
        //         <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className="btn btn-light viewButton">View details</Link>
        //     </div>
        // </div>
        // </Link>}
        // {plan.status === "admin" && <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className="targeta targetaBgndAdmin">
        // <div className="details">
        //     <div className="divDetailsA">
        //         <div className="titleDiv"><h5 className="title">{plan._id.title === undefined? plan.title : plan._id.title}</h5></div>
        //         <div className="dateDiv"><p className="dateP">{plan._id.date === undefined? plan.date : plan._id.date} at {plan._id.time === undefined? plan.time : plan._id.time}</p></div>
        //     </div>
        //     <div className="divDetailsB">
        //         <div className="statusP"><p className="card-text statusP2">{plan.status === undefined? "" : `${plan.status.toUpperCase()}`}</p></div>
        //         <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className="btn btn-light viewButton">View details</Link>
        //     </div>
        // </div>
        // </Link>}
        // </>

        <>   
        {plan.status === "confirmed" && <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className="targeta targetaBgndAll targetaBgndConfirmedV2">
        <div className="details">
            <div className="divDetailsA">
                <div className="titleDiv"><h5 className="title">{plan._id.title === undefined? plan.title : plan._id.title}</h5></div>
                <div className="dateDiv"><p className="dateP">{plan._id.date === undefined? plan.date : plan._id.date} at {plan._id.time === undefined? plan.time : plan._id.time}</p></div>
            </div>
            <div className="divDetailsB">
                <div className="statusP"><p className="card-text statusP2">{plan.status === undefined? "" : `${plan.status.toUpperCase()}`}</p></div>
                <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className="btn btn-light viewButton">View details</Link>
            </div>
        </div>
        {/* <div className="targetaHover">
            <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`}><img src={plan._id.planImage} alt="Plan Pic"/></Link>
        </div> */}
        </Link>}
        {plan.status === "declined" && <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className="targeta targetaBgndAll targetaBgndDeclinedV2">
        <div className="details">
            <div className="divDetailsA">
                <div className="titleDiv"><h5 className="title">{plan._id.title === undefined? plan.title : plan._id.title}</h5></div>
                <div className="dateDiv"><p className="dateP">{plan._id.date === undefined? plan.date : plan._id.date} at {plan._id.time === undefined? plan.time : plan._id.time}</p></div>
            </div>
            <div className="divDetailsB">
                <div className="statusP"><p className="card-text statusP2">{plan.status === undefined? "" : `${plan.status.toUpperCase()}`}</p></div>
                <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className="btn btn-light viewButton">View details</Link>
            </div>
        </div>
        </Link>}
        {plan.status === "pending" && <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className="targeta targetaBgndAll targetaBgndPendingV2">
        <div className="details">
            <div className="divDetailsA">
                <div className="titleDiv"><h5 className="title">{plan._id.title === undefined? plan.title : plan._id.title}</h5></div>
                <div className="dateDiv"><p className="dateP">{plan._id.date === undefined? plan.date : plan._id.date} at {plan._id.time === undefined? plan.time : plan._id.time}</p></div>
            </div>
            <div className="divDetailsB">
                <div className="statusP"><p className="card-text statusP2">{plan.status === undefined? "" : `${plan.status.toUpperCase()}`}</p></div>
                <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className="btn btn-light viewButton">View details</Link>
            </div>
        </div>
        </Link>}
        {plan.status === "admin" && <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className="targeta targetaBgndAll targetaBgndAdmin">
        <div className="details">
            <div className="divDetailsA">
                <div className="titleDiv"><h5 className="title">{plan._id.title === undefined? plan.title : plan._id.title}</h5></div>
                <div className="dateDiv"><p className="dateP">{plan._id.date === undefined? plan.date : plan._id.date} at {plan._id.time === undefined? plan.time : plan._id.time}</p></div>
            </div>
            <div className="divDetailsB">
                <div className="statusP"><p className="card-text statusP2">{plan.status === undefined? "" : `${plan.status.toUpperCase()}`}</p></div>
                <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className="btn btn-light viewButton">View details</Link>
            </div>
        </div>
        </Link>}
        </>
            
    );
}