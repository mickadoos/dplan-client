# DPlan-front
Developed by the Olympus Team.
## About
Simplify the way you plan your plans with your friends.
## Deployment
You can check the app fully deployed [here]. If you wish to view the API deployment instead, check [here].

## Work structure
I developed this project alone and used Trello to organize my workflow.
## Installation guide
- Fork this repo
- Clone this repo 

```shell
$ cd portfolio-front
$ npm install
$ npm start
```
## Routes
| Route                | Privacy         | Renders                  |
| -------------------- | :-------------: | ------------------------ |
|/signup|	Public|	SignupPage|
|/login	|Public	|LoginPage|
|/plans |Private (user)|	PlansPage |
|/plans/newPlan  |Private(user)|	NewPlanPage |
|/plans/:planId |Private (user)	|PlanPage|
|/plans/:planId/edit |	Private (user)	|EditPlanPage|
|/plans/:planId/invite |	Private (user)	|InvitePeoplePage|
|/plans/:planId/guests|	Private (user)|	GuestsPlanPage |
|/:username/profile |Private (user)|	ProfilePage|
|/:username/profile/edit |	Private(user)|	ProfileEditPage|
|/:username/profile/friends |	Private (user)|	ProfileFriendsPage|
|/:username/addFriends |Private (user|)	AddFriendsPage|


## Components
- Navbar
- Plan
- Friend
- Guests

Welcome to the Olympus.

