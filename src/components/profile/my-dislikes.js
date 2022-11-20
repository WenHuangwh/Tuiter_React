import Tuits from "../tuits/index";
import * as service from "../../services/likes-service";
import { useEffect, useState } from "react";

/**
  * My dislikes page.
  *
  * @typedef MyDislikes page
  */
const MyDislikes = () => {
    // Retreat all tuits disliked by me
    const [dislikedTuits, setDislikedTuis] = useState([]);
    const findTuitsIDislike = () =>
        service.findAllTuitsDislikedByUser("me")
            .then((tuits) => setDislikedTuis(tuits));
    useEffect(findTuitsIDislike, []);

    return (
        <div>
            <h2>My Dislikes</h2>
            <Tuits tuits={dislikedTuits}
                refreshTuits={findTuitsIDislike} />
        </div>
    );
};
export default MyDislikes;