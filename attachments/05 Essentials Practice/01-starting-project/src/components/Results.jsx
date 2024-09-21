import { calculateInvestmentResults, formatter } from "./../util/investment";

export default function Results({ data }) {
  const unwrappedData = {};
  Object.keys(data).forEach((key) => (unwrappedData[key] = data[key].value));

  const annualResults = calculateInvestmentResults(unwrappedData);
  let interestValue = 0;
  return (
    <>
      <table id="result">
        <thead>
          <tr>
            <td>Year</td>
            <td>Investment Value</td>
            <td>Interest (Year)</td>
            <td>Total Interest</td>
            <td>Invested Capital</td>
          </tr>
        </thead>
        <tbody>
          {annualResults.map((result, index) => {
            interestValue += result.interest;

            return (
              <tr key={index}>
                <td>{result.year}</td>
                <td>{formatter.format(result.valueEndOfYear)}</td>
                <td>{formatter.format(interestValue)}</td>
                <td>{formatter.format(result.interest)}</td>
                <td>{formatter.format(unwrappedData.initialInvestment)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* {annualResults.length !== 0 && <p>Please input data in fields.</p>} */}
    </>
  );
}
