import { useState } from "react";
import InputSection from "./components/InputSection";
import Results from "./components/Results";

class InputData {
  constructor(label, value = 0) {
    this.label = label;
    this.value = value;
  }

  setValue(value) {
    this.value = value;
    return this;
  }
}

const defaultData = {
  initialInvestment: new InputData("Initial Investment", 15000),
  annualInvestment: new InputData("Annuel Investment", 6000),
  expectedReturn: new InputData("Expected Return", 6),
  duration: new InputData("duration", 10),
};

function App() {
  const [inputData, updateInputData] = useState(defaultData);
  const grouping = [
    ["initialInvestment", "annualInvestment"],
    ["expectedReturn", "duration"],
  ];

  function onInputChangeAction(key, value) {
    console.log(`${key}: ${value}`);

    updateInputData((inputDataState) => {
      return {
        ...inputDataState,
        [key]: inputDataState[key].setValue(value),
      };
    });
  }
  return (
    <>
      <InputSection
        keyGrouping={grouping}
        data={inputData}
        onChangeCallback={onInputChangeAction}
      />

      <Results data={inputData} />
    </>
  );
}

export default App;
