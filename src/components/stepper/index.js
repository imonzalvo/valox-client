import Step from "./step";

export default function Stepper({ step }) {
  return (
    <ul className="relative m-0 flex list-none justify-between overflow-hidden p-0 transition-[height] duration-200 ease-in-out">
      <Step
        number={1}
        title={"Datos de facturación"}
        description={"Datos de facturación"}
        selected={step === 1}
      />
      <Step
        number={2}
        title={"Pago"}
        description={"Pago"}
        selected={step === 2}
      />
      <Step
        number={3}
        title={"Resumen de compra"}
        description={"Resumen de compra"}
        selected={step === 3}
      />
    </ul>
  );
}
