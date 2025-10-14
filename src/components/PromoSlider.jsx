import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const PromoSlider = ({ images, imageClassName }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    // <Slider {...settings}>
    //   {images.map((image) => (
    //     <img src={image} alt="promo-image" />
    //   ))}
    // </Slider>
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`promo slide ${index + 1}`} className={imageClassName}/>
          </div>
      ))}
    </Slider>
  );
};
