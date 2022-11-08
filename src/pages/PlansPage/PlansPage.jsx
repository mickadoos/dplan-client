import "./PlansPage.css";
import { useContext, useEffect } from "react";
import { useState } from "react";
import userService from "../../services/user.service";
import Plan from "../../components/Plan/Plan";
import { AuthContext } from "../../context/auth.context";

function PlansPage() {
  const [plans, setPlans] = useState([]);
  const {isLoggedIn, user} = useContext(AuthContext);

    useEffect(()=>{
      if(isLoggedIn) {
        userService.getUserPlans(user.username)
        .then(results => {
          const allPlans = results.data.plans.map(plan => {
            return plan._id;
          })
            setPlans(allPlans);
        })
      }
    }, [isLoggedIn]);

    return(
    <div className="container">
        <h1>Plans Page</h1>
        <div className="row justify-content-center">
        {plans.map(plan => <Plan plan={plan} key={plan._id}/>)}

        </div>
    </div>);
}

export default PlansPage;