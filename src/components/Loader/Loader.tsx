import './Loader.scss'

interface Props {
  message: string;
}


const Loader:React.FC<Props> = ({ message }) => {

  
  return (
    <div className='loader'>
      <h3>{message}</h3>
    </div>
  )
}

export default Loader;