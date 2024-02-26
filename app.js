//set up the firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://monthly-expenses-fefec-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsInDB = ref(database, "expenses");

const plusBtn = document.getElementById("plus-button");
const deleteBtn = document.getElementById("delete-all");
const expensesDetail = document.getElementById("expenses-details");
const totalExpenses = document.getElementById("total");

//array for storing all the data
let myProducts = [];

//eventlistener click to the plus btn
plusBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //calling all functions with arguments
  storeTheProduct(myProducts);
  /* renderProduct(myProducts); */
  totalExp(myProducts);
});

//eventListener click to the delete all btn
deleteBtn.addEventListener("click", () => {
  deleteItemsInArr(myProducts);

  dataDeleteinDatabase();
});

//store the input values to the array and immidiatly to the firebase
function storeTheProduct(product) {
  //target the inputfields
  const productValue = document.getElementById("product").value;
  const costValue = document.getElementById("cost").value;

  //push these input values to the array
  if (productValue && costValue) {
    const newItem = {
      name: productValue,
      cost: costValue,
    };
    //push it to the array
    product.push(newItem);

    //push it also to the Firebase
    push(itemsInDB, newItem);

    //clear the inputs
    document.getElementById("product").value = "";
    document.getElementById("cost").value = "";
  }
}

//function for adding items to the array
function productToHtml(product) {
  //store the products
  let productHtml = "";

  //loop throught the products and set the variable productHtml to the boilertemplate
  product.forEach((products) => {
    productHtml += `
      <div id="expenses-items" class="expenses-item">
        <p>${products.name}</p>
        <p>${products.cost}€</p>
      </div>
    `;
  });
  //return the boilerplate with these function
  return productHtml;
}

//render the product to the html
function renderProduct(product) {
  //storing the previous function to variable
  let productToRender = productToHtml(product);
  //add these variable to the innerHtml of the div
  expensesDetail.innerHTML += productToRender;
}

//for sum the total expenses
function totalExp(product) {
  //reduce method
  const totalExpense = product.reduce((total, product) => {
    //change the cost value from string to the number
    const cost = parseInt(product.cost);
    //return the sum
    return total + cost;
  }, 0);

  //write it to the innerText of p tag with id total
  totalExpenses.innerText = totalExpense + " €";
}

//for clearing the all divs what are added
function deleteItemsInArr(product) {
  //clear the array
  if (product.length > 0) {
    //target the added divs to the expenses-details (returning the Nodelist)
    const expensesItems = document.querySelectorAll(".expenses-item");
    //target every expenses-items in divs and remove it
    expensesItems.forEach((item) => {
      item.remove();
    });
    //set the total expenses display to 0
    totalExpenses.innerText = "0 €";
  }
}

//fetching/getting the data from database to the div
function fetchTheData() {
  //onValue firebase function for getting the data from itemsInDB
  onValue(itemsInDB, (items) => {
    //change the data from database object to the array
    const dataToArr = Object.values(items.val());

    //clear previous items before adding it from database
    expensesDetail.innerHTML = "";

    //loop throught each item in array
    dataToArr.forEach((data) => {
      renderProduct([data]);
    });
  });
}

//call the function for fetching the data from firebase
fetchTheData();

//deleting items in database
function dataDeleteinDatabase() {
  //get to the database
  let dataToDelete = ref(database, "expenses");
  //firebase remove function to remove all data
  remove(dataToDelete);
}
