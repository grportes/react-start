import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {useContext} from 'react';
import {useRef} from 'react';
import {useHistory} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Autosuggest from 'react-autosuggest'
import lodash from 'lodash';

import './index.css';
import ClienteContext from 'Contexts/cliente';
import CarrinhoContext from 'Contexts/carrinho';
import isEmpty from 'Util/isEmpty';

export default function Componente() {

    const {cliente} = useContext(ClienteContext);
    const {
        dadosAutocomplete,
        setDadosAutocomplete,
        autoCompleteMercadorias,
        pesquisarMercadoriaPorDescricao
    } = useContext(CarrinhoContext);
    const [value, setValue] = useState("");
    const [pesquisa, setPesquisa] = useState("");
    const history = useHistory();
    const iptRef = useRef(null);
    const debounceSearch = useRef(
        lodash.debounce(value => {
            if(value) {
                autoCompleteMercadorias(value.pesquisa, value.cliente);
            }
        }, 150)
    );

    useEffect(() => {
        if( pesquisa ) {
            debounceSearch.current({pesquisa:pesquisa, cliente:cliente});
        }
    },[pesquisa]);

    const onSuggestionSelected = (event, { suggestion, suggestionValue, index, method }) => {
        event.preventDefault();
        setValue("");
        pesquisarMercadoriaPorDescricao(suggestionValue);
        if (history.location === '/pedido') return;
        history.push('/pedido');
    };

    const pesquisaMercadoria = (e) => {
        e.preventDefault();
        const descricao = iptRef.current.input.value;
        setValue('');
        if (isEmpty(descricao)) return;
        pesquisarMercadoriaPorDescricao(descricao);
        if (history.location === '/pedido') return;
        history.push('/pedido');
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setPesquisa(value);
    };

    const onChange = (event, {newValue,method}) => setValue(newValue);

    return (
      <form className="root" onSubmit={pesquisaMercadoria}>
            <div className='pesquisa-menu-container'>
                <Autosuggest
                    suggestions={dadosAutocomplete}
                    onSuggestionsClearRequested={() => setDadosAutocomplete([])}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    getSuggestionValue={menu => menu.key}
                    renderSuggestion={menu => (<div>{`${menu.key}`}</div>)}
                    onSuggestionSelected={onSuggestionSelected}
                    ref={iptRef}
                    inputProps={{
                        placeholder: 'Pesquisar mercadorias',
                        value,
                        onChange:onChange
                    }}/>
                <IconButton type="submit" className="icon-button" aria-label="search">
                    <SearchIcon />
                </IconButton>
            </div>
      </form>
  );
}
