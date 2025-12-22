import { Fragment } from "react";
import ReactDOM from "react-dom";
import "./Offcanvas.css";

const Backdrop = ({ setCartIsShow }) => (
  <div className="backdrop" onClick={() => setCartIsShow(false)} />
);

const OffcanvasOverlay = ({ children }) => {
  return (
    <div className="offcanvas">
      <div className="content">{children}</div>
    </div>
  );
};

const OffCanvas = ({ children, setCartIsShow }) => {
  const portalElement = document.getElementById("overlays");
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop setCartIsShow={setCartIsShow} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <OffcanvasOverlay children={children} />,
        portalElement
      )}
    </Fragment>
  );
};

export default OffCanvas;
