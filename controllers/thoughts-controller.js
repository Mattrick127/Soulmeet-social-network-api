const { Thought, User } = require('../models');

const thoughtsController = {
    addThought({ params, body }, res) {
        console.log(params);
        Thought.create(body)
        .then(({ _id }) => {
            return Thought.findOneAndUpdate(
                
            )
        })
    }
}

module.exports = thoughtsController;