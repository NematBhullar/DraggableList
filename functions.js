var numTasks = 0;

const draggable_list = document.getElementById('draggable-list');
const listItems = [];

let dragStartIndex;

// Add a task to the current list of tasks
document.getElementById("add").onclick = function() {
    var text = document.getElementById("input").value; // Get the value from the input bar
    
    if (text.trim().length != "") {
        const listItem = document.createElement('li'); // Create an element 
        listItem.setAttribute('data-index', numTasks); // Set the attribute as the task number
        numTasks++;
        
        // Format the object
        listItem.innerHTML = `
            <br>
            <labelNum>${numTasks}</labelNum>
            <l>
                <labelTask class="draggable" contentEditable="true" draggable="true">${text}</labelTask>
            </l>
        `;

        // Append to lists
        listItems.push(listItem);
        draggable_list.appendChild(listItem);
        document.getElementById("input").value = ""; // Emptying the input box
    }
    addEventListeners();
}


function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}
  
function dragEnter() {
    this.classList.add('over');
}
  
function dragLeave() {
    this.classList.remove('over');
}
  
function dragOver(e) {
    e.preventDefault();
}
  
function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
  
    this.classList.remove('over');
}
  
  // Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');
  
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}
  
function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');
  
    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', dragStart);
    });
  
    dragListItems.forEach(item => {
      item.addEventListener('dragover', dragOver);
      item.addEventListener('drop', dragDrop);
      item.addEventListener('dragenter', dragEnter);
      item.addEventListener('dragleave', dragLeave);
    });
}
  