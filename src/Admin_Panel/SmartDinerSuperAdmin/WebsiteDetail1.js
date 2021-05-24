import React from "react";

function WebsiteDetail1({
  setshowwebsiteDetail1,
  pageTitle,
  setpageTitle,
  pageDescription,
  setpageDescription,
  primaryColor,
  setprimaryColor,
  secondaryColor,
  setsecondaryColor,
  setshowDeliveryDetails,
  setshowwebsiteDetail2,
}) {
  const goNext = () => {
    setshowwebsiteDetail2(true);
    setshowwebsiteDetail1(false);
    window.scrollTo(0, 0);
  };
  const goBack = () => {
    setshowDeliveryDetails(true);
    setshowwebsiteDetail1(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container add-customer">
      <h2>Website Details</h2>
      <div className="row" style={{ borderTop: "1px dashed #b3b3b3" }}>
        <h4 className="col-lg-8 ">
          Page Title :
          <input
            type="text"
            value={pageTitle}
            onChange={(e) => setpageTitle(e.target.value)}
          />
        </h4>
        <h4 className="col-lg-8">
          Page Description :
          <textarea
            type="text"
            value={pageDescription}
            onChange={(e) => setpageDescription(e.target.value)}
          />
        </h4>
        <h4 className="col-lg-12 d-flex align-items-center">
          Primary Color : {primaryColor}
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setprimaryColor(e.target.value)}
          />
        </h4>
        <h4 className="col-lg-12 d-flex align-items-center">
          Secondary Color : {secondaryColor}
          <input
            type="color"
            value={secondaryColor}
            onChange={(e) => setsecondaryColor(e.target.value)}
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

export default WebsiteDetail1;