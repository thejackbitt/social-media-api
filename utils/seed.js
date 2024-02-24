const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUser, getRandomThoughts, getRandomFriends } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await connection.db.dropCollection('thoughts').catch(err => console.log('No thoughts collection to drop:', err.message));
    await connection.db.dropCollection('users').catch(err => console.log('No users collection to drop:', err.message));

    const users = [];
    const thoughts = [];

    for (let i = 0; i < 20; i++) {
        const thoughtsForUser = getRandomThoughts(2);
        thoughts.push(...thoughtsForUser);
    }

    for (let i = 0; i < 20; i++) {
        const newUser = getRandomUser();
        newUser.friends = getRandomFriends();
        newUser.thoughts = getRandomThoughts(2);
        users.push(newUser);
    }
    
    await Thought.collection.insertMany(thoughts);
    await User.collection.insertMany(users);

    console.table(users);
    console.info('Seeding successful!');
    process.exit(0);
});
