# Study Planner

This project is a Study Planner application designed to help users manage their study tasks and track their progress. It consists of a client-side React application and a server-side Express application.

## Features

- User authentication
- Create, update, and delete study tasks
- Dashboard to view study progress
- Responsive design

## Project Structure

```
study-planner
├── client                # Client-side application
│   ├── src               # Source files for the React app
│   ├── package.json      # Client dependencies and scripts
│   └── tsconfig.json     # TypeScript configuration for client
├── server                # Server-side application
│   ├── src               # Source files for the Express app
│   ├── package.json      # Server dependencies and scripts
│   └── tsconfig.json     # TypeScript configuration for server
├── package.json          # Overall project dependencies and scripts
├── tsconfig.json         # Overall TypeScript configuration
└── .gitignore            # Files to ignore in version control
```

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd study-planner
   ```

2. Install dependencies for the client:
   ```
   cd client
   npm install
   ```

3. Install dependencies for the server:
   ```
   cd server
   npm install
   ```

### Running the Application

1. Start the server:
   ```
   cd server
   npm start
   ```

2. Start the client:
   ```
   cd client
   npm start
   ```

The client application should now be running on `http://localhost:3000` and the server on `http://localhost:5000`.

## Usage

- Navigate to the home page to log in or register.
- Use the dashboard to manage your study tasks.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.