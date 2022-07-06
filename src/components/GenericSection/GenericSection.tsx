import '../GenericSection/GenericSection.css';

interface Props {
    children: React.ReactNode;
    customClass?: string;
}

const GenericSection: React.FC<Props> = ({ children, customClass }) => {
    
    
    return (
        <section className={customClass}>
            {children}
        </section>
    )
}

export default GenericSection;