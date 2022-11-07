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
    value?: string;
    readOnly?: boolean;
    required: boolean;
    eventHandler?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options?: React.ReactNode[] | boolean | null;
}


const FormFieldControler: React.FC<Props> = ({ as, ...props }) => {
    
  
  switch(as) {
        case 'input':
            return <InputComp {...props}/>
        case 'select':
            return <Select {...props}/>
        default: return null
  }
}

export default FormFieldControler;