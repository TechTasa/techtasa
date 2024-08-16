$(".custom-carousel").owlCarousel({
    autoWidth: true,
    loop: true
});
$(document).ready(function () {
    $(".custom-carousel .item").click(function () {
        $(".custom-carousel .item").not($(this)).removeClass("active");
        $(this).toggleClass("active");
    });
});

const avatar = document.querySelector("#avatar")
const review = document.querySelector("#review")
const names = document.querySelector("#names")
let count = 0

const reviews = [
    {
        name: "Mohammad(London,UK)",
        review: "Very great job and amazing result, so convenient and I highly recommend them,straight forward and so accurate, I'm extremely happy with the job that they've done. Thank you, Tech Tasa for a great job, and I will definitely hire you for future project",
        avatar: "https://images.unsplash.com/photo-1524383880260-db51af30f5e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
    },
    {
        name: "Bill Penrose(Philadelphia,USA)",
        review: "I wanted to thank Tech Tasa team for a fantastic job they did on my app development project. The company has very high standards and did an incredible job",
        avatar: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTN8fHBoaWxhZGVscGhpYSUyMG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60"
    },
    {
        name: "Jayanta Das(Kolkata,India)",
        review: "A great experience for me.My project was managed very well by Tech Tasa.Their communication skills exceeded my expectations.The quality of end product was above par.I highly recommend them",
        avatar: "https://images.unsplash.com/photo-1619380061814-58f03707f082?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aW5kaWFuJTIwbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
    }
]

let activeReview = reviews[0]

function updateCarousel() {
    avatar.setAttribute("src", activeReview.avatar)
    // name.innerHTML = activeReview.name
    review.innerHTML = activeReview.review
    names.innerHTML = ""

    if (review.classList.contains('animate')) {
        avatar.classList.remove('animate')
        review.classList.remove('animate')
    }

    setTimeout(() => {
        review.classList.add('animate')
        avatar.classList.add('animate')
    }, 100)

    reviews.forEach(review => {
        const name = document.createElement('li')

        if (review.name === activeReview.name) {
            name.style.color = '#ffffff'
        }

        name.appendChild(document.createTextNode(review.name))
        names.appendChild(name)
    })
}

setInterval(() => {
    if (count === (reviews.length - 1)) {
        count = 0
    } else {
        count = count + 1
    }

    activeReview = reviews[count]

    updateCarousel()
}, 3000)

// updateCarousel()