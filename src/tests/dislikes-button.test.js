import {
    findAllTuitsDislikedByUser,
    userTogglesTuitDislikes,
    userTogglesTuitLikes
} from "../services/likes-service"

import {
    signup,
    login,
    profile,
    logout
} from "../services/auth-service"

import {
    createTuit
} from "../services/tuits-service"


describe('test dislikes button', () => {
    const testUser = {
        username: 'testTuit',
        password: 'test',
        email: 'tt@aliens.com',
        credential: 'me'
    };

    const tuit = "Test create tuit -123";

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
        await signup(testUser);
        await login(testUser.credential);
        const newTuit = await createTuit(testUser.credential, { tuit });
        // dislike a tuit
        const dislikedTuit = await userTogglesTuitDislikes(testUser.credential, newTuit._id);
        expect(dislikedTuit.stats.dislikes).toEqual(1);
        expect(dislikedTuit.stats.likes).toEqual(0);
        // like this tuit
        const likedTuit = await userTogglesTuitLikes(testUser.credential, newTuit._id);
        expect(likedTuit.stats.dislikes).toEqual(0);
        expect(likedTuit.stats.likes).toEqual(1);
        // dislike this tuit again
        const dislikedTuitAgain = await userTogglesTuitDislikes(testUser.credential, newTuit._id);
        expect(dislikedTuitAgain.stats.dislikes).toEqual(1);
        expect(dislikedTuitAgain.stats.likes).toEqual(0);
        // cancel dislike
        const cancelDislike = await userTogglesTuitDislikes(testUser.credential, newTuit._id);
        expect(cancelDislike.stats.dislikes).toEqual(0);
        expect(cancelDislike.stats.likes).toEqual(0);
        await deleteTuit(newTuit._id);
        logout(testUser);
    })
});