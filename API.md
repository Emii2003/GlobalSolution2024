Documentação da API
A API deste projeto oferece os seguintes endpoints para interação:

1. Adicionar Chamado
Endpoint: /chamados/add

Descrição
Este endpoint permite adicionar um novo chamado à lista de chamados.

Método
POST
Parâmetros da Requisição
title (string): Título do chamado.
latitude (string): Latitude do local do chamado.
longitude (string): Longitude do local do chamado.
description (string): Descrição do chamado.
equipmentId (string): ID do equipamento utilizado no chamado.

Exemplo de Requisição:
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"title":"Chamado de Exemplo","latitude":"-23.5505","longitude":"-46.6333","description":"Descrição do chamado de exemplo","equipmentId":"rede_de_pesca"}' \
  http://sua-api.com/chamados/add

Retorno da Requisição:

{
  "success": true,
  "message": "Chamado adicionado com sucesso!",
  "chamado": {
    "id": "1",
    "title": "Chamado de Exemplo",
    "latitude": "-23.5505",
    "longitude": "-46.6333",
    "description": "Descrição do chamado de exemplo",
    "equipmentId": "rede_de_pesca",
    "date": "2024-06-08T12:00:00Z"
  }
}

2. Listar Chamados
Endpoint: /chamados/list

Descrição
Este endpoint retorna uma lista de todos os chamados cadastrados.

Método
GET
Parâmetros da Requisição
Nenhum.

Exemplo de Requisição:

curl -X GET http://sua-api.com/chamados/list

Retorno da Requisição:

{
  "success": true,
  "chamados": [
    {
      "id": "1",
      "title": "Chamado de Exemplo",
      "latitude": "-23.5505",
      "longitude": "-46.6333",
      "description": "Descrição do chamado de exemplo",
      "equipmentId": "rede_de_pesca",
      "date": "2024-06-08T12:00:00Z"
    },
    {
      "id": "2",
      "title": "Outro Chamado",
      "latitude": "-23.5510",
      "longitude": "-46.6340",
      "description": "Descrição do outro chamado",
      "equipmentId": "cana_de_pescar",
      "date": "2024-06-08T13:00:00Z"
    }
  ]
}