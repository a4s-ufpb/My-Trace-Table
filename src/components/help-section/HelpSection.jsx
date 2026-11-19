import "./HelpSection.css";

function HelpSection({ sectionId, title, text, images }) {

    const imagesArray = Array.isArray(images) ? images : images ? [images] : [];

    return (
        <div className="content">
            <section id={sectionId} className="helpSection">
                <h3>{title}</h3>
                <div className="textContent">
                    {text}
                </div>
                {imagesArray.length > 0 && (
                    <div className="imagesContainer">
                        {imagesArray.map((img, index) => (
                            <img key={index} src={img.src} alt={img.alt || `Imagem ${index + 1}`} className="image" />
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default HelpSection;