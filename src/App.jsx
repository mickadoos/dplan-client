import "./App.css";
import { Routes, Route } from "react-router-dom";

import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PlansPage from "./pages/PlansPage/PlansPage";
import NewPlanPage from "./pages/NewPlanPage/NewPlanPage";
import PlanPage from "./pages/PlanPage/PlanPage";
import EditPlanPage from "./pages/PlanPage/EditPlanPage";
import GuestsPlanPage from "./pages/PlanPage/GuestsPlanPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProfileFriendsPage from "./pages/ProfilePage/ProfileFriendsPage";
import ProfileEditPage from "./pages/ProfilePage/ProfileEditPage";
import AddFriendsPage from "./pages/AddFriendsPage/AddFriendsPage";
import InviteFriendsPage from "./pages/InviteFriendsPage/InviteFriendsPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import ProfileEditImgPage from "./pages/ProfilePage/ProfileEditImgPage";
import HomePage from "./pages/HomePage/HomePage";

function App() {

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<WelcomePage />} />

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
        <Route
          path="/plans"
          element={
            <IsPrivate>
              <PlansPage />
            </IsPrivate>
          }
        />
        <Route
          path="/plans/newPlan"
          element={
            <IsPrivate>
              <NewPlanPage />
            </IsPrivate>
          }
        />

        <Route
          path="/plans/:planId"
          element={
            <IsPrivate>
              <PlanPage />
            </IsPrivate>
          }
        />
        <Route
          path="/plans/:planId/edit"
          element={
            <IsPrivate>
              <EditPlanPage />
            </IsPrivate>
          }
        />
        <Route
          path="/plans/:planId/guests"
          element={
            <IsPrivate>
              <GuestsPlanPage />
            </IsPrivate>
          }
        />
        <Route
          path="/plans/:planId/invite"
          element={
            <IsPrivate>
              <InviteFriendsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/:username/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/:username/profile/friends"
          element={
            <IsPrivate>
              <ProfileFriendsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/:username/profile/edit"
          element={
            <IsPrivate>
              <ProfileEditPage />
            </IsPrivate>
          }
        />
        <Route
          path="/:username/addFriends"
          element={
            <IsPrivate>
              <AddFriendsPage />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
