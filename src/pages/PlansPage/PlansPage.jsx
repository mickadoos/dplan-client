import "./PlansPage.css";
import { useContext, useEffect } from "react";
import { useState } from "react";
import userService from "../../services/user.service";
import Plan from "../../components/Plan/Plan";
import { AuthContext } from "../../context/auth.context";
import planService from "../../services/plan.service";

let allPlans;
let allPlansUnexpired;
// let loaded = false;

function PlansPage() {
  const [plans, setPlans] = useState([]);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [reset, setReset] = useState(false);
  var currentTime = new Date();


  useEffect(() => {
    if (isLoggedIn) {
      // userService.getUserPlans(user.username)
      // .then((results) => {
      //   allPlans = results.data.plans.map((plan) => {
      //     return plan;
      //   });
      //   allPlansUnexpired = allPlans.filter((plan) => {
      //     let planDate = new Date(plan._id.date);
      //     return planDate >= currentTime;
      //   });
      //   setPlans(allPlansUnexpired);
      //   if (results.data.plans.length === 0 && user.username === "moderador") {
      //     planService.getPlans().then((resp) => {
      //       setPlans(resp.data);
      //     });
      //   }
      // });
      // planService.getPublicPlans()
      // .then(results => {
      //   // console.log('SERVICE GETPUBLIC PLANS DATA :',results.data)
      // })


      //PUBLIC PLANS DEV
      const userPlans = userService.getUserPlans(user.username);
      const publicPlans = planService.getPublicPlans();
      Promise.all([userPlans, publicPlans])
      .then(results => {
    // resp[1].plans.push({"_id": resp[0]._id.toString(), "status":"admin"})
    // User.findByIdAndUpdate(resp[1]._id, resp[1], {new: true})
    // .then(results => {

    // })

    // console.log('PROMISE ALL PLANS PAGE', results[0].data)
        // console.log('PROMISE ALL PLANS PAGE 1', results[1].data)

        allPlans = results[0].data.plans.map((plan) => {
          // console.log('PLAN._ID???', plan._id)
          return plan;
        });
        console.log('USERS PLANS', allPlans)
        // let publicPlanObj = {
        //   _id: "",
        //   status: "public"
        // }
        const dbPublicPlans = results[1].data.map(element => {
          // publicPlanObj._id = element;
          // console.log('*PUBLIC PLAN OBJ', publicPlanObj)
          return {_id: element, status: "public"};
        });

        console.log('DB PUBLIC PLANS', dbPublicPlans)

        const publicPlans = dbPublicPlans.filter(publicPlan => {
          let planExists = false;
          for(let x in allPlans){
            // console.log('X:', x)
            if(allPlans[x]._id._id === publicPlan._id._id){
              // console.log('plan exists:', x)
              planExists = true;
            }
          }
          return !planExists;
        });
        console.log('PUBLIC PLANS', publicPlans)
        allPlans = allPlans.concat(publicPlans);
        console.log('all plans PROMISE ALL LAST', allPlans)
        allPlansUnexpired = allPlans.filter((plan) => {
          let planDate = new Date(plan._id.date);
          return planDate >= currentTime;
        });
        console.log('**ALL PLANS UNEXPIRED', allPlansUnexpired)
        // const updatePlans = async()=> {
        //   const plansUpdated = await setPlans(allPlansUnexpired);
        // }
         setPlans(allPlansUnexpired);
        //  loaded = true;
        console.log('** PLANS USE STATE', plans)
        console.log('** PLANS USE STATE', plans)

        // if (results.data.plans.length === 0 && user.username === "moderador") {
        //   planService.getPlans().then((resp) => {
        //     setPlans(resp.data);
        //   });
        // }
  })

    }

  }, [isLoggedIn, reset]);

  

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
          Confirmed
        </button>
        <button className="butGen btn btn-secondary" onClick={declinedHandler}>
          Declined
        </button>
        <button className="butGen btn btn-light" onClick={pendingHandler}>
          Pending
        </button>
        <button className="butGen btn btn-danger" onClick={expiredHandler}>
          Expired
        </button>
        <button
          className="butGen myPlansBut btn btn-warning"
          onClick={adminHandler}
        >
          My Plans
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
    </div>
  );
}

export default PlansPage;
