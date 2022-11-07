import Tuits from "../components/tuits";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { findAllTuits, deleteTuit } from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
    { username: "alice", password: "abc123", email: "alice@email.com", _id: "123" },
    { username: "bob", password: "abc123", email: "bob@email.com", _id: "456" },
    { username: "charlie", password: "abc123", email: "charlie@email.com", _id: "789" },
];

const MOCKED_TUITS = [
    { _id: "a1", tuit: "alice's tuit", postedBy: "123", postedOn: "Nov-05-2022" },
    { _id: "b2", tuit: "bob's tuit", postedBy: "456", postedOn: "Nov-05-2022" },
    { _id: "c3", tuit: "charlie's tuit", postedBy: "789", postedOn: "Nov-05-2022" },
];

test('tuit list renders static tuit array', () => {
    render(
        <HashRouter>
            <Tuits tuits={MOCKED_TUITS} deleteTuit={deleteTuit} />
        </HashRouter>
    );
    const user = screen.getByText(/alice/i);
    expect(user).toBeInTheDocument();
    const tuit = screen.getByText(/bob's tuit/i);
    expect(tuit).toBeInTheDocument();
});

test('tuit list renders async', async () => {
    const REAL_TUITS = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={REAL_TUITS} deleteTuit={deleteTuit} />
        </HashRouter>
    );
    const user = screen.getByText(/nasa@nasa/i);
    expect(user).toBeInTheDocument();
    const tuit = screen.getByText(/Mars/i);
    expect(tuit).toBeInTheDocument();
})

test('tuit list renders mocked', async () => {
    axios.get.mockImplementation(() =>
        Promise.resolve({ data: { tuits: MOCKED_TUITS } }));

    const response = await findAllTuits();
    const tuits = response.tuits;
    render(
        <HashRouter>
            <Tuits tuits={tuits} deleteTuit={deleteTuit} />
        </HashRouter>
    );
    const user = screen.getByText(/alice/i);
    expect(user).toBeInTheDocument();
    const tuit = screen.getByText(/bob's tuit/i);
    expect(tuit).toBeInTheDocument();
});