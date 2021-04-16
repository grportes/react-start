import React from "react";
import PropTypes from "prop-types";

import ClearIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import "./index.css";

import ImageZoom from "../CustomImageZoom";

import isEmpty from "Util/isEmpty";
import formatBR from "Util/BR/formatBR";
import unidadeMedida from "Util/unidadeMedida";

const Componente = ({
  mercadoriaSelecionada,
  openImagemDialog,
  setOpenImagemDialog,
}) => {
  let codigo;
  if (mercadoriaSelecionada != null) {
    codigo = isEmpty(mercadoriaSelecionada.codigoFoto)
      ? "0.png"
      : `${mercadoriaSelecionada.codigoFoto}_t.jpg`;
  }

  const handleCloseImagemDialog = () => {
    setOpenImagemDialog(false);
  };

  return (
    <Dialog
      onClose={() => handleCloseImagemDialog()}
      open={openImagemDialog}
      maxWidth={"md"}
    >
      <div className="container-imagemDialog">
        <div className="box-buttonClose-imagemDialog">
          <Button onClick={() => handleCloseImagemDialog()}>
            <ClearIcon />
          </Button>
        </div>
        <div className="box-img-descr-imagemDialog">
          <div className="box-img-imagemDialog">
            <ImageZoom
              imageURL={`https://compre.arcom.com.br/imagens/produtos/${codigo}`}
              imageSize={{width: "400",height: "400"}}
              zoomedImageSize={{width: "600",height: "600"}}
              zoomType={"click"}
              placement={["top-right-imageZoom"]}
            />
          </div>
          {mercadoriaSelecionada != null && (
            <div className="box-descr-imagemDialog">
              <div className="box-descr-imagemDialog-descr">{mercadoriaSelecionada.descricaoCompleta}</div>
              <div className="box-descr-imagemDialog-preco">
                {formatBR(mercadoriaSelecionada.precoVenda)}
              </div>
              <div className="box-descr-imagemDialog-precounit">
                <div>
                  PREÇO UNITÁRIO: {formatBR(mercadoriaSelecionada.precoUnitario)}
                </div>
                <div>
                  {unidadeMedida(mercadoriaSelecionada.unidadeVenda)} COM{" "} {mercadoriaSelecionada.embLista}
                </div>
                <div style={{marginTop: '10px'}}>
                  COD. {mercadoriaSelecionada.idMercadoria}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};

Componente.propType = {
  mercadoriaSelecionada: PropTypes.object,
  openImagemDialog: PropTypes.string,
  setOpenImagemDialog: PropTypes.func,
};

Componente.defaultProps = {
  mercadoriaSelecionada: {},
  openImagemDialog: false,
  setOpenImagemDialog: () => {},
};

export default Componente;
