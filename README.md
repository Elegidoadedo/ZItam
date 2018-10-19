# Project Name 
 
APPOINTMENTS

## Description
Appointments App, is a mobile application to make an appointment to your favorites stores . Is not a discovery marketing app ( like Just Eat). It's an application to give to stores a tool to organized the appointments request. Say Goodbye to the phone and phisical agenda. 

 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup

- **sign up as user** - As a user I want to sign up on the webpage so that I can create apointments
- **sign up as professional** - As a user I want to sign up on the webpage so that I can offer my services
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

- **my appointments** - As a user I want to be able to see the list of my appointments in all my stores so that I can know exactly the hour of appointments
- **availble professionals** - As a user I want to be able to see the list of my added locals so that I can choose the local to make the appointment
- **detail professionals** - AS a user I want to see the detail of the professional so I can make an appointment
- **request appointment** As a user I want to be able to see the availables appointments so that I can choose a free hour

- **see requested appointments**- As a profesional user I want to be able to see the requests of clients so that I can see all appointments.
- **see accepted appointments**- As a profesional user I want to be able to see the requests of clients so that I can see all appointments.
- **accept appointment**- As a professional 
- **reject appointments**- As a professional 
- **edit profile** - As a professional

- **see appointment details** As a professional / user

- **add local** - As a user I want to be able to add a local to my local list that I can add a trusted local to my list

## Backlog

List of other features outside of the MVPs scope

Appointments list:
- Show all the appointments available as a calendar

Log In and Sign Up:
- Log In and Sign Up with facebook API

Stores:
- More stores, employees and services.

Notifications:
- Email


## ROUTES:

- GET`/` 
  - show the homepage with a logo and description of APP
  - renders the homepage
- GET `/auth/signup` (accesible solo si no estas logeado)
  - show the form to sign up
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST `/auth/signup` (accesible solo si no estas logeado)
  - send the info to create a new user
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
    - client or profesional
- GET `/auth/login` (accesible solo si no estas logeado)
  - show the form to log in
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST `/auth/login` (accesible solo si no estas logeado)
  - send the info to init a session as logged
  - redirects to / if user logged in
  - body:
    - username
    - password
- POST `/auth/logout` (accesible solo si estas logeado)
  - Close the current session
  - body: (empty)

- GET `/prof/:id` (accesible solo si estas logeado)
  - I can see the detail of one profesional and make an appointment
  - renders the profesional page with a form to send the selected appointment (with flash msg)

- GET `/prof/:id/edit` (accesible solo si estas logeado como profesional en tu perfil)
  - show the form in order to edit a profesional information.

- POST `/prof/:id/edit`  (accesible solo si estas logeado como profesional en tu perfil)
  - send the modified info to update a profesional profile
  - redirect to he profesional page  
  - body: 
    - name
    - img
    - description

- POST `/prof/:id/appointment` (accesible solo si estas logeado)
  - send the info to create a new Appointment
  - redirect to he profile page, to see your appointments 
  - body: 
    - service
    - employee
    - date

- GET `/prof/:id/dashboard` (accesible solo si estas logeado como profesional a tu perfil)
  - show all the appointments as a profesional
  - render the dashboard for the profesional, with a form to create, update, read or delete an appointment (with flash msg)

- GET `/client/:id` (accesible solo si estas logeado como usuario a tu perfil)
  - show the client profile, with his appointments
  - render the client profile with the appointmets selected and a form to read or delete all appointments

- GET `/client/:id/favorite` (accesible solo si estas logeado como usuario a tu perfil)
  - show a form to add a profesional with a code

- POST `/client/:id/favorite` (accesible solo si estas logeado como usuario a tu perfil)
  - send the info with the code of profesional 
  - body: 
    -code

- GET `/client/my-favorites` (accesible solo si estas logeado como usuario a tu perfil)
  - show the favorites profesionals as user
  
- GET `/appoinment/:id/` (accesible a ambos roles al estar logueados)
 - show appointment details and can delete it or confirmation

- POST `/appoinment/:id/update` (accesible a ambos roles al estar logueados)
  - You can read, delete or confirm the appointment 


## Models

`Client` model
 
```javascript
username: String
password: String
email: String
myProfesionals: [{
  type: ObjetcId
  ref: 'Profesional'
}]
```

`Profesional` model

```javascript
name: String
password: String
email: String
img: String
description: String
employees: [String]
service:[{
  name: String,
  duration: Number
}]
ENUM
``` 

`Appointment` model

```javascript
service: {
  name: String,
  duration: Number,
}
employee: String
date: Date
status: String
profesional: {
  type: ObjectId,
  ref: 'Profesional'
}
client: {
  type: ObjectId,
  ref: 'Client'
}

``` 

## Links

### Trello

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/JuanXCV/appointment)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)


