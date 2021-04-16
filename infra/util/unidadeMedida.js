

    const unidadeMedida = (unidade) => {

        switch (unidade) {
            case 'BB':
                return 'BOMBONA'
                break;
            case 'BD':
                return 'BALDE'
                break;
            case 'BL':
                return 'BLOCO'
                break;
            case 'C2':
                return 'CENTIMETRO QUADRADO'
                break;
            case 'CJ':
                return 'CONJUNTO'
                break;
            case 'CT':
                return 'CARTELA'
                break;
            case 'CX':
                return 'CAIXA'
                break;
            case 'DP':
                return 'DISPLAY'
                break;
            case 'DZ':
                return 'DUZIA'
                break;
            case 'EA':
                return 'PALETES PBR'
                break;
            case 'FD':
                return 'FARDO'
                break;
            case 'GA':
                return 'GARRAFA'
                break;
            case 'GL':
                return 'GALÃO'
                break;
            case 'GZ':
                return 'GROZA'
                break;
            case 'JG':
                return 'JOGO'
                break;
            case 'KG':
                return 'KILOGRAMA'
                break;
            case 'LA':
                return 'LATA'
                break;
            case 'LT':
                return 'LITRO'
                break;
            case 'M2':
                return 'METRO QUADRADO'
                break;
            case 'M3':
                return 'METRO CUBICO'
                break;
            case 'MT':
                return 'METRO'
                break;
            case 'PC':
                return 'PEÇA'
                break;
            case 'PR':
                return 'PAR'
                break;
            case 'PT':
                return 'PACOTE'
                break;
            case 'RL':
                return 'ROLO'
                break;
            case 'RM':
                return 'RESMA'
                break;
            case 'SC':
                return 'SACO'
                break;
            case 'TB':
                return 'TAMBOR'
                break;
            case 'UN':
                return 'UNIDADE'
                break;
            default:
                return unidade
        }

    }
export default unidadeMedida;
