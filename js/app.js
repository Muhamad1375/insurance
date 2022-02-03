//*******************/
//variables
//*******************/
const form = document.getElementById('request-quote');
const html = new HTMLUI();




//*******************/
//event listeners
//*******************/
eventListeners();
function eventListeners() {
      document.addEventListener('DOMContentLoaded', function() {
            //create the <option> for the year
            html.displayYears();
      });
      //when the form is submitted
      form.addEventListener('submit', function(e) {
            e.preventDefault();
            //read the values from the forms
            const make = document.getElementById('make').value;
            const year = document.getElementById('year').value;
            //read the radio buttons
            const level = document.querySelector('input[name="level"]:checked').value;

            //check that all the fields have something
            if (make === '' || year === '' || level === '') {
                  html.displayError('All the fields are mandatory');
            } else {
                  //clear the previous quots
                  const prevResult = document.querySelector('#result div');
                  if (prevResult != null) {
                        prevResult.remove();
                  }
                  // make the quotation
                  const insurance = new Insurance(make, year, level);
                  const price = insurance.calculateQuotation(insurance);

                  //print the result from HTMLUI
                  html.showResults(price, insurance);
            }
      });
} 

//*******************/
//objects
//*******************/



// everything related to the quotation and calculation is insurance
function Insurance(make, year, level) {
      this.make = make;
      this.year = year;
      this.level = level;
}

//calculate price for the current quotation
Insurance.prototype.calculateQuotation= function(insurance) {
       let price;
       const base = 2000;

       //get the make
       const make = insurance.make;

       /*
            1 = American 15%
            2= Asian 5%
            3=European 35%
       */
      switch (make) {
            case '1':
                  price = base * 1.15;
                  break;
            case '2':
                  price = base * 1.05;
                  break;
            case '3':
                  price = base * 1.35;
                  break;
      }
     //get the year
     const year = insurance.year;

     //get the yeras difference
     const difference = this.getYearDifference(year);

     // each year the cost of the insurance is going to be 3% cheaper
     price = price - ((difference * 3) * price) / 100;


     //check the level of protection
     const level = insurance.level;

     price = this.calculateLevel(price, level);

      return price;

}


//returns the difference between years
Insurance.prototype.getYearDifference = function(year) {
      return new Date().getFullYear() - year;
}

//adds the value based on the level of protection
Insurance.prototype.calculateLevel = function(price, level) {
      /*
       Basic insurance is going to increase the value by 30%
      Complete Insurance is going to increaste the value by 50%
      */
     if (level === 'basic') {
           price = price * 1.30;
     } else {
             price = price * 1.50;

     }
     return price;
}

//everything related to the HTML
function HTMLUI() {}


//Displays the latest 20 years in the select
HTMLUI.prototype.displayYears = function() {
      // Max & min years
      const max = new Date().getFullYear(),
            min = max - 20;

      //generate the list with the latest 20 years
      const selectYears = document.getElementById('year');

      //print the values
      for (let i = max; i >= min; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            selectYears.appendChild(option);
      }
}

//prints an error

HTMLUI.prototype.displayError = function(message) {
      // create a div
      const div = document.createElement('div');
      div.classList = 'error';
 
      // insert the message
      div.innerHTML = `
           <p>${message}</p>
      `;
 
      form.insertBefore(div, document.querySelector('.form-group'));
      //remove the error
      setTimeout(function() {
            document.querySelector('.error').remove();
      }, 3000)

}

//print the result in to the html
HTMLUI.prototype.showResults = function(price, insurance) {
      // print the result
      const result = document.getElementById('result');

      //create a div with the result
      const div = document.createElement('div');

      let make = insurance.make;

      //get make from the object and assign a readable name

      switch (make) {
            case '1':
                  make = 'American';
                  break;
            case '2':
                  make = 'Asian';
                  break;
            case '3':
                  make = 'Europian';
                  break;
      }

      console.log(make);

      //insert the result
      div.innerHTML =  `
      <p class="header">Summary</p>
      <p>Make: ${make} </p>
      <p>Year: ${insurance.year}</p>
      <p>Level: ${insurance.level}</p>
            <p class="total">Total: ${price} </p>
      `;

      const spinner = document.querySelector('#loading img');
      spinner.style.display = 'block';
      
      setTimeout(function() {
            spinner.style.display = 'none';
            //insert into the Html
            result.appendChild(div);
      },3000)

}