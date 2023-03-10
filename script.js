// Global values for use in several functions
let results = []
let foundData = []
let currentPaginatedData = []
let currentShowingData = []
let tableDisplayData = []
let currentIndex = 0
let currentPageNumber = currentIndex + 1
let totalDataCount = null

// Loading State
let isLoading = false

// Default values for table filters
let entrySize = 10

const entriesOption = document.getElementById("entries-option")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")
const getDataBtn = document.getElementById("get-data-btn")

prevBtn.addEventListener("click", () => changePage("prev"))
nextBtn.addEventListener("click", () => changePage("next"))

entriesOption.addEventListener("change", (e) => {
  // convert entry size value to integer
  entrySize = Number(e.target.value)
  adjustTable()
})

getDataBtn.addEventListener("click", getData)

function adjustTable() {
  if (results.length === 0) return
  currentShowingData = splitData(results, entrySize)
  currentIndex = 0
  currentPaginatedData = currentShowingData[currentIndex]
  drawTable(currentPaginatedData)
}

async function getData() {
  const data = await fetch("./data.json").then((res) => res.json())
  results = data
  currentShowingData = splitData(results, entrySize)
  currentPaginatedData = currentShowingData[currentIndex]
  drawTable(currentPaginatedData)
}

// /**
//  *
//  * @param {Array} list The array of data -- iterated and passed in to drawTable()
//  * @param {int} currentPage The current index of the list passed in: starts at 0 (add 1 to change the page text)
//  * @param {int} maxPageSize The maximum allowed page count of the list based on entry size
//  * @param {string} input Takes a string value of either "next" or "prev"
//  */
function changePage(input) {
  const numberOfPages = currentShowingData.length
  if (input === "prev") {
    if (currentIndex !== 0) {
      currentIndex -= 1
      console.log(currentShowingData[currentIndex])
    } else {
      console.log("Can't go back!")
      return
    }
  }

  if (input === "next") {
    if (currentIndex < numberOfPages - 1) {
      currentIndex += 1
    } else {
      console.log("Can't go forward!")
      return
    }
  }
  currentPaginatedData = currentShowingData[currentIndex]
  console.log(currentPaginatedData)
  drawTable(currentPaginatedData)
}

/**
 * @param {Array} list
 * @param {int} chunkSize
 * @returns {Array<Array<object>}
 */
function splitData(list, chunkSize) {
  let tempArray = []

  for (let i = 0; i < list.length; i += chunkSize) {
    newChunk = list.slice(i, i + chunkSize)
    tempArray.push(newChunk)
  }

  // const newResults = Array.from({ length: numberOfPages }, (_, index) => {
  //   const start = index * maxEntrySize;
  //   const end = start + maxEntrySize;

  //   return list.slice(start, end);
  // });

  return tempArray
}

function createTableRow(data) {
  const { first_name, last_name, email } = data

  const tableRowEl = document.createElement("tr")
  const firstName = document.createElement("td")
  const lastName = document.createElement("td")
  const userEmail = document.createElement("td")
  firstName.innerHTML = `${first_name}`
  lastName.innerHTML = `${last_name}`
  userEmail.innerHTML = `${email}`
  tableRowEl.appendChild(firstName)
  tableRowEl.appendChild(lastName)
  tableRowEl.appendChild(userEmail)
  tableDisplayData.push(tableRowEl)
}

/**
 * Adds onto the table body a single table data
 * @param {object} listItem
 * @param {Boolean} isFiltering
 */
function drawTable(list, isFiltering = false) {
  const tableBody = document.getElementById("table-body")
  tableDisplayData = []
  tableBody.innerHTML = ""
  if (isFiltering) {
    updateEntriesText()
  }

  list.forEach((listItem) => {
    createTableRow(listItem)
  })

  tableDisplayData.forEach((listItem) => {
    tableBody.appendChild(listItem)
  })
}

/**
 * Updates the text on showing entries display -- THESE VARIABLE NAMES MAY CHANGE
 * @param {Number} currentEntryIndex The size of the current Index of results
 * @param {Number} totalEntrySize Size of entries array
 * @param {Number} maxEntrySize
 * @param {Boolean} isFiltering Updates the showing entries text based on if the user is currently filtering exisiting results
 */
function updateEntriesText(
  currentEntryIndex,
  totalEntrySize,
  maxEntrySize,
  isFiltering
) {
  const entriesText = document.getElementById("entries-text")
  let textValue = `Showing ${currentEntryIndex + 1} to ${
    currentEntryIndex + 1 + maxEntrySize
  } of ${totalEntrySize} entries`

  entriesText.innerHTML = textValue
}

function updatePageText(pageNumber) {
  const pageNumberText = document.getElementById("page-number")
  pageNumberText.innerText = pageNumber
}

/**
 * @param {Node} targetBtn
 */
function disablePaginateButton(targetBtn) {
  targetBtn.disabled = true
}

function enablePaginateButton(targetBtn) {
  targetBtn.disabled = false
}

// getData();
