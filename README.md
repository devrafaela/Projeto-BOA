# 🎮 BOA - Busca Ordenação Animada

**BOA** é um jogo educacional interativo que ensina algoritmos de ordenação de forma lúdica e visual, começando com o Bubble Sort. É voltado a estudantes do ensino médio ou iniciantes em programação.

O projeto foi desenvolvido como um sistema web completo, com frontend em **TypeScript + Angular**, backend em **Java + Spring Boot**, e estilos visuais com **HTML + SCSS**.

---

## 🧰 Tecnologias utilizadas

| Camada       | Tecnologia        |
|--------------|-------------------|
| Frontend     | TypeScript, Angular, HTML, SCSS |
| Backend      | Java 17+, Spring Boot |
| Estilos      | SCSS              |
| Build        | npm, Maven        |
| Versionamento| Git + GitHub      |

---

## 📥 Como baixar e rodar o projeto localmente

### ✅ Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- [Node.js (v18+)](https://nodejs.org/) e [npm](https://www.npmjs.com/) (para rodar o frontend)
- [Java JDK (v17+)](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html) (para o backend)
- [Maven](https://maven.apache.org/download.cgi) (caso não use o wrapper `./mvnw`)
- Git instalado ([veja como instalar](https://git-scm.com/))
- Um terminal ou IDE (como VSCode, IntelliJ, Eclipse)

---

## 1️⃣ Clonando o repositório

Abra seu terminal e digite:

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

Isso irá copiar o código-fonte completo do projeto para o seu computador.
Em seguida, entre na pasta do projeto pelo terminal, com o comando:
cd nome-do-repositorio

---

## 2️⃣ Executando o Frontend (Angular)

Passo 1: Vá para a pasta do frontend pelo terminal com o comando:
```bash
cd frontend
```

Passo 2: Instale as dependências
```bash
npm install
```
Esse comando instala todas as bibliotecas que o Angular precisa para funcionar (definidas no package.json).

Passo 3: Inicie o servidor de desenvolvimento
```bash
npm start
```
O Angular irá iniciar o projeto em modo de desenvolvimento.
Acesse no navegador o link mostrado no seu cmd:
👉 Por exemplo: http://localhost:4200

---

## 3️⃣ Executando o Backend (Java Spring Boot)

Passo 1: Volte para a raiz do projeto e acesse a pasta do backend
```bash
cd ../backend
```

Passo 2: Inicie a API com o Maven Wrapper
```bash
./mvnw spring-boot:run
```
Alternativamente, você pode abrir a pasta backend em uma IDE como IntelliJ ou Eclipse e rodar a classe principal com @SpringBootApplication.

O backend ficará disponível em:
👉 Por exemplo: http://localhost:8080

---

## 4️⃣ Testando o jogo

Com ambos os servidores funcionando:

- Acesse (por exemplo) `http://localhost:4200`  no navegador
- Cadastre um novo usuário
- Faça login
- Inicie o Nível 1 (Bubble Sort)
- Complete a fase e veja seu progresso salvo

---

## 🧪 Testes e Validação

- Testes manuais foram realizados nas principais telas: cadastro, login, níveis, jogabilidade e conclusão.  
- A responsividade foi validada para diferentes tamanhos de tela.  
- Os bugs e melhorias estão documentados no Jira da equipe.


---

## 📄 Licença

Este projeto é de uso educacional, licenciado para fins acadêmicos e livres.

---

## 🚀 Próximas funcionalidades (Roadmap)

- Nível 2 (Selection Sort)  
- Nível 3 (Insertion Sort)  
- Sistema de ranking  
- Salvamento de progresso em nuvem





