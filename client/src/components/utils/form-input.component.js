const FormInput = (props) => {
  const { placeholder, name, type } = props;
  return (
    <div className="form-item">
      <input type={ type } className="form-input" placeholder={ placeholder } name={ name } />
    </div>
  );
};

export default FormInput;
