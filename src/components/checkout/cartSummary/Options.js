import tw from "twin.macro";
import { Row, Subtitle } from "./index";

const OptionsContainer = tw.div`flex flex-col`;
const Option = tw.div` cursor-pointer flex flex-row mt-4 justify-between`;
const OptionInfo = tw.div`pr-4`;
const OptionTitle = tw.span`font-sans font-bold`;
const OptionDescription = tw.span`font-sans mr-2 text-sm`;
const Input = tw.input`mr-4 cursor-pointer`;
const ErrorMessage = tw.span`mt-2 ml-4 text-red-600`;

export default function ({
  optionsTitle,
  options,
  selectedOption,
  selectOption,
  error,
}) {
  return (
    <Row>
      <OptionsContainer>
        <Subtitle>{optionsTitle}</Subtitle>
        {options.map((option) => {
          const optionPrice = option && !!option.price ? option.price : 0;

          return (
            <Option onClick={() => selectOption(option.id)} key={option.id}>
              <OptionInfo>
                <Input
                  type={"radio"}
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={(event) => selectOption(event.target.value)}
                ></Input>
                <OptionDescription>
                  <OptionTitle>{option.name}</OptionTitle>
                  {" - "}
                  {option.description}
                </OptionDescription>
              </OptionInfo>
              <span style={{ flex: "none" }}>{`$ ${optionPrice}`}</span>
            </Option>
          );
        })}
        {!!error && <ErrorMessage>{error}</ErrorMessage>}
      </OptionsContainer>
    </Row>
  );
}
