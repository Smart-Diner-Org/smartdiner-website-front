import React, { Component } from "react"
import { tsStringKeyword } from "@babel/types";


class Bill extends Component {
    render() {

        return (
            <div class="bill-container">
                <hr />
                <div className="container">
                    <div>

                        {this.props.dicountedMrpPercentage > 0 ? (
                            <>
                                <div className="row">
                                    <label className="col-auto mr-auto">Total MRP</label><br />
                                    <label className="col-auto text"><strike>Rs. {this.props.total_mrp_price}</strike></label> <br />
                                </div>
                                <div className="row">
                                    <label className="col-auto mr-auto">Total After Discount</label><br />
                                    <label className="col-auto" >{`Rs. ${Number(this.props.totalAfterMrpDiscount).toFixed(2)}`}</label> <br />
                                </div>
                                <div className="row">
                                    <label className="col-auto mr-auto">Discount on MRP</label><br />
                                    <label className="col-auto" >{this.props.dicountedMrpPercentage} %</label> <br />
                                </div>
                            </>
                        ) : (
                                <div className="row">
                                    <label className="col-auto mr-auto">Total</label><br />
                                    <label className="col-auto" >{`Rs. ${Number(this.props.total_price).toFixed(2)}`}</label> <br />
                                </div>
                            )}
                        <div className="row">
                            <label className="col-auto mr-auto">Delivery Charge with GST</label><br />
                            <label className="col-auto" >{`Rs. ${Number((+this.props.delivery_charge)+(+this.props.gstAmount)).toFixed(2)}`}</label> <br />
                        </div>
                        <div className="row">
                            <label className="col-auto mr-auto">CGST ({`${Number(this.props.gstPercentage).toFixed()} %`})</label><br />
                            <label className="col-auto" >{`Rs. ${Number(this.props.gstAmount/2).toFixed(2)}`}</label> <br />
                        </div>
                        <div className="row">
                            <label className="col-auto mr-auto">SGST ({`${Number(this.props.gstPercentage).toFixed()} %`})</label><br />
                            <label className="col-auto" >{`Rs. ${Number(this.props.gstAmount/2).toFixed(2)}`}</label> <br />
                        </div>






                    </div>
                    <div className="row">
                        {/* <a className="col-auto mr-auto" href="/"  onclick="return false" >Tax Charges</a>
                        <label className="col-auto" style={{marginBottom:"5rem"}}>{`Rs 354`}</label> */}
                    </div>

                    <div className="final-bill row">
                        <div class="col-6" >

                            {/* <label >Coupon Code</label> */}
                            {/* <input type="textbox" placeholder="Coupon Code"/>
                                    <button >Find</button> */}

                        </div>

                        <div class="col-6 total-amount">
                            <label >Total Paid : <span >{`Rs. ${Number((+this.props.total_price)+(+this.props.gstAmount)).toFixed(2)}`}</span></label>

                        </div>


                    </div>
                </div>
            </div>

        )
    }
}
export default Bill