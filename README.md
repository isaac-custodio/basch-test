# Basch Test API

Esta é uma API de exemplo para demonstrar como criar uma aplicação Node.js com Swagger para documentação de APIs.

## Instalação

1. Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).
2. Clone este repositório para o seu ambiente local.
3. No diretório raiz do projeto, execute o seguinte comando para instalar as dependências:

```
npm install
```

4. Faça uma cópia do arquivo `.env-template` e renomeie-o para `.env`. Preencha os valores das variáveis de ambiente conforme necessário para configurar o projeto.

## Uso

Após instalar as dependências e configurar o arquivo `.env`, você pode iniciar o servidor localmente executando o seguinte comando:

```
npm start
```

O servidor será iniciado e estará acessível em `http://localhost:3000`. Você pode interagir com a API através desta URL.

Além disso, a documentação da API está disponível em `http://localhost:3000/api-docs`, onde você pode visualizar e testar as rotas da API usando o Swagger UI.

## Documentação da API

A documentação da API é gerada automaticamente usando o Swagger. Você pode acessá-la em `http://localhost:3000/api-docs` ou diretamente na raiz do servidor após a implantação.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um problema ou enviar uma solicitação de recebimento com melhorias.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
