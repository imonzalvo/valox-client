import tw from "twin.macro";
import ClipLoader from "react-spinners/ClipLoader";

const Container = tw.div`mt-12 flex justify-between sm:py-12
md:flex-row
max-w-screen-xl flex flex-1 flex-col my-0  small:mb-12`;

export default function Loader({ isLoading }) {
  return (
    <Container style={{ justifyContent: "center" }}>
      <ClipLoader
        loading={isLoading}
        size={350}
        color={"#aaa"}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Container>
  );
}
