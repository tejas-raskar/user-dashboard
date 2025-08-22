Goal: Build a mini user dashboard app using
- React, Redux (Slice version), React Router, and Material UI.
- Node server with ExpressJS
- MongoDB for database

This app should simulate a basic authenticated flow, with mock API interactions and a responsive UI layout.

Core Features to Implement
1. Login Flow
● Create a login screen using MUI components.
● Use a API to simulate login.
● Use hashed passwords to authenticate and JWT tokens to authorise (also implement refresh tokens here)
● On successful login, store token/state and redirect to dashboard.
● Protect the dashboard route from unauthorised users.

2. Navigation & Routing
● Implement routing using React Router.
● Example Routes (suggestive, you can choose any):
○ /login
○ /posts
○ /posts/:postId
○ /posts/:postId/comments/:commentId
○ /my_posts
○ /profile
● Add a persistent Navbar with navigation links and logout.

3. Dashboard with API CRUD Operations
● Display a list of posts using MUI DataGrid on /posts.
● Allow creating a new post, updating a post, and deleting a post using modals or dialogs.
● Also implement a file uploader while creating a post - you can skip the actual upload to the cloud part. I just want to see the file being sent to the backend and then the backend being able to extract metadata information like its name, type, etc.

4. Conditional Rendering & Loading States
● Show a loader (e.g., Skeleton or CircularProgress) if API call is delayed (simulate if using dummy APIs).
● Display different UI states: Loading, Error, Empty data, Normal render

5. User Profile Page
● Route: /profile
● Display logged-in user's details with editable fields.

6. My Posts Section
● Route: /my_posts
● Display logged-in user’s posts only

Bonus points:
- Initiate redis or any cache system you like, you don’t have to use it but just initiate it and we will go over this in the following conversations
