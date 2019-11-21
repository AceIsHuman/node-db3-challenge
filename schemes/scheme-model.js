const db = require('../knexfile.js');

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db('schemes');
};

async function findById(id) {
  try { 
    const scheme = await db('schemes').where({ id }).first();
    return scheme;
  } catch (err) {
    return null;
  }
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
