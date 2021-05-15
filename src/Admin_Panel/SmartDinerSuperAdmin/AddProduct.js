import React from "react";
import { useState } from "react";
import ProductForm from "./ProductForm";

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

  const goNext = () => {};
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
            <input
              type="text"
              placeholder="Enter Catergory..."
              autoFocus
              autoComplete="off"
              id="categoryNameInput"
            />
          </h4>
          <div className="col-lg-12 d-flex">
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
          </div>
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
    </div>
  );
}

export default AddProduct;
