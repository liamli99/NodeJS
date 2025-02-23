const Task = require('../models/taskModel');
const CustomError = require('../errors/custom-error');

// POST /api/v1/tasks
const createTask = async (req, res, next) => {
    try {
        // https://mongoosejs.com/docs/models.html#constructing-documents
        // https://mongoosejs.com/docs/api/model.html#Model.create()
        // The return value of model.create() is Promise! The resolved value of this Promise is the created document!
        const task = await Task.create(req.body);
        // Shorthand Property
        res.status(201).json({ task });
    // 'error' is the rejected value of the Promise, it includes violations against schema validation rules in taskModel.js! So that POST request's body should follow all those rules!
    } catch (error) {
        // Original code
        // res.status(500).json({ msg: error });
        
        // New code: Pass the error to the next error handling middleware 'middleware/error-handler.js'. This allows us to centralize error handling logic and handle different types of errors consistently!
        next(error); 
    } 
}

// GET /api/v1/tasks
const getAllTasks = async (req, res, next) => {
    try {
        // https://mongoosejs.com/docs/api/model.html#Model.find()
        // The return value of model.find() is Query! Note that Queries are not Promises, but we can use them as Promises! The resolved value is an array of all documents or empty array!
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
    } catch (error) {
        // Original code
        // res.status(500).json({ msg: error });

        // New code: Pass the error to the next error handling middleware 'middleware/error-handler.js'
        next(error);
    }
}

// GET /api/v1/tasks/:id
const getTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        // https://mongoosejs.com/docs/api/model.html#Model.findOne()
        // The return value of model.findOne() is Query! The resolved value is the document which matches the condition!
        const task = await Task.findOne({ _id: id });

        if (task) {
            res.status(200).json({ task });
        } else {
            // This executes when the id has correct syntax (same length as the correct id) but incorrect value!

            // Original code
            // res.status(404).json({ msg: 'Task Not Found' });

            // New code: Pass the custom error to the next error handling middleware 'middleware/error-handler.js'
            next(new CustomError(404, 'Task Not Found'));

            // Alternative solution: Propagate the custom error to 'catch'
            // throw new CustomError(404, 'Task Not Found');
           
        } 
    // Rejected value or thrown error
    } catch (error) {
        // Original code
        // res.status(500).json({ msg: error });

        // New code: Pass the error to the next error handling middleware 'middleware/error-handler.js'
        next(error);
    }
}

// DELETE /api/v1/tasks/:id
const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        // https://mongoosejs.com/docs/api/model.html#Model.findOneAndDelete()
        // The return value of model.findOneAndDelete() is Query! The resolved value is the document which matches the condition!
        const task = await Task.findOneAndDelete({ _id: id });

        if (task) {
            res.status(200).json({ task });
        } else {
            // This executes when the id has correct syntax (same length as the correct id) but incorrect value!

            // Original code
            // res.status(404).json({ msg: 'Task Not Found' });

            // New code: Pass the custom error to the next error handling middleware 'middleware/error-handler.js'
            next(new CustomError(404, 'Task Not Found'));

            // Alternative solution: Propagate the custom error to 'catch'
            // throw new CustomError(404, 'Task Not Found');
        } 
    // Rejected value or thrown error
    } catch (error) {
        // Original code
        // res.status(500).json({ msg: error });

        // New code: Pass the error to the next error handling middleware 'middleware/error-handler.js'
        next(error);
    }
}

// PATCH /api/v1/tasks/:id
// Note that PUT is used to replace the entire resource, while PATCH is used to update part of the resource!!!
// If we want to switch from PATCH to PUT, we only need to replace 'findOneAndUpdate' with 'findOneAndReplace'!!!
// findOneAndUpdate: The document is updated based on req.body (the fields of the document that are not in req.body will remain unchanged!)
// findOneAndReplace: The document is replaced with req.body (the properties of the document that are not in req.body will be removed or set to default values in the schema!)
const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        // https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate()
        // The return value of model.findOneAndUpdate() is Query! The resolved value is the original document which matches the condition by default!
        const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
            new: true, // The resolved value is the updated document!
            runValidators: true // Same as Task.create(), now the rejected value also includes violations against schema validation rules in taskModel.js! However, PATCH request's body should only follow corresponding rules! For example, if req.body only has 'completed', this is not accepted in POST request body because 'create' method checks all the fields and 'name' field is required! However, this is accepted in PATCH request body because 'findOneAndUpdate' only checks the existing field!!!
        });

        if (task) {
            res.status(200).json({ task });
        } else {
            // This executes when the id has correct syntax (same length as the correct id) but incorrect value!

            // Original code
            // res.status(404).json({ msg: 'Task Not Found' });

            // New code: Pass the custom error to the next error handling middleware 'middleware/error-handler.js'
            next(new CustomError(404, 'Task Not Found'));

            // Alternative solution: Propagate the custom error to 'catch'
            // throw new CustomError(404, 'Task Not Found');
        } 
    // Rejected value or thrown error
    } catch (error) {
        // Original code
        // res.status(500).json({ msg: error });

        // New code: Pass the error to the next error handling middleware 'middleware/error-handler.js'
        next(error);
    }
}

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask };