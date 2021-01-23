const form = document.querySelector('form#add-form'),
  input = document.querySelector('form input[type="text"]'),
  listContainer = document.querySelector('#list-container'),
  filterBox = document.querySelector('.filter-box'),
  searchInput = document.querySelector('.filter-box input')

// base case for filter box
filterBox.style.display = 'none'

// laod inputes
let dataInput = []

// form submit
form.addEventListener('submit', add)

// window event for initial value
window.addEventListener('DOMContentLoaded', () => {
  dataInput = [...getLocal()]
  updateUI(dataInput)
})

function add(e) {
  e.preventDefault()
  const userVal = input.value
  if (userVal) {
    dataInput.unshift(userVal)

    saveToLocal(dataInput)

    updateUI(dataInput)

    input.value = ''
  } else {
    if (!userVal) {
      alert('Please write something')
    } else {
      alert('Cooldown 😇😇')
    }
  }
}

// del item
listContainer.addEventListener('click', deleteItem)

// Delete every single item
function deleteItem(e) {
  //   check if button is clicked
  if (e.target.parentElement.classList.contains('del')) {
    // e.target.parentElement.parentElement.remove()
    const item = e.target.parentElement.parentElement
    dataInput.splice(item.dataset.itemid, 1)

    saveToLocal(dataInput)
    updateUI(dataInput)
  }
}

// search features
searchInput.oninput = (e) => {
  const inpVal = e.target.value
  console.log(inpVal)
  document.querySelectorAll('li.item:not(.no-item)').forEach((liItem) => {
    if (
      liItem.firstElementChild.innerHTML
        .trim()
        .toLowerCase()
        .indexOf(e.target.value.trim().toLowerCase()) === -1
    ) {
      liItem.style.display = 'none'
    } else {
      liItem.style.display = 'flex'
    }
  })
}

// loop through the list
function updateUI(itemLists) {
  // check if data is more than one
  if (itemLists.length > 1) {
    filterBox.style.display = 'block'
  } else {
    filterBox.style.display = 'none'
  }

  let template = ``
  itemLists.forEach((item, index) => {
    template += ` 
        <li class="item" data-itemid=${index}>
            <div>
                ${item}
            </div>
            <button class="del" title="Delete">
                <img src="./img/Knob Remove Red.png" alt="">
            </button>
        </li> 
        `
  })
  listContainer.innerHTML = template
}

// save to local
function saveToLocal(data) {
  localStorage.setItem('todosdata', JSON.stringify(data))
}

// get from local
function getLocal() {
  if (!localStorage.getItem('todosdata')) {
    return []
  }

  return JSON.parse(localStorage.getItem('todosdata'))
}
