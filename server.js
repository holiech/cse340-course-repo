import express from 'express';
//https://cse340-icrr.onrender.com
// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Express Wellcome we are open! and our');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});