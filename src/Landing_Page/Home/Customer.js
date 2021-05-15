import React from "react";

export default function Customer({ logoImg, URL, resturantName, description }) {
  return (
    <a href={URL} target="blank" class="single-brand-item">
      <img loading="lazy" class="img-fluid" src={logoImg} alt="Customer" />
      <h5 className="visit-site-btn">{resturantName}</h5>
    </a>
  );
}
