const plusBtn = document.getElementById("plus-button");
const expensesDetail = document.getElementById("expenses-details");
const totalExpenses = document.getElementById("total");

//array for storing all the data
let myProducts = [];

//eventlistener click to the plus btn
plusBtn.addEventListener("click", () => {
  //calling all functions with arguments
  storeTheProduct();
  renderProduct(myProducts);
  totalExp(myProducts);
});

function storeTheProduct() {
  //target the inputfields
  const productValue = document.getElementById("product").value;
  const costValue = document.getElementById("cost").value;

  //push these input values to the array
  if (productValue && costValue) {
    myProducts.push({
      name: productValue,
      cost: costValue,
    });
  }

  //clear the inputs
  document.getElementById("product").value = "";
  document.getElementById("cost").value = "";
}

//function for adding items to the array
function productToHtml(product) {
  //store the products
  let productHtml = "";

  //loop throught the products and set the variable productHtml to the boilertemplate
  product.forEach((products) => {
    productHtml = `
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
