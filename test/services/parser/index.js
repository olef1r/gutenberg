import { expect } from 'chai';
import sinon from 'sinon';
import parsesrService from '../../../src/services/parser/index';
import bookService from '../../../src/services/postgres/book';

const file = `
<rdf:RDF xml:base="http://www.gutenberg.org/">  
<pgterms:ebook rdf:about="ebooks/387">
<dcterms:subject>
<rdf:Description rdf:nodeID="N2a026fe5591c400db8ad6b06fc63b9a3">
<rdf:value>
Authors, Scottish -- 19th century -- Correspondence
</rdf:value>
</rdf:Description>
</dcterms:subject>
</pgterms:ebook>
</rdf:RDF>`;

const object = {
  date: [
    {
      _: '1996-01-01',
      $: { 'rdf:datatype': 'http://www.w3.org/2001/XMLSchema#date' },
    },
  ],
  authors: [{ 'pgterms:agent': [{ 'pgterms:name': ['some name'] }] }],
  license: [{ $: { 'rdf:resource': 'license' } }],
  title: ['title'],
  language: [{ 'rdf:Description': [{ 'rdf:value': [{ _: 'en' }] }] }],
  subject: [{ 'rdf:Description': [{ 'rdf:value': ['subject'] }] }],
};

describe('parser - Service', () => {
  it('should be defined', () => {
    expect(parsesrService).to.be.not.undefined;
  });

  it('should be able to save data', async () => {
    const save = sinon.spy(bookService, 'insert');
    parsesrService.saveData(file);
    sinon.assert.calledOnce(save);
    save.restore();
  });

  it('should be able to get date', async () => {
    const date = parsesrService.getDate(object.date);
    expect(date).to.be.equal('1996-01-01');
  });

  it('should be able to get authors', async () => {
    const date = parsesrService.getAuthors(object.authors);
    expect(date).to.be.equal('some name');
  });
  it('should be able to get lisense', async () => {
    const date = parsesrService.getLisense(object.license);
    expect(date).to.be.equal('license');
  });
  it('should be able to get language', async () => {
    const date = parsesrService.getNestedObject(object.language);
    expect(date).to.be.equal('en');
  });
  it('should be able to get subject', async () => {
    const date = parsesrService.getNestedObject(object.subject);
    expect(date).to.be.equal('subject');
  });
});
