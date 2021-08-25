import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import Theme2 from "./assets/theme2.png";
import Theme1 from "./assets/Theme1.png";
import Theme3 from "./assets/theme2.1.png";
import Modal from "react-bootstrap/Modal";

const themes = [Theme1, Theme2, Theme3];

function SelectTheme({
  setSelectedTheme,
  setShowTheme,
  setRestaurantDetails,
  setshowRestaurantLinksComponent,
}) {
  const [showTemplate, setShowTemplate] = useState(null);

  const handleClose = () => setShowTemplate(null);
  const goBack = () => {
    setRestaurantDetails(true);
    setShowTheme(false);
    window.scrollTo(0, 0);
  };
  return (
    <div className="container theme-select">
      <h2>Select your website design :</h2>
      <div className="col-lg-12 d-flex align-items-center">
        <button className="btn next-btn" onClick={goBack}>
          Back
        </button>
      </div>
      <div className="row d-flex justify-content-between">
        {themes.map((theme, index) => (
          <Card className="col-lg-3 col-md-5" style={{ width: "inherit" }}>
            <div
              style={{ height: "250px" }}
              onClick={() => setShowTemplate(theme)}
            >
              <Card.Img variant="top" src={theme} />
            </div>

            <Card.Body>
              <Card.Title className="row align-items-center">
                {"Theme " + (index + 1)}{" "}
                <span onClick={() => setShowTemplate(theme)}>View</span>
              </Card.Title>
              <Card.Text>Description about template design</Card.Text>
              <Button
                variant="primary"
                onClick={() => {
                  setSelectedTheme(index + 1);
                  setshowRestaurantLinksComponent(true);
                  setShowTheme(false);
                }}
              >
                {"Choose Theme " + (index + 1)}
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Modal
        show={Boolean(showTemplate)}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Website Design</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pl-0 pr-0">
          <img id="selected-template-for-view" src={showTemplate} alt="" />
        </Modal.Body>
      </Modal>
      <div className="col-lg-12 d-flex align-items-center">
        <button className="btn next-btn" onClick={goBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default SelectTheme;
