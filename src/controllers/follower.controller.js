const { Follower } = require('../db/models');

// Seguir a un usuario
const followUser = async (req, res) => {
    try {
        const { followerId, followedId } = req.body;

        if (followerId === followedId) {
            return res.status(400).json({ message: "No puedes seguirte a ti mismo." });
        }

        const [newFollower, created] = await Follower.findOrCreate({
            where: { followerId, followedId }
        });

        if (!created) {
            return res.status(400).json({ message: "Ya estás siguiendo a este usuario." });
        }

        res.status(201).json(newFollower);
    } catch (error) {
        res.status(500).json({ error: 'Error al seguir al usuario.' });
    }
};


module.exports = { followUser };
