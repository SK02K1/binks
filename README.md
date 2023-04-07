# Binks

```
git clone https://github.com/SK02K1/binks.git
cd binks
npm i
npm run dev
```

## Backend
[https://replit.com/@sk02k1/binks-backend](https://replit.com/@sk02k1/binks-backend)

## Tech Stack
- React
- Redux toolkit
- Tailwind CSS
- NodeJS
- Express
- MongoDB
- Mongoose
- JWT and BcryptJS


## Features

- Login Page
  - login only for registered users
  - login form with test credentials
  - redirect to posts page after login
  - error message for incorrect credentials
  - disabled submit button for empty fields
  - prevent **/login** page to open once user is authenticated
  - responsive

- Register Page
  - register new user
  - error handling for already registered user
  - prevent **/register** page to open once user is authenticated
  - responsive

- Posts Page
  - private route
  - show loader when the API is in progress
  - create new post / CREATE
  - fetch all posts / READ
  - update post content / UPDATE
  - delete post / DELETE
  - add comments to the posts
  - like/unlike posts
  - responsive

- Profile Page
  - private route
  - update user details i.e. **firstname** | **lastname** | **bio**
  - show loader when the API is in progress
  - manage posts
  - keep me logged in
  - responsive

## Test credentials
- user01
  - Email: tanay@neog.camp
  - Password: 1234
- user02
  - Email: test@test.com
  - Password: test

## Preview

<img width="1440" alt="Screenshot 2023-04-07 at 11 06 05 PM" src="https://user-images.githubusercontent.com/55895224/230652783-0d6a08f7-6067-4a89-94a8-24269e8b9fec.png">
<img width="1440" alt="Screenshot 2023-04-07 at 11 06 39 PM" src="https://user-images.githubusercontent.com/55895224/230652792-aa43aab5-3c0f-4b79-bbde-b84b2f483d0e.png">
<img width="1440" alt="Screenshot 2023-04-07 at 11 06 52 PM" src="https://user-images.githubusercontent.com/55895224/230652799-9e1803c0-ca37-4fbc-9a20-cc329d0f0d46.png">
<img width="1440" alt="Screenshot 2023-04-07 at 11 07 14 PM" src="https://user-images.githubusercontent.com/55895224/230652801-98f40c52-5c35-47a1-91be-af0a37c3d682.png">
<img width="1440" alt="Screenshot 2023-04-07 at 11 07 23 PM" src="https://user-images.githubusercontent.com/55895224/230652803-eb457d17-5531-41f1-8945-d5faf1e286bb.png">
