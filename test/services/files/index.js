import { expect } from 'chai';
import sinon from 'sinon';
import filesService from '../../../src/services/files/index';
import proxyquire from 'proxyquire';

describe('files - Service', () => {
  it('should be defined', () => {
    expect(filesService).to.be.not.undefined;
  });

  it('should be able read dirs', async () => {
    const lstatStub = sinon.stub().resolves('fake data');
    const utilStub = { promisify: sinon.stub().callsFake(() => lstatStub) };
    proxyquire('../../../src/services/files/index', {
      util: utilStub,
    });
    filesService.readFiles('test/services/file');
    sinon.assert.calledOnce(utilStub.promisify);
  });

  it('should be able to read dir', async () => {
    const lstatStub = sinon.stub().resolves('fake data');
    const utilStub = { promisify: sinon.stub().callsFake(() => lstatStub) };
    proxyquire('../../../src/services/files/index', {
      util: utilStub,
    });
    filesService.readFile('test/services/file');
    sinon.assert.calledOnce(utilStub.promisify);
  });
});
