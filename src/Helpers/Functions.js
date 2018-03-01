/** 
 * Retorna uma @string com a tela que o usuário será redirecionado de acordo com o status dele
*/
export const redirecionarUsuarioComBaseStatus = status => {
  let tela = 'Home';

  switch(status){
    case 26:
      tela = 'Kits';
      break;
    case 3:
      tela = 'AguardandoAtivacao';
      break;
    case 1:
      tela = 'HomeEv';
      break;
    default: 
      tela = 'Home';
  }

  return tela;
}