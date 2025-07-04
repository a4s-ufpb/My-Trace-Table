import { BsArrowLeftCircleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import "./NavigateButton.css"

function NavigateButton() {
    const navigate = useNavigate();
    return (
        <div className='navigate-btn'>
            <BsArrowLeftCircleFill onClick={() => navigate(-1)} />
        </div>
    )
}

export default NavigateButton