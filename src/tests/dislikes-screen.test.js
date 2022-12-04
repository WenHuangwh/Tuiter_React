import MyDislikes from "../components/profile/my-dislikes";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { createTuitByUser, deleteTuit, findAllTuits } from "../services/tuits-service";
import { createUser, deleteUsersByUsername } from "../services/users-service";
import { findAllTuitsDislikedByUser, userTogglesTuitDislikes } from "../services/dislikes-service";
import { findAllTuitsLikedByUser, userTogglesTuitLikes } from "../services/likes-service";
import '@testing-library/jest-dom';
import * as React from "react";

const MOCKED_USER = { username: "alice", password: "abc123", email: "alice@email.com", _id: "123" };

const MOCKED_TUITS = [
    { _id: "a1", tuit: "alice's tuit", postedBy: "123", postedOn: "Nov-05-2022" },
    { _id: "b2", tuit: "bob's tuit", postedBy: "456", postedOn: "Nov-05-2022" },
    { _id: "c3", tuit: "charlie's tuit", postedBy: "789", postedOn: "Nov-05-2022" },
];

test('display disliked tuits', async () => {
    // Creates Tuit
    const testUser = await createUser(MOCKED_USER);
    const createdTuit = await createTuitByUser(testUser._id, MOCKED_TUITS[2].tuit);
    await userTogglesTuitDislikes(testUser._id, createdTuit._id);
    await userTogglesTuitDislikes(testUser._id, createdTuit._id);

    const tuits = await findAllTuits();
    const likedTuits = await findAllTuitsLikedByUser(testUser._id);
    const dislikedTuits = await findAllTuitsDislikedByUser(testUser._id);
    render(
        <HashRouter>
            <Tuits tuits={tuits} userLikedTuits={likedTuits} userDislikedTuits={dislikedTuits} />
        </HashRouter>);
    const tuit = screen.getByText(/charlie's tuit/i);
    expect(tuit).toContainHTML(`<i class="fa-solid fa-thumbs-up" />`);
    expect(tuit).toContainHTML(`<i class="fa-solid fa-thumbs-down" />`);

    await deleteTuit(createdTuit._id);
    await deleteUsersByUsername(MOCKED_USER.username)
})

test('Test connection of like and dislike', async () => {
    // Creates Tuit
    const testUser = await createUser(MOCKED_USER);
    const createdTuit = await createTuitByUser(testUser._id, MOCKED_TUITS[2].tuit);
    await userTogglesTuitLikes(testUser._id, createdTuit._id);
    await userTogglesTuitDislikes(testUser._id, createdTuit._id);

    const tuits = await findAllTuits();
    const likedTuits = await findAllTuitsLikedByUser(testUser._id);
    const dislikedTuits = await findAllTuitsDislikedByUser(testUser._id);
    render(
        <HashRouter>
            <Tuits tuits={tuits} userLikedTuits={likedTuits} userDislikedTuits={dislikedTuits} />
        </HashRouter>);
    const tuit = screen.getByText(/charlie's tuit/i);
    expect(tuit).toContainHTML(`<i class="fa-solid fa-thumbs-up" />`);
    expect(tuit).toContainHTML(`<i class="fa-solid fa-thumbs-down" style="color: red;" />`);

    await userTogglesTuitDislikes(testUser._id, createdTuit._id);
    await deleteTuit(createdTuit._id);
    await deleteUsersByUsername(MOCKED_USER.username)
})

test('Test dislike static', async () => {
    // Creates two Tuit
    const testUser = await createUser(MOCKED_USER);
    const createdTuit1 = await createTuitByUser(testUser._id, MOCKED_TUITS[2].tuit);
    const createdTuit2 = await createTuitByUser(testUser._id, MOCKED_TUITS[2].tuit);
    await userTogglesTuitDislikes(testUser._id, createdTuit1._id);
    await userTogglesTuitDislikes(testUser._id, createdTuit2._id);

    const tuits = await findAllTuits();
    const likedTuits = await findAllTuitsLikedByUser(testUser._id);
    const dislikedTuits = await findAllTuitsDislikedByUser(testUser._id);
    render(
        <HashRouter>
            <Tuits tuits={tuits} userLikedTuits={likedTuits} userDislikedTuits={dislikedTuits} />
        </HashRouter>);
    const tuit1 = screen.getByText(/bob's tuit/i);
    expect(tuit1).toBeInTheDocument();
    const tuit2 = screen.getByText(/charlie's tuit/i);
    expect(tuit2).toBeInTheDocument();

    await deleteTuit(createdTuit1._id);
    await deleteTuit(createdTuit2._id);
    await deleteUsersByUsername(MOCKED_USER.username)
})
