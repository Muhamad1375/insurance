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


