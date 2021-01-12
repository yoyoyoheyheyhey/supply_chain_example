import React, { Component } from "react";
import ItemManager from "./contracts/ItemManager.json";
import Item from "./contracts/Item.json";
import getWeb3 from "./getWeb3";
import "./App.css";

class App extends Component {
  state = { cost: 0, itemName: "exampleItem1", loaded: false };

  componentDidMount = async () => {
    try {
      this.web3 = await getWeb3();

      this.accounts = await this.web3.eth.getAccounts();

      const networkId = await this.web3.eth.net.getId();

      this.itemManager = new this.web3.eth.Contract(
        ItemManager.abi,
        ItemManager.networks[networkId] && ItemManager.networks[networkId].address,
      );
      this.item = new this.web3.eth.Contract(
        Item.abi,
        Item.networks[networkId] && Item.networks[networkId].address,
      );

      this.setState({ loaded: true });

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value =
      target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async() => {
    const { cost, itemName } = this.state;
    console.log(itemName, cost, this.itemManager);
    let result = await this.itemManager.methods.createItem(itemName, cost).send({ from: this.accounts[0] });
    console.log(result);
    alert(
      `Send ${cost}Wei to ${result.events.SupplyChainStep.returnValues._itemAddress}`
    );
  };

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Simply Payment / Supply Chain Example</h1>
        <h2>Items</h2>
        <h2>Add Items</h2>
        <div>
          <span>Cost in Wei: </span>
          <input
            type="text"
            name="cost"
            value={ this.state.cost }
            onChange={ this.handleInputChange }
          />
        </div>
        <div>
          <span>Item Identifier: </span>
          <input
            type="text"
            name="itemName"
            value={ this.state.itemName }
            onChange={ this.handleInputChange }
          />
        </div>
        <button
          type="button"
          onClick={ this.handleSubmit }
        >Create New Item</button>
      </div>
    );
  }
}

export default App;
