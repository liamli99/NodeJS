// Create a Not Found page for all undefined routes!

// OR res.status(404).send('Not Found');
const notFound = (req, res) => res.status(404).json({ msg: 'Not Found' });

module.exports = notFound;