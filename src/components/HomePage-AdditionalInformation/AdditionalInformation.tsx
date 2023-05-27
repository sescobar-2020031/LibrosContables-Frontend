import BannerBackground from "../../assets/images/about-background-right.png";
import BannerBackgroundLeft from "../../assets/images/about-background.png";
import './style.scss'
import { MenuData } from './Data'

const AdditionalInformation = () => {
    return (
        <div>{
            MenuData.map((data) => {
                return (
                    data.align === 'left' ?
                        <div className="about-section-container" key={data.litleTitle}>
                            <div className="home-bannerImage-container additional-Information">
                                <img src={BannerBackground} alt="" />
                            </div>
                            <div className="about-section-text-container">
                                <p className="primary-subheading">{data.litleTitle}</p>
                                <h1 className="primary-heading firt-title">
                                    {data.title}
                                </h1>
                                <p className="primary-text text-information">
                                    {data.text1}
                                </p>
                                <p className="primary-text text-information">
                                    {data.text2}
                                </p>
                                <div className="about-buttons-container">
                                    <button className="secondary-button">{data.buttonText}</button>
                                </div>
                            </div>
                            <div className="about-section-image-container">
                                <img src={data.image} alt="" />
                            </div>
                        </div>
                        :
                        <div className="about-section-container" key={data.litleTitle}>
                            <div className="about-background-image-container">
                                <img src={BannerBackgroundLeft} alt="" />
                            </div>
                            <div className="about-section-image-container image-transparent">
                                <img src={data.image} alt="" />
                            </div>
                            <div className="about-section-text-container">
                                <p className="primary-subheading">{data.litleTitle}</p>
                                <h1 className="primary-heading firt-title">
                                    {data.title}
                                </h1>
                                <p className="primary-text text-information">
                                    {data.text1}
                                </p>
                                <p className="primary-text text-information">
                                    {data.text2}
                                </p>
                                <div className="about-buttons-container">
                                    <button className="secondary-button">{data.buttonText}</button>
                                </div>
                            </div>
                            <div className="about-section-image-container aditional-image">
                                <img src={data.image} alt="" />
                            </div>
                        </div>
                )
            })
        }</div>
    )
}

export default AdditionalInformation;