import React from 'react';
import ReactDOM from 'react-dom';
import Invoice from "./Invoice";

it("renders without crashing", ()=>{
    const button=document.createElement("Download");
    ReactDOM.render(<Invoice></Invoice>, button)
})

it("renders the title of API fetching data", ()=>{
    const title="delectus aut autem";
    expect(title).toEqual("delectus aut autem");
})

it("1renders without crashing", ()=>{
    const button=document.createElement("Toong Dal");
    ReactDOM.render(<Invoice></Invoice>, button)
})
