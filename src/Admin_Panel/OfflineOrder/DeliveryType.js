import React from "react";

function DeliveryType(props) {
  return (
    <div className="row col-auto">
      <h4 className="mr-20">Delivery Mode:</h4>

      <div className="mr-20">
        <input
          className="mr-10"
          type="radio"
          value={1}
          name="delivery-mode"
          onChange={(e) => props.setDeliveryMode(e.target.value)}
        />
        <label for="paid">Door Delivery</label>
      </div>
      <div className="mr-20">
        <input
          className="mr-10"
          type="radio"
          value={2}
          name="delivery-mode"
          onChange={(e) => props.setDeliveryMode(e.target.value)}
        />
        <label for="not-paid">Pick From Store</label>
      </div>
      <div className="mr-20">
        <input
          className="mr-10"
          type="radio"
          value={3}
          name="delivery-mode"
          onChange={(e) => props.setDeliveryMode(e.target.value)}
        />
        <label for="paid">Having At Store</label>
      </div>
    </div>
  );
}

export default DeliveryType;
