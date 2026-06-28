import app from './api/index';

const PORT = process.env.PORT || 3001;

// Start local listener
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
