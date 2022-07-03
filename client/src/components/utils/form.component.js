import { useSelector, useDispatch } from "react-redux";
import { addFormInput } from "../../slices/form.slice";
import useDispatchHandler from "../../hooks/useDispatchHandler";

const Form = (props) => {
    const form = useSelector((state) => state.form);
    const { children, action, config } = props;
    const dispatch = useDispatch();
    const { handle, isLoading, error, response } = useDispatchHandler();

    const formSubmit = (event) => {
        event.preventDefault();
        handle(action({ inputs: form.inputs}), config)
    };

    const formChange = (event) => {
      dispatch(addFormInput({ 
        name: event.target.name, 
        value: event.target.value 
      }));
    };

    return (
      <>
        <form className="form-container" onSubmit={ formSubmit } onChange={ formChange }>
          { children }
        </form>
        { isLoading && <h1>loading...</h1> }
        { error && <h1>{ error }</h1>}
        { response && <p>{ response.message }</p>}
      </>
    );
  };
  
  export default Form;
  