import isEmpty from '../isEmpty';
import {txtToDec} from 'Util/Number';

const convertToNumber = value =>
    (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
        ? Number(value) :
        null;

/**
 * Converte dados do formulario html em objeto JSON.
 *
 * @author GPortes.
 *
 * @param form Formulario a ser convertido.
 */
const toJson = form => {

    if (isEmpty(form))
        throw '[toJson] Formulario inválido !!';

    if (isEmpty(form.elements))
        throw '[toJson] Objeto enviado não é do Tipo form!!';

    const domElements = form.elements;

    let jsonObj = {};
    let jsonMap = new Map();

    for (let i = 0; i < domElements.length; i++) {

        const field = form.elements[i];

        if (isEmpty(field.name)) continue;

        let nomeAtributo = field.name;
        let jsonAtributo = {};

        // Tratamento para arrays...
        let keyMap = null;
        let indexCorrenteKeyMap = null;
        const names = field.name.split(/\s*:\s*/);
        if (names.length === 2) {
            keyMap = names[0];
            nomeAtributo = names[1];
            if (jsonMap.has(keyMap)) {
                indexCorrenteKeyMap = jsonMap.get(keyMap).length - 1;
                const elementoCorrente = jsonMap.get(keyMap)[indexCorrenteKeyMap];
                if (Object.keys(elementoCorrente)[0] === nomeAtributo) {
                    // Se primeiro atributo repetiu, criamos uma nova posição no array.
                    indexCorrenteKeyMap = jsonMap.get(keyMap).push({}) - 1;
                }
            } else {
                jsonMap.set(keyMap,[]);
                indexCorrenteKeyMap = 0;
            }
        }

        // Montagem do JSON:
        if (isEmpty(field.value) && field.type !== 'checkbox') {

            jsonAtributo[nomeAtributo] = null;

        } else {

            switch (field.type) {
                case 'text':
                    // Tratamento para coordenadas!!
                    if( !isEmpty(field.getAttribute('data-coordenada')) ) {
                        jsonAtributo[nomeAtributo] = txtToDec(field.value);
                        break;
                    }
                    jsonAtributo[nomeAtributo] = field.value;
                    break;
                case 'password':
                    jsonAtributo[nomeAtributo] = field.value;
                    break;
                case 'number':
                    jsonAtributo[nomeAtributo] = convertToNumber(field.value);
                    break;
                case 'checkbox':
                    jsonAtributo[nomeAtributo] = field.checked;
                    break;
                case 'date':
                    const array = field.value.split('-');
                    jsonAtributo[nomeAtributo] = `${array[2]}-${array[1]}-${array[0]}`;
                    break;
                case 'time':
                    jsonAtributo[nomeAtributo] = field.value;
                    break;
                case 'select-one':
                    jsonAtributo[nomeAtributo] = isNaN(field.value) ? field.value : convertToNumber(field.value);
                    break;
                default:
                    continue;
            }
        }

        if (keyMap !== null)
            jsonMap.get(keyMap)[indexCorrenteKeyMap] = { ...jsonMap.get(keyMap)[indexCorrenteKeyMap], ...jsonAtributo };
        else
            jsonObj = {...jsonObj, ...jsonAtributo};
    }

    // Atribuir Map ao Json final.
    for (const key of jsonMap.keys()) jsonObj[key] = jsonMap.get(key);

    return jsonObj;
};

export default toJson;