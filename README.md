# DPlan - Frontend

Developed as the final project of our web development bootcamp at Ironhack Barcelona, this is Yabel, Eloi and Josep’s MERN Stack application. Check the backend repository [here](https://github.com/PmplCode/DPlan-back).

## About

DPlan is a Full Stack application meant to help users plannify their private events such as parties or social meetings in a simple way. 
Create, share, experience and organize events quickly, easily and fun.

![Project banner.](/public/DPlan_Banner.png "Project banner.")

## Deployment

You can check the app fully deployed [here]( https://famous-brioche-240d75.netlify.app).


## Installation guide

- Fork this repo
- Clone this repo

```shell
$ cd DPlan-Front
$ npm install
$ npm start
```

## Routes

| Route                          |      Privacy       | Renders            |
| ------------------------------ | :----------------: | ------------------ |
| /                              |     public         | WelcomePage        |
| /signup                        | public (anonymous) | SignupPage         |
| /login                         | public (anonymous) | LoginPage          |
| /plans                         | public             | PlansPage          |
| /plans/newPlan                 | public             | NewPlanPage        |
| /plans/:planId                 | public             | PlanPage           |
| /plans/:planId/edit            | private            | EditPlanPage       |
| /plans/:planId/guests          | private            | GuestsPlanPage     |
| /plans/:planId/invite          | private            | InviteFriendsPage  |
| /:username/profile             | public             | ProfilePage        |
| /:username/profile/friends     | public             | ProfileFriendsPage |
| /:username/profile/edit        | private            | ProfileEditPage    |
| /:username/profile/addFriends  | public             | AddFriendsPage     |


## Components

- Navbar
- Loading
- IsAnon
- IsPrivate
- PendingReq
- Person
- Plan

## Pages

- WelcomePage
- SignupPage
- LoginPage
- NewPlanPage
- PlansPage
- PlanPage
- EditPlanPage
- GuestsPlanPage
- InviteFriendsPage
- ProfilePage
- ProfileEditPage
- ProfileFriendsPage
- AddFriendsPage
- NotFoundPage

---

Any doubts? Contact us!
<br>
<img width="20px" src="https://simpleicons.now.sh/linkedin/495f7e" alt="LinkedIn" />
</br>
<a href="https://www.linkedin.com/in/josepbp/">Josep</a>
<a href="https://www.linkedin.com/in/eloipampliegajose/">Eloi</a>
<a href=" http://www.linkedin.com/in/yabel-rodriguez">Yabel</a>


