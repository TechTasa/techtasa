document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".apexify-slide");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Automatically change slide every 5 seconds
  setInterval(nextSlide, 5000);

  // Show the first slide initially
  showSlide(currentSlide);
});









let menubtn = document.getElementsByClassName("navbar-menu")[0];
let NavbarLinks = document.getElementsByClassName("navbar-nav-list")[0];

menubtn.addEventListener("click", () => {
  console.log("Toggled");
  NavbarLinks.classList.toggle("active");
  return;
});

let servicebtn = document.getElementById("abc");
let arrowdwn = document.getElementById("umair")
let ServiceLinks = document.getElementsByClassName(
  "navbar-nav-list-links-services"
)[0];

console.log("here");
servicebtn.addEventListener("click", () => {

  ServiceLinks.classList.toggle("active");
  arrowdwn.classList.toggle("active")
  console.log("Toggled");
});



const storybtn = document.querySelectorAll('.story-contents-title');
console.log(storybtn);
storybtn.forEach(item => {
  item.addEventListener('click', () => {
    console.log(item);
    item.classList.toggle("active")
    item.closest('.story-contents').querySelector('.story-contents-discription').classList.toggle("active");
    // item.nextElementSibling.classList.toggle("active")


  })
})

let meetingbtn = document.querySelectorAll(".lg-cta");
let salesMeeting = document.querySelector(".sales-meeting");
let closeForm = document.querySelector(".close-form");
let x = window.matchMedia("(max-width:850px)")



meetingbtn.forEach(element => {
  element.addEventListener("click", () => {
    if (element.textContent == "Learn more on Marketing Qualified Leads") {
      if (x.matches) {
        console.log("Matches");
        salesMeeting.classList.toggle("active")
        salesMeeting.style.top = "1550px";
      }
      else {
        salesMeeting.classList.toggle("active")
        salesMeeting.style.top = "700px";
      }

    }
    else if (element.textContent == "Learn more on Highly Qualified Leads") {
      if (x.matches) {
        salesMeeting.classList.toggle("active")
        salesMeeting.style.top = "2150px";
      }
      else {
        salesMeeting.classList.toggle("active")
        salesMeeting.style.top = "1380px";
      }

    }
    else {
      salesMeeting.classList.toggle("active")
      salesMeeting.style.top = "140px";
    }
  });
});


closeForm.addEventListener("click", () => {
  event.preventDefault();
  salesMeeting.classList.remove("active")
});
// NAVBAR  (↑)







