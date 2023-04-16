import React from "react";
import tw from "twin.macro";

const Container = tw.div`flex items-center`;
const ButtonMinus = tw.button`w-10 h-10 text-xl
  md:w-8 md:h-8 md:text-sm 
  cursor-pointer text-center border pb-.5
  text-black
  hover:bg-gray-900 hover:text-white
  focus:outline-none`;
const ButtonPlus = tw.button`w-10 h-10 text-2xl
  md:w-8 md:h-8 md:text-sm
  cursor-pointer text-center border pb-.5
  text-black
  hover:bg-gray-900 hover:text-white
  focus:outline-none`;

const NumberOfItems = tw.p`w-10 h-10 pt-2 text-base
md:w-8 md:h-8 md:pt-2 md:text-xs
text-black
m-0 border-t border-b text-center`;

const Quantity = tw.div`pr-2 text-base text-black font-semibold`;

export default function QuantityPicker({
  increment,
  decrement,
  numberOfitems,
  hideQuantityLabel,
}) {
  return (
    <Container>
      {!hideQuantityLabel && <Quantity>Cantidad</Quantity>}
      <ButtonPlus onClick={decrement}>-</ButtonPlus>
      <NumberOfItems>{numberOfitems}</NumberOfItems>
      <ButtonMinus onClick={increment}>+</ButtonMinus>
      
    </Container>
  );
}
