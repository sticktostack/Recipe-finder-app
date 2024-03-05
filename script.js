let searchBox = document.getElementById("searchbox");
let searchForm = document.getElementById("searchform");
let searchBtn = document.getElementById("searchbtn");
let resultArea = document.getElementById("resultarea");
let recipeDetails =  document.getElementById('recipedetails')
let closeBtn = document.getElementById('closeBtn')
// let url = `www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata`

// showing recipe after clicking on get recipe button 
function getRecipe(meal){
  console.log(meal.strIngredient1)
  recipeDetails.style.display = "block"
  closeBtn.style.display = "block"
  recipeDetails.innerHTML = `<h2>${meal.strMeal}</h2>`
}

let keyword = ""; //searching value
function searchRecipe() {
    resultArea.innerHTML = `<h2>almost there. . .</h2>`
  keyword = searchBox.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let meals = data.meals;
      resultArea.innerHTML = "";
      meals.forEach((meal) => {
        let mealBox = document.createElement("div");
        mealBox.id = "meal-box";
        mealBox.innerHTML = `
          <img src = ${meal.strMealThumb}>
          <h3>Name : ${meal.strMeal}</h3>
          <h4>Category : ${meal.strCategory}</h4>
          <h4>${meal.strArea} food</h4>`;
          let button = document.createElement('button')
          button.id = 'recipebtn'
          button.innerHTML = 'Get Recipe'
          mealBox.appendChild(button)

          button.addEventListener('click',()=>{
            getRecipe(meal)
          })
          closeBtn.addEventListener('click',()=>{
            recipeDetails.style.display = 'none'
          })

        resultArea.appendChild(mealBox);
        console.log(meal);
      });
    })
    // handling error 
    .catch((error) => {
        let errorMsg = document.createElement('div')
        errorMsg.id='error'
        errorMsg.innerHTML =`
        <img src = "error404.png">
        <h3><span>"${keyword}"</span> is not available</h3>
        `
        resultArea.appendChild(errorMsg)
      console.log(error);
    });
}
// end of searching searchRecipe function

// adding event on form
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchRecipe();
});
// adding event on search button
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
  searchRecipe();
});