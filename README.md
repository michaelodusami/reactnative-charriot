# 🚀 Chariot - Mobile App  

**TL;DR**: Chariot is a cross-platform hospitality app built with React Native, Expo Go, FastAPI, AWS Lambda, and DynamoDB, designed to enhance guest experiences with personalized hotel recommendations, in-app concierge services, and trip management. It won 1st place at Marriott CodeFest 2024 and was handed over to Marriott.

**Key Skills**:  
- **Frontend**: React Native, Expo Go, React Navigation, Nativewind (Tailwind CSS), TypeScript, React Hooks, Context API, Expo Router, Reanimated (for animations), Expo Font, Expo Checkbox, Expo Linear Gradient, Expo Splash Screen, React Native Gesture Handler, React Native Safe Area Context, React Native Snap Carousel, React Native Swiper, React Native Vector Icons  
- **Backend**: FastAPI, AWS Lambda, DynamoDB, Axios (HTTP requests)  
- **AI Integration**: OpenAI API for personalized recommendations  
- **Accessibility**: Dyslexia-friendly font support (OpenDyslexic), high-contrast mode, customizable text size  
- **Testing**: Jest, React Test Renderer, snapshot testing  
- **Other Tools**: Tailwind CSS, Babel, TypeScript configuration, Git, Node.js  

---

## 📌 Overview  

Chariot is a **mobile-first hospitality experience platform** that revolutionizes how travelers interact with hotels. Built for **Marriott CodeFest 2024**, where it secured **1st place**, the app leverages **React Native** and **FastAPI** to deliver a seamless, cross-platform solution for guests to **find hotels, book rooms, access amenities, and receive AI-powered recommendations**. Integrated with **AWS Lambda**, **DynamoDB**, and **OpenAI API**, Chariot provides a scalable, efficient, and intelligent user experience. The app’s rights were transferred to Marriott following the competition.

### 🌟 Key Features:
- **Personalized Recommendations**: AI-driven hotel and room suggestions based on user preferences, historical booking data, location, and guest reviews.  
- **In-App Concierge**: Request services like extra towels, housekeeping, or room upgrades directly from the app.  
- **Trip Management**: Track present, past, and future trips with a user-friendly interface.  
- **Accessibility Options**: Dyslexia mode with OpenDyslexic font, high-contrast mode, and adjustable text sizes for inclusivity.  
- **Smooth Navigation**: Tab-based navigation with animated transitions using React Navigation and Reanimated.  

---

## 🏗 Tech Stack  

### 📱 Mobile Development  
- **React Native**: Cross-platform UI for iOS and Android.  
- **Expo Go**: Rapid development, testing, and deployment.  
- **React Navigation**: Intuitive navigation with stack and tab navigators.  
- **Nativewind**: Tailwind CSS integration for responsive styling.  
- **Reanimated**: Smooth animations for parallax scrolling and UI interactions.  
- **Expo Modules**: Font, Checkbox, Linear Gradient, Splash Screen, and Linking for enhanced functionality.  

### 🌍 Backend  
- **FastAPI**: High-performance API for handling requests and integrations.  
- **AWS Lambda**: Serverless compute for scalable backend operations.  
- **DynamoDB**: NoSQL database for efficient storage of user and booking data.  
- **OpenAI API**: Powers AI-driven personalized recommendations.  
- **Axios**: Manages HTTP requests between the frontend and backend.  

### 🛠 Other Tools  
- **TypeScript**: Static typing for robust code.  
- **Jest**: Unit and snapshot testing for components like ThemedText.  
- **Tailwind CSS**: Utility-first styling for rapid UI development.  
- **Git**: Version control for collaborative development.  

---

## 🔥 Core Features in Detail  

### 🎯 Personalized Hotel & Room Recommendations  
- **How It Works**: The OpenAI API analyzes user preferences, historical booking data, location, and guest reviews to suggest tailored hotels and room types.  
- **Implementation**: Integrated via FastAPI endpoints, with data stored in DynamoDB for quick retrieval.  
- **User Benefit**: Simplifies decision-making with relevant, data-driven suggestions.  

