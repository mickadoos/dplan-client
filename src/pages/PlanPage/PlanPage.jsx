import "./PlanPage.css";
import { useEffect, useState, useContext, React } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import planService from "../../services/plan.service";
import calendarLogo from "../../assets/calendar-icon.png";
import spotifyIcon from "../../assets/spotifyIcon.png";
import picsIcon from "../../assets/picsIcon.png";
import linkIcon from "../../assets/linkIcon.png";

import { LeafPoll, Result } from "react-leaf-polls";
import "react-leaf-polls/dist/index.css";
import AlertModal from "../../components/Alerts/AlertModal";
import locationIcon from "../../assets/location-marker-icon.png"
// Google Maps Places Autcomplete import
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import NewPlanMap from "../../components/Maps/NewPlanMap";

let guestsSearch;

function PlanPage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { planId } = useParams();
  const [plan, setPlan] = useState({});
  const [update, setUpdate] = useState(0);
  const [status, setStatus] = useState(false);

  const [showPoll, setShowPoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollAnswers, setPollAnswers] = useState([]);

  const [polls, setPolls] = useState([])

  const [guests, setGuests] = useState();

  const [alertMsg, setAlertMsg] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const updatePlan = (num) => {
    setUpdate(num);
  };

  let titleFromEvent = location.state?.title
  let messageFromEvent = location.state?.message

  const acceptHandle = () => {
    planService.acceptPlan(planId, user.username).then((resp) => {
      setStatus(true);
      setAlertMsg({
        title: "Accepted!",
        message: "You have accepted the plan!",
      })
      updatePlan(Math.random() * 1000);
    });
  };

  const declineHandle = () => {
    planService.declinePlan(planId, user.username).then((resp) => {
      setStatus(true);
      setAlertMsg({
        title: "Declined!",
        message: "You have declined the plan!",
      })
      updatePlan(Math.random() * 1000);
    });
  };

  useEffect(() => {
    planService.getPlan(planId).then((response) => {
      setPlan(response.data);
      setPolls(response.data.polls)
      // console.log(response.data.polls);
    });
  }, [isLoggedIn, planId, update]);

  useEffect(() => {
    if (isLoggedIn) {
      planService.getGuests(planId).then((resp) => {
        guestsSearch = [];
        if (resp.data.invited.length > 0) {
          resp.data.invited.map((guest) => {
            return guestsSearch.push(guest);
          });
        }
        if (resp.data.accepted.length > 0) {
          resp.data.accepted.map((guest1) => {
            return guestsSearch.push(guest1);
          });
        }
        if (resp.data.declined.length > 0) {
          resp.data.declined.map((guest2) => {
            return guestsSearch.push(guest2);
          });
        }
        setGuests(guestsSearch);
      });
    }
  }, [isLoggedIn, planId, update]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     planService.getGuests(planId).then((resp) => {
  //       guestsSearch = [];
  //       if (resp.data.invited.length > 0) {
  //         resp.data.invited.map((guest) => {
  //           return guestsSearch.push(guest);
  //         });
  //       }
  //       if (resp.data.accepted.length > 0) {
  //         resp.data.accepted.map((guest1) => {
  //           return guestsSearch.push(guest1);
  //         });
  //       }
  //       if (resp.data.declined.length > 0) {
  //         resp.data.declined.map((guest2) => {
  //           return guestsSearch.push(guest2);
  //         });
  //       }
  //       setGuests(guestsSearch);
  //     });
  //   }
  // }, [isLoggedIn, planId, update]);

  useEffect(() => {
    if (titleFromEvent){
      setAlertMsg({
        title: titleFromEvent,
        message: messageFromEvent
      })
    }
  }, [])

  const handleEdit = (e) => navigate("/plans/" + planId + "/edit");

  const planPhoto = {
    backgroundImage: `url(${plan.planImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center top",
    height: "50vh",
    // borderRadius: "10px"
  };

  const showPollHandler = () => {
    setShowPoll(true);
  };
  const cancelPollHandler = () => {
    setPollQuestion("");
    setShowPoll(false);
  };

  const handlePollQuestion = (e) => {
    if (e.target.value.trim().length !== 0) {
      setPollQuestion(e.target.value);
    }
  };

  const handlePollAnswers = (e) => {
    if (e.target.value.trim().length !== 0) {
      // if (
      //   pollAnswers.some(
      //     (obj) =>
      //       obj.pollAnswer1 === e.target.value &&
      //       obj.pollAnswer2 !== e.target.value
      //   )
      // ) {
      //     setPollAnswers([
      //       {
      //         [e.target.name]: e.target.value,
      //         votes: 0,
      //       },
      //     ]);
      //   } else {
      setPollAnswers([
        ...pollAnswers,
        {
          text: e.target.value,
          votes: 0,
        },
      ]);
    }

    // console.log(pollAnswers);
  };

  const addPollHandler = (e) => {
    e.preventDefault();

    const pollInfo = {
      pollQuestion,
      pollAnswers,
    };
    // console.log("pollInfo", pollInfo);

    planService
      .addPoll(planId, pollInfo)
      .then((resp) => {
        // console.log(resp.data);
        setPollQuestion("");
        setPollAnswers([]);
        setShowPoll(false);
        setUpdate(Math.random())
      })
      .catch((err) => {
        // console.log("Error addPoll service: ", err);
      });
  };

  //MANAGE POLL:
  // Persistent data array (typically fetched from the server)
  //data from polls

  // Object keys may vary on the poll type (see the 'Theme options' table below)
  const themeData = {
    textColor: '#19181f',
    mainColor: '#00B87B',
    backgroundColor: 'white',
    alignment: 'center',
    leftColor: '#00B87B',
    rightColor: '#FF2E00'
  }

  const vote = (item: Result, results: Result[]) => {
    planService.addVote(planId, item)
    // console.log('voted', item, results)
  }

  const errorHandler = () => {
    setAlertMsg(null);
  };

// DISPLAY MAP
const getCoordinatesMaps = async (value) => {
  const results = await geocodeByAddress(value);
  const latLng = await getLatLng(results[0])

  return latLng;
}


  return (
      <div className="planGenDiv">
      {alertMsg && (
        <AlertModal
          title={alertMsg.title}
          message={alertMsg.message}
          onErrorClick={errorHandler}
        />
      )}
      <div className="planDiv">
        <div className="headPlan" style = {planPhoto}>
          <div className="titleBgnd">
            <h2 className="title">{plan.title}</h2>
            <div className="planDetDateDiv"><img className="calendarlogoPlanDet" src={calendarLogo} alt="Calendar Icon"/><h6 className="dateInfo">Date: {plan.date} at {plan.time}</h6></div>
            <div className="DIV-BUTTONS buttonsPlan">
          {plan.isAdmin !== user.username && !status && (plan.invited?.includes(user._id) || plan.privacy === 'public') && !plan.accepted.includes(user._id) && !plan.declined.includes(user._id) &&
          <div className="">
                  <button
                    onClick={acceptHandle}
                    type="button"
                    className="btn btn-primary btn-success"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={declineHandle}
                    type="button"
                    className="btn btn-primary btn-danger declineButton"
                  >
                    Decline
                  </button>
                </div>
              }
            {(plan.isAdmin === user.username ||
              user.username === "moderador") && (
              <div>
                <button
                  type="button"
                  className="btn btn-secondary editPlanBut"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={handleEdit}
                >
                  Edit this plan
                </button>
              </div>
            )}
          </div>
          <p className="CreatedBy">
            Created by:{" "}
            <Link className="createdByUser" to={`/${plan.isAdmin}/profile`}>
              {plan.isAdmin === user.username ? "Me" : plan.isAdmin}
            </Link>
          </p>
        </div>
        <div className="DIV-GUESTSICON guestsPosition">
          {guests?.length > 0 && (
            <img
              className="guestsGlimpse"
              src={guests[0].profileImage}
              alt="guest profImg"
            />
          )}
          {guests?.length > 1 && (
            <img
              className="guestsGlimpse"
              src={guests[1].profileImage}
              alt="guest profImg"
            />
          )}
          {guests?.length > 2 && (
            <img
              className="guestsGlimpse"
              src={guests[2].profileImage}
              alt="guest profImg"
            />
          )}
          {/* <Link to={"/plans/"+planId+"/guests"}><img className="guestsIcon" src={guestsIcon} alt="Plan Guests"/></Link> */}
          <Link to={"/plans/" + planId + "/guests"}>
            <button className="btn guestsIcon">
              Guests
              <br />
              page
            </button>
          </Link>
        </div>
      </div>

        <div className="infoPlan">
            <div className="description">
              <h5 className="descriptionTitle">Description</h5>
              <p className="descriptionPlan">{plan.description}</p>
              <h6 className="mediaLinksTitle">Media Resources</h6>
              <div className="linkAnchorDiv">
              {plan.musicList?.length >= 3 && <a href={plan.musicList} className="linkAnchor" target="_blank" rel="noreferrer"><img className="linkIcon" src={spotifyIcon} alt="Spotify List"/></a>}
              {plan.photoCloud?.length >= 3 && <a href={plan.photoCloud} className="linkAnchor" target="_blank" rel="noreferrer"><img className="linkIcon" src={picsIcon} alt="Photos Cloud"/></a>}
              {plan.interestingLinks?.length >= 3 && <a href={plan.interestingLinks} className="linkAnchor" target="_blank" rel="noreferrer"><img className="linkIcon" src={linkIcon} alt="Other Links"/></a>}
              {plan.musicList?.length === 0 && plan.photoCloud?.length === 0 && plan.interestingLinks?.length === 0 && <p className="descriptionPlan">No media resources.</p>}
              </div>                
            </div>    
              
            <div className="description">
              <h5 className="locationTitle">Location</h5>
              <p className="descriptionPlan">{plan.location}</p>
            </div>
            <div className="description">
          <h5 className="locationTitle">{polls.length?"Polls":null}</h5>
          {polls && polls.map(poll => {
            return <LeafPoll
            key={poll._id}
            type="multiple"
            // className="poll"
            question={poll.pollQuestion}
            results={poll.pollAnswers}
            theme={themeData}
            onVote={vote}
            isVoted={false}
          />
          })}
          
        </div>   
        <div>      
              <p className="descriptionPlan"><a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${encodeURI(plan.location)}`} rel="noreferrer"><img className="locationIconPlan" src={locationIcon} alt="Location Icon"/> {plan.location}</a></p>
              <p>{plan.coordinates}</p>
            </div>    
            <a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${encodeURI(plan.location)}`} rel="noreferrer"><NewPlanMap lat={parseFloat(plan.latitud)} lng={parseFloat(plan.longitud)}></NewPlanMap> </a>
                     
        </div>

      </div>

      {!showPoll && plan.isAdmin === user.username &&  <button onClick={showPollHandler}>Add Poll</button>}

      {showPoll && (
        <form onSubmit={addPollHandler}>
          <label>Question</label>
          <br />
          <input
            type="text"
            name="pollQuestion"
            autoComplete="off"
            required
            onChange={handlePollQuestion}
          ></input>
          <br />
          <label>Answers</label>
          <br />
          <input
            type="text"
            name="pollAnswer1"
            autoComplete="off"
            required
            onBlur={handlePollAnswers}
            // onFocus={handlePollFocus}
          ></input>
          <br />
          <input
            type="text"
            name="pollAnswer2"
            autoComplete="off"
            required
            onBlur={handlePollAnswers}
            // onFocus={handlePollFocus}
          ></input>
          <br />
          <button type="submit">Save</button>
          <button onClick={cancelPollHandler}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default PlanPage;
