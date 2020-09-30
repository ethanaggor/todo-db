// Create a reference to the item collection - get all the documents from the collection
const itemList = document.querySelector("#item-list");

// Create element and render item documents
//* Create li
//* li stores ingredients (user content)
function renderItem(doc) {
  let li = document.createElement("li");
  let ingredient = document.createElement("span");

  //   set an attribute to the li tag
  //   population
  li.setAttribute("data-id", doc.id);
  ingredient.textContent = doc.data().ingredient;

  //   append
  li.appendChild(ingredient);
  itemList.appendChild(li);
}

//? This is an asynchronous request.. It takes time to complete and returns a promise
//? .then() fires and takes back a callback function that executes when the db and .get()
db.collection("items")
  .get()
  .then((snapshot) => {
    //?   .forEach() cycles through each element in the array of collection items
    snapshot.docs.forEach((doc) => {
      renderItem(doc);
    });
  });
