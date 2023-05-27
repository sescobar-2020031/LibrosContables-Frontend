import { useEffect, useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import './style.scss'

const ButtonUp = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 100) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', () => {
            handleScroll()
        })
    }, []);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            className={`scroll-to-top ${showButton ? 'show' : ''}`}
            onClick={handleClick}
        >
            <BsFillArrowUpCircleFill />
        </button>
    )
}

export default ButtonUp;