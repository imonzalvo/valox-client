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
          !!option.cost ? option.cost : 0
        }`}</ProductQuantity>
      </Row>
    </>
  );
}
