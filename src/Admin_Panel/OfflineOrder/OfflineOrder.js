import React, { useEffect, useState } from "react";
import OffflineOrderForm from "./OffflineOrderForm";
import axios from "axios";
import Product from "./Product";
import "./OfflineOrder.css";
import Payment from "./Payment";
import DeliveryType from "./DeliveryType";
import OrderConfirm from "./OrderConfirm";
import OfflineOrderFooter from "./OfflineOrderFooter";
import OrderMessage from "./OrderMessage";
import { useHistory } from "react-router-dom";

export default function OfflineOrder() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState([]);
  const [mobile, setMobile] = useState("");
  const [description, setDescription] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [deliveryMode, setDeliveryMode] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [show, setShow] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showToast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [successMessage, setGreen] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();

  const handleClose = () => setShow(false);

  const handleShow = () => {
    let selectedMenuArray = [];
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < items[i].menus.length; j++) {
        for (
          let k = 0;
          k < items[i].menus[j].menu_quantity_measure_price_list.length;
          k++
        ) {
          if (
            items[i].menus[j].menu_quantity_measure_price_list[k].quantity > 0
          ) {
            let menu = {
              id: items[i].menus[j].id,
              quantity:
                items[i].menus[j].menu_quantity_measure_price_list[k].quantity,
              price:
                items[i].menus[j].discount > 0
                  ? items[i].menus[j].menu_quantity_measure_price_list[k]
                      .price -
                    items[i].menus[j].menu_quantity_measure_price_list[k]
                      .price *
                      (items[i].menus[j].discount / 100)
                  : items[i].menus[j].menu_quantity_measure_price_list[k].price,
              originalPrice:
                items[i].menus[j].menu_quantity_measure_price_list[k].price,
              selectedMenuQuantityMeasurePriceId:
                items[i].menus[j].menu_quantity_measure_price_list[k].id,
              name: items[i].menus[j].name,
            };
            selectedMenuArray.push(menu);
          }
        }
      }
    }
    selectedMenuArray.map(
      (item) => (total = total + Number(item.price) * item.quantity)
    );
    setTotalPrice(total);
    setSelectedMenu(selectedMenuArray);
    setShow(true);
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/after_login/restaurant/${localStorage.getItem("resturantBranchID")}/get_menu`,
        {
          headers: {
            "x-access-token": `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setItems(res.data.menus);
        let categoryArray = [];
        res.data.menus.map((item) => {
          if (item.id) {
            if (categoryArray.indexOf(item.id) === -1) {
              let data = {
                id: item.id,
                name: item.name,
              };
              categoryArray.push(data);
            }
          }
        });
        setCategory(categoryArray);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeQuantity = (
    value,
    categoryID,
    menuID,
    selectedMenuQuantityMeasurePriceId
  ) => {
    let newItemsArray = items;
    for (let i = 0; i < newItemsArray.length; i++) {
      if (newItemsArray[i].id === categoryID) {
        for (let j = 0; j < newItemsArray[i].menus.length; j++) {
          if (newItemsArray[i].menus[j].id === menuID) {
            for (
              let k = 0;
              k <
              newItemsArray[i].menus[j].menu_quantity_measure_price_list.length;
              k++
            ) {
              if (
                newItemsArray[i].menus[j].menu_quantity_measure_price_list[k]
                  .id === selectedMenuQuantityMeasurePriceId
              ) {
                if (
                  newItemsArray[i].menus[j].menu_quantity_measure_price_list[k][
                    "quantity"
                  ]
                ) {
                  newItemsArray[i].menus[j].menu_quantity_measure_price_list[k][
                    "quantity"
                  ] =
                    newItemsArray[i].menus[j].menu_quantity_measure_price_list[
                      k
                    ]["quantity"] + value;
                } else {
                  newItemsArray[i].menus[j].menu_quantity_measure_price_list[k][
                    "quantity"
                  ] = 1;
                }
              }
            }
          }
        }
      }
    }
    setItems([...newItemsArray]);
    console.log(items);
  };

  const order = () => {
    const data = {
      restuarantBranchId: localStorage.getItem("resturantBranchID"),
      total_price: totalPrice,
      menus: selectedMenu,
      mobile: Number(mobile),
      description: description,
      addressOne: address1,
      addressTwo: address2,
      cityId: 1,
      stateId: 1,
      paymentStatus: paymentStatus,
      deliveryMode: deliveryMode,
      paymentType: paymentType,
    };
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/after_login/order/place_offline_order`,
        data,
        {
          headers: {
            "x-access-token": `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.message);
        setToastMessage(res.data.message);
        setToast(true);
        setGreen(true);
        handleClose();
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(function () {
          history.go(0);
        }, 1000);
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          let er = error.response.data.message;
          console.log(er);
          setToastMessage(er);
          setToast(true);
          setGreen(false);
          handleClose();
        }
      });
  };

  if (!isLoaded) {
    return (
      <div>
        <div className="preloader">
          <div className="spin">
            <div className="cube1"></div>
            <div className="cube2"></div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="offline_order">
        <div className="container">
          <h2>Provide details and add items to create a Offline Order</h2>
          <OffflineOrderForm
            mobile={mobile}
            setMobile={setMobile}
            description={description}
            setDescription={setDescription}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
          />
          <Payment
            setPaymentStatus={setPaymentStatus}
            setPaymentType={setPaymentType}
          />
          <DeliveryType setDeliveryMode={setDeliveryMode} />
          <Product
            category={category}
            items={items}
            changequantity={changeQuantity}
          />

          <OrderConfirm
            show={show}
            handleClose={handleClose}
            mobile={mobile}
            order={order}
            description={description}
            paymentStatus={paymentStatus}
            paymentType={paymentType}
            deliveryMode={deliveryMode}
            address1={address1}
            address2={address2}
            selectedMenu={selectedMenu}
            totalPrice={totalPrice}
          />
        </div>
        <OrderMessage
          toastMessage={toastMessage}
          showToast={showToast}
          setToast={setToast}
          successMessage={successMessage}
        />
        <OfflineOrderFooter handleShow={handleShow} />
      </div>
    );
  }
}
