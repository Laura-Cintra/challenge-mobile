# SmartPátio — Challenge Mottu

<img src="assets/icons/icon-round.png" alt="Logo do Projeto" width="120" height="120">

O **SmartPátio** é um aplicativo mobile desenvolvido em React Native Expo, com o objetivo de otimizar a **gestão das motos nos pátios da Mottu**. A solução inclui cadastro, visualização e organização de motos por zona, usando uma interface simples, acessível e funcional para os gestores do pátio.

Nossa proposta é o desenvolvimento de uma solução inteligente para **mapeamento e controle das motos nos pátios**, utilizando:

- **Visão computacional** com câmeras fixas e modelos da Roboflow
- **Triangulação Wi-Fi** com microcontroladores ESP32 e sensores de sinal RSSI
- **Dashboards** com dados operacionais em tempo real

## 1. Funcionalidades

### **Home / Dashboard**
- Visualização de **dados operacionais** em gráficos, como quantidade de motos por zona
- Atalho para inserir novas motos no pátio

### **Cadastro de Motos**
- Campos de entrada: modelo, placa e zona no pátio
- Possui validação de placas e verificação de duplicidade

### **Organização das motos por zonas**
- Exibição das **zonas** no pátio (ex: Manutenção Rápida, Danos Estruturais, etc)
- Ao clicar em uma zona, abre um modal com a visualização das motos registradas naquela zona
- Campo de filtro por **modelo** ou **placa**

### **Página de Login**
- Campos de entrada: nome, e-mail, senha e endereço do pátio.
- Temporariamente com logins mockados, você pode acessar usando um desses:
  - **E-mail**: laura@fiap.com | **Senha**: RM558843
  - **E-mail**: maria@fiap.com | **Senha**: RM558832
  - **E-mail**: vinicius@fiap.com | **Senha**: RM554456

### **Página de Perfil**
- Exibição das informações do **usuário**:
  - Dados do gestor (nome, e-mail)
  - Dados do pátio (endereço, quantidade atual de motos)
- Atalhos de navegação para as funções do aplicativo

## 2. Tecnologias Utilizadas

- **React Native** 
- **AsyncStorage**
- **React Navigation**
- **Expo Vector Icons**

---

## 3. Como rodar o projeto

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
npx expo start
```

4. Escaneie o QR Code com o app Expo Go no seu celular
---

## 4. Integrantes

    RM: 558843 Laura de Oliveira Cintra
    RM: 558832 Maria Eduarda Alves da Paixão
    RM: 554456 Vinícius Saes de Souza

