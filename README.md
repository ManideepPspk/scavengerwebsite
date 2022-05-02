# Getting started with Scavenger website

# Client side
1. Client side development is done using ReactJs & Redux .
2. This source code is available in Github (https://github.com/ManideepPspk/scavengerwebsite) .
3. This code is hosted in Netlify. Hosted online Website (https://scavengerbymani.netlify.app) .

    # Running code locally
4. If you want to run this code locally you need to clone the code/use zip file then do the following steps. 
    1. `npm install` to install all the dependencies.
    2. `npm start` to run the code. The application runs at port 3000.
    3. [SERVER] baseURL is connected to application in `http-common.js` file inside src. Both local and hosted url of server are there but in zip file you can see hosted url commented as you are running local but in the hosted website it is connected to hosted url.
    4. Data is being stored in online mongoDb cluster.

# Server side
1. Server side development is done using Node.js , ExpressJs , MongoDb.

    # Clone code from Heroku
2. This source is available in Heroku. To download the source code you can use shared zip file or following steps.
    1. Download and install `Heroku cli` (https://devcenter.heroku.com/articles/heroku-cli) in your device and login.
    2. If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key. `$ heroku login`
    3. Then you can clone the code from `$ heroku git:clone -a warm-island-56693`
    4. This is the hosted URL and you can use it in Postman (https://warm-island-56693.herokuapp.com)

    # Running code locally
3. If you want to run this code locally you need to clone the code/use zip file then do the following steps.
    1. `npm install` to install all the dependencies.
    2. `npm start` to run the code. The application runs at port 4500. 
    3. Then you need to change the baseURL of server in the `http-common.js` of Client src.

# DataBase
1. Data is being stored in the mongoDb atlas cluster of my account. As it is a private account you cannot view Database but still you can see its url from the `app.js` of server.

# Creating Email id and password.
1. EmailId of each branch for the data shared by HR is created in the format `Branch Name all in lowercase without any space or special characters if existed`
2. Password is created from the same emailID without the @ extension.
    # Eg :- `Penny's apartment` as `pennysapartment@gmail.com` and password as `pennysapartment`.
3. User can also create his own unique branch from `create branch account button` on the UI.

# Searching branch and giving Notifications.
1. User can search for the branch from the search button of UI. Then the branch manager logs in and views the notification.

