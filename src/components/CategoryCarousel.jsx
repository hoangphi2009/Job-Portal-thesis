import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Front-End Developer",
  "Back-End Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0); // state to track current item
  const [isHovered, setIsHovered] = useState(false); // state to track hover status

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  useEffect(() => {
    if (isHovered) return; // Do not move the carousel if hovered

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % category.length);
    }, 3000); // Move every 4 seconds

    return () => clearInterval(interval); // Clear interval when component unmounts
  }, [isHovered]); // Re-run the effect whenever the hover status changes

  return (
    <div>
      <Carousel
        className="w-full max-w-xl mx-auto my-10"
        onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
        onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
      >
        <CarouselContent
          className="flex gap-0 justify-start transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / 3}%)`, // Move carousel items in chunks of 3 items at once
          }}
        >
          {category.map((cat, index) => (
            <CarouselItem key={index} className="flex-none w-1/3">
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full bg-red-300 hover:bg-green-300 "
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
