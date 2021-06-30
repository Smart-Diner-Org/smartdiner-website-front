import React, { useEffect } from "react";
import { useState } from "react";
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
}) {

  const [categoryName, setCategoryName] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [addCategoryList, setAddCategoryList] = useState([]);
  const [selectedCategoryList, setSelectedCategoryList] = useState([]);


  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setselectedProduct] = useState("");
  const [newProduct, setNewProduct] = useState(false);
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [shortDescription, setshortDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setprice] = useState([
    { measure: "", quantity: "", price: "" },
  ]);
  const [discount, setdiscount] = useState("");
  const [image, setimage] = useState("");

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
      price: price,
      discount: discount,
      image: image,
    };
    setProductsArray([...productsArray, data]);
    setNewProduct(false);
    makeDataEmpty();
  };

  const makeDataEmpty = () => {
    setName("");
    setdescription("");
    setshortDescription("");
    setType("");
    setprice([{ measure: "", quantity: "", price: "" }]);
    setimage("");
    setdiscount("");
  };

  const editProduct = (index) => {
    setName(productsArray[index].name);
    setdescription(productsArray[index].description);
    setshortDescription(productsArray[index].shortDescription);
    setType(productsArray[index].type);
    setprice(productsArray[index].price);
    setimage(productsArray[index].image);
    setdiscount(productsArray[index].discount);
    setselectedProduct(index);
  };

  const editProductFormSubmit = () => {
    const data = {
      category: selectedCategory,
      name: name,
      description: description,
      shortDescription: shortDescription,
      type: type,
      price: price,
      discount: discount,
      image: image,
    };
    let oldProductsArray = productsArray;
    oldProductsArray[selectedProduct] = data;
    setProductsArray(oldProductsArray);
    setselectedProduct("");
    makeDataEmpty();
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
          setAddCategoryList(res.data.savedMenuCategories)
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

  const selectedItems = (v) => {
    setCategoryName(v)
    setSelectedCategoryList(selectedCategoryList.concat(v));
    setCategory([
      ...categoryArray,
      v
    ]);
    setCategoryName('');
  }
  const categoryCloseButton = (value, i) => {
    // category.splice(index)
    // categoryArray.splice(0, categoryArray.length)
    categoryArray.splice(i, 1)
    // console.log(value)
    // console.log(i)
  }
  return (
    <div className="container add-customer website-options product-details">
      <h2>Product Details</h2>

      <div className="row" style={{ borderTop: "1px dashed #b3b3b3" }}>
        <div className="col-lg-12 d-flex justify-content-between"></div>
        <div className="col-lg-4 col-md-4">
          <h4 className="col-lg-12 category-section">
            Category List:
            <ul className="col-lg-12 mt-20">
              {categoryArray.map((category, index) => (
                <h5
                  className={
                    category === selectedCategory
                      ? "category-list selected-category"
                      : "category-list"
                  }
                  onClick={() => {
                    setSelectedCategory(category);
                    setselectedProduct("");
                    setNewProduct(false);
                    makeDataEmpty();
                  }}
                  key={index}
                  value={category}
                >
                  {category}
                  <button className="category-list-close" onClick={
                    () => categoryCloseButton(category, index)
                  }>X</button>
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
                  {categoryName.length === 0 ? <>loading...</> : ''}
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
                (event) => setCategoryName(event.target.value)
              }
              onSelect={
                (val) => {
                  selectedItems(val)
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
          {
            // selectedProduct === ""
            categoryArray.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <label>
                Create Category and <br /> Select the Category to see the items
                under it!!!
                {categoryArray}
              </label>
            </div>
          ) : (
              <>
                {
                  // selectedProduct === ""
                  categoryArray.length !== 0 ? (
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
                        type={type}
                        settype={setType}
                        price={price}
                        setprice={setprice}
                        discount={discount}
                        setdiscount={setdiscount}
                        image={image}
                        setimage={setimage}
                        productFormSubmit={newProductFormSubmit}
                      />
                    ) : (
                        <>
                          <button
                            className="btn next-btn"
                            onClick={() => setNewProduct(true)}
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
                        type={type}
                        settype={setType}
                        price={price}
                        setprice={setprice}
                        discount={discount}
                        setdiscount={setdiscount}
                        image={image}
                        setimage={setimage}
                        productFormSubmit={editProductFormSubmit}
                      />
                    </div>
                  )}
              </>
            )
          }
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
    </div>
  );
}

export default AddProduct;
