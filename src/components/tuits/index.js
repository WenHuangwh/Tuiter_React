import React from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";

function Tuits({ tuits = [], deleteTuit, refreshTuits }) {
  const likeTuit = (tuit) =>
    likesService
      .userTogglesTuitLikes("me", tuit._id)
      .then(refreshTuits)
      .catch(e => alert(e))

  const dislikeTuit = (tuit) =>
    likesService
      .userTogglesTuitDislikes("me", tuit._id)
      .then(refreshTuits)
      .catch(e => alert(e))

  return (
    <div>
      <ul className="ttr-tuits list-group">
        {
          tuits.map && tuits.map(tuit => {
            return (
              <Tuit key={tuit._id} deleteTuit={deleteTuit} likeTuit={likeTuit} dislikeTuit={dislikeTuit} tuit={tuit} />
            );
          })
        }
      </ul>
    </div>
  );
}

export default Tuits;