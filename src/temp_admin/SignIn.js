import React , {Component} from "react"
import axios from "axios"
import Footer from '../Footer'
import {Redirect} from 'react-router-dom'

class SignIn extends Component{
    constructor(props){
        super();
        
        this.apiLink = `${process.env.REACT_APP_BACKEND_URL}/`
        this.state = {
            email : "",
            password : "",
            requestedOTP : false,
            isVerified : false,
            name : "",
            user_info : {accessToken: null,
                customer:{
                createdAt: null,
                customer_detail: {
                    id: null,
                    customer_id: null,
                    address_one: null,
                    address_two: null,
                    city_id: null,
                    state_id: null,
                    primary: null,
                    address_type: null,
                    lat: null,
                    long: null,
                    createdAt: null,
                    updatedAt: null,
                    },
                email: null,
                id: null,
                mobile: null,
                mobile_verification: null,
                name: null,
                otp_secret: null,
                password: null,
                remember_token: null,
                role_id: null,
                updatedAt: null,
                uuid: null,}},
            successMessage: "",
            errorMessage: "",
            canRedirectToHome: false
        }
        this.signIn = this.signIn.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    renderHome = () => {
        if (this.state.canRedirectToHome) {
            return <Redirect to='/home' />
        }
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value,
            // user_info:{...this.state.user_info.user,user:{customer_detail:{[name]: value}}}
        })
    }


    async signIn(event){
        event.preventDefault()
        this.setState({requestedOTP:true})
        const data = {
            email : this.state.email,
            password : this.state.password,
            roleId : 1,
        }
        await axios.post(`${this.apiLink}auth/signin`,data)
            .then(res => {
                this.setState({errorMessage:null});
                this.setState({successMessage:res.data.message})
                localStorage.setItem('token', res.data.accessToken);
                this.setState({
                  canRedirectToHome: true
                });
            })
            .catch( (error) => {
                this.setState({successMessage:null});
                if(error && error.response && error.response.data){
                    let er = error.response.data.message;
                    console.log(er);
                    this.setState({errorMessage:er});
                }
                else console.log(error);
            })
    }


	render(){
       
        return(
            <>
            {}
            <div className="signup ">
                <div className="container">
                    <div className="header row mt-30">
                        <div className="col-lg-10 col-sm-12">
                            <h2>Please provide your credentials</h2>

                        </div>
                    </div>
                  
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="customer-details-form">
                                <div className="mobile-verification ">
                                {this.renderHome()}
									<form onSubmit={this.signIn}>
    									<input className="mt-10 form-control"  type="email" autoFocus name="email" placeholder="Enter Your Registered Email" data-error="Email is required." required="required"
                                        onChange={this.handleChange}
                                         />
    									<input className="mt-10 form-control"  type="password"
    									autoFocus name="password" 
    									placeholder="Enter Your Password" data-error="Password is required." required="required"
                                        onChange={this.handleChange}
    									/>
    									<button className="mt-10 form-control" type="submit" >Sign In</button>

                                        <div className="container mt-20 ">
                                            {this.state.errorMessage ?
                                            <small className="row message ml-1" style={{color:"#e22a28"}}>{this.state.errorMessage}</small> 
                                            :
                                            <small className="row message ml-1" style={{color:"green"}}>{this.state.successMessage}</small>}
                                        </div>


									</form>
								</div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 mt-40">
                        </div>
                    </div>
               
                </div>
                
            </div>
            <Footer />
            </>
        )
    }

}

export default SignIn