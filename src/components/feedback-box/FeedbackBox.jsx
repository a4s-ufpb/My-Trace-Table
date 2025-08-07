import "./FeedbackBox.css"

function FeedbackBox({ title }) {

  const renderTextWithColor = (text) => {
    const words = text.split(" ");
    return words.map((word, index) => {
      if (word.toLowerCase().includes("acertou")) return <span key={index} className="green">{word} </span>;
      else if (word.toLowerCase().includes("tipo")) return <span key={index} className="yellow">{word} </span>;
      else if (word.toLowerCase().includes("valor")) return <span key={index} className="red">{word} </span>;

      return <span key={index}>{word} </span>;
    });
  };

  return (
    <div className={`feedback-box`}>
      <p>
        {renderTextWithColor(title)}
      </p>
    </div>
  )
}

export default FeedbackBox