# HealthSpot : https://ast-assignment-zeta.vercel.app/

This project integrates Google Maps with Places API and Google OAuth login in a React application. Users can sign in with Google, view their location on the map, and find nearby hospitals.

## Features

- Google OAuth authentication
- Display user's location on Google Maps
- Fetch nearby hospitals using Google Places API within 5km of radius
- Show hospital markers on the map

## Tech Stack

- React (with TypeScript)
- @react-google-maps/api
- @react-oauth/google
- Axios
- js-cookie
- Zustand (for state management)
- Tailwind CSS (for UI styling)
- Shadcn UI
- Sonner (for toast notifications)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Akshat-Jaiswal-8/ast-assignment.git
   cd ast-assignment
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add:
   ```sh
   VITE_GOOGLE_CLIENT_ID=
   VITE_GOOGLE_CLIENT_SECRET=
   VITE_GOOGLE_MAPS_API_KEY=

   ```

## Running the Project

```sh
npm run dev
```

## Usage

- Click **Sign in with Google** to authenticate.
- Allow location access to find nearby hospitals.
- View hospital markers on the map.
- Hover over markers to see hospital names.
- Get the directions from the nearby hospital list.

## Author

**Akshat Jaiswal**

