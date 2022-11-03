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
|/signup |	Public|	SignupPage|
|/login	|Public	|LoginPage|
|/plans/:username	|Private (user)|	PlansPage
|/new-plan	Private |(user)|	NewPlanPage
|/plan/:planId	|Private (user)	|PlanPan|
|/plan/:planId/edit|	Private (usercreator)	|EditPlanPage|
|/plan/:planId/attendees|	Private (user)|	AttendesPlanPage
|/profile/:username	|Private (user)|	ProfilePage|
|/profile/:username/friends|	Private (user)|	ProfileFriendsPage|
|/profile/:username/edit|	Private(currentUser)|	ProfileEditPage|
|/addfriends	|Private (user|)	AddFriendsPage|

## Components
- Navbar
- Plan
- Friend
- Attendees

Welcome to the Olympus.

