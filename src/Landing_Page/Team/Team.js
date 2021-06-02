import React, { useEffect } from "react";
import MemberCard from "./MemberCard";
import { useLocation, Link } from "react-router-dom";
import ReactGA from "react-ga";
import { anushree, dharee, divya, sandesh, sharmi, vinay, harith, karthik, nandhiniSiva } from "../s3images";

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
                <MemberCard
                  name={"Sharmiladevi N S"}
                  role={"Founder"}
                  photo={sharmi}
                  twitter={"https://twitter.com/sharmiladevins"}
                  linkedin={"https://www.linkedin.com/in/sharmiladevi-n-s-a03589a2/"}
                />
                <MemberCard
                  name={"Karthikraj"}
                  role={"Interim CTO"}
                  photo={karthik}
                  linkedin={"https://www.linkedin.com/in/karthikrajduraisamy+2/"}
                  twitter={"https://twitter.com/krajdsamy"}
                />
                <MemberCard
                  name={"Harith Anand KV"}
                  role={"Tech Intern"}
                  photo={harith}
                  linkedin={"https://www.linkedin.com/in/harith-anand/"}
                  instagram={"https://www.instagram.com/harith_beckham_/"}
                />
                <MemberCard
                  name={"Nandhini Siva"}
                  role={"Tech Intern"}
                  photo={nandhiniSiva}
                  linkedin={"https://www.linkedin.com/in/nandhini-s-232000/"}
                  twitter={"https://twitter.com/NandhiniSiva13"}
                />
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

                <MemberCard
                  name={"Sandesh P S"}
                  role={"Advisor, Technology"}
                  photo={sandesh}
                  linkedin={"https://www.linkedin.com/in/sandesh-ps-ab975041/"}
                  instagram={"https://twitter.com/sandeshps_1989"}
                />
                <MemberCard
                  name={"Vinay Veerappaji"}
                  role={"Software Engineer"}
                  photo={vinay}
                  linkedin={"https://www.linkedin.com/in/vinay-veerappaji/"}
                  instagram={"https://www.instagram.com/vinay_veerappaji/"}
                />
                <MemberCard
                  name={"Dharanee N"}
                  role={"UI/UX Designer"}
                  photo={dharee}
                  instagram={"https://www.instagram.com/ddsohigh/"}
                  linkedin={"https://linkedin.com/in/dharanee86"}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Team;