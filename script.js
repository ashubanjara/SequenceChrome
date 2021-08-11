// == DOM == //

const inputBoxEl = document.getElementById("input-box-el");
// unordered list
const ulEl = document.getElementById("ul-el")


// == Global Variables ==

const listItemArray = [];
// Total number of items allowed
const itemLimit = 25;
// Current item number
let itemNumber = -1;

// == listItem class ==

class ListItem {
   constructor(name, dateCreated) {
      this.id = -1;
      this.name = name;
      this.dateCreated = dateCreated;
      this.checked = false;
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
    return new ListItem(itemName, date);
}

// Render the items
function renderItem(index){
    // set the id of the list item to allign it with it's html ids
    listItemArray[index].id = index;
    let html =
        `<li class="list-item" id="item-${index}">
            <input type="checkbox" class="check-box" id="check-box-${index}">
            <span id="item-text-${index}">${listItemArray[index].name}</span>
            <span class="material-icons right delete-icon"
            id="delete-icon-${index}">delete</span>
        </li>`
    ulEl.innerHTML += html;

    for (let i = 0; i < itemLimit; i++){
        if (listItemArray[i]){
            if (listItemArray[i].checked){
                const checkEl =
                document.getElementById(`check-box-${listItemArray[i].id}`);
                checkEl.checked = true;
            }
        }
    }
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
        if (inputBoxEl.value != "" && listItemArray.length <= itemLimit){
            // push list item object to list item array
            listItemArray.push(createListItem(inputBoxEl.value));
            // clear input field
            inputBoxEl.value = "";
            itemNumber += 1;
            renderItem(itemNumber);
        }
    }
})

// Listen for clicks on delete button
document.addEventListener("click", function(e){
    if(e.target){
        for (let i = 0; i < itemLimit; i++){
            let deleteIconId = `delete-icon-${i}`
            if (e.target.id == deleteIconId){
                deleteItem(i);
            }
        }
    }
});

document.addEventListener("click", function(e){
    if(e.target){
        for (let i = 0; i < itemLimit; i++){
            let checkBoxId = `check-box-${i}`
            // if checkbox clicked
            if (e.target.id == checkBoxId){
                const textEl = document.getElementById(`item-text-${i}`);
                const checkEl = document.getElementById(checkBoxId);
                //textEl.classList.add("strike-through")
                textEl.style.setProperty("text-decoration", "line-through")
                checkEl.checked = true;
                for (let j = 0 ; j < itemLimit; j++) {
                    if (listItemArray[j]){
                        if (listItemArray[j].id === i){
                            listItemArray[j].checked = true;
                        }
                    }
                }
            }
        }
    }
});
