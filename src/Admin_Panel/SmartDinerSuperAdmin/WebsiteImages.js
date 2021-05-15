import React from "react";
import imageCompression from "browser-image-compression";

function WebsiteImages({
  setshowwebsiteDetail2,
  setshowWebsiteImages,
  about,
  setabout,
  setaboutImg,
  setsliderImg,
  setCards,
  sliderImgContent,
  setsliderImgContent,
  setshowAddProduct,
  sliderImg,
  cards,
  setupResturant,
  aboutImageUrl,
  setaboutImageUrl,
  sliderImgUrl,
  setsliderImgUrl,
  cardsUrl,
  setCardsUrl,
}) {
  const goNext = () => {
    setshowAddProduct(true);
    setshowWebsiteImages(false);
    setupResturant();
    window.scrollTo(0, 0);
  };
  const goBack = () => {
    setshowwebsiteDetail2(true);
    setshowWebsiteImages(false);
    window.scrollTo(0, 0);
  };
  return (
    <div className="container add-customer">
      <h2>Website Images</h2>
      <div className="row" style={{ borderTop: "1px dashed #b3b3b3" }}>
        <h4 className="col-lg-8">
          About Restaurant :
          <textarea
            type="text"
            value={about}
            onChange={(e) => setabout(e.target.value)}
          />
        </h4>
        <h4 className="col-lg-8">
          About Image :
          <input
            type="file"
            id="upload-logo"
            accept="image/*"
            onChange={async (e) => {
              // setLogoImg(e.target.files[0]);
              let reader = new FileReader();
              let file = e.target.files[0];
              const options = {
                maxSizeMB: 0.01,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
              };
              try {
                const compressedFile = await imageCompression(file, options);
                console.log(compressedFile);
                console.log(
                  `${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`
                );
                reader.onloadend = () => {
                  setaboutImg(compressedFile);
                  // setPreview(reader.result);
                };
                reader.readAsDataURL(compressedFile);
              } catch (error) {
                console.log(error);
              }
            }}
          />
        </h4>
        <h4 className="col-lg-8">
          About Image URL :
          <input
            type="text"
            value={aboutImageUrl}
            onChange={(e) => setaboutImageUrl(e.target.value)}
          />
        </h4>
        <h4 className="col-lg-8">
          Slider Images :
          {sliderImg.map((slImg, index) => (
            <input
              type="file"
              id="upload-logo"
              accept="image/*"
              onChange={(e) => {
                let data = sliderImg;
                data[index] = e.target.files[0];
                console.log(data);
                setsliderImg([...data]);
              }}
            />
          ))}
          {sliderImgUrl.map((slImg, index) => (
            <input
              type="text"
              value={slImg}
              placeholder="Slider Image URL"
              onChange={(e) => {
                let data = sliderImgUrl;
                data[index] = e.target.value;
                setsliderImgUrl([...data]);
              }}
            />
          ))}
          <button
            type="button"
            class="btn btn-warning mt-10 ml-10"
            onClick={() => {
              setsliderImg([...sliderImg, ""]);
              setsliderImgUrl([...sliderImgUrl, ""]);
            }}
          >
            Add more
          </button>
        </h4>
        <h4
          className="col-lg-8 slider-image-content"
          onChange={(e) => {
            let content = [...sliderImgContent];
            content[e.target.name] = e.target.value;
            setsliderImgContent(content);
          }}
        >
          Slider Image Content :
          {sliderImgContent.map((content, index) => (
            <span key={index} className=" d-flex align-items-center">
              {index + 1}.
              <input type="text" name={index} value={content} />
            </span>
          ))}
        </h4>
        <h4 className="col-lg-8">
          Card Images :
          {cards.map((slImg, index) => (
            <input
              type="file"
              id="upload-logo"
              accept="image/*"
              onChange={(e) => {
                let data = cards;
                data[index] = e.target.files[0];
                setCards([...data]);
              }}
            />
          ))}
          {cardsUrl.map((slImg, index) => (
            <input
              type="text"
              value={slImg}
              placeholder="Cards Image URL"
              onChange={(e) => {
                let data = cardsUrl;
                data[index] = e.target.value;
                setCardsUrl([...data]);
              }}
            />
          ))}
          <button
            type="button"
            class="btn btn-warning mt-10 ml-10"
            onClick={() => {
              setCards([...cards, ""]);
              setCardsUrl([...cardsUrl, ""]);
            }}
          >
            Add more
          </button>
        </h4>

        <div className="col-lg-12 d-flex align-items-center">
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

export default WebsiteImages;
