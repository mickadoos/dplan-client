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
          console.log("results get User Plans: ", results.data.plans.length)
          allPlans = results.data.plans.map(plan => {
            return plan;
          })
            setPlans(allPlans)
            if((results.data.plans.length === 0 && user.username === "moderador")){
              planService.getPlans()
              .then(resp => {
                console.log("resp inside length mod: ", resp.data)
              setPlans(resp.data)
              })
            }
        })
      }
    }, [isLoggedIn, reset]);
    console.log("allPlans useEffect: ", allPlans)

    const adminHandler = () => {
      setPlans(allPlans.filter(pla => {
        return pla.status === "admin"
      }))
      console.log("allPlans admin: ", allPlans)
    }

    const confirmedHandler = () => {
      setPlans(allPlans.filter(pla => {
        return pla.status === "confirmed"
      }))
      console.log("allPlans admin: ", allPlans)
    }

    const declinedHandler = () => {
      setPlans(allPlans.filter(pla => {
        return pla.status === "declined"
      }))
      console.log("allPlans admin: ", allPlans)
    }

    const pendingHandler = () => {
      setPlans(allPlans.filter(pla => {
        return pla.status === "pending"
      }))
      console.log("allPlans admin: ", allPlans)
    }

    const resetHandler = () => {
      setReset(!reset)
    }

    return (
      <div className="container">
        <h1>Plans Page</h1>
        <section>
          <button onClick={resetHandler}>All Plans</button>
          <button onClick={adminHandler}>Admin</button>
          <button onClick={confirmedHandler}>Confirmed</button>
          <button onClick={pendingHandler}>Pending</button>
          <button onClick={declinedHandler}>Declined</button>
        </section>
        <div className="row justify-content-center">
          {plans.map((plan, k) => (
            <Plan plan={plan} key={k} />
          ))}
        </div>
        {plans.length <= 0 && <h5>You don't have plans</h5>}
      </div>
    );
}

export default PlansPage;