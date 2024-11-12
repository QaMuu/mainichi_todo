const { setupServer } = require("./server");

const app = setupServer();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}/`);
});
