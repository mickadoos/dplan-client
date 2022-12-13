import "./PlansPage.css";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import userService from "../../services/user.service";
import Plan from "../../components/Plan/Plan";
import { AuthContext } from "../../context/auth.context";
import planService from "../../services/plan.service";
import AlertModal from "../../components/Alerts/AlertModal";

let allPlans;
let allPlansUnexpired;

function PlansPage() {
  const [plans, setPlans] = useState([]);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [reset, setReset] = useState(false);
  var currentTime = new Date();

  const [AlertMsg, setAlertMsg] = useState(null);
  const location = useLocation();

  let titleFromEvent = location.state?.title
  let messageFromEvent = location.state?.message
  console.log("titleFromEvent: ", titleFromEvent)

  useEffect(() => {
    if (isLoggedIn) {
      userService.getUserPlans(user.username).then((results) => {
        allPlans = results.data.plans.map((plan) => {
          return plan;
        });
        allPlansUnexpired = allPlans.filter((plan) => {
          let planDate = new Date(plan._id.date);
          return planDate >= currentTime;
        });
        setPlans(allPlansUnexpired);
        if (results.data.plans.length === 0 && user.username === "moderador") {
          planService.getPlans().then((resp) => {
            setPlans(resp.data);
          });
        }
      });
    }
  }, [isLoggedIn, reset]);

  useEffect(() => {
    if (titleFromEvent){
      setAlertMsg({
        title: titleFromEvent,
        message: messageFromEvent
      })
    }
  }, [])

  const adminHandler = () => {
    setPlans(
      allPlans.filter((pla) => {
        let plaDate = new Date(pla._id.date);
        return pla.status === "admin" && plaDate > currentTime;
      })
    );
  };

  const confirmedHandler = () => {
    setPlans(
      allPlans.filter((pla) => {
        let plaDate = new Date(pla._id.date);
        return pla.status === "confirmed" && plaDate > currentTime;
      })
    );
  };

  const declinedHandler = () => {
    setPlans(
      allPlans.filter((pla) => {
        let plaDate = new Date(pla._id.date);
        return pla.status === "declined" && plaDate > currentTime;
      })
    );
  };

  const pendingHandler = () => {
    setPlans(
      allPlans.filter((pla) => {
        let plaDate = new Date(pla._id.date);
        return pla.status === "pending" && plaDate > currentTime;
      })
    );
  };

  const expiredHandler = () => {
    setPlans(
      allPlans.filter((pla) => {
        let plaDate = new Date(pla._id.date);
        return plaDate < currentTime;
      })
    );
  };

  const resetHandler = () => {
    setReset(!reset);
  };

  const errorHandler = () => {
    setAlertMsg(null);
  };

  return (
    <div className="plansDiv">
      <h1>{user.username} Plans</h1>
      {/* Buttons colored */}
      {/* <div className="buttonsStatus">
          <button className="butGen btn btn-dark" onClick={resetHandler}>All Plans</button>
          <button className="butGen btn btn-success" onClick={confirmedHandler}>Confirmed</button>
          <button className="butGen btn btn-danger" onClick={declinedHandler}>Declined</button>
          <button className="butGen btn btn-secondary" onClick={pendingHandler}>Pending</button>
          <button className="butGen myPlansBut btn btn-warning" onClick={adminHandler}>My Plans</button>
        </div> */}
      {/* Buttons colors Simple */}
      <div className="buttonsStatus">
        <button className="butGen btn btn-dark" onClick={resetHandler}>
          All Plans
        </button>
        <button className="butGen btn btn-primary" onClick={confirmedHandler}>
          Confirmed (
          {
            allPlans?.filter((pla) => {
              let plaDate = new Date(pla._id.date);
              return pla.status === "confirmed" && plaDate > currentTime;
            }).length
          }
          )
        </button>
        <button className="butGen btn btn-secondary" onClick={declinedHandler}>
          Declined (
          {
            allPlans?.filter((pla) => {
              let plaDate = new Date(pla._id.date);
              return pla.status === "declined" && plaDate > currentTime;
            }).length
          }
          )
        </button>
        <button className="butGen btn btn-light" onClick={pendingHandler}>
          Pending (
          {
            allPlans?.filter((pla) => {
              let plaDate = new Date(pla._id.date);
              return pla.status === "pending" && plaDate > currentTime;
            }).length
          }
          )
        </button>
        <button className="butGen btn btn-danger" onClick={expiredHandler}>
          Expired (
          {
            allPlans?.filter((pla) => {
              let plaDate = new Date(pla._id.date);
              return plaDate < currentTime;
            }).length
          }
          )
        </button>
        <button
          className="butGen myPlansBut btn btn-warning"
          onClick={adminHandler}
        >
          My Plans (
          {
            allPlans?.filter((pla) => {
              let plaDate = new Date(pla._id.date);
              return pla.status === "admin" && plaDate > currentTime;
            }).length
          }
          )
        </button>
      </div>
      <div className="row justify-content-center">
        {plans
          .sort((a, b) => new Date(a._id.date) - new Date(b._id.date))
          .map((plan, k) => (
            <Plan plan={plan} key={k} />
          ))}
      </div>
      {plans.length <= 0 && <h5 className="noPlans">You don't have plans</h5>}
      {AlertMsg && (
        <AlertModal
          title={AlertMsg.title}
          message={AlertMsg.message}
          onErrorClick={errorHandler}
        />
      )}
    </div>
  );
}

export default PlansPage;
