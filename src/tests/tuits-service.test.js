import {
    createTuit,
    deleteTuit,
    findTuitById,
    findAllTuits
} from "../services/tuits-service"

import {
    createUser,
    deleteUsersByUsername,
    findAllUsers,
    findUserById
} from "../services/users-service";


describe('createTuit', () => {
    // sample tuit to insert

    const testUser = {
        username: 'testTuit-123',
        password: 'tt426',
        email: 'tt@aliens.com',
    };

    const tuit = "Test create tuit -123";

    beforeAll(async() => {
        // create a new user
        return deleteUsersByUsername(testUser.username);
    })

    afterAll(() => {
        // remove test tuit and test user
        return deleteUsersByUsername(testUser.username);
    })

    test('can create tuit with REST API', async() => {
        // insert new tuit
        const newUser = await createUser(testUser);
        const newTuit = await createTuit(newUser._id, { tuit });
        expect(newTuit.tuit).toEqual(tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);
        return deleteTuit(newTuit._id);
    })
});

describe('can delete tuit wtih REST API', () => {
    // TODO: implement this
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    // TODO: implement this
});

describe('can retrieve all tuits with REST API', () => {
    // TODO: implement this
});