const db = require('../knexfile.js');

module.exports = {
  find,
  findById,
  findSteps,
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

async function findSteps(scheme_id) {
  return db('steps as stp')
    .where({ scheme_id })
    .join('schemes as sch', 'stp.scheme_id', 'sch.id')
    .select('stp.id', 'sch.scheme_name', 'stp.step_number', 'stp.instructions')
    .orderBy('stp.step_number');
}

async function add(scheme) {
  const [id] = await db('schemes').insert(scheme);
  return findById(id);
};

async function update(changes, id) {
  const success = await db('schemes').where({ id }).update(changes);
  return findById(id);
};

function remove(id) {
  return db('schemes').where({ id }).del();
};
