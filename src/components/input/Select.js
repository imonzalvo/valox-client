/* eslint-disable import/no-anonymous-default-export */
import tw from "twin.macro";

const Select = tw.select`border-solid border-gray-300 pl-3 pr-6 py-3 mt-2 hover:border-gray-700 focus:outline-none flex-1`;
const InputContainer = tw.div`flex flex-col w-full mt-1 font-sans`;
const Label = tw.span`font-semibold`;
const ErrorMessage = tw.span`text-red-400 text-sm`;

export default ({
  name,
  label,
  placeholder,
  register,
  errors,
  inputOptions,
  options
}) => (
  <InputContainer>
    <Label>{label}</Label>
    <Select
      style={{ borderWidth: 1 }}
      placeholder={placeholder}
      {...register(name, inputOptions)}
    >
      {options.map((option) => (
        <option value={option} key={option}>{option}</option>
      ))}
    </Select>
    {errors && errors.type == "required" && (
      <ErrorMessage>This field is required</ErrorMessage>
    )}
    {errors && errors.type == "pattern" && (
      <ErrorMessage>This field is invalid</ErrorMessage>
    )}
  </InputContainer>
);
