# E-commerce Platform with NestJS, PostgreSQL, and TypeORM

Welcome to the E-commerce Platform, an advanced, feature-rich application built using the NestJS framework, PostgreSQL as the database, and TypeORM for database interactions. This project aims to provide a robust foundation for developing a scalable and maintainable e-commerce solution.


## Features
- **User Authentication & Authorization**: Secure login and signup using JWT, role-based access control.
- **Product Management**: Add, update, delete, and view products.
- **Order Management**: Place orders, view order history, and manage order statuses.
- **Category Management**: Create and manage product categories.
- **File Uploads**: Upload multiple product images to Cloudinary.
- **Sales Reports**: Generate sales reports within specific date ranges.
- **Robust Error Handling**: Comprehensive error handling and logging for all endpoints.

## Tech Stack
- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **PostgreSQL**: A powerful, open-source relational database system.
- **TypeORM**: An ORM for TypeScript and JavaScript (ES7, ES6, ES5) based on DataMapper, Unit of Work, and Active Record patterns.
- **Cloudinary**: Cloud-based image and video management solution.

## Getting Started

### Prerequisites
- **Node.js**: Ensure you have Node.js installed (version 14 or higher).
- **PostgreSQL**: Install PostgreSQL and create a database.
- **Cloudinary Account**: Sign up for a Cloudinary account and get your API credentials.

### Installation
1. **Clone the Repository**:
    ```bash
    git clone https://github.com/khder16/Full-Ecommerce-NestJs.git
    cd ecommerce-nestjs
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and add the following environment variables:
    ```env
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USER=yourusername
    DATABASE_PASSWORD=yourpassword
    DATABASE_NAME=ecommerce

    CLOUDINARY_NAME=your_cloudinary_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

### Running the Application
1. **Run Database Migrations**:
    ```bash
    npm run typeorm:migration:run
    ```

2. **Start the Application**:
    ```bash
    npm run start:dev
    ```

## Usage
- **Access the API**:
  - The application will be running at `http://localhost:3000`.
- **Swagger Documentation**:
  - Access API documentation at `http://localhost:3000/api`.
