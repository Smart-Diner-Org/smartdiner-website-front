import React, { useState,useEffect } from "react";
import ProductForm from "./ProductForm";
import axios from "axios";
import Autocomplete from 'react-autocomplete';


// Get menu items name, image, quantity & measure & price values
// Get menu item's discount value, menu type
// Get menu item's category name - list the existing categories to choose & if a particular category is not listed then the customer should be able to add a new category
// Get menu item's short_description (max 60 characters) & description (no limit) optional fields
// should be able to add 'n' no of menu items.
// images should be compressed
// the category should be arranged ( display order) as per their wish
// The menu items also can be arranged (display order) as per their wish

function AddProduct({
  categoryArray,
  setCategory,
  productsArray,
  setProductsArray,
  setshowWebsiteImages,
  setshowAddProduct,
  restaurantbranchid,
  setRestaurantBranchId
}) {

  const [categoryName, setCategoryName] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategoryList, setSelectedCategoryList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setselectedProduct] = useState("");
  const [newProduct, setNewProduct] = useState(false);
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [shortDescription, setshortDescription] = useState("");
  const [type, setType] = useState(1);
  const [price, setprice] = useState([
    { measure: "", quantity: "", price: "" }
  ]);
  const [discount, setdiscount] = useState("");
  const [image, setimage] = useState("");
  const [menuimgurl, setMenuImgUrl] = useState("");
  const [gst, setGst] = useState(0);
  const [pricegst, setPriceGst] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/after_login/get_menu_categories`,
        {
          headers: {
            "x-access-token": `${localStorage.getItem("token")}`,
          },
        }
      )
      .then(res => {
        setCategoryList(res.data.menuCategories)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const goNext = () => { };
  const goBack = () => {
    setshowAddProduct(false);
    setshowWebsiteImages(true);
    window.scrollTo(0, 0);
  };

  const newProductFormSubmit = () => {
    
    const data = {
      category: selectedCategory,
      name: name,
      description: description,
      shortDescription: shortDescription,
      type: type,
      gst: gst,
      priceincludesgst: pricegst,
      price: price,
      discount: discount,
      image: image,
      menuimageurl: menuimgurl
    };
    setProductsArray([...productsArray, data]);
    makeDataEmpty()
    window.scroll(
      document.getElementById("name")
        .offsetTop,
      0
    );
  };

  const close = () => {
    setselectedProduct("");
    setNewProduct(false);
  }

  const makeDataEmpty = () => {
    setName("");
    setdescription("");
    setshortDescription("");
    setType(1);
    setGst("");
    setPriceGst("");
    setprice([{ measure: "", quantity: "", price: "" }]);
    setdiscount("");
    setimage("");
    setMenuImgUrl("");
    setGst("");
    setPriceGst("");
  };

  const editProduct = (index) => {
    setName(productsArray[index].name);
    setdescription(productsArray[index].description);
    setshortDescription(productsArray[index].shortDescription);
    setType(productsArray[index].type);
    setprice(productsArray[index].price);
    setGst(productsArray[index].gst);
    setdiscount(productsArray[index].discount);
    setimage(productsArray[index].image);
    setPriceGst(productsArray[index].pricegst);
    setMenuImgUrl(productsArray[index].menuimgurl);
    setselectedProduct(index);
  };

  const editProductFormSubmit = () => {
    console.log("edit product")
    const data = {
      category: selectedCategory,
      name: name,
      description: description,
      shortDescription: shortDescription,
      type: type,
      gst: gst,
      priceincludesgst: pricegst,
      price: price,
      discount: discount,
      image: image,
      menuimageurl: menuimgurl
    };
    let oldProductsArray = productsArray;
    oldProductsArray[selectedProduct] = data;
    setProductsArray(oldProductsArray);
    setselectedProduct("");
  };

  const addCategory = (e) => {
    let menuCategories = [];
    menuCategories = menuCategories.concat(categoryName);
    const data = {
      menuCategories: menuCategories,
    };
    if (!categoryList.some(val => val.name === categoryName)) {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/after_login/add_menu_categories`,
          data,
          {
            headers: {
              "x-access-token": `${localStorage.getItem("token")}`,
            },
          }
        )
        .then(res => {
          setCategoryList(categoryList.concat(res.data.savedMenuCategories))
        })
        .catch(err => {
          console.log(err)
        })
    }
    setCategory([
      ...categoryArray,
      categoryName
    ]);
    setCategoryName('');
  }

  return (
    <div className="container add-customer website-options product-details">
      <h2>Product Details</h2>
      <div className="row" style={{ borderTop: "1px dashed #b3b3b3" }}>
        <div className="col-lg-12 d-flex justify-content-between"></div>
        <div className="col-lg-12 d-flex align-items-center mt-20">
          <button className="btn next-btn" onClick={goBack}>
            Back
          </button>
          <button className="btn next-btn" onClick={goNext}>
            Next
          </button>
        </div>
        <div className="col-lg-4 col-md-4">
          <h4 className="col-lg-12 category-section">
            Category List:
            <ul className="col-lg-12 mt-20">
              {categoryArray.map((category, index) => (

                <h5
                  className={
                    category === selectedCategory
                      ? "category-list selected-category" : "category-list"
                  }
                  onClick={() => {
                    setSelectedCategory(category);
                    categoryList.map((val) => {
                      if (category === val.name) { setSelectedCategoryId(val.id) }
                    })
                    if (categoryArray.length === 0) {
                      setSelectedCategory("")
                      setNewProduct(true)
                    }
                    setselectedProduct("");
                    setNewProduct(false);
                    makeDataEmpty();
                  }}
                  key={index}
                  value={category}
                >
                  {category}
                  <button className="category-list-close"
                    onClick={
                      () => {
                        categoryArray.splice(index, 1);
                        category = selectedCategory;
                      }
                    }
                  >X</button>
                </h5>
              ))}
            </ul>
            {categoryArray.length > 0 && (
              <select
                className="mt-20 w-100 ml-0"
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setselectedProduct("");
                  setNewProduct(false);
                  makeDataEmpty();
                }}
              >
                <option hidden>Select Category</option>
                {categoryArray.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            )}
            <Autocomplete
              value={categoryName}
              inputProps={{
                type: "text",
                placeholder: "Enter Catergory...",
                autoFocus: "on",
                autoComplete: "off",
                id: "categoryNameInput",
              }}
              selectOnBlur={false}
              getItemValue={item => item.name}
              items={categoryList}
              wrapperStyle={{
                fontSize: '14px', cursor: 'pointer',
              }}
              shouldItemRender={
                (item, value) => item.name.toLowerCase().trim().indexOf(value.toLowerCase().trim()) > -1
              }
              renderMenu={(item, highlighted) => (
                <div className="dropdown">
                  {categoryName.length > 0 ? <>{item}</> : ""}

                  {categoryName.length > 0 && categoryName != item.name ?
                    <div
                      key={item.id}
                      style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                      onClick={() => addCategory()}>
                      <i class="lni lni-search"></i>
                      &nbsp;&nbsp;
                       {categoryName}...
                    </div>
                    : ""}
                </div>
              )}
              renderItem={(item, highlighted) =>
                <div
                  key={item.id}
                  style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                >
                  <>
                    <i class="lni lni-search"></i>
                    &nbsp;&nbsp;
                      {item.name}
                  </>
                </div>
              }
              onChange={
                (event) =>
                  setCategoryName(event.target.value)
              }
              onSelect={
                (val) => {
                  setCategoryName(val)
                  setSelectedCategoryList(selectedCategoryList.concat(val));
                  setCategory([
                    ...categoryArray,
                    val
                  ]);
                  setCategoryName('');
                }
              }
            />
          </h4>
          {/* <div className="col-lg-12 d-flex">
            <button
              className="btn next-btn mt-0"
              onClick={() => {
                setCategory([
                  ...categoryArray,
                  document.getElementById("categoryNameInput").value,
                ]);
                document.getElementById("categoryNameInput").value = "";
              }}
            >
              Add Category
            </button>
          </div> */}
        </div>

        <div className="col-lg-8 col-md-8 p-0">
          {selectedCategory === "" ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <label>
                Create Category and <br /> Select the Category to see the items
                under it!!!
              </label>
            </div>
          ) : (
              <>
                {selectedProduct === "" ? (
                  <div className="col-lg-12 d-flex flex-column justity-content-center align-items-center p-0">
                    {newProduct ? (
                      <ProductForm
                        selectedCategory={selectedCategory}
                        name={name}
                        setName={setName}
                        description={description}
                        setdescription={setdescription}
                        shortDescription={shortDescription}
                        setshortDescription={setshortDescription}
                        selectedCategoryId={selectedCategoryId}
                        setSelectedCategoryId={setSelectedCategoryId}
                        type={type}
                        settype={setType}
                        price={price}
                        setprice={setprice}
                        discount={discount}
                        setdiscount={setdiscount}
                        image={image}
                        setimage={setimage}
                        menuimgurl={menuimgurl}
                        setMenuImgUrl={setMenuImgUrl}
                        gst={gst}
                        setGst={setGst}
                        pricegst={pricegst}
                        setPriceGst={setPriceGst}
                        restaurantbranchid={restaurantbranchid}
                        setRestaurantBranchId={setRestaurantBranchId}
                        close={close}
                        productsArray={productsArray}
                        setProductsArray={setProductsArray}
                        makeDataEmpty={makeDataEmpty}
                        productFormSubmit={newProductFormSubmit}
                      />
                    ) : (
                        <>
                          <button
                            className="btn next-btn"
                            onClick={() => {
                              setNewProduct(true);
                              makeDataEmpty()
                            }
                            }
                          >
                            Add New Item
                          </button>
                          {productsArray.map((item, index) => {
                            if (item.category === selectedCategory)
                              return (
                                <div key={index} className="col-lg-12 d-flex mb-10">
                                  <h6>{item.name}</h6>
                                  <span
                                    className="ml-auto"
                                    onClick={() => editProduct(index)}
                                  >
                                    Edit
                              </span>
                                </div>
                              );
                          })}
                        </>
                      )}
                  </div>
                ) : (
                    <div className="col-lg-12 d-flex flex-column justity-content-center align-items-center p-0">
                      <ProductForm
                        selectedCategory={selectedCategory}
                        name={name}
                        setName={setName}
                        description={description}
                        setdescription={setdescription}
                        shortDescription={shortDescription}
                        setshortDescription={setshortDescription}
                        selectedCategoryId={selectedCategoryId}
                        setSelectedCategoryId={setSelectedCategoryId}
                        type={type}
                        settype={setType}
                        price={price}
                        setprice={setprice}
                        discount={discount}
                        setdiscount={setdiscount}
                        image={image}
                        setimage={setimage}
                        menuimgurl={menuimgurl}
                        setMenuImgUrl={setMenuImgUrl}
                        gst={gst}
                        setGst={setGst}
                        pricegst={pricegst}
                        setPriceGst={setPriceGst}
                        restaurantbranchid={restaurantbranchid}
                        setRestaurantBranchId={setRestaurantBranchId}
                        close={close}
                        productsArray={productsArray}
                        setProductsArray={setProductsArray}
                        makeDataEmpty={makeDataEmpty}
                        productFormSubmit={editProductFormSubmit}
                      />
                    </div>
                  )}
              </>
            )}
        </div>
        <div className="col-lg-12 d-flex align-items-center mt-20 border-top">
          <button className="btn next-btn" onClick={goBack}>
            Back
          </button>
          <button className="btn next-btn" onClick={goNext}>
            Next
          </button>
        </div>
      </div>
    </div >
  );
}

export default AddProduct;

