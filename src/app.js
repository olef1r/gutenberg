import 'dotenv/config';
import express from 'express';
import postgres from './services/postgres';
import filesService from './services/files';

const app = express();
const PATH = '../../Documents/rdf-files/cache/ep';

function onServicesReady() {
  app.set('port', process.env.PORT);
  app.listen(app.get('port'), () => {
    console.info(`[INFO] Express server listening on port ${app.get('port')}`);
  });
}

function onError(err) {
  console.error(err);
  console.error('[ERROR] Express server not started.');
  console.error(`[DEBUG] Message: ${err.message}`);
}

function start() {
  postgres.checkConnection().then(onServicesReady).catch(onError);
  filesService.readFiles(PATH);
}

function stop() {
  app.close();
}

export default {
  start,
  stop,
};
