import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

function AddRestaurantDetails({
  logoImg,
  setLogoImg,
  setWebsiteURL,
  websiteURL,
  restaurantName,
  setRestaurantName,
  setRestaurantDetails,
  setShowTheme,
  setCustomerDetails,
  setLogoUrl,
  logoUrl
}) {
  const [previewLogo, setPreview] = useState(null);
  const [target, setTarget] = useState(null);
  const [showToolTip, setToolTip] = useState(false);
  const [toolTipMessage, setToolTipMessage] = useState(null);
  const goNext = () => {
    if (restaurantName.length <= 0) {
      setToolTipMessage("Enter <strong>Restaurant Name</strong>.");
      setTarget(document.getElementById("restaurantName"));
      setToolTip(true);
      return false;
    }
    setShowTheme(true);
    setRestaurantDetails(false);
    window.scrollTo(0, 0);
  };
  const goBack = () => {
    setCustomerDetails(true);
    setRestaurantDetails(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container add-customer">
      <Overlay show={showToolTip} placement="bottom" target={target}>
        <Popover id="popover-contained">
          <Popover.Content>
            <div dangerouslySetInnerHTML={{ __html: toolTipMessage }}></div>
          </Popover.Content>
        </Popover>
      </Overlay>
      <h2>Restaurant Details</h2>
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
          Restaurant Name :
          <input
            type="text"
            value={restaurantName}
            id="restaurantName"
            onChange={(e) => setRestaurantName(e.target.value)}
            onFocus={()=>setToolTip(false)}
          />
        </h4>
        <h4 className="col-lg-8">
          WebsiteURL :
          <input
            type="mobile"
            value={websiteURL}
            id="websiteURL"
            onChange={(e) => setWebsiteURL(e.target.value)}
          />
        </h4>
        <h4 className="col-lg-8">
          LogoURL :
          <input
            type="text"
            value={logoUrl}
            id="websiteURL"
            onChange={(e) => setLogoUrl(e.target.value)}
          />
        </h4>
        <h4 className="col-lg-8">
          Upload Logo :
          <input
            type="file"
            id="upload-logo"
            accept="image/*"
            onChange={async (e) => {
              setLogoImg(e.target.files[0]);
              let reader = new FileReader();
              let file = e.target.files[0];
              const options = {
                maxSizeMB: 0.05,
                maxWidthOrHeight: 300,
                useWebWorker: true,
              };
              try {
                const compressedFile = await imageCompression(file, options);
                console.log(compressedFile);
                console.log(
                  `${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`
                );
                reader.onloadend = () => {
                  setLogoImg(compressedFile);
                  setPreview(reader.result);
                };
                reader.readAsDataURL(compressedFile);
              } catch (error) {
                console.log(error);
              }
            }}
          />
        </h4>
        <div className="col-lg-8">
          {previewLogo && <img src={previewLogo} alt="" />}
        </div>

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

export default AddRestaurantDetails;
