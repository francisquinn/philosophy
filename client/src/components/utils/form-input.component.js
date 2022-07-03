const FormInput = (props) => {
  const { placeholder, name, type, defaultValue } = props;
  return (
    <div className="form-item">
      <input type={ type } className="form-input" placeholder={ placeholder } name={ name } defaultValue={ defaultValue } />
    </div>
  );
};

export default FormInput;
