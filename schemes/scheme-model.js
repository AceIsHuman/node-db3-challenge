const db = require('../knexfile.js');

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

async function find() {
  return db('schemes');
};

function findById(id) {
  return db('schemes').where({ id }).first();
};

async function add(scheme) {
  const id = await db('schemes').insert(scheme);
  return findById(id);
};

async function update(changes, id) {
  return db('schemes').where({ id }).update(changes);
};

function remove(id) {
  return db('schemes').where({ id }).del();
};
