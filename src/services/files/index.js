import fs from 'fs';
import util from 'util';
import parserService from '../parser/index';

const readdir = util.promisify(fs.readdir);
const CONCURRENT_CONNECTIONS_SIZE = 100;

async function readFiles(path) {
  try {
    const dirs = await readdir(path);
    await readNestedDir(dirs, path);
  } catch (err) {
    console.log(err);
  }
}

async function readNestedDir(dirs, path) {
  let processedItems = 0;
  while (processedItems < dirs.length) {
    const requests = dirs.slice(processedItems, processedItems + CONCURRENT_CONNECTIONS_SIZE).map((dir) => {
      return readFile(path, dir).catch((e) => console.log(`Error ${e}`));
    });
    processedItems += requests.length;
    await Promise.all(requests).catch((e) => console.log(`Error in read files ${e}`));
  }
}
async function readFile(path, dir) {
  const subdir = await readdir(`${path}/${dir}/`);
  const rStream = fs.createReadStream(`${path}/${dir}/${subdir[0]}`);
  return rStream
    .on('data', (file) => {
      parserService.saveData(file.toString());
    })
    .on('error',function (err) {
      console.log(`Error ${err} in read file stream`)
    })
    .on('end', function () {
      console.log('All the data in the file has been read');
    })
    .on('close', function () {
      console.log('Stream has been destroyed and file has been closed');
    })
}

export default {
  readFiles,
  readFile,
  readNestedDir,
};
