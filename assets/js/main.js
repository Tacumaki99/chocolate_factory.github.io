const products = [
  {
    image: "Camera.jpg",
    name: "Chocolate Camera",
    price: 19.99,
    description: "A delicious chocolate replica of a classic camera."
  },
  {
    image: "Viola.png",
    name: "Chocolate viola",
    price: 29.99,
    description: "Looks like a phone, tastes like chocolate."
  },
  {
    image: "Pistol.jpg",
    name: "Chocolate Pistol",
    price: 39.99,
    description: "Luxury design, sweet flavor."
  },
  {
    image: "AroundA.jpg",
    name: "Chocolate @",
    price: 19.99,
    description: "A delicious chocolate replica of a monkey A."
  },
  {
    image: "Horseshoe.jpg",
    name: "Chocolate Horseshoe",
    price: 29.99,
    description: "Looks like a horseshoe, tastes like chocolate."
  },
  {
    image: "Lighter.jpg",
    name: "Chocolate Lighter",
    price: 39.99,
    description: "A delicious chocolate replica of a lighter."
  }
];


const holder = document.getElementById("product-holder");

let html = "";

products.forEach(product => {
  html += `
    <div class="product-card">
      <img src="assets/images/${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">$${product.price}</p>
      <button>Add to Cart</button>
    </div>
  `;
});

holder.innerHTML = html;

//slider

$(document).ready(function () {
    let index = 0;
    const slides = $('.service-slide');
    const total = slides.length;

    const dotsContainer = $('.service-dots');
    const serviceItems = $('.services-list li');

    // Create dots
    slides.each(function (i) {
        dotsContainer.append(`<span class="service-dot" data-index="${i}"></span>`);
    });

    const dots = $('.service-dot');

    function updateSlider() {
        $('.services-track').css(
            'transform',
            `translateX(-${index * 100}%)`
        );

        // Update dots
        dots.removeClass('active');
        dots.eq(index).addClass('active');

        // Update services list
        serviceItems.removeClass('active');
        serviceItems.eq(index).addClass('active');
    }

    // Initial state
    updateSlider();

    $('.service-btn.next').click(function () {
        index = (index + 1) % total;
        updateSlider();
    });

    $('.service-btn.prev').click(function () {
        index = (index - 1 + total) % total;
        updateSlider();
    });

    dots.click(function () {
        index = $(this).data('index');
        updateSlider();
    });

    serviceItems.click(function () {
        index = $(this).data('index');
        updateSlider();
    });
});


//form
$(document).ready(function () {

    const form = $('.signup-form');
    const submitBtn = form.find('button[type="submit"]');

    // RegEx patterns
    const nameRegex  = /^[A-Za-zÀ-ž\s'-]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phoneRegex = /^[0-9+\s()-]{7,}$/;

    function validateField(field, regex, message) {
        const val = field.val().trim();
        const errorSpan = field.siblings('.input-error');

        if (!val || (regex && !regex.test(val))) {
            errorSpan.text(message);
            return false;
        } else {
            errorSpan.text('');
            return true;
        }
    }

    function validateDate(field) {
    const val = field.val();
    const errorSpan = field.siblings('.input-error');

    if (!val) {
        errorSpan.text('Please select a date.');
        return false;
    }

    const selectedDate = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // remove time

    if (selectedDate < today) {
        errorSpan.text('Date must be in the future.');
        return false;
    }

    errorSpan.text('');
    return true;
}

    function validateForm() {
        let valid = true;

        valid &= validateField($('#first-name'), nameRegex, 'Please enter a valid first name.');
        valid &= validateField($('#last-name'), nameRegex, 'Please enter a valid last name.');
        valid &= validateField($('#email'), emailRegex, 'Please enter a valid email address.');
        valid &= validateField($('#phone'), phoneRegex, 'Please enter a valid phone number.');
        valid &= validateField($('#people'), /^[1-9]\d*$/, 'Enter at least 1 person.');
        valid &= validateDate($('#date'));

        // Disable submit if invalid
        submitBtn.prop('disabled', !valid);

        return valid;
    }

    // Validate on input/change
    form.find('input, select').on('input change', function () {
        validateForm();
    });

    // Initial check
    validateForm();

    // On submit
    form.on('submit', function (e) {
        e.preventDefault();
        if (validateForm()) {
            alert('Reservation submitted successfully!');
            this.submit();
        }
    });
});

