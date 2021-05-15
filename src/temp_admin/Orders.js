import React,{ Component } from "react";
// import Constants from '../helpers/constants';
import * as Constants from '../helpers/constants';
import axios from "axios"

export default class Table extends React.Component {
 
	constructor(props){
		super(props);
		this.apiLink = `${process.env.REACT_APP_BACKEND_URL}/`
		this.state = {
			fresh: Constants.freshOrderStage,
			onGoing: Constants.onGoingOrders,
			old: Constants.oldOrderStage,
			isLoaded: true,
			successMessage: "",
            errorMessage: "",
            isAnyDataExist: true,
            text: {
            	fresh: "Fresh Orders",
				onGoing: "On Going Orders",
				old: "Old Orders",
            },
            orders: this.props.orders
	    }
		this.getHeader = this.getHeader.bind(this);
		this.getRowsData = this.getRowsData.bind(this);
		this.isEmptyTab = this.isEmptyTab.bind(this);
		this.getOrderDetails = this.getOrderDetails.bind(this);
		this.updateStage = this.updateStage.bind(this);
		this.cancelOrder = this.cancelOrder.bind(this);
		this.setDataState = this.setDataState.bind(this)
	}

	async componentDidMount() {
		// console.log("Hello 1");
		// setTimeout(() => { console.log("Hello 2"); }, 2000);
		// console.log("Hello 3");
	}

    setDataState(value) {  //to display respective items for menu items selected
        this.setState(prevState =>{
            return {
                isAnyDataExist: value
            }
        })
    }

	async updateStage(newStage, orderId){
		const data = {
            stageId : newStage
        };
		this.setState({
			isLoaded: false,
		});
		await axios.post(`${this.apiLink}after_login/order/${orderId}/update_status`,data ,{
            headers: {
              'x-access-token': `${localStorage.getItem('token')}`
            }})
        .then(res => {
            this.setState({
            	orders: res.data.orders,
            	successMessage: "Successfully Changed",
            	isLoaded: true,
            	errorMessage: null
            });
            let self = this;
            setInterval(function(){
	            self.setState({
					successMessage: null
				});
	        }, 5000);
        })
        .catch( (error) => {
        	this.setState({
				isLoaded: true
			});
            this.setState({ successMessage: null });
            if(error && error.response && error.response.data){
                let er = error.response.data.message;
                console.log(er);
                this.setState({errorMessage:er});
            }
            else console.log(error);
        })
	}

	async cancelOrder(orderId){
		const data = {
            cancellationReason: 'Others' //Need to change this. Need to display a drop down and let the restaurant to pick a reason from the drop down
        };
		this.setState({
			isLoaded: false,
		});
		await axios.post(`${this.apiLink}after_login/order/${orderId}/cancel`, data ,{
            headers: {
              'x-access-token': `${localStorage.getItem('token')}`
            }})
        .then(res => {
            this.setState({
            	orders: res.data.orders,
            	successMessage: "Successfully Cancelled",
            	isLoaded: true,
            	errorMessage: null
            });
            let self = this;
            setInterval(function(){
	            self.setState({
					successMessage: null
				});
	        }, 5000);
        })
        .catch( (error) => {
        	this.setState({
				isLoaded: true
			});
            this.setState({ successMessage: null });
            if(error && error.response && error.response.data){
                let er = error.response.data.message;
                console.log(er);
                this.setState({errorMessage:er});
            }
            else console.log(error);
        });
	}

	getHeader = function(){
		// var keys = this.getKeys();
		// var keys = [
		// 	'Name',
		// 	'Delivery Address',
		// 	'Order details',
		// 	'Total amount paid',
		// 	'Status',
		// 	'Actions'
		// ]
		var keys = [
			{ 'headerName': 'Name', 'className': 'with15per'},
			{ 'headerName': 'Delivery Address', 'className': 'with19per'},
			{ 'headerName': 'Order details', 'className': 'with19per'},
			{ 'headerName': 'Total amount', 'className': 'with10per'},
			{ 'headerName': 'Status', 'className': 'with10per'},
			{ 'headerName': 'Actions', 'className': ''} //It will take all the remaining width
		]

		return keys.map((key, index)=>{
			return <th className={key['className']} key={key['headerName']}>{key['headerName'].toUpperCase()}</th>
		});
	}

	getOrderDetails = function(order_detail_menus){
		let orderDetail = '';
		order_detail_menus.map((menu, index)=> {
			if(index !== 0)
				orderDetail = orderDetail + ', ';
			orderDetail = orderDetail + menu.menu.name + " " + menu.menu.description.split(" - ")[0] + " - " + + menu.order_detail.quantity;
		});
		return orderDetail;
	}

	isEmptyTab = function(){
		console.log("with in isempty");
		var items = this.state.orders;
		let customIndex = -1
		let isEmpty = false;
		items.map((row, index)=>{
			if(this.state[this.props.selectedBtn].indexOf(parseInt(row.stage_id)) != -1){
				customIndex++;
			}
			else{
				if(index == items.length - 1 && customIndex == -1){
					console.log("Have come here");
					isEmpty = true;
				}
			}
		});
		return isEmpty;
	}

	getRowsData = function(){
		console.log("with in getRowsData");
		var items = this.state.orders;
		let customIndex = -1
		return items.map((row, index)=>{
			if(this.state[this.props.selectedBtn].indexOf(parseInt(row.stage_id)) != -1){
				customIndex++;
				return <RenderRow updateStageCb={this.updateStage} cancelOrderCb={this.cancelOrder} rowKey={customIndex} data={row} orderDetails={this.getOrderDetails(row.order_detail_menus)} />
			}
		})
	}

