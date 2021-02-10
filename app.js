const searchMeal = async () => {
    const searchInputText = document.getElementById('search-input').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputText}`
    //console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    getMealBox(data.meals);
}
const getMealBox = food => {
    console.log(food[0].strMeal);
    const mealContainer = document.getElementById("meal");
    food.forEach(meal => {
        /* console.log(meal.strMeal);
        const li = document.createElement("li");
        li.innerHTML = `
            <h3>${meal.strMeal}</h3>
        `;
        mealContainer.appendChild(li); */
        const div = document.createElement("div");
        div.innerHTML = '';
        div.innerHTML = `
        <div class="col meal-item" >
            <div class="card">
                <img onclick="getRecipeDetails('${meal.idMeal}')" class = "meal-img recipe"src="${meal.strMealThumb}" alt="">
                <div class="card-body">
                    <h3 class="card-title meal-name">${meal.strMeal}</h3>
                    
                </div>
            </div>
        </div>
        `;
        mealContainer.appendChild(div);
    });
}
const getRecipeDetails = async (meal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`;
    //console.log(url);
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayRecipe(data.meals);
    }
    catch{
        displayError("Sorry,failed to load.Try again later");
    }

}

const displayRecipe = meal => {
    const mealDetailsContent = document.querySelector('.meal-details-content');
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p >${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        
    `;
    mealDetailsContent.innerHTML = html;
}

const displayError = error => {
    const errorText = document.getElementById("error");
    errorText.innerText = error;
}
