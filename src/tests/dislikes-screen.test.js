import MyDislikes from "../components/profile/my-dislikes";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { findAllTuits, deleteTuit } from "../services/tuits-service";

const testUser = {
    username: 'testDislikeTuit',
    password: 'test',
    email: 'tt@aliens.com',
    credential: 'me'
};

const tuit = "Test dislike tuit";

test('my dislike tuit screen renders async', async () => {
    // Create test user and test tuit
    const newUser = await signup(testUser);
    await login(testUser.credential);
    const newTuit = await createTuit(testUser.credential, { tuit });
    // dislike a tuit
    const dislikedTuit = await userTogglesTuitDislikes(testUser.credential, newTuit._id);
    render(
        <HashRouter>
            <MyDislikes />
        </HashRouter>
    );
    const userOnScreen = screen.getByText(/testDislikeTuit/i);
    expect(userOnScreen).toBeInTheDocument();
    const tuitOnScreen = screen.getByText(/dislike/i);
    expect(tuitOnScreen).toBeInTheDocument();
    await deleteTuit(newTuit._id);
    logout(testUser);
    deleteUsersByUsername(testUser.username);
})
