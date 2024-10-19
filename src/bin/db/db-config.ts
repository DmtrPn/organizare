#!/usr/bin/env node
import '../../bootstrap';

import fs from 'fs';
import path from 'path';

import { Config } from '@core/config/Config';
import { ConfigName, DbConfig } from '@core/config/types';

const rootDir = path.resolve(__dirname, '../../');
const postgresConfig = <DbConfig>Config.getConfig(ConfigName.Db);

fs.createWriteStream(`${rootDir}/ormconfig.json`).write(JSON.stringify(postgresConfig));
