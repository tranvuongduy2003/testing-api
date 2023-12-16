import { logger } from '@/utils/logger';
import { DB } from '..';

(async () => {
  try {
    await DB.sequelize.sync({ force: true });

    await DB.sequelize.drop();
    logger.info('Database dropped!');
  } catch (error) {
    logger.error('Drop database failed!');
    console.log(error);
  } finally {
    DB.sequelize.close();
    process.exit();
  }
})();
