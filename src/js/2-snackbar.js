import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');
    
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const delayInput = document.querySelector('input[name="delay"]');
      const stateInputs = document.querySelectorAll('input[name="state"]');
      
      const delay = parseInt(delayInput.value); // Зчитуємо значення затримки і перетворюємо на число
      
      let chosenState;
      for (const stateInput of stateInputs) {
        if (stateInput.checked) {
          chosenState = stateInput.value;
          break;
        }
      }
      
      // Створюємо новий проміс
      const promise = new Promise((resolve, reject) => {
        if (chosenState === 'fulfilled') {
          setTimeout(() => {
            resolve(delay); // Виконуємо проміс з затримкою
          }, delay);
        } else if (chosenState === 'rejected') {
          setTimeout(() => {
            reject(delay); // Відхиляємо проміс з затримкою
          }, delay);
        }
      });
      
     promise.then((delay) => {
    iziToast.success({
        title: 'Fulfilled',
      message: `promise in ${delay}ms.`, 
        position: 'topRight'
    });
}).catch((delay) => {
    iziToast.error({
        title: 'Rejected',
        message: `promise in ${delay}ms`,
        position: 'topRight'
    });
});
      // Очистимо поля форми
      delayInput.value = '';
      for (const stateInput of stateInputs) {
        stateInput.checked = false;
      }
    });
  });