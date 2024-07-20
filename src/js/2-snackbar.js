import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');
    
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const delayInput = document.querySelector('input[name="delay"]');
      const stateInputs = document.querySelectorAll('input[name="state"]');
      
      const delay = parseInt(delayInput.value); 
      
      let chosenState;
      for (const stateInput of stateInputs) {
        if (stateInput.checked) {
          chosenState = stateInput.value;
          break;
        }
      }
      
      
      const promise = new Promise((resolve, reject) => {
        if (chosenState === 'fulfilled') {
          setTimeout(() => {
            resolve(delay); 
          }, delay);
        } else if (chosenState === 'rejected') {
          setTimeout(() => {
            reject(delay); /
          }, delay);
        }
      });
      
      
      promise.then((delay) => {
        console.log(`Fulfilled promise in ${delay}ms.`);
      }).catch((delay) => {
        console.log(`Rejected promise in ${delay}ms.`);
      });
      
      
      delayInput.value = '';
      for (const stateInput of stateInputs) {
        stateInput.checked = false;
      }
    });
  });
  