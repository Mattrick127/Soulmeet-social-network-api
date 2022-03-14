const { Thoughts, User, } = require('../models');

const thoughtsController = {
    addThoughts ({ params, body }, res) {
        console.log(params);
        Thoughts.create(body)
        .then(({ _id }) => {
            return Thoughts.findOneAndUpdate(
                { _id: params.userId },
                { $push: { Thoughts: _id } },
                { new: true }
            );
        })
        .then(dbThoughtsData => {
            console.log(dbThoughtsData);
            if(!dbThoughtsData) {
                res.status(404).json({ message: 'No Thoughts were found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    getAllThoughts (req, res) {
        Thoughts.find({})
        .populate({
            path: 'reaction',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err)
            res.sendStatus(400).json(err);
        })
    },
    getThoughtsById ({ params }, res) {
        Thoughts.findOne({ _id: params.id })
        .populate({
            path: 'reaction',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thoughts were found with this id!' });
            }
            res.json(dbThoughtsData)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400).json(err);
        })
    },
    updateThoughts ({ params, body },res ) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thoughts were found with this id!' });
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.status(404).json(err));
    },
    deleteThoughts ({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({ message: 'No thoughts were found with this id!' });
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.status(404).json(err));
    },
    addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtsId },
            { $push: { replies: body } },
            { new: true, runValidators: true }
        )
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({ message: 'No thoughts were found with this id!' });
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.status(404).json(err));
    },
    deleteReaction({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({ message: 'No thoughts were found with this id!' });
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.status(404).json(err));
    }
};

module.exports = thoughtsController;