### 🛎 In-App Concierge & Room Service Requests  
- **How It Works**: Users can submit requests (e.g., extra towels, housekeeping, upgrades) through a streamlined interface.  
- **Implementation**: Requests are sent via Axios to FastAPI, processed by AWS Lambda, and stored in DynamoDB.  
- **User Benefit**: Eliminates the need for phone calls or in-person requests, enhancing convenience.  

### 📅 Trip Management  
- **How It Works**: Displays ongoing, upcoming, and past trips in a carousel format using React Native Snap Carousel.  
- **Implementation**: Data fetched from DynamoDB via FastAPI, rendered in a FlatList with dynamic images and descriptions.  
- **User Benefit**: Centralized trip tracking for a cohesive travel experience.  

### ♿ Accessibility Features  
- **Dyslexia Mode**: Toggles OpenDyslexic font for better readability (FontContext provider).  
- **High-Contrast Mode**: Enhances visibility for users with visual impairments (in progress).  
- **Text Size Adjustment**: Allows users to customize font size (in progress).  
- **Implementation**: Managed via Context API and TypeScript for state management and type safety.  
- **User Benefit**: Inclusive design for diverse user needs.  

---

## 👨‍💻 Contributors  

- **Michael-Andre Odusami**: Mobile Developer, focused on frontend UI/UX, React Native components, and accessibility features.  
- **Arnav Jagtap**: Mobile Developer, contributed to backend integration and API development.  

---

## 🛠 Installation & Setup  

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd reactnative-charriot
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   - Set up Expo Go for development.
   - Configure AWS credentials for Lambda and DynamoDB access.
   - Add OpenAI API keys to the FastAPI backend.

4. **Run the App**:
   ```bash
   npm start
   ```
   Use Expo Go to scan the QR code and test on iOS/Android devices.

5. **Build for Production**:
   ```bash
   expo build:ios
   expo build:android
   ```

---

## 📱 Usage  

1. **Onboarding**: Users start at the welcome screen (`welcome.tsx`), navigating to hotel chain selection (`hotelChains.tsx`) and login (`login.tsx`).  
2. **Main Interface**: A tab-based layout (`(tabs)/_layout.tsx`) provides access to:  
   - **Home** (`index.tsx`): Displays trip carousels and recommendations.  
   - **Requests** (`requests.tsx`): Submits concierge and room service requests.  
   - **Profile** (`profile.tsx`): Manages user settings and account details.  
   - **Chatbot** (`chatbot.tsx`): AI-powered assistant for guest queries.  
3. **Accessibility**: Toggle dyslexia mode or adjust settings in `SettingsScreen.tsx`.  
4. **Trip Management**: View ongoing, upcoming, and past trips via carousels in `EventCarousel.tsx`.  

---

## 🏆 Marriott CodeFest 2024  

Chariot won **1st place** at Marriott CodeFest 2024 for its innovative approach to guest experience enhancement. The app was handed over to Marriott, with potential for further development and integration into their ecosystem.

---

## 🚀 Future Enhancements  

1. **Enhanced AI Recommendations**: Integrate more granular user data (e.g., travel frequency, budget preferences) to improve OpenAI API suggestions.  
2. **Real-Time Notifications**: Add push notifications for request confirmations and trip updates using Expo Notifications.  
3. **Voice Guidance**: Fully implement voice feedback for accessibility, leveraging Expo AV for spoken instructions.  
4. **Multi-Language Support**: Expand `Languages.ts` integration to offer real-time translations for global users.  
5. **Offline Mode**: Cache critical data in DynamoDB for offline access to trip details and requests.  
6. **Analytics Dashboard**: Build an admin dashboard for hotel staff to monitor guest requests and trends, using React Native Chart Kit.  
7. **Social Login**: Add Google and Apple login options to streamline authentication.  
8. **Augmented Reality (AR)**: Introduce AR for hotel room previews using Expo’s AR capabilities.  

---

## 📜 License  

This project uses the **SIL Open Font License** for the Poppins and OpenDyslexic fonts. See `assets/fonts/Poppins/OFL.txt` for details. The codebase was transferred to Marriott following CodeFest 2024, and further usage may require their permission.

---

## 📺 Demo  

Watch the demo on YouTube: [Chariot Demo](https://youtu.be/l3zENh-a7C0)
