import { Fragment } from 'react'
import './style.scss'
import { MenuData } from './Data'

const Members = () => {
    return (
        <Fragment>
            {
                MenuData.map((data) => {
                    return (
                        data.align === 'left' ?
                            <div className="information-section-container" key={data.nombre}>
                                <div className="information-section-text-container text-left">
                                    <p className="primary-subheading">{data.description}</p>
                                    <p className="primary-text text-information">
                                        {data.nombre} {data.apellido}
                                    </p>
                                </div>
                                <div className="information-section-image-container">
                                    <img className='about-image' src={data.image} alt="" />
                                </div>
                            </div>
                            :
                            <div className="information-section-container" key={data.nombre}>
                                <div className="information-section-image-container image-transparent image-left">
                                    <img className='about-image' src={data.image} alt="" />
                                </div>
                                <div className="information-section-text-container text-right">
                                    <p className="primary-subheading">{data.description}</p>
                                    <p className="primary-text text-information">
                                        {data.nombre} {data.apellido}
                                    </p>
                                </div>
                                <div className="information-section-image-container aditional-image">
                                    <img className='about-image' src={data.image} alt="" />
                                </div>
                            </div>
                    )
                })
            }
        </Fragment>
    )
}

export default Members