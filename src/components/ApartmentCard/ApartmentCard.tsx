import * as React from "react";

function ApartmentListing() {
  return (
    <div className="main-container">
      <header className="header">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/84e7369b70580e86969fe70d3228a6de56b8c648adc8c58fa735b445c703abd2?apiKey=0a183be08c194c808182f759b68acaaf&"
          className="logo"
          alt="Apartment Logo"
        />
      </header>

      <div className="listing-container">
        <div className="price">$1000 - 5000 USD</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e8ddbf215ebf940e5998cbf1563ee4d6c580adad3c45e3abd6d807e48d4f90?apiKey=0a183be08c194c808182f759b68acaaf&"
          className="image"
          alt="Apartment Image"
        />
      </div>

      <div className="apartment-details">
        <h2 className="title">Well Furnished Apartment</h2>
        <p className="address">100 Smart Street, LA, USA</p>
      </div>
    </div>
  );
}

export default ApartmentListing;