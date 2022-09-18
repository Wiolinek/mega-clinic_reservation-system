import InputComp from './Input';
import Select from './Select';

interface Props {
    as: string;
    label?: string;
    type?: string;
    name: string;
    pattern?: string;
    example?: string;
    customClass?: string;
    value?: string | number | readonly string[] | undefined;
    readOnly?: boolean;
    required: boolean;
    onChange?: any;
    eventHandler?: any;
    options?: React.ReactNode[] | null | undefined;
    helperComp?: any;
}

const FormFieldControler: React.FC<Props> = ({as, ...props}) => {
    
  
  switch(as) {
        case 'input':
            return <InputComp {...props}/>
        case 'select':
            return <Select {...props}/>
        default: return null
  }
}

export default FormFieldControler;