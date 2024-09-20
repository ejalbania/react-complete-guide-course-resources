export default function InputField({ input, onChangeCallback }) {
  return (
    <>
      <p>
        <label>{input.label}</label>
      </p>
      <p>
        <input
          type="number"
          required
          defaultValue={input.value}
          onChange={onChangeCallback}
        />
      </p>
    </>
  );
}
