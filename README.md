# Healthcare Translation Web App Documentation

## 1. Project Overview

The **Healthcare Translation Web App** is a web-based prototype designed to enable real-time, multilingual translation between patients and healthcare providers. This application converts spoken input into text, provides a live transcript, and offers a translated version with audio playback. The project showcases technical proficiency, development speed, and the effective use of generative AI for efficient healthcare communication.

## 2. Scope and Features

### **Key Features:**

- **Voice-to-Text with Generative AI:** Converts spoken input into a text transcript, enhancing transcription accuracy, particularly for medical terms.
- **Real-Time Translation and Audio Playback:** Provides real-time translation of the transcript with a "Speak" button for audio playback.
- **Mobile-First Design:** Ensures responsiveness and optimization for both mobile and desktop devices.

## 3. Technology Stack

The project utilizes modern web technologies and AI tools:

- **Frontend:** Vite, React, TypeScript
- **AI APIs:** Gemini AI (for text translation), Web Speech Recognition API (for voice-to-text conversion)
- **Styling:** CSS
- **Deployment:** Vercel

## 4. Code Structure

The project is structured as follows:

```
components.json
index.html
package.json
README.md
src/
    App.tsx
    components/
        translation-app.tsx
        ui/
            button.tsx
            card.tsx
    global.css
    lib/
        utils.ts
    main.tsx
    vite-env.d.ts
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
```

### **Main Components**
- App.tsx: The main component of the application that includes the header, main content and footer.
- translation-app.tsx: The main component of the translation application that handles speech recognition, translation and speech synthesis logic.
### **UI Components**
- button.tsx: Reusable button component.
- card.tsx: Reusable card component.
### **Utilities**
- utils.ts: cn function to combine CSS classes.
### **Global Styles**
- The global.css file contains the global styles of the application, including Tailwind CSS settings and custom CSS variables.

## 5. Installation & Setup

### **Prerequisites:**

- Node.js & npm installed

### **Steps to Run Locally:**

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/healthcare-translation-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd healthcare-translation-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open the application in your browser at `http://localhost:5173`.

## 6. API Documentation

The application integrates with the following APIs:

- **Gemini AI API** for translation and text processing.
- **Web Speech Recognition API** for voice-to-text conversion.

## 7. Contribution Guidelines

### **How to Contribute:**

1. Fork the project.
2. Create a new branch:
   ```sh
   git checkout -b feature/nueva-funcionalidad
   ```
3. Implement your changes and commit:
   ```sh
   git commit -am 'Añadir nueva funcionalidad'
   ```
4. Push the changes to your branch:
   ```sh
   git push origin feature/nueva-funcionalidad
   ```
5. Open a Pull Request.

## 8. Security Considerations

- **Data Privacy:** Ensure secure handling of patient conversations to maintain confidentiality.
- **API Security:** Use authentication and rate-limiting mechanisms where applicable.
- **Error Handling:** Implement robust error handling for API failures.

## 9. License & Credits

This project is licensed under the **MIT License**.

**Author(s):** Jaider Salas Burgos


