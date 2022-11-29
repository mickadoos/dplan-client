import "./Plan.css"
import { Link } from "react-router-dom";
import {React} from "react";
import calendarLogo from "../../assets/calendar-icon.png"


export default function Plan ({plan}) {
    var currentTime = new Date()
    
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
        {plan.status === "confirmed" && <div to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className={new Date(plan._id.date) >= currentTime? "targeta targetaBgndAll targetaBgndConfirmedV2" : "targeta targetaBgndAll targetaBgndExpired"}>
        <div className="details">
            <div className="divDetailsA">
                <div className="titleDiv"><h5 className="planTitle">{plan._id.title === undefined? plan.title : plan._id.title}</h5></div>
                <div className="plansDateDiv"><img className="calendarlogo" src={calendarLogo} alt="Calendar Icon"/><p className="planDate">{plan._id.date === undefined? plan.date : plan._id.date} at {plan._id.time === undefined? plan.time : plan._id.time}</p></div>
            </div>
            <div className="divDetailsB">
                <div className="statusP"><p className="card-text statusP2">{plan.status === undefined? "" : `${plan.status.toUpperCase()}`}</p></div>
                <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className="btn btn-light viewButton">View details</Link>
            </div>
        </div>
        </div>}

        {plan.status === "declined" && <div to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className={new Date(plan._id.date) >= currentTime? "targeta targetaBgndAll targetaBgndDeclinedV2" : "targeta targetaBgndAll targetaBgndExpired"}>
        <div className="details">
            <div className="divDetailsA">
                <div className="titleDiv"><h5 className="planTitle">{plan._id.title === undefined? plan.title : plan._id.title}</h5></div>
                <div className="plansDateDiv"><img className="calendarlogo" src={calendarLogo} alt="Calendar Icon"/><p className="planDate">{plan._id.date === undefined? plan.date : plan._id.date} at {plan._id.time === undefined? plan.time : plan._id.time}</p></div>
            </div>
            <div className="divDetailsB">
                <div className="statusP"><p className="card-text statusP2">{plan.status === undefined? "" : `${plan.status.toUpperCase()}`}</p></div>
                <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className="btn btn-light viewButton">View details</Link>
            </div>
        </div>
        </div>}

        {plan.status === "pending" && <div to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className={new Date(plan._id.date) >= currentTime? "targeta targetaBgndAll targetaBgndPendingV2" : "targeta targetaBgndAll targetaBgndExpired"}>
        <div className="details">
            <div className="divDetailsA">
                <div className="titleDiv"><h5 className="planTitle">{plan._id.title === undefined? plan.title : plan._id.title}</h5></div>
                <div className="plansDateDiv"><img className="calendarlogo" src={calendarLogo} alt="Calendar Icon"/><p className="planDate">{plan._id.date === undefined? plan.date : plan._id.date} at {plan._id.time === undefined? plan.time : plan._id.time}</p></div>
            </div>
            <div className="divDetailsB">
                <div className="statusP"><p className="card-text statusP2">{plan.status === undefined? "" : `${plan.status.toUpperCase()}`}</p></div>
                <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className="btn btn-light viewButton">View details</Link>
            </div>
        </div>
        </div>}

        {plan.status === "admin" && <div to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className={new Date(plan._id.date) >= currentTime? "targeta targetaBgndAll targetaBgndAdmin" : "targeta targetaBgndAll targetaBgndExpired"}>
        <div className="details">
            <div className="divDetailsA">
                <div className="titleDiv"><h5 className="planTitle">{plan._id.title === undefined? plan.title : plan._id.title}</h5></div>
                <div className="plansDateDiv"><img className="calendarlogo" src={calendarLogo} alt="Calendar Icon"/><p className="planDate">{plan._id.date === undefined? plan.date : plan._id.date} at {plan._id.time === undefined? plan.time : plan._id.time}</p></div>
            </div>
            <div className="divDetailsB">
                <div className="statusP"><p className="card-text statusP2">{plan.status === undefined? "" : `${plan.status.toUpperCase()}`}</p></div>
                <Link to={plan._id._id === undefined? `/plans/${plan._id}` : `/plans/${plan._id._id}`} className="btn btn-light viewButton">View details</Link>
            </div>
        </div>
        </div>}
        </>
            
    );
}