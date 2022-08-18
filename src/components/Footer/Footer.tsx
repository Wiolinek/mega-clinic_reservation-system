import './Footer.css';


const Footer: React.FC = () => {

    const year: number = new Date().getFullYear()
    
    return (
        <footer>
            <div>
                <p>{`Copyright \u00A9 ${year} Wiola Polok www.u-v.codes. All Rights Reserved`}</p>
            </div>
        </footer>
    )
}

export default Footer;