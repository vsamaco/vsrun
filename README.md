# vs.run

### Description
React app for displaying and comparing Strava activities.

### Requirements
* Strava account
* Node 10.13.10
* React 16.13.1
* Redux 4.0.5

### Setup
1. Register app on Strava 

    [https://www.strava.com/settings/api]([https://www.strava.com/settings/api)

2. Enter authorization callback domain as `localhost` or your custom domain
3. Get Strava client id and secret from application page
4. Checkout project with git

    `git clone https://github.com/vsamaco/vsrun.git`
5. Install dependencies 

    `yarn install` 

5. Copy `/src/.env.development.sample` to `/src/.env.development` and modify  `REACT_APP_STRAVA_CLIENT_ID` and `REACT_APP_STRAVA_CLIENT_SECRET` with your Strava client details.

### How to use
1. Start react app

   `yarn start`

2. Browser tab should open to [http://localhost:3000](http://localhost:3000)
3. Click button `Login with Strava` in header
4. Authorize Strava app permissions
5. Displays 20 most recent strava activities
6. Click Select button to compare activities
7. Click activity title to preview details such as segment efforts, splits, map route.

### Libraries

* react-chartjs-2 - chart 
   
  [https://github.com/jerairrest/react-chartjs-2](https://github.com/jerairrest/react-chartjs-2)

* react-leaflets - open street maps

  [https://react-leaflet.js.org/en/](https://react-leaflet.js.org/en/)

* mapbox/polyline - decoding polyline data
  
  [https://github.com/mapbox/polyline](https://github.com/mapbox/polyline)

* momentjs - format date and time
  
  [https://momentjs.com/](https://momentjs.com/)

* semantic ui - bootstrap styling

  [https://semantic-ui.com/](https://semantic-ui.com/)

### Resources

* [Setup oAuth for react](https://medium.appbase.io/how-to-implement-authentication-for-your-react-app-cf09eef3bb0b)

* [Persist redux state to localstorage](https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage)

* [Plot time in chartjs](https://stackoverflow.com/questions/48347482/plot-lap-times-with-chart-js-from-time-strings)

* [Chartjs format time y-axis](https://github.com/chartjs/Chart.js/issues/2791)

* [Using chartjs in react](https://medium.com/@vickdayaram/using-chart-js-with-react-324b7fac8ee6)

* [Mapping strava runs in OSM](https://markhneedham.com/blog/2017/04/29/leaflet-strava-polylines-osm/)

* [create react app heroku buildpack](https://github.com/mars/create-react-app-buildpack#user-content-continue-development)

