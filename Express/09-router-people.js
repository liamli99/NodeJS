// Further refractor 08-router-people.js to make it cleaner!

const express = require('express');
const router = express.Router();

const { getPeople, createPerson, updatePerson, deletePerson } = require('./09-controller-people');

// router.get('/', getPeople);
// router.post('/', createPerson);
// router.put('/:id', updatePerson);
// router.delete('/:id', deletePerson);
router.route('/').get(getPeople).post(createPerson);
router.route('/:id').put(updatePerson).delete(deletePerson);

module.exports = router;