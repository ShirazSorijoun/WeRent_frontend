import React from "react";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
    return (
        <div className="main-container">
            <header className="header">
                <img
                    loading="lazy"
                    src="src/assets/landing page image.png"
                    className="header-img"
                    alt="Home listing image"
                />
                <img
                    loading="lazy"
                    src="src/assets/landing page image - unsplash.png"
                    className="header-img"
                    alt="Unsplash Home listing image"
                />
                <div className="header-title">Beautiful homes made for you</div>
                <div className="header-description">
                The WeRent website, which is updated daily, provides a variety of real estate ads from all over the country and of all types.
                The site also offers you fast legal services.
                Enter now all the information about the comparable properties!
                </div>
            </header>

            <div className="listings-container">
                    <span className="link">
                      <div className="button">Look where there is a National Outline Plan</div>
                        <div className="img-container">
                            <img
                              loading="lazy"
                              src="src/assets/Arrow Tellow.svg"
                              className="img-3"
                              alt="Listing image"
                            />
                        </div>
                    </span>
            </div>

            <div className="Secondary-container">
                <div className="image-wrapper">
                    <div className="column">
                        <img
                            loading="lazy"
                            src="src/assets/landing page - in good hands.png"
                            alt="In Good Hands"
                        />
                    </div>
                    <div className="column-2">
                        <span className="caption">
                            <img
                                loading="lazy"
                                src="src/assets/Rectangle.png"
                                className="img-2"
                                alt="Rectangle"
                            />
                            <div className="description">You're in good hands</div>
                            <div className="text">
                              Added text about us
                            </div>
                            <span className="link">
                              <div className="button">Learn more</div>
                              <div className="img-container">
                                  <img
                                      loading="lazy"
                                      src="src/assets/Arrow Tellow.svg"
                                      className="img-3"
                                      alt="Listing image"
                                  />
                              </div>
                          </span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="Box">
                <img
                    loading="lazy"
                    src="src/assets/Rectangle.png"
                    className="img-2"
                    alt="Rectangle"
                />
            </div>

            <div className="Quote">
            "The secret to succeeding at something is to just start doing it."            </div>
        </div>
    );
};

export default LandingPage;