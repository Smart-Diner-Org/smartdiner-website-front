import React from "react";

export default function DateFilterComponent(props) {
  return (
    <div className="sort-filter-container">
      <div className="sort-filter d-flex justify-content-center">
        
        {!props.preOrder && 
        <>
        <input
          type="date"
          name="date"
          id="date"
          defaultValue={props.defaultValue}
          onChange={props.onChange}
        />
        {props.today == props.date && props.showAll === false && (
          <p className="d-flex align-items-center">Today's Orders</p>
        )}
        </>}
        <button
          className="d-flex align-items-center showAll"
          onClick={props.showAllClick}
        >
          Show All
        </button>
       
        {props.runningOrder && (
          <button
            className="d-flex align-items-center showAll"
            onClick={props.setRunningOrder}
          >
            {props.runningOrder}
          </button>
        )}
        
        {props.preOrder && 
        <>
        <div className="vertical-line"></div>
        <input
          type="date"
          name="date"
          id="date"
          defaultValue={props.defaultValue}
          onChange={props.onChange}
        />
          <button
            className="d-flex align-items-center preOrder"
            onClick={props.setPreOrder}
          >
            {props.preOrder}
          </button>
          </>
        }
      
      </div>
    </div>
  );
}
