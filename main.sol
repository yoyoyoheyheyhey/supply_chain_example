pragma solidity ^0.7.0;

contract ItemManager {
    
    enum SupplyChainState{Created, Paid, Deilivered}
    
    struct S_Item {
        string _identifier;
        uint _itemPrice;
        ItemManager.SupplyChainState _state;
    }
    
    mapping(uint => S_Item) public items;
    uint itemIndex;
    
    event SupplyChainStep(uint _itemIndex, uint _step);
    
    function createItem(string memory _identifier, uint _itemPrice) public {
        items[itemIndex]._identifier = _identifier;
        items[itemIndex]._itemPrice = _itemPrice;
        items[itemIndex]._state = SupplyChainState.Created;
        emit SupplyChainStep(itemIndex, uint(items[itemIndex]._state));
        itemIndex++;
    }
    
    function triggerPayment(uint _itemIndex) public payable {
        require(items[_itemIndex]._itemPrice == msg.value, "Only full payments accepted");
        require(items[_itemIndex]._state == SupplyChainState.Created, "Item is further in the chain");
        items[_itemIndex]._state = SupplyChainState.Paid;
        emit SupplyChainStep(_itemIndex, uint(items[_itemIndex]._state));
    }
    
    function triggerDelivery(uint _itemIndex) public {
        require(items[_itemIndex]._state == SupplyChainState.Created, "Item is further in the chain");
        items[_itemIndex]._state = SupplyChainState.Deilivered;
        emit SupplyChainStep(_itemIndex, uint(items[_itemIndex]._state));
    }
    
}