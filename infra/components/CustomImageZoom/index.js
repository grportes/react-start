import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import "./index.css";

const Componente = ({
  imageURL,
  zoomImageURL,
  placement,
  imageSize,
  zoomedImageSize,
  zoomType,
}) => {
  let normalImageRef = useRef();
  let zoomedImageRef = useRef();

  const [zoomIsActive, setZoomIsActive] = useState(false);

  const normalImageStyle = {
    backgroundImage: `url(${imageURL})`,
    backgroundSize: `${imageSize.width}px ${imageSize.height}px`,
    width: `${imageSize.width}px`,
    height: `${imageSize.height}px`,
  };

  const zoomedImageStyle = {
    backgroundImage: `url(${zoomImageURL || imageURL})`,
    backgroundSize:
      zoomType == "click"
        ? `${zoomedImageSize.width}px ${zoomedImageSize.height}px`
        : `${zoomedImageSize.width * 1.5}px ${zoomedImageSize.height * 1.5}px`,
    backgroundRepeat: "no-repeat",
  };

  const normalImageClassName = zoomIsActive
    ? "normalImage-imageZoom zoomOutCursor-imageZoom"
    : "normalImage-imageZoom";

  let zoomedImageClassName = "normalImage-imageZoom box-zoomedImage ";
  placement.map(value => zoomedImageClassName += value + " ");
  
  const openZoom = (e) => {
    if (zoomedImageRef.current) {
      moveLens(e);
    }
    setZoomIsActive(true);
  };

  const closeZoom = () => {
    setZoomIsActive(false);
  };

  const getCursorPos = (e) => {
    let a,
      x = 0,
      y = 0;
    e = e || window.event;

    a = normalImageRef.current.getBoundingClientRect();

    x = e.pageX - a.left;
    y = e.pageY - a.top;

    x = x - window.pageXOffset;
    y = y - window.pageYOffset;

    return { x: x, y: y };
  };

  const moveLens = (e) => {
    const viewArea = zoomedImageRef.current;

    e.preventDefault();

    const { x, y } = getCursorPos(e);

    viewArea.style.backgroundPosition = `-${x}px -${y}px`;
  };

  return (
    <div>
      <div
        className={normalImageClassName}
        style={normalImageStyle}
        ref={normalImageRef}
        onClick={(e) => {
          zoomIsActive ? closeZoom(e) : openZoom(e);
        }}
        onMouseMove={(e) => openZoom(e)}
        onMouseLeave={(e) => closeZoom(e)}
      >
        {zoomIsActive && (
          <div
            className={zoomedImageClassName}
            style={zoomedImageStyle}
            ref={zoomedImageRef}
          ></div>
        )}
      </div>
    </div>
  );
};

Componente.propType = {
  imageURL: PropTypes.string.isRequired,
  zoomImageURL: PropTypes.string.isRequired,
  placement: PropTypes.oneOf([
    "top-left-imageZoom",
    "top-right-imageZoom",
    "bottom-left-imageZoom",
    "bottom-right-imageZoom",
    "center-imageZoom",
  ]).isRequired,
  imageSize: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  zoomedImageSize: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  zoomType: PropTypes.oneOf(["click", "hover"]).isRequired,
};

Componente.defaultProps = {
  zoomImageURL: "",
  placement: "top-right-imageZoom",
  imageSize: {
    width: 300,
    height: 300,
  },
  zoomedImageSize: {
    width: 600,
    height: 600,
  },
  zoomType: "hover",
};

export default Componente;
