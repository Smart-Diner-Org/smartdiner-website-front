import React from "react";

function WebsiteDetail2({
  setshowwebsiteDetail1,
  hasCustomInfo,
  customInfo,
  setCustomInfo,
  sethasCustomInfo,
  setisDeliveryAvailable,
  isDeliveryAvailable,
  setpreBookingPriorTime,
  preBookingPriorTime,
  setisRunningOrdersAvailable,
  isRunningOrdersAvailable,
  setisCODavailable,
  isCODavailable,
  setisPaymentGateway,
  isPaymentGateway,
  setisPreBooking,
  isPreBooking,
  setshowwebsiteDetail2,
  setshowWebsiteImages,
}) {
  const goNext = () => {
    setshowWebsiteImages(true);
    setshowwebsiteDetail2(false);
    window.scrollTo(0, 0);
  };
  const goBack = () => {
    setshowwebsiteDetail1(true);
    setshowwebsiteDetail2(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container add-customer website-options">
      <h2>Website Options</h2>
      <div className="row" style={{ borderTop: "1px dashed #b3b3b3" }}>
        <div className="col-lg-12 d-flex align-items-center">
          <button className="btn next-btn" onClick={goBack}>
            Back
          </button>
          <button className="btn next-btn" onClick={goNext}>
            Next
          </button>
        </div>
        <h4 className="col-lg-12">
          Delivery Available :
          <select
            value={isDeliveryAvailable}
            onChange={(e) =>
              e.target.value === "true"
                ? setisDeliveryAvailable(true)
                : setisDeliveryAvailable(false)
            }
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </h4>
        <h4 className="col-lg-12">
          Cash On Delivery :
          <select
            value={isCODavailable}
            onChange={(e) =>
              e.target.value === "true"
                ? setisCODavailable(true)
                : setisCODavailable(false)
            }
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </h4>
        <h4 className="col-lg-12">
          Online Payment :
          <select
            value={isPaymentGateway}
            onChange={(e) =>
              e.target.value === "true"
                ? setisPaymentGateway(true)
                : setisPaymentGateway(false)
            }
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </h4>
        <h4 className="col-lg-12">
          Running Orders :
          <select
            value={isRunningOrdersAvailable}
            onChange={(e) =>
              e.target.value === "true"
                ? setisRunningOrdersAvailable(true)
                : setisRunningOrdersAvailable(false)
            }
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </h4>
        <h4 className="col-lg-12">
          Pre Booking Orders :
          <select
            value={isPreBooking}
            onChange={(e) =>
              e.target.value === "true"
                ? setisPreBooking(true)
                : setisPreBooking(false)
            }
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </h4>
        <h4
          className="col-lg-8"
          style={isPreBooking ? { opacity: "1" } : { opacity: "0.2" }}
        >
          Pre Booking Order Prior Time (Hours) :
          <input
            type="number"
            disabled={isPreBooking ? false : true}
            value={preBookingPriorTime}
            onChange={(e) =>
              Number(e.target.value) > 0
                ? setpreBookingPriorTime(e.target.value)
                : false
            }
          />
        </h4>
        <h4 className="col-lg-12 ">
          Include Custom Orders Info :
          <select
            value={hasCustomInfo}
            onChange={(e) =>
              e.target.value === "true"
                ? sethasCustomInfo(true)
                : sethasCustomInfo(false)
            }
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </h4>
        <h4
          className="col-lg-8"
          style={hasCustomInfo ? { opacity: "1" } : { opacity: "0.2" }}
        >
          Custom Orders Info :
          <textarea
            type="text"
            disabled={hasCustomInfo ? false : true}
            value={customInfo}
            onChange={(e) => setCustomInfo(e.target.value)}
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

export default WebsiteDetail2;
