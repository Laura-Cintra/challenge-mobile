# SmartPátio — Challenge Mottu

<img src="assets/logo-app-dark.png" alt="Logo do Projeto" width="120" height="120">

O **SmartPátio** é um aplicativo mobile desenvolvido em React Native Expo, com o objetivo de otimizar a **gestão** e **localização** das motos nos pátios da Mottu. A solução vem como uma integração ao sistema que a Mottu utiliza atualmente, automatizando etapas manuais e resolvendo a dor da localização rápida das motos. 

## Contexto da Solução

- **Corredor inteligente:** câmera com visão computacional e OCR para leitura automática de placas na entrada/saída
- **Dispositivo IOT (carrapato):** dispositivo acoplado à moto, composto por ESP32, LED âmbar, buzzer audível e acoplamento magnético.
- **App Mobile:** interface para cadastro, gestão e localização das motos no pátio, integrada ao sistema da Mottu.

## ⚙️ 1. Funcionalidades

### **Home / Dashboard**
- Visualização de **dados operacionais** em gráficos, como quantidade de motos por zona
- Atalho rápido para registro de novas motos no pátio
- Botão para localizar moto no pátio

### **Cadastro de Motos**
- Registro automático de motos por placa ou chassi (em caso de erro na leitura da placa, libera a inserção da placa manualmente)
- Associação automática a um carrapato IoT
- Prevenção de duplicidade no cadastro

### **Organização das motos por zonas**
- Exibição das zonas do pátio (ex: Saguão, Manutenção Rápida, Danos Estruturais, etc.)
- Ao clicar em uma zona, abre um modal com a lista de motos registradas nela
- Campo de filtro por **modelo** e **placa** (ou **chassi** na zona Sem Placa)
- Ícones de ação em cada item para editar ou excluir a moto

### **Localização de Motos**
- Busca rápida pela placa dentro do aplicativo
- O carrapato correspondente é acionado com LED âmbar e buzzer sonoro, facilitando a localização da moto no pátio

### **Página de Perfil**
- Exibição das informações do **usuário**:
  - Dados do gestor (nome, e-mail)
  - Dados do pátio (endereço, quantidade atual de motos)
- Opções de editar perfil ou excluir conta
- Atalhos de navegação para as funções do aplicativo

### **Página de Login**
- Autenticação de usuários já cadastrados
- Campos de entrada: e-mail e senha
- Sessão mantida via AsyncStorage
- Autenticação de usuários já cadastrados

### **Página de Cadastro**
- Criação de conta para gestores de pátio
- Campos de entrada: nome, e-mail, senha e endereço do pátio (select com pátios registrados no sistema)
- Armazenamento seguro e integração direta com a API

## 🛠 2. Tecnologias Utilizadas

- **React Native** 
- **AsyncStorage**
- **React Navigation**
- **Expo Vector Icons**
- **Axios**

---

## 📂 3. Estrutura de Pastas
```bash
challenge-mobile/
│── assets/                  # Imagens, ícones e recursos estáticos
│── src/
│   ├── components/          # Componentes reutilizáveis da interface
│   ├── data/
│   │   └── zonas.js         # Lista e mapeamento das zonas do pátio
│   ├── pages/               # Telas principais do aplicativo
│   │   ├── Cadastro.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── MotoPark.js
│   │   ├── NovaMoto.js
│   │   ├── Perfil.js
│   │   └── RegistrarFrota.js
│   ├── providers/           # Contextos globais (estado e serviços)
│   │   ├── ThemeContext.js
│   │   ├── UseMotos.js
│   │   └── UserContext.js
│   ├── services/            # Comunicação com a API
│   │   └── actions.js
│   └── theme/               # Configurações de tema (cores, estilos)
│       ├── colors.js
│       └── themeColors.js
│── App.js                   # Ponto de entrada do aplicativo
│── app.json                 # Configurações do Expo
│── index.js                 # Arquivo inicial
│── package.json             # Dependências e scripts do projeto
│── README.md                # Documentação do projeto
```
--- 

## 🚀 4. Como rodar o projeto

1. Clone este repositório:

```bash
git clone https://github.com/Laura-Cintra/challenge-mobile.git
cd challenge-mobile
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o projeto com Expo:

```bash
npm start
```

4. Escaneie o QR Code com o app Expo Go no seu celular
---

## 📊 5. Execução do BD para as requisições

1. Clone o repositório .NET e siga as instruções de configuração das credenciais do BD:

```bash
git clone https://github.com/ViniciuSaeSouza/Mottu-CSharp.git
```

---

## 🔌6. Execução do IoT no Wokwi

1. Clone o repositório IOT e siga as instruções do documento:

```bash
git clone https://github.com/ViniciuSaeSouza/Mottu-IoT.git
```
---

## 7. Integrantes

| Nome                              | RM     | GitHub                                             |
| --------------------------------- | ------ | -------------------------------------------------- |
| **Laura de Oliveira Cintra**      | 558843 | [@Laura-Cintra](https://github.com/Laura-Cintra)   |
| **Maria Eduarda Alves da Paixão** | 558832 | [@MariaEdPaixao](https://github.com/MariaEdPaixao) |
| **Vinícius Saes de Souza**        | 554456 | [@ViniciuSaeSouza](https://github.com/ViniciuSaeSouza) |
