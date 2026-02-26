# 👤 My-Trace-Table

Front-end do aluno do projeto **Apps4Society (UFPB)**.

Esta aplicação é utilizada pelos alunos para:

- Responder exercícios de Trace Tables criados pelo professor

A aplicação consome a API do backend para carregar exercícios, enviar respostas e receber feedback automático da resposta.

---

# 🏗️ Arquitetura do Sistema

O sistema completo é composto por:

- 👤 Front-end do Usuário (este repositório)  
  https://github.com/a4s-ufpb/My-Trace-Table

- 🖥️ Front-end Administrativo  
  https://github.com/a4s-ufpb/My-Trace-Table-Manager

- ⚙️ Backend (API)  
  https://github.com/a4s-ufpb/My-Trace-Table-Manager-API

⚠️ A API deve estar rodando antes de iniciar esta aplicação.

---

# 🐳 Como Rodar com Docker

Este projeto utiliza Docker para build e execução da aplicação.

---

## 1️⃣ Pré-requisitos

- Docker instalado
- Docker Compose instalado
- A API já deve estar rodando
- A rede Docker `tracetable-network` deve existir

Se ainda não criou a rede, execute:

obs: ao rodar a API primeiro, a rede é criada automaticamente

---

## 2️⃣ Configuração do `.env`

O projeto possui o arquivo:

```
.env.example
```

### Passos:

1. Copie o arquivo:

```bash
cp .env.example .env
```

*(No Windows, copie manualmente e renomeie para `.env`)*

2. Verifique a variável da API:

```env
VITE_API_URL=http://localhost:8080/v1
```

Essa variável define a URL base do backend que o front-end irá consumir.

⚠️ Se a API estiver rodando em outra porta ou ambiente, ajuste essa variável.

---

## 3️⃣ Subindo o Container

Na raiz do projeto, execute:

```bash
docker compose up -d --build
```

Isso irá:

- Construir a imagem da aplicação
- Subir o container
- Expor a aplicação na porta 9999

---

## 🌐 Acessando a Aplicação

Após subir o container, acesse:

```
http://localhost:9999
```

---

# 🧹 Parando o Container

Para parar:

```bash
docker compose down
```

---

# 🧠 Estrutura do Docker Compose

O projeto sobe o seguinte serviço:

- `my-trace-table` → Aplicação Front-end do Aluno

Ele utiliza a rede externa:

```
tracetable-network
```

⚠️ Essa rede deve ser a mesma utilizada pela API para permitir comunicação entre os containers.

---

# 🔗 Fluxo de Uso no Sistema

1. O professor cria exercícios e temas pelo **Manager**
2. A API armazena e organiza os dados
3. O aluno acessa este sistema
4. O aluno responde os exercícios de Trace Table
5. As respostas são enviadas para a API
6. O aluno recebe um feedback de acordo com sua resposta, destacando erros e/ou acertos

---

# 📌 Observações Importantes

- O front-end depende da API
- A variável `VITE_API_URL` deve apontar corretamente para o backend
- Caso altere a porta da API, atualize no `.env`
