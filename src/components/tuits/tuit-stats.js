import React from "react";
import { useState, useEffect, useCallback } from "react";
import { renderMatches } from "react-router-dom";
import * as likesService from "../../services/likes-service";
/**
  * Tuit stats component.
  *
  * @typedef TuitStats stats of tuits, including: number of replies, retuits, likes, dislikes
  * @property {tuit} - A tuit.
  * @property {likeTuit} - A function that user can like a tuit.
  * @property {dislikeTuit} - A function that user can dislike a tuit.
  */
const TuitStats = ({ tuit, likeTuit, dislikeTuit }) => {
  return (
    <div className="row mt-2">
      <div className="col">
        <i className="far fa-message me-1"></i>
        {tuit.stats && tuit.stats.replies}
      </div>
      <div className="col">
        <i className="far fa-retweet me-1"></i>
        {tuit.stats && tuit.stats.retuits}
      </div>
      <div className="col">
        <span onClick={() => likeTuit(tuit)}>
          {
            tuit.stats.likes > 0 &&
            <i class="fa-solid fa-thumbs-up"
              style={{ color: 'red' }}></i>
          }
          {
            tuit.stats.likes <= 0 &&
            <i class="fa-light fa-thumbs-up"></i>
          }
          {tuit.stats && tuit.stats.likes}
        </span>
      </div>
      <div className="col">
        <span onClick={() => dislikeTuit(tuit)}>
          {
            tuit.stats.dislikes > 0 &&
            <i className="fa-solid fa-thumbs-down"
              style={{ color: 'red' }}></i>
          }
          {
            tuit.stats.dislikes <= 0 &&
            <i className="fa-light fa-thumbs-down"></i>
          }
          {tuit.stats && tuit.stats.dislikes}
        </span>
      </div>
      <div className="col">
        <i className="far fa-inbox-out"></i>
      </div>
    </div>
  );
}
export default TuitStats;


// export default class TuitStats extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div className="row mt-2">
//         <div className="col">
//           <i className="far fa-message me-1"></i>
//           {this.props.tuit.stats && this.props.tuit.stats.replies}
//         </div>
//         <div className="col">
//           <i className="far fa-retweet me-1"></i>
//           {this.props.tuit.stats && this.props.tuit.stats.retuits}
//         </div>
//         <div className="col">
//           <span onClick={() => this.props.likeTuit(this.props.tuit)}>
//             {
//               this.props.tuit.stats.likes > 0 &&
//               <i className="fas fa-heart"
//                 style={{ color: 'red' }}></i>
//             }
//             {
//               this.props.tuit.stats.likes <= 0 &&
//               <i className="far fa-heart"></i>
//             }
//             {this.props.tuit.stats && this.props.tuit.stats.likes}
//           </span>
//         </div>
//         <div className="col">
//           <i className="far fa-inbox-out"></i>
//         </div>
//       </div>
//     );
//   }
// }