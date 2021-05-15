import React from "react";
import { smartDinerVideo } from "../../helpers/constants";

function VideoPlayer({closeVideo}) {
  return (
    <div className="video-player-popup">
      <div style={{width:"80%",height:"80%"}}>
        <button className="close-video" onClick={closeVideo}>X</button>
        <video loading="lazy" width="100%" height="100%" controls="controls" autoPlay>
          <source src={smartDinerVideo[0]} type="video/webm" />
          <source src={smartDinerVideo[1]} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default VideoPlayer;
