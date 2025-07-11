import { useEffect, useState } from "react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const sliderData = [
  {
    id: 1,
    avatar: "/images/avatar-kate.png",
    name: "Kate Harmon",
    review:
      "I rented a guitar from this service and it was fantastic! Great customer support and top-quality instruments.",
  },
  {
    id: 2,
    avatar: "/images/avatar-tony.png",
    name: "Tony Tempo",
    review:
      "As a beginner, I found the instrument rental process straightforward and the rental fees reasonable. Highly recommended!",
  },
  {
    id: 3,
    avatar: "/images/avatar-linda.png",
    name: "Linda Fuerd",
    review:
      "I've been renting instruments from this service for years now, and they never disappoint. The instruments are always well-maintained and ready to play.",
  },
  {
    id: 4,
    avatar: "/images/avatar-edd.png",
    name: "Edd Crein",
    review:
      "Excellent service! The team was very helpful in assisting me in selecting the right instrument for my needs. Will definitely rent from them again.",
  },
];

const Slider = () => {
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 992) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="slider-section">
      <h2>What they've said</h2>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={slidesPerView}
        className="slider"
      >
        {sliderData.map((user) => {
          return (
            <SwiperSlide key={user.id}>
              <img src={user.avatar} alt="" />

              <div className="slider-content">
                <h3>{user.name}</h3>
                <p>{user.review}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Slider;
