async function getData() {
  const data = await fetch("./data.json").then((res) => res.json())
  createTableRow(data)
}

function createTableRow(data) {
  const { id, first_name, last_name, email } = data
  let rowHTML = `
  <tr data-key=${id}>
    <td>${first_name}</td>
    <td>${last_name}</td>
    <td>${email}</td>
  </tr>
`
  return rowHTML
}

function pagination(currentIndex, totalCount, maxEntrySize, list) {
  const lastPage = Math.ceil(totalCount / maxEntrySize)

  const newResults = Array.from({ length: lastPage }, (_, index) => {
    const start = index * maxEntrySize
    const end = start + maxEntrySize

    return list.slice(start, end)
  })

  const currentPageDisplayNum = currentIndex + 1

  return {newResults, currentPageDisplayNum}
}

function drawTable() {}

getData()
