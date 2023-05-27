import React, { ReactNode } from "react";
import "./styles.scss";
import close from "~/assets/icons/close.png";
import ReactDOM from "react-dom";
import FadeIn from "react-fade-in";

interface IModal {
  width?: number;
  minHeight?: number;
  maxHeight?: number;
  children: ReactNode;
  imageSRC?: string;
  show: boolean;
  closeModal: () => void;
  style?: React.CSSProperties;
  className?: string;
}
const Modal = ({
  width,
  minHeight,
  maxHeight,
  children,
  imageSRC,
  show,
  closeModal,
  style,
  className,
}: IModal) => {
  return (
    <>
      {show
        ? ReactDOM.createPortal(
            <div className="overlay" onClick={closeModal}>
              <FadeIn>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={`modal__container ${className}`}
                  style={{
                    width: width || "500px",
                    minHeight: minHeight || "344px",
                    maxHeight: maxHeight || "100%",
                    backgroundColor: "#fff",
                    borderRadius: "1.3rem",
                    position: "relative",
                    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.69)",
                    WebkitBoxShadow: "0px 0px 5px -1px rgba(0,0,0,0.69)",
                    MozBoxShadow: "0px 0px 5px -1px rgba(0,0,0,0.69)",
                    padding: "1.3rem",
                    display: "flex",
                    flexDirection: "column",
                    margin: '0 auto',
                    ...style,
                  }}
                >
                  <i className="modal__close-button" onClick={closeModal}>
                    {imageSRC ? (
                      <img
                        src={imageSRC}
                        alt="Botón de cerrar"
                        className="modal__close-button-image"
                      />
                    ) : (
                      <img
                        src={close}
                        alt="Boton de cerrar"
                        className="modal__close-button-image"
                      />
                    )}
                  </i>
                  {children}
                </div>
              </FadeIn>
            </div>,
            document.getElementById("Modal")!
          )
        : null}
    </>
  );
};

export default Modal;
