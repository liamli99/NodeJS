// People router groups all routes whose route path starts with '/api/people'!

const express = require('express');
const router = express.Router();

const { people } = require('./resources/data');

// Note that in the main file, the mount path of this router is '/api/people', so that all the following route paths should be relative to '/api/people'!

// /api/people
router.get('/', (req, res) => {
    res.status(200).json({ success: true, data: people });
});

// /api/people
router.post('/', (req, res) => {
    console.log(req.body);

    const { name } = req.body;
    if (name) {
        res.status(201).json({ success: true, person: name });
    } else {
        res.status(400).json({ success: false, msg: 'Please provide your name' });
    }
});

// /api/people/:id
router.put('/:id', (req, res) => {
    console.log(req.params);
    console.log(req.body);

    const { id } = req.params;
    const { name } = req.body;
    
    const person = people.find((person) => person.id === Number(id));
    if (!person) {
        return res.status(404).json({ success: false, msg: 'Person Not Exist' });
    }

    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name;
        }
        return person;
    })
    res.status(200).json({ success: true, data: newPeople });
});

// /api/people/:id
router.delete('/:id', (req, res) => {
    console.log(req.params);

    const { id } = req.params;

    const person = people.find((person) => person.id === Number(id));
    if (!person) {
        return res.status(404).json({ success: false, msg: 'Person Not Exist' });
    }

    const newPeople = people.filter((person) => {
        return person.id !== Number(id);
    })
    res.status(200).json({ success: true, data: newPeople });
});

module.exports = router;