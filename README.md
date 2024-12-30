# README.md

# Online Pixel Drawing App

Welcome to the Online Pixel Drawing App! This project allows users to create and share pixel art in real-time using WebSockets for seamless collaboration.

## Features

- Real-time drawing collaboration
- User-friendly canvas interface
- Clear and reset functionality
- Responsive design for various devices

## Project Structure

```
pixel-draw-app
├── src
│   ├── client
│   │   ├── canvas.ts        # Handles drawing functionality
│   │   ├── websocket.ts     # Manages WebSocket connection
│   │   └── index.ts         # Entry point for the client-side application
│   ├── server
│   │   ├── server.ts        # Sets up the Express server
│   │   └── websocket.ts     # Manages WebSocket connections on the server
│   └── types
│       └── index.ts         # Defines interfaces for drawing events and user data
├── public
│   └── index.html           # Main HTML file for the application
├── package.json             # npm configuration file
├── tsconfig.json            # TypeScript configuration file
└── README.md                # Project documentation
```

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd pixel-draw-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the server:
   ```
   npm start
   ```

5. Open your browser and go to `http://localhost:3000` to start drawing!

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for details.