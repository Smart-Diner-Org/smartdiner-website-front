import React from "react";

function ProductForm({
  selectedCategory,
  name,
  setName,
  description,
  setdescription,
  shortDescription,
  setshortDescription,
  type,
  settype,
  price,
  setprice,
  discount,
  setdiscount,
  image,
  setimage,
  productFormSubmit,
}) {
  return (
    <>
      <h4 className="col-lg-12">Category : {selectedCategory}</h4>
      <h4 className="col-lg-12">
        Name :
        <input
          type="text"
          value={name}
          id="name"
          onChange={(e) => setName(e.target.value)}
          //   onFocus={()=>setToolTip(false)}
        />
      </h4>
      <h4 className="col-lg-12">
        Description :
        <textarea
          type="text"
          value={description}
          id="description"
          onChange={(e) => setdescription(e.target.value)}
          //   onFocus={()=>setToolTip(false)}
        />
      </h4>
      <h4 className="col-lg-12">
        Short Description :
        <textarea
          type="text"
          maxLength="60"
          value={shortDescription}
          id="websiteURL"
          onChange={(e) => setshortDescription(e.target.value)}
          //   onFocus={()=>setToolTip(false)}
        />
      </h4>
      <h4 className="col-lg-12">
        Type :
        <select value={type} onChange={(e) => settype(e.target.value)}>
          <option value={"Veg"}>Veg</option>
          <option value={"Non-Veg"}>Non-Veg</option>
        </select>
      </h4>
      <h4 className="col-lg-12">Price : </h4>
      <div className="col-lg-12">
        {price.map((pri, index) => (
          <div
            className="d-flex flex-wrap"
            onChange={(e) => {
              e.stopPropagation();
              let priceData = price;
              priceData[index][e.target.name] = e.target.value;
              setprice([...priceData]);
            }}
          >
            <label className="d-flex flex-column">
              Quantity:
              <input
                type="number"
                className="mr-10"
                value={pri.quantity}
                name="quantity"
              />
            </label>
            <label className="d-flex flex-column">
              Measure:
              <input
                type="text"
                className="mr-10"
                value={pri.measure}
                name="measure"
              />
            </label>
            <label className="d-flex flex-column">
              Price:
              <input
                type="number"
                className=" mr-10"
                value={pri.price}
                name="price"
              />
            </label>
          </div>
        ))}
        <div className="col-lg-12 p-0">
          <button
            className="btn btn-warning align-self-center"
            onClick={() =>
              setprice([...price, { measure: "", quantity: "", price: "" }])
            }
          >
            Add
          </button>
        </div>
      </div>
      <h4 className="col-lg-12">
        Discount (in %) :
        <input
          type="number"
          value={discount}
          id="restaurantName"
          onChange={(e) => setdiscount(e.target.value)}
          //   onFocus={()=>setToolTip(false)}
        />
      </h4>
      <h4 className="col-lg-12">
        Upload Image :
        <input
          type="file"
          id="upload-logo"
          accept="image/*"
          onChange={(e) => setimage(e.target.files[0])}
        />
      </h4>
      <button className="btn btn-success" onClick={productFormSubmit}>
        Submit
      </button>
    </>
  );
}

export default ProductForm;
