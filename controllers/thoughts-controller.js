const { Thoughts, User } = require('../models');

const thoughtsController = {
    addThought({ params, body }, res) {
        console.log(params);
        Thoughts.create(body)
        .then(({ _id }) => {
            return Thoughts.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thought: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            console.log(dbUserData);
            if(!dbUserData) {
                res.status(404).json({ message: 'No Thoughts found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    getAllThoughts(req, res) {
        Thoughts.find({})
        .populate({
            path: 'thoughts'
        })
    },


    addReaction({ params, body }, res) {
        Reaction.findOneAndUpdate(
            { _id: params.thoughtsId },
            { $push: { replies: body } },
            { new: true, runValidators: true }
        )
    }
}

module.exports = thoughtsController;