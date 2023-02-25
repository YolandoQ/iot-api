# API de gerenciamento de dispositivos IoT
## Contexto
Implementar em NodeJS e Typescript uma API Rest para Gerenciar dispositivos IOT

## Funcionalidades
- Criar, Editar, Buscar e Excluir dispositivos
- Cada dispositivo pode armazenar mais de um tipo de informação. (Ex. temperatura, umidade, luminosidade, etc.). Estes são dinâmicos, assim um dispositivo pode receber qualquer tipo de dado.
- As informações do dispositivo trazem a unidade de medida (Celsius, %, etc.)
- Recebe dados do dispositivo via requisições HTTP
- Salva dados recebidos em banco MongoDB
- Envia via WebSocket notificaçao para um front-end ou Ferramenta de teste de requisições(Postman ou Insonmia) quando um dispositivo for atualizado e quando um dispositivo receber novas informações

## Tecnologias

- TypeScript - uma linguagem de programação fortemente tipada que se baseia em JavaScript
- Node.js - E/S de eventos para o back-end
- Express - Framework de node.js
- Docker - O Docker permite que você separe seus aplicativos de sua infraestrutura para que você possa entregar software rapidamente

## Instalação

##### Requisito obrigátorio
Antes de tudo você precisa ter o docker e o docker-compose e também o git.
Caso não tenha instalado, aqui alguns links de referência:
- Aqui encontrar os passos para instalação do Docker => https://docs.docker.com/get-docker/ 
- Aqui encontrar os passos para instalação do Docker Compose => https://docs.docker.com/compose/ 
- Aqui encontrar os passos para instalação do git => https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

##### Clone o projeto
Com o git instalado e em um diretório da sua escolha, baixe o projeto:

```sh
git clone https://github.com/YolandoQ/iot-api.git
```

##### Suba o serviço
Com o Docker-compose instalado, execute esse comando na raiz do projeto:

```sh
docker-compose up -d
```

Pronto, agora utlize a ferramenta que preferir para testar as rotas.

## Rotas

##### Temos no total 7 rotas:
- 5 rotas de API
- 1 rota de apresentação
- 1 rota pra Websocket

Considerando que você não alterou nenhuma porta no momento da instalação, vou explicar um pouco das rotas, caso precise, pode adaptar pras suas proprías portas.

### Rota de apresentação
- Uma rota do tipo GET
- URL: http://localhost:8001/

Retorno:

```sh
{
	"version": "0.1"
}
```

### Rota de conexão com o Websocket
- Uma rota do tipo WS
- URL: ws://localhost:8002/

Retorno: Abaixo exemplos de retornos de acordo com as alterações no banco de dados.

```sh
	WebSocket server started
	
	A device has been created:{"name":"facial recognition","location":"Main entrance","data":[{"key":"accuracy","value":95,"unit":"Percentage"}]}
	
	Device 63fa4d8f9e7a5b984a06641c has been updated to:{"location":"Room","data":[{"key":"accuracy","value":55,"unit":"Percentage"}]}
	
	Device 63fa4d8f9e7a5b984a06641c has been deleted
	
```

### Rotas de API
##### GET
- Uma rota do tipo GET
- URL: http://localhost:8001/api/v1/device/

Retorno: Todos os registros do banco atualmente. Exemplo abaixo.

```sh
{
	"success": true,
	"message": "Request made successfully",
	"data": [
		{
			"_id": "63fa4d909e7a5b984a06641e",
			"name": "facial recognition",
			"location": "Room",
			"data": [
				{
					"key": "accuracy",
					"value": 55,
					"unit": "Percentage"
				}
			],
			"__v": 0
		},
		{
			"_id": "63fa4da89e7a5b984a066420",
			"name": "facial recognition",
			"location": "Main entrance",
			"data": [
				{
					"key": "accuracy",
					"value": 95,
					"unit": "Percentage"
				}
			],
			"__v": 0
		}
	]
}

```
##### GET BY ID
- Uma rota do tipo GET
- URL: http://localhost:8001/api/v1/device/(:id)

Retorno: Um registro específico. Exemplo abaixo para o (:id) 63fa4d909e7a5b984a06641e

```sh
{
	"success": true,
	"message": "Request made successfully",
	"data": {
		"_id": "63fa4d909e7a5b984a06641e",
		"name": "facial recognition",
		"location": "Room",
		"data": [
			{
				"key": "accuracy",
				"value": 55,
				"unit": "Percentage"
			}
		],
		"__v": 0
	}
}
```

##### CREATE
- Uma rota do tipo POST
- URL: http://localhost:8001/api/v1/device/

Corpo: Dados necessários para criar um registro. Exemplo abaixo.

```sh
{
	"name": "facial recognition",
	"location": "Main entrance",
	"data": [
		{
			"key": "accuracy",
			"value": 95,
			"unit": "Percentage"
		}
	]
}
```

Retorno: 

```sh
{
	"success": true,
	"message": "Device registered",
	"data": {}
}
```

##### UPDATE
- Uma rota do tipo PUT
- URL: http://localhost:8001/api/v1/device/(:id)

Corpo: Atualiza registro específico. Exemplo abaixo para o (:id) 63fa4d8f9e7a5b984a06641c

```sh
{
	"location": "Room",
	"data": [
		{
			"key": "accuracy",
			"value": 55,
			"unit": "Percentage"
		}
	]
}
```

Retorno: 

```sh
{
	"success": true,
	"message": "Device updated",
	"data": {}
}
```

##### DELETE
- Uma rota do tipo DELETE
- URL: http://localhost:8001/api/v1/device/(:id)

Retorno: 

```sh
{
	"success": true,
	"message": "Device deleted",
	"data": {}
}
```