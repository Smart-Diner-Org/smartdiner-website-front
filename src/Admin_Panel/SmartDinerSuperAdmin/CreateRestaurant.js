import React, { useState, useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import AddCustomerDetails from "./AddCustomerDetails";
import AddRestaurantDetails from "./AddRestaurantDetails";
import SelectTheme from "./SelectTheme";
import "./assets/SmartDinerSuperAdmin.css";
import ResturantOnlineMediaLinks from "./ResturantOnlineMediaLinks";
import AddResturantBranchDetails from "./AddResturantBranchDetails";
import DeliveryDetails from "./DeliveryDetails";
import WebsiteDetail1 from "./WebsiteDetail1";
import WebsiteDetail2 from "./WebsiteDetail2";
import WebsiteImages from "./WebsiteImages";
import AddProduct from "./AddProduct";
import { roles_and_IDs } from "../../helpers/constants";
import axios from "axios";

function CreateRestaurant() {
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setcustomerMobile] = useState("");
  const [customerEmail, setcustomerEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleID, setRoleID] = useState(roles_and_IDs["Super Admin"]);
  const [showcustomerDetails, setCustomerDetails] = useState(true);

  const [restaurantName, setRestaurantName] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [logoImg, setLogoImg] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  const [showRestaurantDetails, setShowRestaurantDetails] = useState(false);

  const [showTheme, setShowTheme] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);

  const [facebookLink, setFacebook] = useState(null);
  const [instagramLink, setInstagram] = useState(null);
  const [twitterLink, settwitter] = useState(null);
  const [youtubeLink, setyoutube] = useState(null);
  const [linkedInLink, setlinkedIn] = useState(null);
  const [
    showRestaurantLinksComponent,
    setshowRestaurantLinksComponent,
  ] = useState(false);

  const branchdetailsTemplate = {
    branchName: "",
    address: "",
    city: "",
    state: "",
    email: "",
    contactnumb: "",
    timings: [
      {
        active: false,
        day: "Sunday",
        from: [""],
        to: [""],
      },
      {
        active: false,
        day: "Monday",
        from: [""],
        to: [""],
      },
      {
        active: false,
        day: "Tuesday",
        from: [""],
        to: [""],
      },
      {
        active: false,
        day: "Wednesday",
        from: [""],
        to: [""],
      },
      {
        active: false,
        day: "Thursday",
        from: [""],
        to: [""],
      },
      {
        active: false,
        day: "Friday",
        from: [""],
        to: [""],
      },
      {
        active: false,
        day: "Saturday",
        from: [""],
        to: [""],
      },
    ],
  };
  const [resturantBranchDetails, setresturantBranchDetails] = useState([
    branchdetailsTemplate,
  ]);
  const [showResturantBranchDetails, setshowResturantBranchDetails] = useState(
    false
  );

  const [showDeliveryDetails, setshowDeliveryDetails] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState([]);

  const [showwebsiteDetail1, setshowwebsiteDetail1] = useState(false);
  const [pageTitle, setpageTitle] = useState(null);
  const [pageDescription, setpageDescription] = useState(null);
  const [primaryColor, setprimaryColor] = useState("#000000");
  const [secondaryColor, setsecondaryColor] = useState("#000000");

  const [showwebsiteDetail2, setshowwebsiteDetail2] = useState(false);
  const [isPreBooking, setisPreBooking] = useState(false);
  const [isPaymentGateway, setisPaymentGateway] = useState(true);
  const [isCODavailable, setisCODavailable] = useState(true);
  const [isRunningOrdersAvailable, setisRunningOrdersAvailable] = useState(
    true
  );
  const [preBookingPriorTime, setpreBookingPriorTime] = useState("1");
  const [isDeliveryAvailable, setisDeliveryAvailable] = useState(true);
  const [hasCustomInfo, sethasCustomInfo] = useState(false);
  const [customInfo, setCustomInfo] = useState("");

  const [showWebsiteImages, setshowWebsiteImages] = useState(false);
  const [about, setabout] = useState("");
  const [aboutImg, setaboutImg] = useState(null);
  const [aboutImageUrl, setaboutImageUrl] = useState(null);
  const [sliderImg, setsliderImg] = useState([""]);
  const [sliderImgUrl, setsliderImgUrl] = useState([""]);
  const [sliderImgContent, setsliderImgContent] = useState([]);
  const [cards, setCards] = useState([""]);
  const [cardsUrl, setCardsUrl] = useState([""]);

  const [showAddProduct, setshowAddProduct] = useState(false);
  const [categoryArray, setCategory] = useState([]);
  const [productsArray, setProductsArray] = useState([]);

  useEffect(() => {
    let deliveryDetails = [];
    resturantBranchDetails.map((branch) => {
      deliveryDetails.push({
        branchName: branch.branchName,
        deliveryLocations: "",
        deliveryPostalcodes: "",
        deliveryDistance: "",
        deliveryLocationsToDisplay: "",
        deliverSlots: [{ from: "", to: "" }],
      });
    });
    setDeliveryDetails(deliveryDetails);
  }, [resturantBranchDetails]);

  useEffect(() => {
    const sliderContentArray = Array(sliderImg.length).fill("");
    setsliderImgContent(sliderContentArray);
  }, [sliderImg]);

  const setupResturant = () => {
    const branches = resturantBranchDetails.map((branch, index) => {
      return {
        branchName: branch.branchName,
        branchTimings: branch.timings.map((time) =>
          time.active ? `${time.day} ${time.from}-${time.to}` : null
        ),
        branchAddress: branch.address,
        branchCityId: Number(branch.city),
        branchStateId: Number(branch.state),
        branchContactNumber: branch.contactnumb,
        branchEmail: branch.email,
        branchDeliveryLocations: deliveryDetails[index].deliveryLocations,
        branchDeliveryPostalCodes: deliveryDetails[index].deliveryPostalcodes,
        branchDeliveryDistance: Number(deliveryDetails[index].deliveryDistance),
        branchDeliveryLocationsToDisplay:
          deliveryDetails[index].deliveryLocationsToDisplay,
        branchDeliverySlots: (deliveryDetails[index].deliverSlots.map((slot) => {
          return `${slot.from} - ${slot.to}`;
        })).join(","),
      };
    });

     let sliderImages=[];    
     for (let i = 0; i < sliderImg.length; i++) {
      if (sliderImgUrl[i] === "") {
        if (sliderImgContent[i] === "") {
          sliderImages.push({
            url: null,
            image: sliderImg[i],
            content: null,
          });
        }
        else {
          sliderImages.push({
            url: null,
            image: sliderImg[i],
            content: sliderImgContent[i],
          });
        }
      }
      else {
        if (sliderImgContent[i] === "") {
          sliderImages.push({
            url: sliderImgUrl[i],
            image: sliderImg[i],
            content: null,
          });
        }
        else {
          sliderImages.push({
            url: sliderImgUrl[i],
            image: sliderImg[i],
            content: sliderImgContent[i],
          });
        }
      }
    }

    let cardsImages = [];
    for (let i = 0; i < cards.length; i++) {
      cardsImages.push({
        url: cardsUrl[i],
        image: cards[i],
      });
    }

    const data = {
      mobile: customerMobile,
      roleId: Number(roleID),
      email: customerEmail,
      name: customerName,
      password: password,
      restaurantName: restaurantName,
      templateId: Number(selectedTheme),
      logoUrl: logoUrl,
      logoImage: logoImg,
      aboutContent: about,
      websiteUrl: websiteURL,
      facebookLink: facebookLink,
      instagramLink: instagramLink,
      youtubeLink: youtubeLink,
      twitterLink: twitterLink,
      linkedinLink: linkedInLink,
      branches: branches,
      preBookPriorTime: preBookingPriorTime,
      isPrebookingEnabled: isPreBooking,
      sliderImages: sliderImages,
      cards: cardsImages,
      isCodEnabled: isCODavailable,
      isOnlinePaymentEnabled: isPaymentGateway,
      getLocationPlaceId: 1,
      getLocationTypeId: 1,
      aboutImageUrl: aboutImageUrl,
      pageDescription: pageDescription,
      aboutImage: aboutImg,
      isRunTimeBookingEnabled: isRunningOrdersAvailable,
      primaryColourCode: primaryColor,
      secondaryColourCode: secondaryColor,
      hasCustomisationInfo: hasCustomInfo,
      customisationInfoContent: customInfo,
      isDeliveryAvailable: isDeliveryAvailable,
      pageTitle: pageTitle,
    };
    sessionStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/after_login/restaurant/setup_with_account_creation`,
        data,
        {
          headers: {
            "x-access-token": `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        alert(error.message);
        console.log(error);
      });
  };

  return (
    <>
      <div className="create-restaurant">
        <Jumbotron className="create-restaurant-form">
          {showcustomerDetails && (
            <AddCustomerDetails
              customerName={customerName}
              customerMobile={customerMobile}
              setCustomerName={setCustomerName}
              setcustomerMobile={setcustomerMobile}
              customerEmail={customerEmail}
              setcustomerEmail={setcustomerEmail}
              password={password}
              setPassword={setPassword}
              setCustomerDetails={setCustomerDetails}
              setShowRestaurantDetails={setShowRestaurantDetails}
              roleID={roleID}
              setRoleID={setRoleID}
            />
          )}
          {showRestaurantDetails && (
            <AddRestaurantDetails
              restaurantName={restaurantName}
              setRestaurantName={setRestaurantName}
              websiteURL={websiteURL}
              setWebsiteURL={setWebsiteURL}
              logoImg={logoImg}
              setLogoImg={setLogoImg}
              setCustomerDetails={setCustomerDetails}
              setRestaurantDetails={setShowRestaurantDetails}
              setShowTheme={setShowTheme}
              logoUrl={logoUrl}
              setLogoUrl={setLogoUrl}
            />
          )}
          {showTheme && (
            <SelectTheme
              setSelectedTheme={setSelectedTheme}
              setRestaurantDetails={setShowRestaurantDetails}
              setShowTheme={setShowTheme}
              setshowRestaurantLinksComponent={setshowRestaurantLinksComponent}
            />
          )}
          {showRestaurantLinksComponent && (
            <ResturantOnlineMediaLinks
              facebookLink={facebookLink}
              setFacebook={setFacebook}
              instagramLink={instagramLink}
              setInstagram={setInstagram}
              twitterLink={twitterLink}
              settwitter={settwitter}
              youtubeLink={youtubeLink}
              setyoutube={setyoutube}
              linkedInLink={linkedInLink}
              setlinkedIn={setlinkedIn}
              setShowTheme={setShowTheme}
              setshowRestaurantLinksComponent={setshowRestaurantLinksComponent}
              setshowResturantBranchDetails={setshowResturantBranchDetails}
            />
          )}
          {showResturantBranchDetails && (
            <AddResturantBranchDetails
              setshowRestaurantLinksComponent={setshowRestaurantLinksComponent}
              resturantBranchDetails={resturantBranchDetails}
              setresturantBranchDetails={setresturantBranchDetails}
              setshowResturantBranchDetails={setshowResturantBranchDetails}
              branchdetailsTemplate={branchdetailsTemplate}
              setshowDeliveryDetails={setshowDeliveryDetails}
            />
          )}
          {showDeliveryDetails && (
            <DeliveryDetails
              setshowResturantBranchDetails={setshowResturantBranchDetails}
              setshowDeliveryDetails={setshowDeliveryDetails}
              deliveryDetails={deliveryDetails}
              setDeliveryDetails={setDeliveryDetails}
              setshowwebsiteDetail1={setshowwebsiteDetail1}
            />
          )}
          {showwebsiteDetail1 && (
            <WebsiteDetail1
              setshowDeliveryDetails={setshowDeliveryDetails}
              setshowwebsiteDetail1={setshowwebsiteDetail1}
              setshowwebsiteDetail2={setshowwebsiteDetail2}
              pageTitle={pageTitle}
              setpageTitle={setpageTitle}
              pageDescription={pageDescription}
              setpageDescription={setpageDescription}
              primaryColor={primaryColor}
              setprimaryColor={setprimaryColor}
              secondaryColor={secondaryColor}
              setsecondaryColor={setsecondaryColor}
            />
          )}
          {showwebsiteDetail2 && (
            <WebsiteDetail2
              setshowwebsiteDetail1={setshowwebsiteDetail1}
              hasCustomInfo={hasCustomInfo}
              customInfo={customInfo}
              setCustomInfo={setCustomInfo}
              sethasCustomInfo={sethasCustomInfo}
              setisDeliveryAvailable={setisDeliveryAvailable}
              isDeliveryAvailable={isDeliveryAvailable}
              setpreBookingPriorTime={setpreBookingPriorTime}
              preBookingPriorTime={preBookingPriorTime}
              setisRunningOrdersAvailable={setisRunningOrdersAvailable}
              isRunningOrdersAvailable={isRunningOrdersAvailable}
              setisCODavailable={setisCODavailable}
              isCODavailable={isCODavailable}
              setisPaymentGateway={setisPaymentGateway}
              isPaymentGateway={isPaymentGateway}
              setisPreBooking={setisPreBooking}
              isPreBooking={isPreBooking}
              setshowwebsiteDetail2={setshowwebsiteDetail2}
              setshowWebsiteImages={setshowWebsiteImages}
            />
          )}
          {showWebsiteImages && (
            <WebsiteImages
              about={about}
              setabout={setabout}
              setaboutImg={setaboutImg}
              setsliderImg={setsliderImg}
              setCards={setCards}
              cards={cards}
              sliderImg={sliderImg}
              sliderImgContent={sliderImgContent}
              setsliderImgContent={setsliderImgContent}
              setshowwebsiteDetail2={setshowwebsiteDetail2}
              setshowWebsiteImages={setshowWebsiteImages}
              setshowAddProduct={setshowAddProduct}
              setupResturant={setupResturant}
              aboutImageUrl={aboutImageUrl}
              setaboutImageUrl={setaboutImageUrl}
              sliderImgUrl={sliderImgUrl}
              setsliderImgUrl={setsliderImgUrl}
              cardsUrl={cardsUrl}
              setCardsUrl={setCardsUrl}
            />
          )}
          {showAddProduct && (
            <AddProduct
              categoryArray={categoryArray}
              setCategory={setCategory}
              productsArray={productsArray}
              setProductsArray={setProductsArray}
              setshowAddProduct={setshowAddProduct}
              setshowWebsiteImages={setshowWebsiteImages}
            />
          )}
        </Jumbotron>
      </div>
    </>
  );
}

export default CreateRestaurant;
