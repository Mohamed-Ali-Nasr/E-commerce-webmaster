# E-commerce-webmaster

A modern e-commerce web application built with React, TypeScript, and Tailwind CSS. This project provides a responsive and user-friendly platform for online shopping, featuring authentication, state management, and a sleek UI.

## Features

- **Product Browsing**: View and explore a catalog of products.
- **User Authentication**: Secure login/signup with Google OAuth and JWT.
- **Shopping Cart**: Add, remove, and manage items in the cart.
- **Form Validation**: Robust forms powered by Formik and Yup.
- **Responsive Design**: Styled with Tailwind CSS for all screen sizes.
- **State Management**: Powered by Redux Toolkit and Redux Persist.

  ## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: Redux Toolkit, Redux Persist
- **Routing**: React Router DOM
- **API Requests**: Axios
- **Authentication**: Google OAuth, JWT Decode
- **UI Enhancements**: React Icons, Swiper, React Toastify
- **Form Handling**: Formik, Yup
- **Build Tool**: Vite

  ## Installation

  Follow these steps to set up the project locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Mohamed-Ali-Nasr/E-commerce-webmaster.git

   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd e-commerce-webmaster

   ```

3. **Install Dependencies: Ensure you have Node.js installed, then run:**:

   ```bash
   npm install
   This will install all dependencies listed in package.json, including React, Redux, Tailwind CSS, and more.

   ```

4. **Run the Development Server:**:
   ```bash
   npm run dev
   Open http://localhost:5173 (or the port shown in your terminal) in your browser to see the app.
   ```

## Project Structure

Here’s an overview of the project’s directory layout:

- **`src/`**: The core of the application, including components, pages, Redux logic, and styles.
- **`src/components/`**: Organized into `common` (general UI) and `features` (specific to e-commerce functionality).
- **`src/pages/`**: Maps to routes (e.g., Home, Product Listing, Checkout).
- **`src/store/`**: Houses Redux Toolkit slices and store setup for state management.
- **`src/styles/`**: Centralizes Tailwind CSS or any custom styling.
- **`src/utils/`**: Reusable helper functions, like API calls with Axios.
- **Config Files**: `.eslintrc.cjs`, `tailwind.config.js`, `tsconfig.json`, and `vite.config.ts` configure linting, styling, TypeScript, and Vite, respectively.
