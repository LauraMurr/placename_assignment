document.addEventListener('DOMContentLoaded', function () {
  // Initialize carousels
  var imageCarousel = new Siema({
    selector: '.image-carousel',
    perPage: 1,
    loop: true
  });

  var reviewCarousel = new Siema({
    selector: '.review-carousel',
    draggable: true,
    perPage: 1,
    loop: true
  });

  // Image Carousel controls
  document.querySelector('.prev').addEventListener('click', () => imageCarousel.prev());
  document.querySelector('.next').addEventListener('click', () => imageCarousel.next());

  // Review Carousel controls
  document.querySelector('.prev-review').addEventListener('click', () => reviewCarousel.prev());
  document.querySelector('.next-review').addEventListener('click', () => reviewCarousel.next());

  // Function to change slide from thumbnails
  window.changeSlide = (index) => reviewCarousel.goTo(index);

  // Read More Functionality
  var readMoreLinks = document.querySelectorAll('.read-more-link');

  readMoreLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const moreText = this.previousElementSibling;
      const isExpanded = moreText.style.display === 'inline';

      if (isExpanded) {
        moreText.style.display = 'none';
        this.textContent = 'read more...';
      } else {
        moreText.style.display = 'inline';
        this.textContent = 'read less...';
      }
    });
  });
});

  
  