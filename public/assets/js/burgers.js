
//Setting up javascript for the front end.
// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
  if (event) {
    console.info('DOM loaded');
  }

  // UPDATE
  const changeBurgerBtns = document.querySelectorAll('.devour');

  // Set up the event listener for the create button
  if (changeBurgerBtns) {
    changeBurgerBtns.forEach((button) => {
      button.addEventListener('click', (e) => {
        console.log('click')

        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute('data-id');
        const devoured = e.target.getAttribute('data-devoured');

        const burgerEaten = {
          devoured: devoured,
        };

        fetch(`/api/burger/${id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

     
          body: JSON.stringify(burgerEaten),
        }).then((response) => {

          if (response.ok) {
            console.log(`changed burger to: ${burgerEaten}`);
            location.reload('/');
          } else {
            alert('something went wrong!');
          }
        });
      });
    });
  }

  // CREATE
  const createBurger = document.getElementById('create-form');

  if (createBurger) {
    createBurger.addEventListener('submit', (e) => {
      e.preventDefault();

      // Grabs the value of the textarea that goes by the name, "quote"
      const newBurger = {
        burger_name: document.getElementById('burger').value.trim(),
        
      };

      // Send POST request to create a new quote
      fetch('/api/burger', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

   
        body: JSON.stringify(newBurger),
      }).then(() => {
        // Empty the form
        document.getElementById('burger').value = '';

      
        console.log('Created a new burger!');
        location.reload();
      });
    });
  }

  // DELETE
  const deleteBurgerBtn = document.querySelectorAll('.delete-burger');

  // Set up the event listeners for each delete button
  deleteBurgerBtn.forEach((button) => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      console.log(id)
      // Send the delete request
      fetch(`/api/burger/${id}`, {
        method: 'DELETE',
      }).then((res) => {
        console.log(res);
        console.log(`Deleted burger: ${id}`);

        // Reload the page
        location.reload();
      });
    });
  });
});

