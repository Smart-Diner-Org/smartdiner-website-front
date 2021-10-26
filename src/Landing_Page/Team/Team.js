import React, { useEffect } from "react";
import MemberCard from "./MemberCard";
import { useLocation, Link } from "react-router-dom";
import ReactGA from "react-ga";
import Members from "./Members";
import HelpingHands from "./HelpingHands";

function Team() {
  const { pathname } = useLocation();

  useEffect(() => {
    ReactGA.pageview("/contact-page");
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div>
      <section class="banner_area ">
        <div class="banner_inner overlay d-flex align-items-center">
          <div class="container">
            <div class="banner_content text-left">
              <div class="page_link">
                <Link to="/">Home</Link>
                <Link to="/team">Team Members</Link>
              </div>
              <h2>Team Members</h2>
            </div>
          </div>
        </div>
      </section>

      <div class="core-team-area">
        <section class="team-area pt-120 pb-100">
          <div class="container">
            <div class="owl-carousel active-team-carusel">
              {/* <!-- single carousel --> */}

              <div class="row align-items-center single-item">
                {Members.map(data=><MemberCard 
                  key={data.id}
                  name={data.name}
                  role={data.role}
                  photo={data.photo}
                  twitter={data.twitter}
                  linkedin={data.linkedin}
                  instagram={data.instagram}
                />)}
                
              </div>
            </div>
          </div>
        </section>
      </div>
      <center><h2>Other Helping Hands</h2></center>
      <div class="helper-area">
        <section class="team-area pt-120 pb-100">
          <div class="container">
            <div class="owl-carousel active-team-carusel">
              {/* <!-- single carousel --> */}

              <div class="row align-items-center single-item">

              {HelpingHands.map(data=><MemberCard 
                  key={data.id}
                  name={data.name}
                  role={data.role}
                  photo={data.photo}
                  twitter={data.twitter}
                  linkedin={data.linkedin}
                  instagram={data.instagram}
                />)}

                
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Team;