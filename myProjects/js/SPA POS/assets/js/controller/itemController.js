
//---------------------save item----------------
$("#btnSaveItem").click(function (){
    let itemId = $("#txtItemID").val();
    let itemName = $("#txtItemName").val();
    let itemQty = $("#txtItemQty").val();
    let itemPrice = $("#txtItemPrice").val();


    var itemOB=new ItemDTO(itemId,itemName,itemQty,itemPrice);

    itemDB.push(itemOB);
    loadAllItem();
    clearItemFields();
});

function loadAllItem (){
    $("#tblItem").empty();
    for (var i of itemDB){
        let raw = `<tr><td>${i.getItemID()}</td><td>${i.getItemName()}</td><td>${i.getItemQty()}</td><td>${i.getItemPrice()}</td></tr>`
        $("#tblItem").append(raw);

    }
    bindItem();
}

//-----------------------Search Item---------------
$("#btnSearchItem").click(function (){
    var searchId = $("#txtItemSearch").val();
    var response = searchItem(searchId);
    if (response){
        $("#txtItemID").val(response.getItemID());
        $("#txtItemName").val(response.getItemName());
        $("#txtItemQty").val(response.getItemQty());
        $("#txtItemPrice").val(response.getItemPrice());
    }else {
        alert("Invalid Item Search");
        clearItemFields();
    }
});
function searchItem (id){
    for (let i=0;i<itemDB.length;i++){
        if (itemDB[i].getItemID()===id){
            return itemDB[i];
        }
    }
}
//---------------------delete item------------------
$("#btnRemoveItem").click(function (){
    let getClickItemData=$("#txtItemID").val();
    for (let i=0;i<itemDB.length;i++){
        if (itemDB[i].getItemID()===getClickItemData){
            itemDB.splice(i, 1);
        }
    }
    clearItemFields();
   loadAllItem();
   generateItemId();
});

//---------------------update item------------------
$("#btnUpdateItem").click(function (){
    let itemId = $("#txtItemID").val();
    let itemName = $("#txtItemName").val();
    let itemQty = $("#txtItemQty").val();
    let itemPrice = $("#txtItemPrice").val();

    for (var i=0;i<itemDB.length;i++){
        if ( itemDB[i].getItemID()==itemId){
            itemDB[i].setItemName(itemName);
            itemDB[i].setItemQty(itemQty);
            itemDB[i].setItemPrice(itemPrice);
        }
    }
    loadAllItem();
    clearItemFields();

});

//------click table raw---------
function bindItem (){
    $("#tblItem > tr").click(function (){
        let itemId = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let itemQty = $(this).children(":eq(2)").text();
        let itemPrice = $(this).children(":eq(3)").text();

        $("#txtItemID").val(itemId);
        $("#txtItemName").val(itemName);
        $("#txtItemQty").val(itemQty);
        $("#txtItemPrice").val(itemPrice);

    });

}

//---------------------ClearTextFields---------------------
function clearItemFields (){
    $("#txtItemID,#txtItemName,#txtItemQty,#txtItemPrice").val("");
}
$("#btnClearItemTextField").click(function (){
    clearItemFields();
});




