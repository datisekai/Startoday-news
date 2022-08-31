import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import WidthLayout from "../layouts/WidthLayout";
import { Box } from "@mui/material";

const images = [
  "/images/onthi.jpg",
  "/images/docsach.jpg",
  "/images/wb.jpg",
  "/images/sg.jpg",
];

const Slider = () => {
  return (
    <Box mt={2}>
      <WidthLayout>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {images.map((item: string) => (
            <SwiperSlide key={item}>
              <LazyLoadImage
                alt={"Logo"}
                height={"100%"}
                src={item} // use normal <img> attributes as props
                width={"100%"}
                style={{
                  aspectRatio: "980/180",
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </WidthLayout>
    </Box>
  );
};

export default Slider;
