# Hokie-For-U
#### Created by: [Sivakumarreddy Sangu][link_reference_1], [Akshay Reddy Narra][link_reference_2], [Samhitha Pentaparthy][link_reference_3], [Sushma Kumari Kakarla][link_reference_4], [Charan Teja Chelle][link_reference_6], [SivaSagar Kolachina][link_reference_5] 

## Project Description

This application is confined to Virginia tech students. VT students excel in a lot of aspects in life, this application will let them help our neighborhood communities in providing services. These services can be anything from household chores, babysitting, grocery pickup to tutoring. This application indirectly helps hokies find a job as well as contribute to the betterment of neighborhood communities. With a user-friendly interface , we connect hokies with surrounding communities. Any person in the community can post a job to the Hokie for U application, this job can be picked by hokies who are willing to help and possess the skills. The application provides a contact feature that helps people connect and discuss anything related to these jobs. On a high-level the application includes the following main features: Users may order services at their convenience, specify their needs, and receive confirmation and updates with the help of the app’s integrated booking and scheduling system. Users can also rate the service providers. For scheduled service visits, users receive notifications and reminders, guaranteeing a smooth and on-time experience.

## Presentation Link
https://drive.google.com/file/d/1q8yrPTgCH2WUWCMrz3vLuVFYT3wJOhJO/view?usp=sharing

## Screenshots of the Application

### Home Page

![alt text](https://github.com/sivakumarreddy07/hokie-for-u/blob/dev-akshay/Files/screenshots/Screenshot%201.png)

![alt text](https://github.com/sivakumarreddy07/hokie-for-u/blob/dev-akshay/Files/screenshots/Screenshot%202.png)

### Registration Page

![alt text](https://github.com/sivakumarreddy07/hokie-for-u/blob/dev-akshay/Files/screenshots/Screenshot%203.png)

### Login Page

![alt text](https://github.com/sivakumarreddy07/hokie-for-u/blob/dev-akshay/Files/screenshots/Screenshot%204.png)

### Dashboard Page

![alt text](https://github.com/sivakumarreddy07/hokie-for-u/blob/dev-akshay/Files/screenshots/Screenshot%205.png)

![alt text](https://github.com/sivakumarreddy07/hokie-for-u/blob/dev-akshay/Files/screenshots/Screenshot%206.png)

### My Jobs Page

![alt text](https://github.com/sivakumarreddy07/hokie-for-u/blob/dev-akshay/Files/screenshots/Screenshot%207.png)

### My Profile Page

![alt text](https://github.com/sivakumarreddy07/hokie-for-u/blob/dev-akshay/Files/screenshots/Screenshot%208.png)


### _**IMPORTANT NOTES**_ - 
This project does not have a mongoDB connection setup.
- local development: create a config file (make sure to name it config.js) in the config folder, which exports your db.uri connection. An example is provided, config/config.example.js. This file will be ignored by git so your db credentials will be kept safe when the app is deployed.


## Getting Started
This repository aims to assist you in beginning work on a MERN stack application with a solid file structure as a foundation.

Since this project will hold both the client application and the server application there will be node modules in two different places. First run `npm install` from the root. After this you will run `npm run-script install-all` from the root. From now on run this command anytime you want to install all modules again. This is a script we have defined in package.json. Alternatively your group may choose to simplify this process by using yarn workspaces as specified [here](https://yarnpkg.com/lang/en/docs/workspaces/).

This app can be deployed directly to your local since there is a script defined in package.json which will automatically handle building and deploying the app.


## Available Scripts

Please note that any time the server is run in these scripts `nodemon` is used in place of `node` for easier development. If you are interested in how this works follow the nodemon In the project directory, you can run:

### `yarn workspace server dev`

Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `yarn workspace client start`

Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.


### `yarn workspace server start`

Runs just the server in development mode.<br>


### `yarn workspace server build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## File structure
#### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `assets` - This folder holds assets such as images, docs, and fonts
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `views` - These represent a unique page on the website i.e. Home or About. These are still normal react components
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `server` - Holds the server application
- #### `config` - This holds our configuration files, like mongoDB uri
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `tests` - This holds all of our server tests that we have defined
- #### `server.js` - Defines npm behaviors and packages for the client
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)














[link_reference_1]: https://github.com/sivakumarreddy07
[link_reference_2]: https://github.com/Akshay-06
[link_reference_3]: https://github.com/samhithapentaparthy
[link_reference_4]: https://github.com/Sushk1821
[link_reference_5]: https://github.com/siva-sagar
[link_reference_6]: https://github.com/charan0675
