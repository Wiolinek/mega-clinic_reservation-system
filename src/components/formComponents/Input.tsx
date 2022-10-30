import { ErrorMessage, useField, FieldHookConfig } from 'formik';


type Props = FieldHookConfig<string> & {
    label?: string;
    value?: string | number | readonly string[];
    example?: string;
    type?: string;
    customClass?: string;
    readOnly?: boolean;
};


const InputComp: React.FC<Props> = (props) => {
    const [field, meta] = useField<any>(props)
    const { label, name, example, type, customClass, readOnly } = props;
  

    return (
        <>
            <label>{label}
                <input
                    {...field}
                    type={type}
                    className={`${customClass || ''} ${(meta.touched && meta.error) ? 'error-border' : ''}`}
                    readOnly={readOnly}
                >   
                </input>
                <span>{example}</span>
            </label>
            <ErrorMessage
                name={name}
                component='p'
                className='error-msg'
            />
        </>
    );
  }
  
  export default InputComp;