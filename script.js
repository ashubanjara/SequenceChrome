// == DOM == //

const inputBoxEl = document.getElementById("input-box-el");
// unordered list
const ulEl = document.getElementById("ul-el")


// == Global Variables ==

const listItemArray = [];


// == listItem class ==

class ListItem {
   constructor(name, dateCreated, active) {
      this.name = name;
      this.dateCreated = dateCreated;
      this.active = active;
   }
}


// == FUNCTIONS ==

// Create a new listItem
function createListItem(itemName) {
    // get date
    let today = new Date();
    // formate date
    let date =
    `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
    return new ListItem(itemName, date, true);
}

// Render the items 
function renderItems(){
    let html = ""
    for (let i = 0; i < listItemArray.length; i++){
        html =
        `<li class="list-item" id="item-${i}">
            <input type="checkbox" class="check-box">
            ${listItemArray[i].name}
            <i class="far fa-trash-alt right" onclick="deleteItem(${i})"></i>
        </li>`
    }
    ulEl.innerHTML += html;
}

// Delete the listItem given an itemIndex
function deleteItem(itemIndex){
    // get the id of the item in dom
    const itemEl = document.getElementById(`item-${itemIndex}`);
    // remove self
    itemEl.outerHTML = "";
    // remove listitem from array
    listItemArray.splice(itemIndex, 1);
}



// == EVENT LISTENERS ==
document.addEventListener("keydown", function(){
    if (event.code === "Enter") {
        if (inputBoxEl.value != ""){
            // push list item object to list item array
            listItemArray.push(createListItem(inputBoxEl.value));
            // clear input field
            inputBoxEl.value = "";
            renderItems();
        }
    }
})
