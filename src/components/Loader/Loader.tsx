import './Loader.css'

interface Props {
  message: string;
}


const Loader:React.FC<Props> = ({ message }) => {

  
  return (
    <div className='loader login__section'>
      <h2>{message}</h2>
    </div>
  )
}

export default Loader;