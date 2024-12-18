

// Bagian Product Js dari index.html
document.addEventListener('DOMContentLoaded', function () {
    const productGrid = document.getElementById('productGrid');
    const scrollLeftButton = document.getElementById('scrollLeft');
    const scrollRightButton = document.getElementById('scrollRight');
  
    // Fungsi scroll ke kiri
    scrollLeftButton.addEventListener('click', function () {
      productGrid.scrollBy({
        left: -350, // Scroll ke kiri sejauh 350px
        behavior: 'smooth', // Animasi smooth
      });
    });

    // Fungsi scroll ke kanan
    scrollRightButton.addEventListener('click', function () {
      productGrid.scrollBy({
        left: 350, // Scroll ke kanan sejauh 350px
        behavior: 'smooth', // Animasi smooth
      });
    });

  });

  // blog
document.addEventListener('DOMContentLoaded', function () {
    const blogGrid = document.getElementById('blogGrid');
    const scrollLeftButton1 = document.getElementById('scrollLeft1');
    const scrollRightButton1 = document.getElementById('scrollRight1');
  
    // Fungsi scroll ke kiri
    scrollLeftButton1.addEventListener('click', function () {
     blogGrid.scrollBy({
        left: -350, // Scroll ke kiri sejauh 350px
        behavior: 'smooth', // Animasi smooth
      });
    });
  
    // Fungsi scroll ke kanan
    scrollRightButton1.addEventListener('click', function () {
      blogGrid.scrollBy({
        left: 350, // Scroll ke kanan sejauh 350px
        behavior: 'smooth', // Animasi smooth
      });
    });

  });





    
    
    // Function to show product modal
    function product(productId) {
    const modal = document.getElementById(`productModal${productId}`);
    const closeBtn = document.getElementById(`closeModal${productId}`);
    
    // Show modal
    modal.classList.remove('hidden');
    
    // Close modal when the close button is clicked
    closeBtn.onclick = function () {
      modal.classList.add('hidden');
    }
    
    // Close modal when clicking outside the modal content
    window.onclick = function (event) {
      if (event.target == modal) {
          modal.classList.add('hidden');
      }
    }
    }
    
    // Add event listeners for each button
    document.getElementById('openModal1').addEventListener('click', function() {
    product(1);
    });
    document.getElementById('openModal2').addEventListener('click', function() {
    product(2);
    });
    document.getElementById('openModal3').addEventListener('click', function() {
    product(3);
    });
    document.getElementById('openModal4').addEventListener('click', function() {
    product(4);
    });
    document.getElementById('openModal5').addEventListener('click', function() {
    product(5);
    });
    document.getElementById('openModal6').addEventListener('click', function() {
    product(6);
    });


function showSidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}




function sendToWhatsapp(){
	let number = "+6285283241926";


	let name = document.getElementById('name').value;
	let email = document.getElementById('email').value;
	let message = document.getElementById('message').value;

    
	var url = "https://wa.me/" + number + "?text="
	+ "Name : " +name+ "%0a"
	+ "Email : " +email+ "%0a"
	+ "Message : " +message+ "%0a%0a";
    
    
	window.open(url, '_blank').focus();
}


feather.replace();










