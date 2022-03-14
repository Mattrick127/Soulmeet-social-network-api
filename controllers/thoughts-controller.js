const { Thought, User, } = require('../models');

const thoughtController = {
    addThought ({ params, body }, res) {
        console.log(params);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbThoughtData => {
            console.log(dbThoughtData);
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No Thoughts were found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    getAllThought (req, res) {
        Thought.find({})
        .populate({
            path: 'reaction',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err)
            res.sendStatus(400).json(err);
        })
    },
    getThoughtById ({ params }, res) {
        Thought.findOne(
            { _id: params.id }
        )
        .populate({
            path: 'reaction',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thoughts were found with this id!' });
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400).json(err);
        })
    },
    updateThought ({ params, body },res ) {
        Thought.findOneAndUpdate(
            { _id: params.id }, body, { new: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thoughts were found with this id!' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(404).json(err));
    },
    deleteThought ({ params }, res) {
        Thought.findOneAndDelete(
            { _id: params.id }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thoughts were found with this id!' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(404).json(err));
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { replies: body } },
            { new: true, runValidators: true }
        )
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thoughts were found with this id!' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(404).json(err));
    },
    deleteReaction({ params }, res) {
        Thought.findOneAndDelete(
            { _id: params.id }
            )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thoughts were found with this id!' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(404).json(err));
    }
};

module.exports = thoughtController;