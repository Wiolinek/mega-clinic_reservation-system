import { ErrorMessage, useField, FieldHookConfig } from 'formik';


// interface Props {
//     label?: string | undefined;
//     type?: string;
//     name: string;
//     pattern?: string;
//     value?: string | number | readonly string[] | undefined | null;
//     placeholder?: string;
//     required?: boolean;
//     eventHandler?: any;
// }

type Props = FieldHookConfig<string> & {
    label?: string;
    value?: string | number | readonly string[] | undefined;
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
                    // {...props}
                    {...field}
                    type={type}
                    className={`${customClass} ${(meta.touched && meta.error) ? 'error-border' : ''}`}
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