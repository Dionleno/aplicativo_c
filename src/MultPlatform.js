
/**
 * Contem1g App
 * @Pagina Estilos para cada platafrmas
 * @flow
 */

import { Platform} from 'react-native';

export default {
    BackgroundColorStatusBar: Platform.OS === 'ios' ? '#FFFFFF' : '#333333',
    TextColorStatusBar: Platform.OS === 'ios' ? '#000000' : '#FFFFFF',
    FontSizeTextDefault: Platform.OS === 'ios' ? 10 : 12,
    FontSizeTextTitle: Platform.OS === 'ios' ? 14 : 16,
} 

