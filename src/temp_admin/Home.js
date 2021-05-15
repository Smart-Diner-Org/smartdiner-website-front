import React , {Component} from "react"
// import '../App.css'
// import './style.css'
import axios from "axios"
import Footer from '../Footer'
import { Redirect } from 'react-router-dom'
import UserProfile from '../helpers/userProfile';
import Orders from './Orders';

class Home extends Component{
    constructor(props){
        super();
        
        this.apiLink = `${process.env.REACT_APP_BACKEND_URL}/`
        this.state = {
            isLoaded: false,
            isLoggedOut: false,
            restaurantInfo:[{}],
            orders:[{}],
            freshOrders:[{}],
            onGoingOrders:[{}],
            oldOrders:[{}],
            successMessage: "",
            errorMessage: "",
            showComponent: "fresh"
        }
        this.ele = []
        this.handleChange = this.handleChange.bind(this)
        this.setType = this.setType.bind(this)
    }


    renderSignIn = () => {
        if (this.state.isLoggedOut) {
            return <Redirect to='/' />
        }
    }

    setType(type) {  //to display respective items for menu items selected
        this.setState(prevState =>{
            return {
                showComponent: type
            }
        })
    }


    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value,
            // user_info:{...this.state.user_info.user,user:{customer_detail:{[name]: value}}}
        })
    }

    async componentDidMount() {  //API call to get data from backend
        try{
            await axios.get(`${this.apiLink}after_login/restaurant/get_details`, {
                headers: {
                  'x-access-token': `${localStorage.getItem('token')}`
                }
            })
            .then(res =>{
                this.setState({successMessage:res.data.message})
                this.setState({
                    restaurantInfo: res.data.restaurantEmployee.restaurant_branch,
                });
                console.log(res.data.restaurantEmployee.restaurant_branch);
            })
            .catch( (error) => {
                switch(error.response.status){
                    case 401:
                    case 403:
                        UserProfile.clearUser()
                        this.setState({
                            isLoggedOut: true
                        });
                        break
                    default:
                        let er = error.response.data.message
                        console.log(er);
                        this.setState({errorMessage:er});
                        break;
                }
            });

            let branchId = this.state.restaurantInfo.id;
            await axios.get(`${this.apiLink}after_login/restaurant/${branchId}/get_orders`, {
                headers: {
                  'x-access-token': `${localStorage.getItem('token')}`
                }
            })
            .then(res2 =>{
                console.log(res2.data);
                this.setState({
                    orders: res2.data.orders,
                    isLoaded: true,
                });
            })
            .catch((error2) => {
                console.log("Failed while fetching orders");
                switch(error2.response.status){
                    case 401:
                    case 403:
                        UserProfile.clearUser()
                        this.setState({
                            isLoggedOut: true
                        });
                        break
                    default:
                        let er = error2.response.data.message
                        console.log(er);
                        this.setState({errorMessage:er});
                        break;
                }
            });
            this.ele[0].click();
        }
        catch{

        }
    }

    

	render(){
        const { isLoaded } = this.state;
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
        } else {
            return(
                <>
                {}
                <div className="ordersList">
                    <div className="container">
                        <div className="header row mt-30">
                            <div className="col-lg-10 col-sm-12">
                                <h2>Welcome { this.state.restaurantInfo.restaurant.name }</h2>
                                {this.renderSignIn()}
                            </div>
                        </div>
                       
                        <div className="col-lg-12 col-md-8">
                            <div className="row pt-5per">
                                <button className={`float-left ordersBtn ${this.state.showComponent==='fresh' ? "active " : ""}`}  onClick={()=>{this.setType("fresh")}} >
                                    Fresh Orders
                                </button>

                                <button className={`ml-10 float-left ordersBtn ${this.state.showComponent==='onGoing' ? "active " : ""}`} onClick={()=>{this.setType("onGoing")}} >
                                    On Going Orders
                                </button>

                                <button className={`ml-10 float-left ordersBtn ${this.state.showComponent==='old' ? "active " : ""}`} onClick={()=>{this.setType("old")}} >
                                    Old / Cancelled Orders
                                </button>
                            </div>
                        </div>

                        <div className="col-lg-12 col-md-8">
                            <div className="row mt-10">
                                <Orders selectedBtn={this.state.showComponent} orders={this.state.orders} />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                </>
            )
        }
    }

}

export default Home


