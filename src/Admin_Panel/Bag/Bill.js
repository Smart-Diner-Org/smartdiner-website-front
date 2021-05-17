import React,{Component} from "react"


class Bill extends Component {
    render(){
        
        return(
            <div class="bill-container">
                <hr/>
                <div className="container">
                    <div>
                        <div className="row">
                            <label className="col-auto mr-auto">Total MRP</label><br/>
                            <label className="col-auto" >Rs. {this.props.total_mrp_price}</label> <br/>
                        </div>
                        <div className="row">
                            <label className="col-auto mr-auto">Total after discount</label><br/>
                            <label className="col-auto" >Rs. {this.props.totalAfterMrpDiscount}</label> <br/>
                        </div>
                        <div className="row">
                            <label className="col-auto mr-auto">Discount on MRP</label><br/>
                            <label className="col-auto" >{this.props.dicountedMrpPercentage} %</label> <br/>
                        </div>
                        <div className="row">
                            <label className="col-auto mr-auto">Total</label><br/>
                            <label className="col-auto" >Rs. {this.props.total_price}</label> <br/>
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
                                <label >To  Pay : <span >Rs. {this.props.total_price}</span></label>
                            
                            </div>
                            
                        
                    </div>
                </div>
            </div>

        )
    }
}
 export default Bill