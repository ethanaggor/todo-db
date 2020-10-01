// Create a reference to the item collection - get all the documents from the collection
const itemList = document.querySelector("#item-list");
const form = document.querySelector("#add-list-item");

// Create element and render item documents
//* Create li
//* li stores ingredients (user content)
function renderItem(doc) {
  let li = document.createElement("li");
  let ingredient = document.createElement("span");
  let cross = document.createElement("div");

  //   set an attribute to the li tag
  //   population
  li.setAttribute("data-id", doc.id);
  ingredient.textContent = doc.data().ingredient;
  cross.textContent = "x";

  //   append
  li.appendChild(ingredient);
  itemList.appendChild(li);
  li.appendChild(cross);

  // delete data
  cross.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("items").doc(id).delete();
  });
}

// //? This is an asynchronous request.. It takes time to complete and returns a promise
// //? .then() fires and takes back a callback function that executes when the db and .get()
// db.collection("items")
//   .get()
//   .then((snapshot) => {
//     //? .forEach() cycles through each element in the array of collection items
//     snapshot.docs.forEach((doc) => {
//       renderItem(doc);
//     });
//   });

//? Set up a listener that listens for the initial documents AND changes in the database - REALTIME
db.collection("items")
  .orderBy("ingredient")
  .onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type == "added") {
        renderItem(change.doc);
      } else if (change.type == "removed") {
        let li = itemList.querySelector(`[data-id="${change.doc.id}"]`);
        itemList.removeChild(li);
      }
    });
  });

// Save data from frontend
//? Listen for a submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (form.ingredient.value !== "") {
    db.collection("items").add({
      ingredient: form.ingredient.value,
    });
    form.ingredient.value = "";
  }
});
