import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import './styled.css';
import Contexto from 'Contexts/carrinho';
import isEmpty from 'Util/isEmpty';
import SubCategoria from '../FiltraSubCategoriaMercadoria';

const useCategorias = () => {

    const {
        idCategoriaSelecionada,
        setIdCategoriaSelecionada,
        categorias,
        listaMercadoria,
        pesquisarMercadoriaPorIdCategoria
    } = useContext(Contexto);

    const [lista, setLista] = useState([]);
    const [exibirSubCategoria, setExibirSubCategoria] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (isEmpty(categorias)) return;
        setLista(categorias);
    },[categorias]);

    const alterarCategoria = (event, idCatSel) => {
        if (idCatSel === 0) {
            setExibirSubCategoria(null);
        } else {
            const categoriaSelecionada = lista.find(categoria => categoria.id === idCatSel);
            if (categoriaSelecionada) setExibirSubCategoria(event.target);
        }
        setIdCategoriaSelecionada(idCatSel);
        if (history.location === '/pedido') return;
        history.push('/pedido');
    };

    const reloadCategoria = idCatSel => {
        // Esse método tem como finalidade fazer o reload da categoria em caso de uma consulta por descrição.
        const {query} = listaMercadoria || {};
        if (query.hasOwnProperty('descricaoMercadoria')) {
            pesquisarMercadoriaPorIdCategoria(idCatSel);
        }
    };

    return {
        lista,
        idCategoriaSelecionada,
        alterarCategoria,
        reloadCategoria,
        exibirSubCategoria,
        setExibirSubCategoria
    };
};

const Componente = props => {

    const {
        lista,
        idCategoriaSelecionada,
        alterarCategoria,
        reloadCategoria,
        exibirSubCategoria,
        setExibirSubCategoria
    } = useCategorias();

    return (
        <div className="nav_bar_categorias_tabs">
            <Tabs
                variant='scrollable'
                scrollButtons='on'
                value={idCategoriaSelecionada}
                onChange={alterarCategoria}
            >
                {
                    lista.map(c =>
                        <Tab
                            className="barra_nav_categoria___tab"
                            key={c.id}
                            value={c.id}
                            label={c.descricao}
                            onClick={() => reloadCategoria(c.id)}
                        />)
                }
            </Tabs>
            {/*<SubCategoria*/}
            {/*    elementoAncora={exibirSubCategoria}*/}
            {/*    onClose={() => setExibirSubCategoria(false)}*/}
            {/*/>*/}
        </div>
    );
};

export default Componente;