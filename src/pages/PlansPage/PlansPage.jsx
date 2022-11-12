import "./PlansPage.css";
import { useContext, useEffect } from "react";
import { useState } from "react";
import userService from "../../services/user.service";
import Plan from "../../components/Plan/Plan";
import { AuthContext } from "../../context/auth.context";
import planService from "../../services/plan.service";

let allPlans;

function PlansPage() {

  const [plans, setPlans] = useState([]);
  const {isLoggedIn, user} = useContext(AuthContext);
  const [reset, setReset] = useState(false)

    useEffect(()=>{
      if(isLoggedIn) {
        userService.getUserPlans(user.username)
        .then(results => {
          allPlans = results.data.plans.map(plan => {
            return plan;
          })
            setPlans(allPlans)
            if((results.data.plans.length === 0 && user.username === "moderador")){
              planService.getPlans()
              .then(resp => {
              setPlans(resp.data)
              })
            }
        })
      }
    }, [isLoggedIn, reset]);

    const adminHandler = () => {
      setPlans(allPlans.filter(pla => {
        return pla.status === "admin"
      }))
    }

    const confirmedHandler = () => {
      setPlans(allPlans.filter(pla => {
        return pla.status === "confirmed"
      }))
    }

    const declinedHandler = () => {
      setPlans(allPlans.filter(pla => {
        return pla.status === "declined"
      }))
    }

    const pendingHandler = () => {
      setPlans(allPlans.filter(pla => {
        return pla.status === "pending"
      }))
    }

    const resetHandler = () => {
      setReset(!reset)
    }

    return (
      <div className="plansDiv">
        <h1>{user.username} Plans</h1>        
        <div className="buttonsStatus">
          <button className="butGen btn btn-dark" onClick={resetHandler}>All Plans</button>
          <button className="butGen btn btn-success" onClick={confirmedHandler}>Confirmed</button>
          <button className="butGen btn btn-danger" onClick={declinedHandler}>Declined</button>
          <button className="butGen btn btn-secondary" onClick={pendingHandler}>Pending</button>
          <button className="butGen myPlansBut btn btn-warning" onClick={adminHandler}>My Plans</button>
        </div>
        <div className="row justify-content-center">
          {plans.map((plan, k) => (
            <Plan plan={plan} key={k} />
          ))}
        </div>
        {plans.length <= 0 && <h5 className="noPlans">You don't have plans</h5>}
      </div>
    );
}

export default PlansPage;