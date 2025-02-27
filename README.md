# Desafio EADSkill - CRUD de Produtos

Este projeto tem como objetivo desenvolver uma página para gerenciar produtos, permitindo a criação, leitura, atualização e exclusão (CRUD) de itens. A aplicação utiliza a API pública [Fake Store API](https://fakestoreapi.com/) como fonte de dados, garantindo uma experiência prática para manipulação de produtos.

A aplicação foi desenvolvida utilizando o framework [Next.js](https://nextjs.org), proporcionando uma abordagem moderna para o desenvolvimento web com React.

Este é um projeto desenvolvido com [Next.js](https://nextjs.org), criado utilizando [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Requisitos

Antes de configurar e rodar a aplicação, certifique-se de ter os seguintes requisitos atendidos:

- [Node.js](https://nodejs.org/) (versão 20 ou superior recomendada)
- [npm](https://www.npmjs.com/) instalado

## Configuração e Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/GabrieSpontoni/desafio-eadskill.git
cd seu-repositorio
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar o servidor de desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para visualizar a aplicação em execução.

### 4. Construir e rodar a versão de produção

Para testar a aplicação em modo de produção localmente:

```bash
npm run build
npm start
```

## Estrutura do Projeto

```bash
src/
  ├── _tests_/
  │   ├── createProductPage.test.tsx
  │   ├── productCard.test.tsx
  │   ├── productPage.test.tsx
  │   ├── productsPage.test.tsx
  │   ├── useProducts.test.tsx
  ├── app/
  │   ├── products/
  │   │   ├── [id]/
  │   │   ├── create/
  │   │   ├── page.tsx
  │   ├── favicon.ico
  │   ├── globals.css
  │   ├── layout.tsx
  │   ├── page.tsx
  ├── components/
  │   ├── ProductCard.tsx
  │   ├── ProductForm.tsx
  ├── hooks/
  │   ├── useProducts.ts
```

## Tecnologias Utilizadas

- [Jest](https://jestjs.io/) - Framework de testes para JavaScript e TypeScript

- [Next.js](https://nextjs.org/) - Framework para React
- [React](https://react.dev/) - Biblioteca para interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Framework de estilização
- [Zod](https://zod.dev/) - Biblioteca de validação de esquemas

## Rodando os Testes

Para executar os testes com Jest, utilize o seguinte comando:

```bash
npm run test
```

## Como Contribuir
2. Crie uma branch para sua feature (`git checkout -b minha-feature`)
3. Commit suas modificações (`git commit -m 'Adicionando minha feature'`)
4. Envie para o repositório remoto (`git push origin minha-feature`)
5. Abra um Pull Request

## Fluxo da Aplicação

O fluxo da aplicação pode ser visualizado no Figma:

[Fluxo da Aplicação - Figma](https://www.figma.com/design/6TQ0QIzhtRkXE5Q7x5DXtI/Desafio-EADSkill?node-id=0-1&t=wiqKVjKCIG91dz0l-1)

## Dúvidas?

Se tiver alguma dúvida, abra uma issue neste repositório ou entre em contato com o mantenedor do projeto.

---

Este README foi elaborado para fornecer instruções claras e objetivas para configuração e execução da aplicação.

