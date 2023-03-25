import Stepper from "../stepper";

export default function CheckoutLayout({ step, children }) {
  return (
    <>
      {/* <div className="w-90 mx-12">
        <Stepper step={step} />
      </div> */}
      {children}
    </>
  );
}
