import React from "react";

function DeliveryDetails({
  setshowwebsiteDetail1,
  setshowResturantBranchDetails,
  deliveryDetails,
  setshowDeliveryDetails,
  setDeliveryDetails,
}) {
  const formHandleChange = (e, index) => {
    let details = [...deliveryDetails];
    details[index][e.target.name] = e.target.value;
    setDeliveryDetails(details);
  };
  const goNext = () => {
    setshowwebsiteDetail1(true);
    setshowDeliveryDetails(false);
    window.scrollTo(0, 0);
  };
  const goBack = () => {
    setshowResturantBranchDetails(true);
    setshowDeliveryDetails(false);
    window.scrollTo(0, 0);
  };
  return (
    <div className="container add-customer">
      <h2>Restaurant Branch Delivery Details</h2>
      {deliveryDetails.map((branch, index) => (
        <div
          className="row"
          style={{ borderTop: "1px dashed #b3b3b3" }}
          onChange={(e) => formHandleChange(e, index)}
        >
          <h3 className="col-lg-12 mt-20">Branch {branch.branchName}:</h3>
          <h4 className="col-lg-8">
            Delivery Locations :
            <input
              type="text"
              value={branch.deliveryLocations}
              name="deliveryLocations"
            />
          </h4>
          <h4 className="col-lg-8">
            Delivery Postal Codes :
            <input
              type="text"
              name="deliveryPostalcodes"
              value={branch.deliveryPostalcodes}
            />
          </h4>
          <h4 className="col-lg-8">
            Delivery Locations To Display :
            <input
              type="text"
              name="deliveryLocationsToDisplay"
              value={branch.deliveryLocationsToDisplay}
            />
          </h4>
          <h4 className="col-lg-8">
            Delivery Distance :
            <input
              type="number"
              name="deliveryDistance"
              value={branch.deliveryDistance}
            />
          </h4>
          <h4 className="col-lg-8">
            Delivery Charges :
            <input
              type="text"
              name="deliveryCharge"
              value={branch.deliveryCharges}
            />
          </h4>

          <h4 className="col-lg-12">Delivery Slots : </h4>
          <div
            className="col-lg-8 d-flex justify-content-around flex-wrap mb-10"
            onChange={(e) => e.stopPropagation()}
          >
            {branch.deliverSlots.map((delSlot, delSlotIndex) => (
              <div className="col-lg-9 d-flex justify-content-around">
                <label>
                  From:
                  <input
                    type="time"
                    value={delSlot[`from`]}
                    className="ml-10"
                    id="restaurantName"
                    onChange={(e) => {
                      let data = [...deliveryDetails];
                      data[index].deliverSlots[delSlotIndex][`from`] =
                        e.target.value;
                      setDeliveryDetails(data);
                    }}
                  />
                </label>
                <label>
                  To:
                  <input
                    type="time"
                    className="ml-10"
                    value={delSlot[`to`]}
                    id="restaurantName"
                    onChange={(e) => {
                      let data = [...deliveryDetails];
                      data[index].deliverSlots[delSlotIndex][`to`] =
                        e.target.value;
                      setDeliveryDetails(data);
                    }}
                  />
                </label>
              </div>
            ))}
            <button
              className="btn btn-warning align-self-center"
              onClick={() => {
                let data = [...deliveryDetails];
                let deliverySlot = [...branch.deliverSlots];
                data[index].deliverSlots = [
                  ...deliverySlot,
                  { from: "", to: "" },
                ];
                setDeliveryDetails(data);
              }}
            >
              Add more slots
            </button>
          </div>
          <h4 className="col-lg-8">
            Latitude :
            <input
              type="text"
              name="latitude"
              value={branch.latitude}
            />
          </h4>
          <h4 className="col-lg-8">
            Longitude :
            <input
              type="text"
              name="longitude"
              value={branch.longitude}
            />
          </h4>
        </div>
      ))}
      <div className="col-lg-12 d-flex align-items-center">
        <button className="btn next-btn" onClick={goBack}>
          Back
        </button>
        <button className="btn next-btn" onClick={goNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default DeliveryDetails;
