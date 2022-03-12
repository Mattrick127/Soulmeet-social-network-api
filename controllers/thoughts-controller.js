const { Thought, User } = require('../models');

const thoughtsController = {
    addThought({ params, body }, res) {
        console.log(params);
        Thought.create(body)
        .then(({ _id }) => {
            return Thought.findOneAndUpdate(
                { _id: params.userId },
                { $push: { }}
            )
        })
    }
}

module.exports = thoughtsController;