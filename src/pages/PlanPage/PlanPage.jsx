import "./PlanPage.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import planService from "../../services/plan.service";

function PlanPage() {

  const {planId} = useParams();
  return (
    <div>
      <h1>Plan page</h1>

    </div>
  );
}

export default PlanPage;