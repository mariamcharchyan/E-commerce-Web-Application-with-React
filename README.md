# E-commerce Web Application with React and Redux

## Description

This is an E-commerce web application built using React and Redux. It provides a user-friendly interface for browsing and purchasing products from a toy store. The application presents a toy store where users can view products without registration. Users have the option to register and create an account to make purchases, while the admin can log in and perform relevant updates.

## Features

* User registration and login functionality for personalized shopping experience.
* Browse and search products by category or keywords.
* View detailed product information including images, price, and description.
* Add products to the shopping basket for later purchase.
* Checkout process with order placement and payment integration.
* User profile management for viewing order history and updating personal details.
* Email verification with Nodemailer for enhanced account security.
* Categories management for organizing and filtering products.
* Product and product image management for adding, updating, and deleting products.
* Shipping addresses management for easy delivery options.
* User shipping addresses management for saving multiple addresses.
* Payment card storage for convenient payment options.
* Order management for tracking orders and managing order items.
* Basket management for handling product selection during the shopping process.
* Admin panel for managing products, products images, categories, shipping address, orders, and users.
* Access control to restrict unauthorized access to user functionalities.

## Admin Panel Features
* Admin dashboard for overview and statistical insights.
* Product management for adding, updating, and deleting products.
* Product image management for adding, updating, and deleting product images.
* Category management for organizing and filtering products.
* Shipping address management for adding, updating, and deleting shipping addresses.
* Order management for viewing and managing customer orders.
* User management for viewing and managing user accounts.
* Access control to restrict unauthorized access to admin functionalities.


## Technologies Used

* **React**: A JavaScript library for building user interfaces
* **Redux**: A predictable state container for JavaScript apps
* **React Router**: A routing library for React applications
* **Redux Thunk**: A middleware for Redux to handle asynchronous actions
* **CSS**: Cascading Style Sheets for styling the application
* **react-icons**: A library for adding icons to the application
* **fetch**: A JavaScript API for making HTTP requests
* **map**: A JavaScript method for iterating over arrays
* **Hooks**: React hooks for managing state and side effects:
  - **useDispatch**: A hook from React Redux to dispatch actions
  - **useSelector**: A hook from React Redux to extract data from the Redux store
  - **useParams**: A hook from React Router to access URL parameters
  - **useEffect**: A hook from React for handling side effects in functional components
  - **useState**: A hook from React for managing state in functional components
  - **...**
* **localStorage**: A web API for storing data locally in the browser
* **...**

### Installing

1. Clone the repository:
```
git clone https://github.com/mariamcharchyan/E-commerce-Web-Application-with-React.git
```

2. Navigate to the project directory:
```
cd E-commerce-Web-Application-with-React
```

3. Install the dependencies:
```
npm install
```

4. Start the development server using:
```
npm start
```

Open your web browser and access the application at: `http://localhost:3000`.


## Project Structure

The project structure follows a modular approach to separate concerns and maintain a well-organized codebase. Here's an overview of the main directories and files:

- **public/**
  - **index.html** HTML template for the application
- **src/**
    - **app/**
        - **store.js** Redux store configuration
    - **Footer/**
        - **...** Files for the Footer component
    - **Header/**
        - **...** Files for the Header component
    - **MainComponents/**
        - **About**
            - **...** Files for the About component
        - **Basket/**
            - **...** Files for the Basket component
        - **BoxToys/**
            - **...** Files for the BoxToys component
        - **Contact**
            - **...** Files for the Contact component
        - **Favorite**
            - **...** Files for the Favorite component
        - **Home**
            - **...** Files for the Home component
        - **Subscribe/**
            - **LoggedInAdmin**
                - **...** Files for the Logged In Admin subcomponent
            - **LoggedInUser**
                - **...** Files for the Logged In User subcomponent
            - **LogIn**
                - **...** Files for the LogIn subcomponent
            - **Register**
                - **...** Files for the Register subcomponent
    - **App.js** Root component of the application
    - **index.js** Entry point of the application
- **package.json** Project configuration and dependencies
- **README.md** Project documentation

## Acknowledgements
* The project is inspired by real-world E-commerce platforms and follows industry best practices.
* Thanks to the open-source community for providing the tools and libraries used in this project.