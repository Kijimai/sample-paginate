let maxPage = 1;
let results = [];
let foundData = [];

async function getData() {
  const data = await fetch("./data.json").then((res) => res.json());
  results = data;
}

function createTableRow(data, listHolder) {
  const { first_name, last_name, email } = data;

  const tableRowEl = document.createElement("tr");
  const firstName = document.createElement("td");
  const lastName = document.createElement("td");
  const userEmail = document.createElement("td");
  firstName.innerHTML = `${first_name}`;
  lastName.innerHTML = `${last_name}`;
  userEmail.innerHTML = `${email}`;
  tableRowEl.appendChild(firstName);
  tableRowEl.appendChild(lastName);
  tableRowEl.appendChild(userEmail);
  listHolder.push(tableRowEl);
}

/**
 *
 * @param {Array} list The array of data -- iterated and passed in to drawTable()
 * @param {int} currentPage The current index of the list passed in: starts at 0 (add 1 to change the page text)
 * @param {int} maxPageSize The maximum allowed page count of the list based on entry size
 * @param {string} input Takes a string value of either "next" or "prev"
 */
function changePage(list, currentPage, maxPageSize, input) {
  let newPageNum = 0;
  if (input === "next") {
    if (currentPage + 1 === maxPageSize) return;
    else {
      newPageNum = currentPage + 2;
    }
  } else if (input === "prev") {
    if (currentPage + 1 === 1) return;
    else {
      newPageNum = currentPage + 1 - 1;
    }
  }

  updatePageText(newPageNum);
}

function pagination(currentIndex, totalCount, maxEntrySize, list) {
  const lastPage = Math.ceil(totalCount / maxEntrySize);

  const newResults = Array.from({ length: lastPage }, (_, index) => {
    const start = index * maxEntrySize;
    const end = start + maxEntrySize;

    return list.slice(start, end);
  });

  const currentPageDisplayNum = currentIndex + 1;

  return { newResults, currentPageDisplayNum };
}

/**
 * Adds onto the table body a single table data
 * @param {object} listItem
 * @param {Boolean} isFiltering
 */
function drawTable(listItem, isFiltering = false) {
  const tableBody = document.getElementById("table-body");
  if (isFiltering) {
    updateEntriesText();
  }
  tableBody.appendChild(listItem);
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
  const entriesText = document.getElementById("entries-text");
  let textValue = `Showing ${currentEntryIndex + 1} to ${
    currentEntryIndex + 1 + maxEntrySize
  } of ${totalEntrySize} entries`;

  entriesText.innerHTML = textValue;
}

function updatePageText(pageNumber, maxPageSize) {
  const pageNumber = document.getElementById("page-number");
  pageNumber.innerText = pageNumber;
}


function disablePaginateButton(btn) {
  if (btn === "prev") {
    document.getElementById("prev").disabled = true;
  }
  if (btn === "next") {
    document.getElementById("next").disabled = true;
  }
}

function enablePaginateButton(btn) {
  if (btn === "prev") {
    document.getElementById("prev").disabled = false;
  }
  if (btn === "next") {
    document.getElementById("next").disabled = false;
  }
}

// getData()
