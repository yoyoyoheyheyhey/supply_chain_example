## Version
- Truffle v5.1.8 (core: 5.1.8)
- Solidity - ^0.6.0 (solc-js)
- Node v10.0.0
- Web3.js v1.2.1

## Overview
サプライチェーンソリューションの一部   
支払い時の自動発送と中間業者を挟まない代金回収  

ItemManagerというスマートコントラクトとのインタラクション  
- ItemManagerに対して行うこと  
  - 製品データ作成（createItem）
  - 製品に対しての支払い（triggerPayment）

## Tools
- [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)
- [Remix - Ethereum IDE](https://remix.ethereum.org/)


## Setup
- Install Truffle
```
$ npm install -g truffle
```

- Run the truffle develop console, mifrate
```
$ cd client
$ truffle develop
```

- Start the development server（open another terminal/powershell）
```
$ cd client
$ npm start
```

### loom
