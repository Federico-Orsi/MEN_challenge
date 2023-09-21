import connection from './src/database/connection.js';
import app from './src/server.js';
import logger from './src/utils/logger.js';

const { connectToDatabase } = connection;
const { PORT } = process.env;

app.listen(PORT || 3001, async () => {
  logger.info(`App listening on port ${PORT}!`);
  await connectToDatabase();
});

export default app;
