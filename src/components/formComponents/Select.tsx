import { Field, ErrorMessage, useField, FieldHookConfig } from 'formik';


// interface Props {
//     label?: string;
//     name: string;
//     example?: string;
//     value?: string | number | readonly string[] | undefined | null;
//     required?: boolean;
//     eventHandler?: any;
//     options?: React.ReactNode[] | null | undefined;
// }

type Props = FieldHookConfig<string> & {
    label?: string;
    value?: string | number | readonly string[] | undefined;
    example?: string;
    eventHandler?: any;
    options?: React.ReactNode[] | null | undefined;
};


const Select: React.FC<Props> = (props) => {
    const defaultValue = '---';
    const [field, meta] = useField<any>(props)
    const { label, name, example, value, options, eventHandler } = props;
  

    return (
        <>
            <label>{label}
                <Field
                    as='select'
                    // {...props}
                    // {...field}
                    name={name}
                    value={value}
                    onChange={eventHandler}
                    className={(meta.touched && meta.error) ? 'error-border' : ''}
                >   
                    <option key={defaultValue} value='' label={defaultValue}>{defaultValue}</option>
                    {options}
                </Field>
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
  
  export default Select;