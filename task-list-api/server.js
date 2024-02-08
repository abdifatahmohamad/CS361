const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
