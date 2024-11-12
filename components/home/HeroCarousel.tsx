import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import img1 from "@/public/img1.jpeg";
import img2 from "@/public/img2.jpeg";
import img3 from "@/public/img3.jpeg";
import img4 from "@/public/img4.jpeg";
const slides = [img1, img2, img3, img4];

function HeroCarusel() {
  return (
    <div className="lg:block  size-11/12 mx-auto h-auto">
      <Carousel>
        <CarouselContent>
          {slides.map((slide, index) => {
            return (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="p-2">
                    <Image
                      src={slide}
                      alt="slide"
                      className="w-full object-cover h-[24rem] rounded-md"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default HeroCarusel;
