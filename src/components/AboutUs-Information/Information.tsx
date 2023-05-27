import { Fragment, useState } from 'react'
import './style.scss'

const Information = () => {
    const [toggleTab, SetToggleTab] = useState(1);
    const toggleState = (index: number) => {
        SetToggleTab(index)
    }
    return (
        <Fragment>
            <section className="about">
                <div className="row">
                    <div className="column">
                        <div className="about-img">

                        </div>
                    </div>
                    <div className="column">
                        <div className="tabs">
                            <div className={toggleTab === 1 ? "single-tab active-tab" : "single-tab"}
                                onClick={() => toggleState(1)}
                            >
                                <h2>Historia</h2>
                            </div>
                            <div className={toggleTab === 2 ? "single-tab active-tab" : "single-tab"}
                                onClick={() => toggleState(2)}>
                                <h2>Mision y Vision</h2>
                            </div>
                            <div className={toggleTab === 3 ? "single-tab active-tab" : "single-tab"}
                                onClick={() => toggleState(3)}>
                                <h2>Experiencia</h2>
                            </div>
                        </div>
                        <div className="tab-context">
                            <div className={toggleTab === 1 ? "content active-content" : "content"}>
                                <h2>Nuestra Historia</h2>
                                <p>Bookify fue fundada por un grupo de estudiantes universitarios con una pasión por la innovación en el mundo del software. Nuestra misión es revolucionar la forma en que las empresas llevan sus libros contables, ofreciendo una solución fácil de usar y eficiente.</p>
                                <h3>Futuro</h3>
                                <p> Nuestros servicios están diseñados para ayudarte a llevar un mejor control de tus finanzas y a tomar decisiones informadas. En Bookify, estamos orgullosos de nuestra historia y emocionados por lo que el futuro nos depara!</p>
                            </div>
                            <div className={toggleTab === 2 ? "content active-content" : "content"}>
                                <h2>Misión</h2>
                                <p>Nuestra misión es simplificar la contabilidad para empresas de todos los tamaños, ofreciendo una solución fácil de usar y eficiente para generar libros contables. Obteniendo las siguientes ventajas:</p>
                                <div className="sill-row">
                                    <div className="skill-column">
                                        <div className="progress-wrap">
                                            <h3>Optimización de tiempo</h3>
                                            <div className="progress">
                                                <div className="progress-bar">
                                                    <span>80%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="skills-column">
                                        <div className="progress-wrap">
                                            <h3>Resultados mas exactos</h3>
                                            <div className="progress">
                                                <div className="progress-bar Designer">
                                                    <span>90%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <h2>Vision</h2>
                                <p>Nuestra visión es convertirnos en líderes en el mercado de software contable, ofreciendo soluciones innovadoras y personalizadas para satisfacer las necesidades de nuestros clientes.</p>
                            </div>
                            <div className={toggleTab === 3 ? "content active-content" : "content"}>
                                <div className="exp-column">
                                    <h3>Experiencia</h3>
                                    <span>08/05/2023</span>
                                    <p>Esta fecha marca el inicio del desarrollo de nuestra aplicación. Fue un día emocionante para nuestro equipo, ya que comenzamos a trabajar en una herramienta que sabíamos que tendría un impacto positivo en la forma en que las empresas llevan sus libros contables.</p>
                                </div>
                                <div className="exp-column">
                                    <span>26/05/2023</span>
                                    <p>Esta fecha marca el final del desarrollo de nuestra aplicación. Después de meses de arduo trabajo, finalmente completamos nuestra herramienta y la pusimos a disposición de nuestros clientes. Fue un momento de gran satisfacción para nuestro equipo, ya que vimos cómo nuestro esfuerzo y dedicación dieron frutos.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Information