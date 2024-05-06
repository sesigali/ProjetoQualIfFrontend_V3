import '../Button/button.css'

export default function Button({ Text, onClick, Type = "button" }) {

  
  return (

    <button className='btn-component' type={Type} onClick={onClick} >
      {Text}
      
    </button>

  )
}


