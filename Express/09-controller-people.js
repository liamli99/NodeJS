const { people } = require('./resources/data');

const getPeople = (req, res) => {
    res.status(200).json({ success: true, data: people });
}

const createPerson = (req, res) => {
    console.log(req.body);

    const { name } = req.body;
    if (name) {
        res.status(201).json({ success: true, person: name });
    } else {
        res.status(400).json({ success: false, msg: 'Please provide your name' });
    }
}

const updatePerson = (req, res) => {
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
}

const deletePerson = (req, res) => {
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
}

module.exports = { getPeople, createPerson, updatePerson, deletePerson }