import React from "react";

function ResturantOnlineMediaLinks({
  setshowRestaurantLinksComponent,
  setshowResturantBranchDetails,
  facebookLink,
  setFacebook,
  instagramLink,
  setInstagram,
  twitterLink,
  settwitter,
  youtubeLink,
  setyoutube,
  linkedInLink,
  setlinkedIn,
  setShowTheme,
}) {
  const goNext = () => {
    setshowResturantBranchDetails(true);
    setshowRestaurantLinksComponent(false);
    window.scrollTo(0, 0);
  };
  const goBack = () => {
    setShowTheme(true);
    setshowRestaurantLinksComponent(false);
    window.scrollTo(0, 0);
  };
  return (
    <div className="container add-customer">
      <h2>Online Media Details</h2>
      <div className="row" style={{ borderTop: "1px dashed #b3b3b3" }}>
        <div className="col-lg-12 d-flex align-items-center">
          <button className="btn next-btn" onClick={goBack}>
            Back
          </button>
          <button className="btn next-btn" onClick={goNext}>
            Next
          </button>
        </div>
        <h4 className="col-lg-8 ">
          Facebook Link :
          <input
            type="text"
            value={facebookLink}
            onChange={(e) => setFacebook(e.target.value)}
          />
        </h4>
        <h4 className="col-lg-8">
          Instagram Link :
          <input
            type="text"
            value={instagramLink}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </h4>
        <h4 className="col-lg-8">
          Twitter Link :
          <input
            type="text"
            value={twitterLink}
            onChange={(e) => settwitter(e.target.value)}
          />
        </h4>
        <h4 className="col-lg-8">
          Youtube Link :
          <input
            type="text"
            value={youtubeLink}
            onChange={(e) => setyoutube(e.target.value)}
          />
        </h4>
        <h4 className="col-lg-8">
          LinkedIn Link :
          <input
            type="text"
            value={linkedInLink}
            onChange={(e) => setlinkedIn(e.target.value)}
          />
        </h4>
        <div className="col-lg-12 d-flex align-items-center">
          <button className="btn next-btn" onClick={goBack}>
            Back
          </button>
          <button className="btn next-btn" onClick={goNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResturantOnlineMediaLinks;
