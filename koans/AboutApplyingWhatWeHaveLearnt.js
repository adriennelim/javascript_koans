var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */

      function hasNoMushrooms (ingredient) { 
        return ingredient !== 'mushrooms';
      }; 

      productsICanEat = products.filter(function(product){
        return product.containsNuts === false && _(product.ingredients).all(hasNoMushrooms);
      })

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    /* try chaining range() and reduce() */
    var sum = _(_.range(1000)).chain()
                           .filter(function(num) { return num % 3 === 0 || num % 5 === 0 })
                           .reduce(function(total, filteredNum) { return total + filteredNum })
                           .value();

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
//   products = [
//     { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
//     { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
//     { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
//     { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
//     { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
//  ]; 
  
  it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    ingredientCount = _(products).chain()
                               .map(function(product) { return product.ingredients })  //should return array of arrays (ingredients only)
                               .flatten()   //flatten to an array with all ingredients
                               .reduce(function(allIngredients, ingredient) {
                                  allIngredients[ingredient] = (allIngredients[ingredient] || 0 ) + 1;
                                  return allIngredients;
                                }, {})
                               .value();
                               
    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* EXTRA CREDIT */
  
  //Largest Prime Factor of a Composite Number
  //Composite number: positive integer that can be formed by multiplying two smaller positive integers

  it("should find the largest prime factor of a composite number (imperative)", function () {
    
    function isPrimeNumber(number) {
      var isPrime = true;
      for (var divisor = 2; divisor < number; divisor++) {
        if (number % divisor === 0) {
          isPrime = false;
        }
      }
      return isPrime;
    };

    function listAllFactors(compositeNumber) {
      var factors = [];
      for ( var number = 2; number < compositeNumber; number++ ) {
        if (compositeNumber % number === 0) {
          factors.push(number);
        }
      }
      return factors;
    };

    function largestPrimeNumberOfAComposite(compositeNumber) {
      var factors = listAllFactors(compositeNumber);
      var primeNumbers = [];
      for (var i = 0; i < factors.length ; i++) {
        if (isPrimeNumber(factors[i])) {
          primeNumbers.push(factors[i]);
        }
      }
      return primeNumbers.length > 1 ? Math.max(...primeNumbers) : "not found";
    };

    expect(largestPrimeNumberOfAComposite(56)).toBe(7);
    expect(largestPrimeNumberOfAComposite(13)).toBe("not found");
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    
  });

  it("should find the 10001st prime", function () {

  });
  
});
