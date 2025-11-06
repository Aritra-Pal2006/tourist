# TravelEase – Tourist Information Web App

TravelEase is a modern, responsive web application designed to help travelers discover, plan, and experience the world's most amazing destinations. Built with React and Firebase, it offers a seamless user experience with real-time data integration from multiple APIs.

## Features

- **User Authentication**: Secure signup and login using Firebase Authentication
- **Destination Explorer**: Browse and search destinations with beautiful image galleries
- **Destination Details**: Comprehensive information including weather, maps, currency conversion, and country details
- **Personalized Experience**: Save favorite destinations and leave reviews
- **Travel News**: Stay updated with the latest travel-related news
- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Mode**: Toggle between light and dark themes

## Tech Stack

- **Frontend**: React, TailwindCSS, Framer Motion
- **Backend**: Firebase (Auth, Firestore, Storage)
- **APIs**: 
  - OpenWeatherMap (weather data)
  - REST Countries (country information)
  - Unsplash (destination images)
  - NewsData.io (travel news)
  - ExchangeRate.host (currency conversion)
  - Mapbox (interactive maps)
- **Deployment**: Render

## Folder Structure

```
root/
┣ client/
┃ ┣ public/
┃ ┃ ┗ vite.svg
┃ ┣ src/
┃ ┃ ┣ components/
┃ ┃ ┃ ┣ Navbar.jsx
┃ ┃ ┃ ┣ Footer.jsx
┃ ┃ ┃ ┣ DestinationCard.jsx
┃ ┃ ┃ ┣ WeatherWidget.jsx
┃ ┃ ┃ ┣ MapSection.jsx
┃ ┃ ┃ ┣ NewsSection.jsx
┃ ┃ ┃ ┣ CurrencyCard.jsx
┃ ┃ ┃ ┗ Loader.jsx
┃ ┃ ┣ pages/
┃ ┃ ┃ ┣ Home.jsx
┃ ┃ ┃ ┣ Login.jsx
┃ ┃ ┃ ┣ Signup.jsx
┃ ┃ ┃ ┣ Destinations.jsx
┃ ┃ ┃ ┣ DestinationDetails.jsx
┃ ┃ ┃ ┣ About.jsx
┃ ┃ ┃ ┗ Profile.jsx
┃ ┃ ┣ firebase.js
┃ ┃ ┣ App.jsx
┃ ┃ ┣ AppRoutes.jsx
┃ ┃ ┣ main.jsx
┃ ┃ ┗ index.css
┃ ┣ index.html
┃ ┣ package.json
┃ ┣ vite.config.js
┃ ┣ tailwind.config.js
┃ ┣ postcss.config.js
┃ ┗ .env
┣ render.yaml
┗ README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tourist
   ```

2. Navigate to the client directory:
   ```bash
   cd client
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the client directory with your API keys:
   ```env
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key
   VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
   VITE_NEWSDATA_API_KEY=your_newsdata_api_key
   VITE_MAPBOX_API_KEY=your_mapbox_api_key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

### Deployment

#### Deploying to Render

This project is configured for deployment on Render. Simply connect your repository to Render and it will automatically deploy using the `render.yaml` configuration.

Steps to deploy on Render:
1. Fork this repository to your GitHub account
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New+" and select "Web Service"
4. Connect your GitHub account and select your forked repository
5. Configure the service:
   - Name: travelease (or any name you prefer)
   - Environment: Node
   - Branch: main (or your default branch)
   - Root Directory: Leave empty
   - Build Command: `cd client && npm install && npm run build`
   - Start Command: `cd client && npx vite preview --host 0.0.0.0 --port $PORT`
6. Set environment variables in the Render dashboard:
   - `NODE_VERSION`: 18
7. Click "Create Web Service"
8. Render will automatically build and deploy your application

The application will be available at `https://your-app-name.onrender.com`

#### Troubleshooting Build Issues

If you encounter build issues on Render, particularly with "vite: Permission denied":

1. The project includes a custom build script ([render-build.js](file:///d:/projects/tourist/client/render-build.js)) that tries multiple approaches to run the build
2. Ensure your Render service is configured with:
   - Build Command: `cd client && npm install && npm run build`
   - Start Command: `cd client && npx vite preview --host 0.0.0.0 --port $PORT`
3. Check that the `NODE_VERSION` environment variable is set to `18`
4. If issues persist, you can try changing the build command to:
   `cd client && npm install && npx vite build`

#### Manual Deployment

If you prefer to manually deploy:

1. Build the project:
   ```bash
   cd client
   npm run build
   ```
2. Upload the contents of the `client/dist` folder to your hosting provider

## Firebase Configuration

The app uses Firebase for authentication and data storage. The configuration is already set up in `client/src/firebase.js`. To use your own Firebase project:

1. Create a new Firebase project at https://console.firebase.google.com/
2. Replace the configuration object in `firebase.js` with your project's config
3. Enable the following Firebase services:
   - Authentication (Email/Password)
   - Firestore Database
   - Storage (if you plan to upload images)

## API Integration

This project integrates with several external APIs:

- **OpenWeatherMap**: For current weather data
- **REST Countries**: For country information
- **Unsplash**: For destination images
- **NewsData.io**: For travel news
- **ExchangeRate.host**: For currency conversion
- **Mapbox**: For interactive maps

You'll need to sign up for each service and obtain API keys, then add them to your `.env` file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to all the API providers for their wonderful services
- Special thanks to the open-source community for the amazing tools and libraries