import db from '../../models/index';
function insert(model) {
  return db.Books.create(model);
}

export default { insert };
