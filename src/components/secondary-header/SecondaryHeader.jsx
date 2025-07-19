import "./SecondaryHeader.css";
import NavigateButton from '../navigateButton/NavigateButton';

export default function SecondaryHeader({ showBackButton, title, rightText }) {
    return (
        <div className="secondary-header">
            <div className="left">
                {showBackButton ? <NavigateButton /> : null}
            </div>
            <h2>{title}</h2>
            <div className="right">
                {rightText ? <p>{rightText}</p> : null}
            </div>
        </div>
    );
}