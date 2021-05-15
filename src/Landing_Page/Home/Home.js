import React, { useEffect } from "react";
import Banner from "./Banner";
import ServiceArea from "./ServiceArea";
import Testimonal from "./Testimonal";
import FameSection from './FameSection';
import VideoSection from './VideoSection'
import ReactGA from "react-ga";
import { useLocation } from "react-router-dom";

function Index() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    ReactGA.pageview("/homepage");
  }, []);
  return (
    <div>
      <Banner />
      <ServiceArea />
      <VideoSection />
      <FameSection />
      <Testimonal />
    </div>
  );
}

export default Index;
