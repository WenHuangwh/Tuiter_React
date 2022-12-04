import {
    findAllTuitsDislikedByUser,
    userTogglesTuitDislikes,
    userTogglesTuitLikes
} from "../services/likes-service"

import {
    createUser,
    deleteUsersByUsername
} from "../services/users-service";


import {
    findTuitById,
    createTuitByUser,
    deleteTuit
} from "../services/tuits-service"

import {
    findAllTuitsDislikedByUser,
    userTogglesTuitDislikes
} from "../services/dislikes-service";


describe('test user toggles dislikes button', () => {
    const testUser = {
        username: 'testTuit',
        password: 'test',
        email: 'tt@aliens.com',
        id: ""
    };

    const tuit = "Test dislike tuit";

    beforeAll(() => {
        // setup test user
        return deleteUsersByUsername(testUser.username);
    })

    afterAll(() => {
        // remove test user
        return deleteUsersByUsername(testUser.username);
    })

    test('can create tuit with REST API', async() => {
        // Create test user and test tuit
        const newUser = await createUser(testUser);
        testUser.id = newUser._id;
        const newTuit = await createTuitByUser(testUser.id, { tuit });
        // dislike a tuit
        await userTogglesTuitDislikes(testUser.id, newTuit._id);
        const dislikedTuit = findTuitById(newTuit._id);
        expect(dislikedTuit.stats.dislikes).toEqual(1);
        expect(dislikedTuit.stats.likes).toEqual(0);
        // like this tuit
        const likedTuit = await userTogglesTuitLikes(testUser.id, newTuit._id);
        expect(likedTuit.stats.dislikes).toEqual(0);
        expect(likedTuit.stats.likes).toEqual(1);
        // dislike this tuit again
        const dislikedTuitAgain = await userTogglesTuitDislikes(testUser.id, newTuit._id);
        expect(dislikedTuitAgain.stats.dislikes).toEqual(1);
        expect(dislikedTuitAgain.stats.likes).toEqual(0);
        // cancel dislike
        const cancelDislike = await userTogglesTuitDislikes(testUser.id, newTuit._id);
        expect(cancelDislike.stats.dislikes).toEqual(0);
        expect(cancelDislike.stats.likes).toEqual(0);
        await deleteTuit(newTuit._id);
    })
});


describe('find all dislike tuit', () => {
    const testUser = {
        username: 'testTuit',
        password: 'test',
        email: 'tt@aliens.com',
        id: ''
    };

    const tuit = "Test dislike tuit";

    beforeAll(() => {
        // setup test user
        return deleteUsersByUsername(testUser.username);
    })

    afterAll(() => {
        // remove test user
        return deleteUsersByUsername(testUser.username);
    })

    test('can create tuit with REST API', async() => {
        // Create test user and test tuit
        const newUser = await createUser(testUser);
        testUser.id = newUser._id;
        const newTuit = await createTuitByUser(testUser.id, { tuit });
        // dislike a tuit
        await userTogglesTuitDislikes(testUser.id, newTuit._id);
        const dislikedTuit = findTuitById(newTuit._id);
        const tuits = await findAllTuitsDislikedByUser(newUser.profile._id);
        expect(tuits.length).toBeGreaterThanOrEqual(1);
        var count = 0;
        for (var t of tuits) {
            if (t._id == dislikedTuit._id) {
                count++;
                expect(t.tuit).toEqual(dislikedTuit.tuit);
                await deleteTuit(testTuit._id);
            }
        }
        expect(count).toEqual(1);
        await deleteTuit(newTuit._id);
    })
});