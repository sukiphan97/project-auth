# Project Auth API

Our project needs two parts; a backend API, and a React frontend. We need to create a `User` model using mongoose, with properties for our registered user, and to store a user's access token.

Then, on the frontend side of things, we need to build up a registration form that POSTs to our API. We need to store the access token you get back in the browser using local storage, and then use that token when making other requests to our API.

Once a user is logged in, we will need to have one last endpoint which returns some content which only logged-in users should be able to access. You can choose what you want this endpoint to return, and if you want to make multiple endpoints, that's fine too. It could return hard-coded data or something from the database - either is fine. Whatever you choose, it should be displayed in the frontend after you've logged in.

## The problem

We had problems with implementing the accessToken and how to passed it to the header when fetching the API. Then, to navigate the user to the main or login page, depending on if the user already logged in or not.

## View it live

https://project-auth-anki-suki.netlify.app
