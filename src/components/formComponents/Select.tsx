import { Field, ErrorMessage, useField, FieldHookConfig } from 'formik';


type Props = FieldHookConfig<string> & {
    label?: string;
    value?: string;
    example?: string;
    eventHandler?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options?: React.ReactNode[] | boolean | undefined | null;
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