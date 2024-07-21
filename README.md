> [!IMPORTANT] 
> Note that the microservices and this application are deployed in a free web hosting service, error might occur on first login/registration attempt as microservice initializes.

# Time Tracker

This react application is designed to manage our time day to day. Helping track the tasks of everyone to help with productivity and time management.  

To view project demo, click [here](https://time-tracker-wev9.onrender.com/).

Account: demo@thinkingmachines.com Password: 1234

The development of the backend project was cut into 3 main components.

## Nav

For the project navigation was made logically with the use of hooks. Routing seemed irrelevant as only 2 screens are needed to be shown in this single page application.

## Auth

Authentication is handled by the login form component. This is used for registration as well to avoid redundant code. Only simple auth is utilized in this project to simulate user experience.


## Tasks
The highlight of the project is the checkin view. Here a user can track his activities, input an entry, and filter what activities are in his view.

### To initialize the project:

```
npm install
```

### To run the project:

```
npm start
```

### Dependencies:
* Material UI [icons, date picker, table] [docs](https://mui.com/material-ui/getting-started/)
* Axios [docs](https://axios-http.com/docs/intro)
* Tailwind css [docs](https://tailwindcss.com/)
