import { useState } from "react";
import InputSection from "./components/InputSection";

class InputData {
  constructor(label) {
    this.label = label;
    this.value = "";
  }
}

const defaultData = {
  initInvestment: new InputData("Initial Investment"),
  annualInvestment: new InputData("Annuel Investment"),
  expectedReturn: new InputData("Expected Return"),
  duration: new InputData("duration"),
};

function App() {
  const [inputData, updateInputData] = useState(defaultData);
  const grouping = [
    ["initInvestment", "annualInvestment"],
    ["expectedReturn", "duration"],
  ];

  function onInputChangeAction(key, value) {
    console.log(`${key}: ${value}`);

    updateInputData(() => {
      const inputDataState = inputData;
      inputDataState[key].value = value;
      return inputDataState;
    });
  }
  return (
    <InputSection
      keyGrouping={grouping}
      data={inputData}
      onChangeCallback={onInputChangeAction}
    />
  );
}

export default App;
