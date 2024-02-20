<br />
<p align="center">
  <h1 align="center">
  <a href="https://quizzopia.gillyhuga.com/">
    Personal Notes
  </a>
  </h1>

<p>
Personal Notes App, an application for managing personal notes. This project serves as the final submission for the <a href="https://idcamp.ioh.co.id/">IDCamp 2023</a> coding scholarship program in the <a href="https://www.dicoding.com/academies/413"> Belajar Fundamental Aplikasi Web dengan React</a> course at the Intermediate level.
</p>

### Feature

- **RESTful API Integration**: Utilizes the RESTful API provided at [https://notes-api.dicoding.dev/v1](https://notes-api.dicoding.dev/v1) for various functionalities such as registration, authentication, note listing, note details, archiving notes, unarchiving notes, and note deletion.
   
- **User Registration and Authentication**: Provides user registration and authentication functionalities. Users can register with their name, email, password, and optionally confirm password. Authentication is done through email and password, with access tokens stored in local storage.

- **Protected Note Features**: Access to note-related features such as note listing, note details, and note deletion is protected and requires user authentication. Only authenticated users can access these features.

- **Theme Switching**: Allows users to switch between light and dark themes. Theme preferences are stored in local storage for persistence.

- **Usage of Hooks**: Implements React Hooks for state management, particularly in the registration and authentication features.

-  **Loading Indication**: Displays loading indicators during API data retrieval to improve user experience.

-  **Language Switching**: Provides the option to switch between Indonesian and English languages. Language preferences are stored in local storage for persistence.

- **Maintains Previous Submission Criteria**: Includes previous submission criteria such as having at least two different pages, note listing, note details, adding new notes, deleting notes, and validating properties.

### Built With
- [React.js](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Daisy UI](https://daisyui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)
  
## Getting Started

### Prerequisites
- [Node >= 16.14.0](https://nodejs.org/en/)

### Installation
- Clone repository
  ```
     https://github.com/gillyhuga/notes.git
  ```
- Go to the project directory
  ```
     cd notes
  ```

- Install dependencies

  ```
     npm install
  ```

- Start the server
  ```
     npm run dev
  ```
- Open `http://localhost:5173` with your browser to see the result

## Special Thanks To

<a href="https://idcamp.ioh.co.id/"><img src="https://idcamp.ioh.co.id/images/footer-logo.png" width="auto" height="70px"></a>

