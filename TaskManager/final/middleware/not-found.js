// Create a Not Found page for all undefined routes!
const notFound = (req, res) => res.status(404).send('Page Not Found!');

module.exports = notFound;