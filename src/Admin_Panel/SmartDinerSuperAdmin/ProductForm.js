import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from 'react-autocomplete';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

function ProductForm({
  selectedCategory,
  name,
  setName,
  description,
  setdescription,
  shortDescription,
  setshortDescription,
  selectedCategoryId,
  setSelectedCategoryId,
  type,
  settype,
  price,
  setprice,
  discount,
  setdiscount,
  image,
  setimage,
  menuimgurl,
  setMenuImgUrl,
  gst,
  setGst,
  pricegst,
  setPriceGst,
  restaurantbranchid,
  setRestaurantBranchId,
  productsArray,
  setProductsArray,
  makeDataEmpty,
  productFormSubmit,
}) {
  const [quantityvalues, setQuantityValues] = useState([]);
  const [measurevalues, setMeasureValues] = useState([]);

  const [addeditems, setAddedItems] = useState([])
  const [showToolTip, setToolTip] = useState(false);
  const [target, setTarget] = useState(null);
  const [toolTipMessage, setToolTipMessage] = useState(null);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/after_login/get_quantity_measure_values`,
        {
          headers: {
            "x-access-token": `${localStorage.getItem("token")}`,
          },
        }
      )
      .then(res => {
        setQuantityValues(res.data.quantityValues)
        setMeasureValues(res.data.measureValues)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const saveProducts = () => {

    let pricedetails = []
    let flag = 0
    for (let i = 0; i < price.length; i++) {

      if (!quantityvalues.some(item => item.quantity === price[i]['quantity'])) {
        let id

        measurevalues.map((item) => {
          if (price[i]['measure'] === item.name) { id = item.id }
        })
        if (!measurevalues.some(item => ((item.name).toLowerCase()) === ((price[i]['measure']).toLowerCase()))) {
          pricedetails.push({
            originalPrice: document.getElementsByName('price')[i].value,
            newQuantityValueName: price[i]['quantity'],
            newMeasureValueName: price[i]['measure']
          });
        }
        if (measurevalues.some(item => ((item.name).toLowerCase()) === ((price[i]['measure']).toLowerCase()))) {
          pricedetails.push({
            originalPrice: document.getElementsByName('price')[i].value,
            newQuantityValueName: price[i]['quantity'],
            measureValueId: id
          });
        }

      }
      else {
        let id, id1
        if (!measurevalues.some(item => ((item.name).toLowerCase()) === ((price[i]['measure']).toLowerCase()))) {

          quantityvalues.map((item) => {
            if (price[i]['quantity'] === item.quantity) { id = item.id }
          })
          pricedetails.push({
            originalPrice: document.getElementsByName('price')[i].value,
            quantityValueId: id,
            newMeasureValueName: price[i]['measure']
          });
        }
        if (measurevalues.some(item => ((item.name).toLowerCase()) === ((price[i]['measure']).toLowerCase()))) {
          quantityvalues.map((item) => {
            if (price[i]['quantity'] === item.quantity) { id = item.id }
          })
          measurevalues.map((item) => {
            if (price[i]['measure'] === item.name) { id1 = item.id }
          })
          pricedetails.push({
            originalPrice: document.getElementsByName('price')[i].value,
            quantityValueId: id,
            measureValueId: id1
          });
        }
      }
    }
    price.map((item, index) => {
      if (price[index]['measure'].length != 0 && price[index]['measure'].length != 0 && document.getElementsByName('price')[index].value.length != 0) {
        flag = 1
      }
    })
    const data = {
      restaurantBranchId: 1,
      menuName: name,
      menuImageUrl: menuimgurl,
      menuImage: image,
      newCategoryName: selectedCategory,
      discount: discount,
      description: description,
      shortDescription: shortDescription,
      gst: Number(gst),
      priceIncludesGst: Boolean(pricegst),
      menuType: Number(type),
      priceDetails: pricedetails
    }

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/after_login/create_menu_with_category`,
        data,
        {
          headers: {
            "x-access-token": `${localStorage.getItem("token")}`,
          },
        }
      )
      .then(res => {
        setQuantityValues(quantityvalues.concat(res.data.priceDetails.quantityValueId))
        setMeasureValues(measurevalues.concat(res.data.priceDetails.measureValueId))

      })
      .catch(err => {
        console.log(err)
      })
    if (flag === 1) {
      toast.configure()
      toast.success('Added Successfully!', { position: toast.POSITION.TOP_RIGHT })
      // const data = {
      //   category: selectedCategory,
      //   name: name,
      //   description: description,
      //   shortDescription: shortDescription,
      //   type: type,
      //   price: price,
      //   discount: discount,
      //   image: image,
      // };
      // setProductsArray([...productsArray, data]);
      // productFormSubmit
      makeDataEmpty()
      window.scroll(
        document.getElementById("name")
          .offsetTop,
        0
      );
    }
    if (name.length <= 0) {
      setToolTipMessage("Enter <strong> Name</strong>.");
      setTarget(document.getElementById("name"));
      setToolTip(true);
      window.scroll(
        document.getElementById("name")
          .offsetTop,
        0
      );
      return false;
    }
  }

  return (
    <>
      <div>
        <Overlay show={showToolTip} placement="bottom" target={target}>
          <Popover id="popover-contained">
            <Popover.Content>
              <div dangerouslySetInnerHTML={{ __html: toolTipMessage }}></div>
            </Popover.Content>
          </Popover>
        </Overlay>
        <h4 className="col-lg-12">
          Category : {selectedCategory}
          <button
            type="button"
            class="btn btn-danger ml-auto"
            onClick={productFormSubmit}
          >
            X
          </button>
        </h4>
        <h4 className="col-lg-12">
          Name :
        <input
            type="text"
            value={name}
            id="name"
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setToolTip(false)}
          />
        </h4>
        <h4 className="col-lg-12">
          Description :
        <textarea
            type="text"
            value={description}
            id="description"
            onChange={(e) => setdescription(e.target.value)}
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
          />
        </h4>
        <h4 className="col-lg-12">
          Type :
        <select value={type} onChange={(e) => settype(e.target.value)}>
            <option value={1}>Veg</option>
            <option value={2}>Non-Veg</option>
          </select>
        </h4>
        <div className="row">
          <h4 className="col">
            Gst :
            <input
              type="number"
              value={gst}
              id="gst"
              onChange={(e) => setGst(e.target.value)}
            />
          </h4>
          <h4 className="col">
            Price includes Gst :
        <select value={pricegst} onChange={(e) => setPriceGst(e.target.value)}>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </h4>
        </div>
        <h4 className="col-lg-12">Price : </h4>
        <div className="col-lg-12">
          {price.map((pri, index) => (
            <div className="d-flex flex-wrap">
              <label className="d-flex flex-column">
                Quantity:
                <Autocomplete
                  value={pri.quantity}
                  inputProps={{
                    type: "number",
                    className: "mr-10",
                    autoComplete: "on",
                    name: "quantity",
                    value: "pri.quantity",
                  }}
                  selectOnBlur={false}
                  getItemValue={item => item.quantity}
                  items={quantityvalues}
                  wrapperStyle={{
                    fontSize: '14px', cursor: 'pointer',
                  }}
                  shouldItemRender={
                    (item, value) => item.quantity.indexOf(value) > -1
                  }
                  renderMenu={(item, highlighted) => (
                    <div className="dropdown">
                      {pri.quantity ?
                        <>{item}</>
                        : ''}

                      {pri.quantity.length > 0 && quantityvalues.some(item => item.quantity !== pri.quantity)
                        // && pri.quantity != item.quantity

                        ?
                        <div
                          key={item.id}
                          style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                        // onClick={() => saveOldItems(pri.quantity)}
                        >
                          <i class="lni lni-search"></i>
                          &nbsp;&nbsp;
                       {pri.quantity}...
                    </div>
                        : ''}
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
                      {item.quantity}
                      </>
                    </div>
                  }
                  onChange={
                    (event) => {
                      let priceData = price;
                      priceData[index][event.target.name] = event.target.value
                      setprice([...priceData]);
                    }}
                  onSelect={
                    (val) => {
                      let priceData = price;
                      priceData[index]['quantity'] = val
                      setprice([...priceData]);
                    }
                  }
                />
              </label>
              <label className="d-flex flex-column">
                Measure:
                <Autocomplete
                  value={pri.measure}
                  inputProps={{
                    type: "text",
                    className: "mr-10",
                    autoComplete: "off",
                    value: "pri.measure",
                    name: "measure",
                  }}
                  selectOnBlur={false}
                  getItemValue={item => item.name}
                  items={measurevalues}
                  wrapperStyle={{
                    fontSize: '14px', cursor: 'pointer',
                  }}
                  shouldItemRender={
                    (item, value) => item.name.toLowerCase().trim().indexOf(value.toLowerCase().trim()) > -1
                  }
                  renderMenu={(item, highlighted) => (
                    <div className="dropdown">

                      {pri.measure ? <>{item}</> : ''}

                      {pri.measure.length > 0 && pri.measure != item.name ?
                        <div
                          key={item.id}
                          style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                        // onClick={() => saveOldItems(pri.measure)}
                        >
                          <i class="lni lni-search"></i>
                          &nbsp;&nbsp;
                       {pri.measure}...
                    </div>
                        : ''}

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
                    (event) => {
                      let priceData = price;
                      priceData[index][event.target.name] = event.target.value
                      setprice([...priceData]);
                    }}
                  onSelect={
                    (val) => {
                      let priceData = price;
                      priceData[index]['measure'] = val
                      setprice([...priceData]);
                      // setSelectedCategoryList(selectedCategoryList.concat(val));
                      setAddedItems(addeditems.concat(val))
                    }
                  }
                />
              </label>
              <label className="d-flex flex-column">
                Price:
              <input
                  type="number"
                  className=" mr-10"
                  value={pri.price}
                  name="price"
                  onInput={(event) => {
                    let priceData = price;
                    priceData[index][event.target.name] = event.target.value
                    setprice([...priceData]);
                  }}
                />
              </label>
            </div>
          ))}
          <div className="col-lg-12 p-0">
            <button
              className="btn btn-warning align-self-center"
              onClick={() => {
                setprice([...price, { measure: "", quantity: "", price: "" }])
              }}
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
        <h4 className="col-lg-12">
          Menu Image URL :
        <input
            type="text"
            value={menuimgurl}
            id="menuimgurl"
            onChange={(e) => setMenuImgUrl(e.target.value)}
          />
        </h4>
      </div>
      <div style={{ marginInlineStart: "auto" }}>
        <button className="btn btn-success mr-2" onClick={saveProducts}>
          Submit
      </button>
        <button className="btn btn-danger" onClick={productFormSubmit}>
          Cancel
      </button>
      </div>
    </>
  );
}

export default ProductForm;
