import "./Button.css"

function Button( {text, action} ) {
  return (
    <button onClick={action} className='button'>
        {text}
    </button>
  )
}

export default Button