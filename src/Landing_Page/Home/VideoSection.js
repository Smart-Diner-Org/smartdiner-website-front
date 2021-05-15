import React from "react";
import VideoPlayer from "./VideoPlayer";
import ReactGA from "react-ga";

function VideoSection() {
  const [showVideo, setVideo] = React.useState(false);
  return (
    <section class="video-sec-area">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-lg-5 col-sm-12 video-left justify-content-center align-items-center d-flex">
            <div class="overlay overlay-bg"></div>
            <a
              id="play-home-video"
              class="video-play-button"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                ReactGA.event({
                  category: "In home page",
                  action: "Clicked video play button",
                  label: "Video opened",
                  transport: "beacon",
                });
                setVideo(!showVideo);
              }}
            >
              <span></span>
            </a>
            {showVideo && (
              <VideoPlayer closeVideo={() => setVideo(!showVideo)} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;
