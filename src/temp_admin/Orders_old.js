import React,{ Component } from "react";
// import Constants from '../helpers/constants';
import * as Constants from '../helpers/constants';

class Orders extends Component{
    constructor(props){
        super(props);
        this.state = {
            fresh: Constants.freshOrderStage,
            onGoing: Constants.onGoingOrders,
            old: Constants.oldOrderStage,
        }
    }
    
    componentDidMount(){
      //TODO : find which category has minimum 1 item and assing that value to cataegoryToBeShown variable
        // this.ele[0].click();
    }
      
    render(){
        
        return(
            <div class="col-lg-12 col-md-8">
                <div class="collection-menu text-center mt-30">
                    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist"
                        aria-orientation="vertical">
                            <div>
                            <table>
                                <tr>
                                    <th>
                                        Customer Name & delivery address
                                    </th>
                                    <th>
                                        Order details
                                    </th>
                                    <th>
                                        Total amount paid
                                    </th>
                                    <th>
                                        Status
                                    </th>
                                    <th>
                                        Actions
                                    </th>
                                </tr>
                                </table>
                            {
                                this.props.orders.map((order) =>{
                                    if(this.state[this.props.selectedBtn].indexOf(parseInt(order.stage_id)) != -1){
                                        
                                        <Table data={this.state.data} />

                                        return (<table><tr>
                                                <td>row 1 column 1</td>
                                                <td>row 1 column 2</td>
                                            </tr>
                                            <tr>
                                                <td>row 2 column 1</td>
                                            </tr></table>);
                                    }
                                    else{
                                        return <p>Not Found</p>;
                                    }
                                })
                            }
                                {this.props.selectedBtn}
                            </div>
                    </div> 
                </div> 
            </div>
        );
    };
};
export default Orders;
