# Snippetposts

Snippetposts is a MERN stack application done for the course Web Applications at LUT.
MERN means that MongoDB is used as the database, express and node are running the back-end server and react does all of the front-end. I also used MUI or material UI for the styling and responsiveness of the site.

To start, create a .env file containing some secret=somesecret and NODE_ENV=production or development.
This is not tracked to github because it contains the secret that is used for the jwt tokens of the users.

To run in development environment, change NODE_ENV to development and run the following commands in the project folder:
npm run dev:client
npm run dev:server

To create a production build, change NODE_ENV to production and run the following commands in the project folder:
npm run build
npm run start

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

Total points: 42
