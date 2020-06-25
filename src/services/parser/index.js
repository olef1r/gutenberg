import { parseString } from 'xml2js';
import bookServise from '../postgres/book';

async function saveData(file) {
  const book = parse(file);
  await bookServise.insert(book);
}

function parse(file) {
  let book = {};
  parseString(file, function (err, result) {
    if (err || !result['rdf:RDF']) return;
    const data = result['rdf:RDF']['pgterms:ebook'][0];
    book = {
      subject: getNestedObject(data['dcterms:subject']),
      title: getNestedObject(data['dcterms:title']),
      publication_date: getDate(data['dcterms:issued']),
      language: getNestedObject(data['dcterms:language']),
      license_rights: getLisense(data['dcterms:license']),
      authors: getAuthors(data['dcterms:creator']),
      publisher: 'Project Gutenberg',
    };
  });
  return book;
}

function getNestedObject(data) {
  if (!data) return null;
  const array = data.map((element) => {
    if (typeof element === 'string') return element;
    const description = element['rdf:Description'][0]['rdf:value'][0];
    return typeof description === 'string' ? description : description['_'];
  });
  return array.toString();
}

function getDate(date) {
  if (!date) return null;
  return date[0]['_'];
}

function getLisense(license) {
  if (!license) return null;
  return license[0]['$']['rdf:resource'];
}

function getAuthors(authors) {
  if (!authors) return null;
  const array = [];
  for (const author of authors) {
    const data = author['pgterms:agent'][0]['pgterms:name'];
    array.push(...data);
  }
  return array.toString();
}

export default {
  saveData,
  getAuthors,
  getDate,
  getLisense,
  getNestedObject,
  parse,
};
