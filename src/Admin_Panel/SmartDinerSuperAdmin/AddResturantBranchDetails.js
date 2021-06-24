import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

let flagged = 0
let FromData = 0
let ToData = 0
function AddResturantBranchDetails({
  setshowRestaurantLinksComponent,
  resturantBranchDetails,
  setresturantBranchDetails,
  branchdetailsTemplate,
  setshowDeliveryDetails,
  setshowResturantBranchDetails,
}) {
  const [target, setTarget] = useState(null);
  const [showToolTip, setToolTip] = useState(false);
  const [toolTipMessage, setToolTipMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/after_login/get_states`, {
        headers: {
          "x-access-token": `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setStates(res.data.states);
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/after_login/get_cities`, {
            headers: {
              "x-access-token": `${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setCities(res.data.cities);
            setLoading(false);
          })
          .catch((error) => {
            alert(error);
            console.log(error);
          });
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  }, []);

  const goNext = () => {
    const flag = formDataValidation();
    if (flag) {
      setshowDeliveryDetails(true);
      setshowResturantBranchDetails(false);
      window.scrollTo(0, 0);
    }
  };

  const goBack = () => {
    setshowRestaurantLinksComponent(true);
    setshowResturantBranchDetails(false);
    window.scrollTo(0, 0);
  };

  const formHandleChange = (e, index) => {
    let details = [...resturantBranchDetails];
    if (e.target.name === "contactnumb") {
      const re = /^[0-9\b]+$/;
      if (re.test(e.target.value)) {
        details[index][e.target.name] = e.target.value;
        setresturantBranchDetails(details);
      }
    } else {
      details[index][e.target.name] = e.target.value;
      setresturantBranchDetails(details);
    }
  };

  const formDataValidation = () => {
    if (
      resturantBranchDetails[resturantBranchDetails.length - 1]["branchName"]
        .length <= 0
    ) {
      setToolTipMessage("Enter <strong>Branch Name</strong>.");
      setTarget(
        document.getElementById(`branchName${resturantBranchDetails.length}`)
      );
      setToolTip(true);
      window.scroll(
        document.getElementById(`branchName${resturantBranchDetails.length}`)
          .offsetTop,
        0
      );

      return false;
    }
    if (
      resturantBranchDetails[resturantBranchDetails.length - 1]["address"]
        .length <= 0
    ) {
      setToolTipMessage("Enter <strong>Branch Address</strong>.");
      setTarget(
        document.getElementById(`address${resturantBranchDetails.length}`)
      );
      setToolTip(true);
      window.scroll(
        0,
        document.getElementById(`address${resturantBranchDetails.length}`)
          .offsetTop
      );
      return false;
    }
    if (
      resturantBranchDetails[resturantBranchDetails.length - 1]["contactnumb"]
        .length <= 0
    ) {
      setToolTipMessage("Enter <strong>Contact Number</strong>.");
      setTarget(
        document.getElementById(`contactnumb${resturantBranchDetails.length}`)
      );
      setToolTip(true);
      return false;
    }
    if (
      resturantBranchDetails[resturantBranchDetails.length - 1]["email"]
        .length > 0
    ) {
      if (
        new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(
          resturantBranchDetails[resturantBranchDetails.length - 1]["email"]
        ) === false
      ) {
        setToolTipMessage("Enter a valid <strong>mail ID</strong> address.");
        setTarget(
          document.getElementById(`email${resturantBranchDetails.length}`)
        );
        setToolTip(true);
        return false;
      }
    }
    return true;
  };

  const addNewBranch = () => {
    const flag = formDataValidation();
    if (flag) {
      setresturantBranchDetails([
        ...resturantBranchDetails,
        branchdetailsTemplate,
      ]);
    }
  };

  const removeBranch = (index) => {
    const data = resturantBranchDetails;
    if (data.length > 1) {
      data.splice(index, 1);
    }
    setresturantBranchDetails([...data]);
  };

  const changeResturantTime = (index, timeIndex, fromToIndex, type, value) => {
    const data = resturantBranchDetails;
    data[index].timings[timeIndex][type][fromToIndex] = value;
    setresturantBranchDetails([...data]);
    if (type === "from")
      FromData = data[index].timings[timeIndex][type][fromToIndex]
    else
      ToData = data[index].timings[timeIndex][type][fromToIndex]
  };

  const applyForAll = (index, timeIndex) => {
    var checkboxes = document.getElementsByName('active');
    for (var i = 0; i <= checkboxes.length - 1; i++) {
      // checkboxes[index].checked = 'FALSE';
      if (flagged === 1) {
        if (i === checkboxes.length - 1) {
          resturantBranchDetails[index].timings[i].active = true;
          resturantBranchDetails[index].timings[i].from = [
            ...resturantBranchDetails[index].timings[i].from,
            FromData,
          ];
          resturantBranchDetails[index].timings[i].to = [
            ...resturantBranchDetails[index].timings[i].to,
            ToData,
          ];
          setresturantBranchDetails([...resturantBranchDetails]);
        }
        else {
          resturantBranchDetails[index].timings[i].active = true;
          resturantBranchDetails[index].timings[i].from = [
            ...resturantBranchDetails[index].timings[i + 1].from,
            FromData,
          ];
          resturantBranchDetails[index].timings[i].to = [
            ...resturantBranchDetails[index].timings[i + 1].to,
            ToData,
          ];
          setresturantBranchDetails([...resturantBranchDetails]);
        }
        setresturantBranchDetails([...resturantBranchDetails]);
      }
      else {
        resturantBranchDetails[index].timings[i].active = true;
        resturantBranchDetails[index].timings[i].from[index] = document.querySelector('input[name=from]').value;
        resturantBranchDetails[index].timings[i].to[index] = document.querySelector('input[name=to]').value;
        setresturantBranchDetails([...resturantBranchDetails]);
      }
    }
  };

  const addMoreTimeSlot = (index, timeIndex) => {
    flagged = 1
    const data = resturantBranchDetails;
    data[index].timings[timeIndex].from = [
      ...data[index].timings[timeIndex].from,
      "",
    ];
    data[index].timings[timeIndex].to = [
      ...data[index].timings[timeIndex].to,
      "",
    ];
    setresturantBranchDetails([...data]);
  };

  if (loading) {
    return <Spinner animation="grow" variant="success" />;
  } else {
    return (
      <div className="container add-customer">
        <Overlay show={showToolTip} placement="bottom" target={target}>
          <Popover id="popover-contained">
            <Popover.Content>
              <div dangerouslySetInnerHTML={{ __html: toolTipMessage }}></div>
            </Popover.Content>
          </Popover>
        </Overlay>
        <h2>Restaurant Branch Details</h2>
        {resturantBranchDetails.map((branch, index) => (
          <>
            <div
              className="row"
              style={{ borderTop: "1px dashed #b3b3b3" }}
              onChange={(e) => formHandleChange(e, index)}
              onFocus={() => setToolTip(false)}
            >
              <div className="col-lg-12  d-flex align-items-center mt-20">
                <h3>Branch {index + 1}:</h3>
                <button
                  type="button"
                  class="btn btn-danger ml-auto"
                  onClick={() => removeBranch(index)}
                >
                  X
                </button>
              </div>

              <h4 className="col-lg-8">
                Branch Name (Area of Restaurant) :
                <input
                  type="text"
                  id={`branchName${index + 1}`}
                  value={branch.branchName}
                  name="branchName"
                />
              </h4>
              <h4 className="col-lg-8">
                Address :
                <input
                  type="text"
                  id={`address${index + 1}`}
                  value={branch.address}
                  name="address"
                />
              </h4>
              <h4 className="col-lg-8">
                City :
                <select
                  className="col-12 mb-0"
                  id={`city${index + 1}`}
                  value={branch.city}
                  name="city"
                >
                  <option value="" hidden>
                    Select City
                  </option>
                  {cities.map((city) => (
                    <option value={city.id}>{city.name}</option>
                  ))}
                </select>
              </h4>
              <h4 className="col-lg-8">
                State :
                <select
                  className="col-12 mb-0"
                  type="text"
                  name="state"
                  id={`state${index + 1}`}
                  value={branch.state}
                >
                  <option value="" hidden>
                    Select State
                  </option>
                  {states.map((state) => (
                    <option value={state.id}>{state.name}</option>
                  ))}
                </select>
              </h4>
              <h4 className="col-lg-8 mb-0">
                Email :
                <input
                  type="text"
                  name="email"
                  id={`email${index + 1}`}
                  value={branch.email}
                />
              </h4>
              <h4 className="col-lg-8">
                Restuarant Contact Number :
                <input
                  name="contactnumb"
                  type="tel"
                  minLength="10"
                  maxLength="10"
                  id={`contactnumb${index + 1}`}
                  value={branch.contactnumb}
                />
              </h4>
            </div>
            <div className="row timings-table">
              <h4>Restuarant Timings :</h4>
              <Table>
                <thead>
                  <tr>
                    <th className="border-bottom-0">Working Day</th>
                    <th className="border-bottom-0">From</th>
                    <th className="border-bottom-0">To</th>
                  </tr>
                </thead>
                <tbody>
                  {branch.timings.map((day, timeIndex) => (
                    <tr key={timeIndex}>
                      <td>
                        <tr className="d-flex align-items-center">
                          <input
                            name="active"
                            checked={day.active}
                            type="checkbox"
                            onChange={(e) => {
                              let details = [...resturantBranchDetails];
                              details[index].timings[timeIndex][e.target.name] =
                                e.target.checked;
                              setresturantBranchDetails(details);
                            }}
                          />
                          <label className="mb-0">{day.day}</label>
                        </tr>
                        <tr>
                          <td>
                            <button
                              className="btn btn-warning"
                              style={day.active ? {} : { opacity: "0.3" }}
                              disabled={day.active ? false : true}
                              onClick={() => addMoreTimeSlot(index, timeIndex)}
                            >
                              Add more time slots
                          </button>
                          </td>
                          <td>
                            {
                              day.day === "Sunday" ?
                                <button
                                  className="btn btn-warning"
                                  style={day.active ? {} : { opacity: "0.3" }}
                                  disabled={day.active ? false : true}
                                  onClick={() => applyForAll(index, timeIndex)}
                                >Apply for all</button>
                                : ""
                            }
                          </td>
                        </tr>
                      </td>
                      <td>
                        {day.from.map((fromTime, fromIndex) => (
                          <tr key={fromIndex}>
                            <input
                              type="time"
                              style={day.active ? {} : { opacity: "0.3" }}
                              disabled={day.active ? false : true}
                              name="from"
                              value={fromTime}
                              onChange={(e) =>
                                changeResturantTime(
                                  index,
                                  timeIndex,
                                  fromIndex,
                                  "from",
                                  e.target.value
                                )
                              }
                            />
                          </tr>
                        ))}
                      </td>
                      <td>
                        {day.to.map((toTime, toIndex) => (
                          <tr
                            key={toIndex}
                            className="d-flex align-items-center"
                          >
                            <input
                              type="time"
                              style={day.active ? {} : { opacity: "0.3" }}
                              disabled={day.active ? false : true}
                              name="to"
                              value={toTime}
                              onChange={(e) =>
                                changeResturantTime(
                                  index,
                                  timeIndex,
                                  toIndex,
                                  "to",
                                  e.target.value
                                )
                              }
                            />
                          </tr>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        ))}
        <div className="col-lg-12 d-flex justify-content-around flex-wrap align-items-center">
          <button className="btn next-btn" onClick={goBack}>
            Back
          </button>
          <button
            className="btn next-btn add-new-branch-btn"
            onClick={addNewBranch}
          >
            Add New Branch
          </button>
          <button className="btn next-btn" onClick={goNext}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default AddResturantBranchDetails;
