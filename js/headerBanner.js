document.addEventListener('DOMContentLoaded', () => {
    let index = 0;
    const banners = document.querySelectorAll(".banner-img");

    setInterval(() => {
        banners[index].classList.remove("visible");
        index = (index + 1) % banners.length;
        banners[index].classList.add("visible");
    }, 3500);
})