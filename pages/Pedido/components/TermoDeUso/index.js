import React from 'react';
import {useState} from "react";
import {useContext} from "react";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import green from "@material-ui/core/colors/green";
import Checkbox from "@material-ui/core/Checkbox";

import ClienteContext from "../../../../contexts/cliente";
import useStyles from './styles';
import Typography from "@material-ui/core/Typography";
import LoadingContext from "../../../../contexts/loading";
import MessageContext from "../../../../contexts/message";
import EmailMarketing from './components/EmailMarketing';
import {Api} from 'Services/api';
import isEmpty from "../../../../infra/util/isEmpty";

const service = Api.Cliente;

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


const Componente = (
    {
        exibir
    }
) => {

    const classes = useStyles();

    const {cliente, setTermosDeUso} = useContext(ClienteContext);
    const {setLoading} = useContext(LoadingContext);
    const {msgErro} = useContext(MessageContext);
    const [aceitaTermos, setAceitaTermos] = useState(false);
    const [exibirDialogEmail, setExibirDialogEmail] = useState(false);
    const [emailMarketing, setEmailMarketing] = useState();

    const onClickEmailMarketing = (aceite) => {
        setEmailMarketing(aceite)
        setExibirDialogEmail(false);
    };

    const onClickAceito = async () => {
        setLoading(true);
        try {
            await service.aceitaTermosDeUso(emailMarketing);
            setTermosDeUso();
        } catch (e) {
            msgErro(e);
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                aria-labelledby="confirmation-dialog-title"
                open={exibir}
            >
                <DialogTitle className={classes.titulo}> Termos E-Commerce ARCOM S/A</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        <Typography style={{marginBottom: '10px'}}>
                            Olá cliente <span className={classes.subTitulo}> {cliente.razaoSocial}</span>
                        </Typography>
                        <Typography paragraph gutterBottom>
                            ARCOM S/A, sociedade anônima, inscrita no CNPJ/MF sob o nº 25.769.266/0001/-24, com sede na cidade
                            de Uberlândia, Estado de Minas Gerais, no Anel Viário Ayrton Senna, nº 2001, comercializa produtos
                            por meio da rede mundial de computadores (Internet), através do site www.arcom.com.br, com produtos
                            e negociações direcionadas para pessoas jurídicas devidamente registradas e desde que, tenha como
                            intenção de compra, a revenda.
                        </Typography>
                        <Typography className={classes.topico}> 1 - Cadastro </Typography>
                        <Typography paragraph className={classes.topicoCorpo}>
                            Para formalizar uma compra no site www.arcom.com.br o interessado deverá se cadastrar
                            fornecendo os dados de sua empresa. As informações precisam ser corretas e verdadeiras.
                            Ao finalizar seu cadastro, deverá ler na íntegra e manifestar a aceitação ao presente Termo
                            de uso, mediante marcação na caixa de seleção "De acordo".
                            <br/>
                            Somente com a leitura e aceitação do presente termo é que o interessado será admitido
                            como cliente.	É de responsabilidade única e exclusiva do interessado (cliente) a
                            veracidade sobre os dados informados, devendo zelar pela segurança e sigilo de seu login, nunca
                            o revelando a terceiros. Constitui ainda responsabilidade do interessado (cliente) a
                            manutenção do seu equipamento de informática protegido com softwares atualizados, municiados com
                            antivírus atualizados e firewalls também atualizados. Tais medidas são indispensáveis para a
                            realização de uma compra segura. Após o cadastro, a ARCOM S/A analisará as informações e
                            liberará o acesso para compra em seu site, em até 48 (quarenta e oito) horas.
                            <br/>
                            Importante: a. Pessoas jurídicas que não estejam com suas obrigações fiscais e cadastrais em dia,
                            não terão seu cadastro aceito e validado pelo ARCOM S/A.
                            <br/>
                            b. Em qualquer hipótese cadastros realizados com dados falsos serão considerados nulos.
                            <br/>
                            c. Caso a alteração dos dados cadastrais (email e usuário) seja necessária, o cliente deverá
                            entrar em contato com a Central de atendimento ARCOM e solicitar as mudanças.
                            <br/>
                            d. Os clientes terão suas entregas realizadas, obrigatoriamente, no endereço de cadastro
                            junto ao SINTEGRA.
                            <br/>
                            e. Todos os dados disponibilizados pelo cliente ao efetuar seu cadastro junto
                            ao www.arcom.com.br, são tratados com a proteção e inviolabilidade exigidos pela Lei Geral de
                            Proteção de Dados brasileira.
                        </Typography>
                        <Typography className={classes.topico}> 2 – POLÍTICA DE PAGAMENTO </Typography>
                        <Typography paragraph className={classes.topicoCorpo}>
                            Após a aprovação do cadastro, será disponibilizado ao cliente a possibilidade de compra no
                            site www.arcom.com.br com pagamentos através de boletos bancários.
                            A venda a prazo através de emissão de boleto bancário (em parcela única ou em mais de uma parcela)
                            será liberada apenas mediante análise prévia do cadastro do cliente, que inclui seu histórico de
                            compras, relacionamento com o mercado e scores de crédito.
                            <br/>
                            Se necessário o cliente poderá solicitar uma cópia da NF e do boleto assim que o seu pedido for
                            aprovado e faturado. Através da “Minha Conta” o cliente poderá acessar o menu “Meus pedidos” e
                            solicitar NF e boleto, que serão enviados para o e-mail cadastrado na conta.
                            <br/>
                            BOLETO À VISTA:  Nas compras à vista através de Boleto Bancário, o vencimento será com 02 (dois)
                            dias após a realização do pedido e o pagamento pode ser efetuado em qualquer banco.
                            O pedido somente será liberado após a confirmação do pagamento (sistema bancário).
                            Se o pagamento não for confirmado após 01 (um) dia do vencimento do boleto, o pedido será cancelado
                            automaticamente e o cliente será informado por e-mail.
                            <br/>
                            BOLETO A PRAZO: Nesta modalidade, o cliente pode efetuar o pagamento do seu pedido através de boleto
                            bancário, no prazo acordado no momento do pedido, e de acordo com as políticas de concessão de
                            crédito da Arcom S/A. Os boletos serão encaminhados ao cliente juntamente com a nota fiscal (Danfe)
                            no momento da entrega das mercadorias.
                        </Typography>
                        <Typography className={classes.topico}> 3 – POLÍTICA DE ENTREGA </Typography>
                        <Typography paragraph className={classes.topicoCorpo}>
                            O prazo de entrega de produtos, que é contado sempre em dias úteis, pode variar de acordo com a
                            região de entrega, disponibilidade do produto e forma de pagamento.
                            <br/>
                            No fechamento do pedido, o site informará o prazo de entrega provável e a política de frete.
                            Não serão aceitos pedidos cujo endereço de entrega seja caixa postal. As entregas serão realizadas
                            de segunda à sexta-feira, entre 8hs e 18hs, e aos sábados excepcionalmente das 8hs às 12hs, nas
                            localidades atendidas pela ARCOM S/A. A contagem do prazo de entrega do produto poderá ser suspensa
                            devido a caso fortuito ou de força maior, como por exemplo, mas não se limitando, desastres naturais,
                            greves, manifestações populares, piquetes, pandemias, entre outros.
                            Em caso de ausência de responsável que possa receber o produto, ou estando o estabelecimento
                            fechado, serão realizadas mais 2 (duas) tentativas, em dias alternados, dentro de um período de
                            5 (cinco) dias. Caso resultem infrutíferas as tentativas, o produto será devolvido para  ARCOM S/A.
                            Os produtos somente serão entregues a pessoas maiores de 18 (dezoito) anos de idade, que sejam
                            representantes legais do cliente e, caso haja dúvidas quanto a essa condição ou a qualquer outra,
                            um documento de identidade poderá ser solicitado.
                            <br/>
                            É de responsabilidade do cliente averiguar se as dimensões do produto embalado são adequadas para
                            locomoção por elevadores, rampas, portas e corredores do local da entrega, pois não será permitido
                            que os entregadores realizem entregas ou coletas em condições que ofereçam risco às pessoas ou aos
                            produtos, como utilizar escadas improvisadas, içar o produto, bem como abrir a embalagem, realizar
                            instalações ou entregar ou recolher produtos em local diferente daquele que consta na nota fiscal.
                            <br/>
                            Verificando a condição inadequada para a entrega, o produto será devolvido à ARCOM S/A,
                            procedendo-se o cancelamento do pedido.
                        </Typography>
                        <Typography className={classes.topico}> 4 – POLÍTICA DE TROCAS E DEVOLUÇÕES </Typography>
                        <Typography paragraph className={classes.topicoCorpo}>
                            As trocas e devoluções de produtos deverão ser solicitadas através de um dos canais de nossa central
                            de atendimento ao cliente, e dependerão de análise e autorização prévia de nossa área de pós-vendas.
                            Ao solicitar a troca ou devolução, o cliente deverá informar o motivo pelo qual está realizando
                            a solicitação. Caso seja aprovada a troca ou devolução, os produtos a serem devolvidos deverão estar
                            em perfeito estado, sem rasuras e sem etiquetas coladas em sua embalagem. Os motivos para a
                            solicitação de troca ou devolução:
                            <br/>
                            Mercadoria danificada no transporte: Caso seja verificado avaria no momento da entrega do produto,
                            o cliente deverá recusar o recebimento e entrar em contato com a Central de Atendimento da ARCOM S/A.
                            <br/>
                            Troca de item vencido ou com defeito: A troca será válida apenas para os itens classificados na
                            categoria MAPEX (Marcas Próprias e Exclusivas ARCOM).
                            A ARCOM S/A analisará a solicitação do cliente e encaminhará ao fabricante para análise,
                            podendo ser aprovado, ou não.
                            Os itens deverão ser devolvidos na embalagem original (interna e externa), ou neutra, acompanhado
                            da respectiva nota fiscal, manual e todos os seus acessórios.
                        </Typography>
                    </DialogContentText>
                    <FormControlLabel
                        control={
                            <GreenCheckbox checked={aceitaTermos}
                                           onChange={() => {
                                               setAceitaTermos(!aceitaTermos);
                                               if (isEmpty(emailMarketing))setExibirDialogEmail(true);
                                           }} name="checkedG"/>}
                        label="Aceito termos de uso"
                    />
                </DialogContent>
                <DialogActions>
                    <Button disabled={!aceitaTermos} autoFocus onClick={() => {
                        onClickAceito()
                    }} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
            <EmailMarketing
                exibir={exibirDialogEmail}
                razaoSocial={cliente.razaoSocial}
                onClickAceitaEmail={() => {onClickEmailMarketing(true)}}
                onClickNaoAceitaEmail={() => {onClickEmailMarketing(false)}}
            />
        </>
    );

}

Componente.propType = {
    exibir: PropTypes.bool.isRequired
};

Componente.defaultProps = {
    exibir: false
};

export default Componente;
