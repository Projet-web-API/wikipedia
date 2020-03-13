// client-side js
// run by the browser each time your view template is loaded
const form = document.querySelector('.searchForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector('.search-input').value;
  const searchQuery = input.trim();
  fetchResults(searchQuery);
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}


// more on using wikipedia action=query https://www.mediawiki.org/wiki/API:Query
function fetchResults(searchQuery) {
	  var json = JSON.parse(httpGet(`https://fr.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=${searchQuery}`));
    var search = json.query.search;
    console.log(search[0]);
    displayResults(search[0]);
}

// more on using wikipedia action=query https://www.mediawiki.org/wiki/API:Query
function fetchText(searchQuery, pageId) {
  var json = JSON.parse(httpGet(`https://fr.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&titles=${searchQuery}&redirects=1&exintro=1&explaintext=1`));
  var pages = json.query.pages;
  return pages[pageId];
}

// display resuts on the page
function displayResults(results) {
  const searchResults = document.querySelector('.searchResults');
  searchResults.innerHTML = '';
  const url = encodeURI(`https://fr.wikipedia.org/wiki/${results.title}`);
  const text = fetchText(results.title, results.pageid);

   searchResults.insertAdjacentHTML('beforeend',
    `<div class="resultItem">
      <h3 class="resultItem-title">
        <a href="${url}" target="_blank" rel="noopener">${results.title}</a>
      </h3>
      <span class="resultItem-snippet">${text.extract}</span><br>
    </div>`
  );
}
//action=query&format=json&prop=extracts&titles=${searchQuery}&exchars=1200&exlimit=max&exintro=1&explaintext=1
//action=query&format=json&prop=extracts%7Cinfo&list=search&titles=${searchQuery}&exchars=1200&exlimit=max&exintro=1&explaintext=1&inprop=url&srsearch=${searchQuery}&srlimit=1
//action=query&format=json&prop=extracts&titles=Paris&exchars=1200


// // client-side js
// // run by the browser each time your view template is loaded

// const form = document.querySelector('.searchForm');
// form.addEventListener('submit', handleSubmit);

// function handleSubmit(event) {
//   event.preventDefault();
//   const input = document.querySelector('.search-input').value;
//   const searchQuery = input.trim();
//   fetchResults(searchQuery);
// }


// // more on using wikipedia action=query https://www.mediawiki.org/wiki/API:Query
// function fetchResults(searchQuery) {
// 	  const endpoint = `https://fr.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=${searchQuery}`;
//   	fetch(endpoint)
//   		.then(response => response.json())
//   		.then(data => {
//         const results = data.query.search;
//         displayResults(results);
// 		})
//     .catch(() => console.log('An error occurred'));
// }

// // more on using wikipedia action=query https://www.mediawiki.org/wiki/API:Query
// function fetchText(searchQuery, pageId) {
//   const endpoint = `https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${searchQuery}&exchars=1200`;
//   fetch(endpoint)
//     .then(response => response.json())
//     .then(data => {
//       const results = data.query.pages.pageId;
//       return results;
//   })
//   .catch(() => console.log('An error occurred'));
// }

// // display resuts on the page
// function displayResults(results) {
//   const searchResults = document.querySelector('.searchResults');
//   searchResults.innerHTML = '';
//   const result = results[0];
//   const url = encodeURI(`https://fr.wikipedia.org/wiki/${result.title}`);
//   const text = fetchText(searchQuery, result.pageid);
//   const t = text[0];

//    searchResults.insertAdjacentHTML('beforeend',
//     `<div class="resultItem">
//       <h3 class="resultItem-title">
//         <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
//       </h3>
//       <span class="resultItem-snippet">${t.extract}</span><br>
//     </div>`
//   );
// }
// //action=query&format=json&prop=extracts&titles=${searchQuery}&exchars=1200&exlimit=max&exintro=1&explaintext=1
// //action=query&format=json&prop=extracts%7Cinfo&list=search&titles=${searchQuery}&exchars=1200&exlimit=max&exintro=1&explaintext=1&inprop=url&srsearch=${searchQuery}&srlimit=1
// //action=query&format=json&prop=extracts&titles=Paris&exchars=1200