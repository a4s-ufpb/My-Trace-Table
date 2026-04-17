import "./Button.css"

function Button({ text, action, className = "" }) {
  return (
    <button onClick={action} className={`button ${className}`.trim()}>
        {text}
    </button>
  )
}

export default Button
