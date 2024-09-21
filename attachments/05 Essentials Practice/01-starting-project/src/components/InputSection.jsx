import InputField from "./InputField";

export default function InputSection({ keyGrouping, data, onChangeCallback }) {
  return (
    <section id="user-input">
      {keyGrouping.map((keys, index) => {
        return (
          <div key={index} className="input-group">
            {keys
              .map((key) => ({ key: key, input: data[key] }))
              .map(({ key, input }) => (
                <InputField
                  key={key}
                  input={input}
                  onChangeCallback={(event) => {
                    onChangeCallback(key, Number(event.target.value));
                  }}
                />
              ))}
          </div>
        );
      })}
    </section>
  );
}
