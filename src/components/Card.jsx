import React from "react";
import { CardBody, CardContainer, CardItem } from "./UI/3dCard";

const ThreeDCardDemo = () => {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-primary  border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-5 sm:p-10 xs:p-10 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white text-center justify-center "
        >
          Seacrh the best For You
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-0 dark:text-neutral-300"
        >
          
        </CardItem>
        <CardItem translateZ="100" className="w-full sm:max-w-xl">
          <img
            src="/src/assets/hero.png"
            alt="thumbnail"
            className="lg:max-h-60 w-full sm:max-h-30 object-cover rounded-xl group-hover/card:shadow-xl"
          />
        </CardItem>
        
      </CardBody>
    </CardContainer>
  );
};

export default ThreeDCardDemo;