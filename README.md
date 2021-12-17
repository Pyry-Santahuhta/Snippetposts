# Snippetposts

# Technology choices

Snippetposts is a MERN stack application done for the course Web Applications at LUT.
MERN means that MongoDB is used as the database, express and node are running the back-end server and react does all of the front-end. I also used MUI or material UI for the styling and responsiveness of the site.

# Installation guidelines

To start, you need to two environment variables to the project. Create a file called .env in the root directory of the project. In the .env file, write on their own lines a secret and your NODE_ENV. For example: secret=somesecret and NODE_ENV=production.
Example dotenv content:

- secret=ufg09sdghsdoi
- NODE_ENV=development

This file is not tracked to github because it contains the secret that is used for the jwt tokens of the users.

After setting the values, you will need to install the dependency packages. Run the following commands in the root directory, and wait for the install to finish on each one:

- npm run preinstall
- npm run install

After installing:
To run in development environment, change NODE_ENV to development and run the following commands in the project directory:

- npm run dev:client
- npm run dev:server

To create a production build, change NODE_ENV to production in the .env file and run the following commands in the project directory:

- npm run build
- npm run start

# User manual

When you first open up snippetposts, you will be at the "Dashboard" page. To navigate, you can use the login, register and the title buttons. Here on the left you can see all of the posts listed, along with their creators and timestamps. You can use the search to filter out your desired posts. Just write text that you want included in the posts and press enter. To see all of the posts again after searching or just refresh the posts, you can click on the refresh icon above the search bar. You can click on any post's title to go into a detailed view of the post. Here you can see comments and like counts of the post. But to interact with the posts and create our own, we need to login. Start by registering a new user, click on the "register" button in the appbar at the top. Be sure to use an email address that hasn't been used before, as users by the same email can't be created. After registering successfully, you will be redirected to the login page. Here you can login with the credentials you registered. After logging in succesfully, you can now see a new section on the right side of the dashboard. On there you can write down your own new post and press submit to submit a new post. All fields of the post must be filled before submitting. It is recommended to copy paste or write code into the code section which is the last one, as it will be highlighted. When you are logged in, you can again go to any post's details by clicking its title, and now you can like or dislike posts by clicking the thumb up or thumb down icons, or leave comments by writing a comment in the comment text field and pressing the comment button. In order to logout, press the logout button on the navbar. Thanks for using snippet posts!

# Implemented features and points suggestion

Done features and number of points suggested for the project:

- Basic features with well written documentation. - 25
- Utilization of a front end framework: React. - 5
- Utlization of a highlight library: Highlightjs. - 2
- A search that can filter out only those messages that have the searched keyword. - 2
- Vote (up or down) posts and comments (only one vote per user). - 3
- Last edited timestamp is stored and shown with posts/comments. - 1

My own features:

- Passwords must be strong and are hashed/salted in the back-end. - 1
- Changing project theme is easy with the materialui Theme file. - 1
- Alerts for users on errors or successes - 2
- User is directed to 404 page on all pages that are not specified - 1

Total points: 43
