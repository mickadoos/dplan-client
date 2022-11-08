import "./App.css";
import { Routes, Route } from "react-router-dom";

import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PlansPage from "./pages/PlansPage/PlansPage"
import NewPlanPage from "./pages/NewPlanPage/NewPlanPage"
import PlanPage from "./pages/PlanPage/PlanPage"
import EditPlanPage from './pages/PlanPage/EditPlanPage'
import GuestsPlanPage from './pages/PlanPage/GuestsPlanPage'
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProfileFriendsPage from './pages/ProfilePage/ProfileFriendsPage'
import ProfileEditPage from './pages/ProfilePage/ProfileEditPage'
import AddFriendsPage from './pages/AddFriendsPage/AddFriendsPage'
import InviteFriendsPage from './pages/InviteFriendsPage/InviteFriendsPage'

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
      <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/plans/newPlan" element={<NewPlanPage />} />
        <Route path="/plans/:planId" element={<PlanPage />} />
        <Route path="/plans/:planId/edit" element={<EditPlanPage />} />
        <Route path="/plans/:planId/guests" element={<GuestsPlanPage />} />
        <Route path="/plans/:planId/invite" element={<InviteFriendsPage />} />
        <Route
          path="/:username/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route path="/:username/profile/friends" element={<ProfileFriendsPage />} />
        <Route path="/:username/profile/edit" element={<ProfileEditPage />} />
        <Route path="/:username/addFriends" element={<AddFriendsPage />} />
        {/* <Route path="/:username/invite" element={<InviteFriendsPage />} /> */}


     

       
      </Routes>
    </div>
  );
}

export default App;
