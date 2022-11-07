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
    const testUser = {
        username: 'testTuit-123',
        password: 'tt426',
        email: 'tt@aliens.com',
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
        const newUser = await createUser(testUser);
        const newTuit = await createTuit(newUser._id, { tuit });
        // Verify inserted tuit properties match sample tuit
        expect(newTuit.tuit).toEqual(tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);
        await deleteTuit(newTuit._id);
    })
});

describe('deleteTuitById', () => {
    const testUser = {
        username: 'testTuit',
        password: 'tt426',
        email: 'tt@aliens.com',
    };

    const tuit = "Test delete tuit";

    beforeAll(() => {
        // setup user
        return deleteUsersByUsername(testUser.username);
    })

    afterAll(() => {
        // remove test user
        return deleteUsersByUsername(testUser.username);
    })

    test('can delete tuit wtih REST API', async() => {
        // Create test user and test tuit
        const newUser = await createUser(testUser);
        const newTuit = await createTuit(newUser._id, { tuit });
        const status = await deleteTuit(newTuit._id);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    })
});

describe('findTuitById', () => {
    const testUser = {
        username: 'testUser',
        password: 'tt426',
        email: 'tt@aliens.com',
    };

    const tuit = "Test find tuit by ID";

    beforeAll(() => {
        // setup test user
        return deleteUsersByUsername(testUser.username);
    })

    afterAll(() => {
        // remove test user
        return deleteUsersByUsername(testUser.username);
    })

    test('can retrieve a tuit by their primary key with REST API', async() => {
        // Create test user and test tuit
        const newUser = await createUser(testUser);
        const newTuit = await createTuit(newUser._id, { tuit });
        // Verify inserted tuit properties match sample tuit
        expect(newTuit.tuit).toEqual(tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);
        // Verify retrieved tuit properties match insert tuit
        const existingTuit = await findTuitById(newTuit._id);
        expect(existingTuit.tuit).toEqual(newTuit.tuit);
        expect(existingTuit.postedBy._id).toEqual(newTuit.postedBy);
        await deleteTuit(newTuit._id);
    })
});

describe('findAllTuit', () => {
    const testUser1 = {
        username: 'testUser-1',
        password: 'abc123',
        email: 'test1@aliens.com',
        tuit: { tuit: "test 1 - 1" }
    };

    const testUser2 = {
        username: 'testUser-2',
        password: 'abc123',
        email: 'test2@aliens.com',
        tuit: { tuit: "test 2 - 2" }
    };

    const testUser3 = {
        username: 'testUser-3',
        password: 'abc123',
        email: 'test3@aliens.com',
        tuit: { tuit: "test 3 - 3" }
    };

    const testUsers = [testUser1, testUser2, testUser3];
    const testTuits = [];

    beforeAll(() => {
        // setup test users
        testUsers.map((testUser) =>
            deleteUsersByUsername(testUser.username)
        )
    })

    test('can retrieve all tuits with REST API', async() => {
        // Create test users and test tuits

        for (var user of testUsers) {
            var newUser = await createUser(user);
            var newTuit = await createTuit(newUser._id, user.tuit);
            testTuits.push(newTuit);
        }
        // retrieve all tuits 
        const tuits = await findAllTuits();
        expect(tuits.length).toBeGreaterThanOrEqual(3);
        // find tuit by testusers
        // count is expect to be the number of all test tuits
        var count = 0;
        for (var tuit of tuits) {
            for (var testTuit of testTuits) {
                if (tuit._id == testTuit._id) {
                    count++;
                    expect(tuit.tuit).toEqual(testTuit.tuit);
                    await deleteTuit(testTuit._id);
                }
            }
        }
        expect(count).toEqual(3);
    })

    afterAll(() => {
        // remove test users
        testUsers.map((testUser) =>
            deleteUsersByUsername(testUser.username));
    })
});