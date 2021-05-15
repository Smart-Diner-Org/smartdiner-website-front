import React from "react";

function Payment(props) {
  return (
    <>
      <div className="row">
        <div className="row col-lg-6 ">
          <h4 className="mr-20">Payment Status:</h4>
          <div className="mr-20">
            <input className="mr-10" type="radio" name="payment-status" value={1} onChange={(e)=>props.setPaymentStatus(e.target.value)} />
            <label for="paid">Paid</label>
          </div>
          <div className="mr-20">
            <input className="mr-10" type="radio" name="payment-status" value={2} onChange={(e)=>props.setPaymentStatus(e.target.value)}  />
            <label for="not-paid">Not Paid</label>
          </div>
        </div>
        <div className="row col-lg-6 ">
          <h4 className="mr-20">Payment Type:</h4>
          <div className="mr-20">
            <input className="mr-10" type="radio" name="payment-type" value={1} onChange={(e)=>props.setPaymentType(e.target.value)}  />
            <label for="cash-on-delivery">Cash On Delivery</label>
          </div>
          <div className="mr-20">
            <input className="mr-10" type="radio" name="payment-type" value={2} onChange={(e)=>props.setPaymentType(e.target.value)}  />
            <label for="online-payment">Online Payment</label>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default Payment;
