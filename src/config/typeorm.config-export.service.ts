import { configService } from '../config/config.service';
import fs = require('fs');

export const createTypeOrmCOnfig = () =>
  fs.writeFileSync(
    'ormconfig.json',
    JSON.stringify(configService.getTypeOrmConfig(), null, 2),
  );
