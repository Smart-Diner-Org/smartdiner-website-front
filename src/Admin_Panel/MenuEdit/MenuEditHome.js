import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../OfflineOrder/Product";

function MenuEditHome() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${
          process.env.REACT_APP_BACKEND_URL
        }/after_login/restaurant/${localStorage.getItem(
          "resturantBranchID"
        )}/get_menu`,
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
      <>
        <div className="col-12 mt-20">
          <h4>{sessionStorage.getItem("RestName")}</h4>
        </div>
        <div className="container">
          <Product
            category={category}
            items={items}
            is_availableButton={true}
          />
        </div>
      </>
    );
  }
}

export default MenuEditHome;