	render() {
		const { isLoaded } = this.state;
		console.log("with in render");
		if (!isLoaded) {
          return (
            <div>  
                <div className="preloader">
                    <div className="spin">
                        <div className="cube1"></div>
                        <div className="cube2"></div>
                    </div>
                </div>
            </div>);
        } if(!this.state.orders){
        	return(
        		<div><p>No orders found</p></div>
        	);
        } else {
			return (
			<div>
				{this.isEmptyTab() ?
				<RenderEmpty tabText={this.state.text[this.props.selectedBtn]} /> :
				<div className="container mt-20 ">
				{this.state.errorMessage ?
				<small className="row message ml-1" style={{color:"#e22a28"}}>{this.state.errorMessage}</small> 
				:
				<small className="row message ml-1" style={{color:"green"}}>{this.state.successMessage}</small>}
				
				<table>
				<thead>
				<tr>{this.getHeader()}</tr>
				</thead>
				<tbody>
				{this.getRowsData()}
				<tr>{this.getHeader()}</tr>
				</tbody>
				</table>
				</div>}
				</div>
			);
		}
	}
}

const RenderEmpty = (props) => {
	return <p>
		No {props.tabText}
	</p>;
}

const RenderRow = (props) => {
	return <tr className={props.rowKey%2==0 ? 'bg-color-light-grey' : ''} data-index={props.data.id}>
		<td><p>{ props.data.customer.name }</p>
		<p>{props.data.customer.mobile}</p>
		<p>{"Order Id: " + props.data.id}</p></td>
		<td>{ props.data.delivery_address_one + ' ' + props.data.delivery_address_two }</td>
		<td>{ props.orderDetails }</td>
		<td>{ props.data.total_price + ' - ' + Constants.paymentStatuseText[props.data.payment_status_id] }</td>
		<td><p>{ Constants.orderStatgeText[props.data.stage_id] }</p>
		<p>{ "Ordered Date: " + props.data.createdAt.split('T')[0] }</p></td>
		{props.data.stage_id == Constants.orderStatges["fresh"] && <td>
			<button onClick={()=>{props.updateStageCb(Constants.orderStatges["accepted"], props.data.id)}} data-id={Constants.orderStatges["accepted"]} className='ordersBtn float-left greenBtn'>Accept</button>
			<button onClick={()=>{props.cancelOrderCb(props.data.id)}} data-id={Constants.orderStatges["cancelled"]} className='ordersBtn redBtn'>Cancel</button>
		</td>}
		{props.data.stage_id == Constants.orderStatges["accepted"] && <td>
			<button onClick={()=>{props.updateStageCb(Constants.orderStatges["preparing"], props.data.id)}} data-id={Constants.orderStatges["preparing"]} className='ordersBtn float-left yellowBtn'>Preparing</button>
			<button onClick={()=>{props.cancelOrderCb(props.data.id)}} data-id={Constants.orderStatges["cancelled"]} className='ordersBtn redBtn'>Cancel</button>
		</td>}
		{props.data.stage_id == Constants.orderStatges["preparing"] && <td>
			<button onClick={()=>{props.updateStageCb(Constants.orderStatges["foodReady"], props.data.id)}} data-id={Constants.orderStatges["foodReady"]} className='ordersBtn float-left yellowBtn'>Food Ready</button>
			<button onClick={()=>{props.updateStageCb(Constants.orderStatges["outForDelivery"], props.data.id)}} data-id={Constants.orderStatges["outForDelivery"]} className='ordersBtn float-left yellowBtn'>Out For Delivery</button>
			<button onClick={()=>{props.cancelOrderCb(props.data.id)}} data-id={Constants.orderStatges["cancelled"]} className='ordersBtn redBtn'>Cancel</button>
		</td>}
		{props.data.stage_id == (Constants.orderStatges["foodReady"]) && <td>
			<button onClick={()=>{props.updateStageCb(Constants.orderStatges["outForDelivery"], props.data.id)}} data-id={Constants.orderStatges["outForDelivery"]} className='ordersBtn float-left yellowBtn'>Out For Delivery</button>
			<button onClick={()=>{props.cancelOrderCb(props.data.id)}} data-id={Constants.orderStatges["cancelled"]} className='ordersBtn redBtn'>Cancel</button>
		</td>}
		{props.data.stage_id == (Constants.orderStatges["foodPicked"]) && <td>
			<button onClick={()=>{props.updateStageCb(Constants.orderStatges["outForDelivery"], props.data.id)}} data-id={Constants.orderStatges["outForDelivery"]} className='ordersBtn float-left yellowBtn'>Out For Delivery</button>
			<button onClick={()=>{props.cancelOrderCb(props.data.id)}} data-id={Constants.orderStatges["cancelled"]} className='ordersBtn redBtn'>Cancel</button>
		</td>}
		{props.data.stage_id == Constants.orderStatges["outForDelivery"] && <td>
			<button onClick={()=>{props.updateStageCb(Constants.orderStatges["delivered"], props.data.id)}} data-id={Constants.orderStatges["delivered"]} className='ordersBtn float-left greenBtn'>Delivered</button>
			<button onClick={()=>{props.cancelOrderCb(props.data.id)}} data-id={Constants.orderStatges["cancelled"]} className='ordersBtn redBtn'>Cancel</button>
		</td>}
		</tr>;
}

