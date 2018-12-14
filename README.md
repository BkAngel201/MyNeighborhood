# My Neighborhood Project
This is the last project from Udacity Nanodegree Course, a **SPA** that allow the user look for a neighborhood and get information about the places around it

## How it works
 - In the search page user will enter a location for a neighborhood to look, when click on search the application will search that an retrieve that place information 
 - In the main page the user will have a **MAP** with all the markets each one for a place (hospitals, supermarkets, banks and FastFood categories)
 - In the same main page the user will have a sidebar with a list of markers grouped by category, user can hide a whole category clicking in the eye button next to the category name
 - The information about each marker will be shown in a infowondow, to show it, the user can click on the marker itself or in the markers list in the sidebar

## How to install and run it
- install all project dependencies with `npm install`
- start the development server with `npm start`

## Table of Content
```bash
├── README.md - This file.
├── package.json # npm package manager file. 
├── public
│   ├── favicon.ico # React Icon.
│   └── index.html 
└── src
    ├── Aimages # Images used in the App
    │   ├── google-map-background.jpg
    │   ├── image-not-available.jpg
    │   └── neighborhood.jpg
    ├── App.css # Styles for the app. 
    ├── App.js # This is the root file for the app.
    ├── App.test.js # Used for testing. Provided with Create React App. 
    ├── AppSidebar.js # This file contains the AppSideBar Component that show the list of markers grouped by category.
    ├── FoursquareAPIHandler.js # A JavaScript library to handle Foursquare API. 
    ├── GoogleMap.js # This file contains the GoogleMap Component that show the whole map with the markers.
    ├── index.css # Global styles.
    ├── index.js # it is used for DOM rendering only.
    ├── LoadingScreen.js # This file contains the LoadingScreen component that show a spinner until the app load.
    ├── LocationSearch.js # This file contains the LocationSearch component that let the user search for a specific location.
    └── registerServiceWorker.js # Default ServiceWorker from React.
```

## Dependences 
 - [Google Map Api](https://developers.google.com/maps/documentation/javascript/tutorial)
 - [Foursquare API](https://developer.foursquare.com/)


**Developed by a Proud Udacity and Grow with Google Scholarship Student, and Future Web Developer**
