# SmartParking

## Descrição do Projeto

### Back-end

API REST feita em Java. Foram usadas as seguintes tecnologias:

- Maven
- Google Endpoints
- Google Endpoints Framework
- Firebase
- Google Cloud SQL

### Front-end

Aplicação cliente para consumir a API. Foram usadas as seguintes tecnologias:

- Angular 8
- Angular Material
- SASS

O processo de criação de usuários e autenticação foi feito através do firebase, e através do Google Endpoints o back-end pode ter acesso às informações do usuário autenticado.

**Obs**.: Por questões de segurança, retirei do projeto as informações referentes a configurações necessárias na integração com o GCP e Firebase. Para utilizar este projeto, insira suas informações nos arquivos _appengine-web.xml_ no backend, e _environment.ts/environment.prod.ts_ no frontend.
