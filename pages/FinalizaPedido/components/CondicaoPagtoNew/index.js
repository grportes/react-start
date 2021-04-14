import React from 'react';
import {useEffect} from 'react';
import {useContext} from 'react';
import {memo} from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';

import ClienteContext from 'Contexts/cliente';
import LoadingContext from 'Contexts/loading';
import MessageContext from 'Contexts/message';

const Componente = () => {
  const {setLoading} = useContext(LoadingContext);
  const {msgErro} = useContext(MessageContext);
  const {
    cliente,
    carregarCondVendas,
    setCondVenda
  } = useContext(ClienteContext);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await carregarCondVendas();
      } catch (e) {
        msgErro(e);
      } finally {
        setLoading(false);
      }
    })();
  },[cliente.idGeracao]);

  const { idClientePrazo, prazos = [] } = cliente || {};

  return (
    <NativeSelect
      style={{width: "100%"}}
      value={idClientePrazo}
      onChange={({target}) => {
        const {value} = target;
        setCondVenda(value);
      }}
    >
      {
        prazos.map(({ id, descricaoCompleta }) =>
          <option
            key={id}
            value={id}
          >
            { descricaoCompleta }
          </option>
        )
      }
    </NativeSelect>
  );
};

export default memo(Componente);