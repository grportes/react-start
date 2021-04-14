import React from "react";
import { useContext } from "react";
import { useState } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

import "./index.css";
import Contexto from "Contexts/carrinho";
import InputQuantidade from "../../../../../Pedido/components/ListaMercadorias/components/InputQuantidade";
import FotoMercadoria from "Components/CustomFotoMercadoria";

import formatBR from "Util/BR/formatBR";

export default () => {
  const { itens, removeProdutoCarrinho } = useContext(Contexto);

  return (
    <TableContainer>
      <Table className="tabela_checkout___main" aria-label="simple table">
        <TableBody>
          {Array.from(itens).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell width="100%">
                <Grid container direction="column">
                  <FotoMercadoria
                    codigoFoto={value.codigoFoto}
                    style={{ width: 110, marginTop: 12}}
                  />
                  <div className="tabela_checkout___descricao">
                    {value.descricaoCompleta}
                  </div>
                  <div className="info-preco">
                    <Typography display="inline" style={{ fontWeight: 600 }}>
                      {formatBR(value.precoVendaSt * value.qtdVendida)}
                    </Typography>
                    <span style={{ marginLeft: 12, marginRight: 12 }}>-</span>
                    <Typography
                      variant="overline"
                      display="inline"
                      style={{ color: "#a9a9a9", lineHeight: "0px" }}
                    >
                      {value.qtdVendida}{" "}
                      {value.qtdVendida > 1 ? "unidades" : "unidade"}
                    </Typography>
                  </div>
                  <div className="div-botoes">
                    <InputQuantidade hideInput={true} merc={value} />
                    <ButtonGroup>
                      <Button
                        color="secondary"
                        onClick={() => {
                          removeProdutoCarrinho(key);
                        }}
                        aria-label="increase"
                      >
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </ButtonGroup>
                  </div>
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
