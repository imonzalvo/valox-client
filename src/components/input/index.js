import tw from "twin.macro";

const Input = tw.input`border-solid border-gray-300 pl-3 pr-6 py-3 mt-2 hover:border-gray-700 focus:outline-none flex-1`;
const LargeInput = tw.textarea`border-solid border-gray-300 pl-3 pr-6 py-3 mt-2 hover:border-gray-700 focus:outline-none flex-1`;
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
  type,
  isLargeInput
}) => (
  <InputContainer>
    <Label>{label}</Label>
    {isLargeInput ? (
      <LargeInput
        style={{ borderWidth: 1 }}
        placeholder={placeholder}
        {...register(name, inputOptions)}
        rows={3}
      />
    ) : (
      <Input
        type={type ? type : "dropdown"}
        style={{ borderWidth: 1 }}
        placeholder={placeholder}
        {...register(name, inputOptions)}
      />
    )}
    {errors && errors.type == "required" && (
      <ErrorMessage>This field is required</ErrorMessage>
    )}
    {errors && errors.type == "pattern" && (
      <ErrorMessage>This field is invalid</ErrorMessage>
    )}
  </InputContainer>
);
