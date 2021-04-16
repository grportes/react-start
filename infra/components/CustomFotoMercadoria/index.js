import React from "react";
import PropTypes from "prop-types";

import "./index.css";

import isEmpty from "Util/isEmpty";

const Componente = ({
  codigoFoto,
  style,
}) => {
  const codigo = isEmpty(codigoFoto) ? "0.png" : `${codigoFoto}_t.jpg`;

  return (
    <div
      style={{
        width: "150px",
        height: "150px",
        textAlign: "center",
        padding: "5px",
      }}
    >
      <div>
        <div>
          <img
            src={`https://compre.arcom.com.br/imagens/produtos/${codigo}`}
            style={style}            
          />
        </div>
      </div>
    </div>
  );
};

Componente.propType = {
  codigoFoto: PropTypes.number,
  style: PropTypes.object,
};

Componente.defaultProps = {
  codigoFoto: 0,
  style: {},
};

export default Componente;
