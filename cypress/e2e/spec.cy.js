describe('prova QA nttdata - terceita questao', () => {

  const key = 'c4dbe6ae1cc70ef0e1016418ee69f0a4';
  const token = 'ATTAed263fe089da680cb8ca4cba81a04e265ae785210f408045727d2f2117d7a3e240FE09D0';
  let boardID;
  let listaID;
  let cardID;

  it('Cadastrar um board', () => {

    cy.request({
      method: 'POST',
      url: 'https://api.trello.com/1/boards/',
      qs: {
        name: 'NTT DATA TESTE BOARD',
        key: key,
        token: token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      boardID = response.body.id;
      cy.log(`ID do board criado: ${response.body.id}`);
    });

  });

  it('Cadastrar uma lista', () => {

    cy.request({
      method: 'POST',
      url: `https://api.trello.com/1/boards/${boardID}/lists`,
      qs: {
        name: 'NTT DATA TESTE LISTA',
        key: key,
        token: token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      listaID = response.body.id;
      cy.log(`ID da lista criada: ${response.body.id}`);
    });
  });

  it('Cadastrar um card', () => {

    cy.request({
      method: 'POST',
      url: `https://api.trello.com/1/cards`,
      qs: {
        name: 'NTT DATA TESTE CARD',
        idList: listaID,
        key: key,
        token: token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cardID = response.body.id;
      cy.log(`ID do card criado: ${response.body.id}`);
    });
  });

  it('Excluir um card', () => {

    cy.request({
      method: 'DELETE',
      url: `https://api.trello.com/1/cards/${cardID}`,
      qs: {
        key: key,
        token: token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);;
    });
  });

  it('Excluir um board', () => {

    cy.request({
      method: 'DELETE',
      url: `https://api.trello.com/1/boards/${boardID}`,
      qs: {
        key: key,
        token: token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);;
    });
  });

});
