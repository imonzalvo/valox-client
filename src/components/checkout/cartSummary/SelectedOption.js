import tw from "twin.macro";
import { Row, Subtitle, ProductQuantity, Product } from "./index";

export default function ({ title, option }) {
  return (
    <>
      <Row>
        <Subtitle>{title}</Subtitle>
        <Subtitle>Costo</Subtitle>
      </Row>
      <Row>
        <Product>{`${option.name}`}</Product>
        <ProductQuantity>{`$ ${
          !!option.price ? option.price : 0
        }`}</ProductQuantity>
      </Row>
    </>
  );
}
