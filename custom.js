(function () {
    const sec2 = document.getElementsByClassName("sec2")
    const remote = document.getElementsByClassName("remote");
    const remoteBtn = Array.from(document.querySelectorAll(".remote li"));
    const productContent = document.getElementsByClassName("content");
    const contentBg = document.querySelectorAll(".product .bg");
    const contentObject = document.querySelectorAll(".object");
    const contentObjectImg = document.querySelectorAll(".object img");
    let currentTimeline;
    let previousIndex = 0;
    let activeIndex = 0;
    let firstClickFlag = false;

    function init() {
        gsap.set(contentBg, { transform: "translateY(100%)" });
        gsap.set(contentObjectImg, { transform: "translateY(100%)" });
        gsap.set(contentBg[0], { transform: "translateY(0)" });
        gsap.set(contentObjectImg[0], { transform: "translateY(0)" });
        productContent[0].classList.add("active");
    }

    init();

    remoteBtn.forEach(function (btn, index) {
        btn.addEventListener("click", function () {
            if (firstClickFlag === false) {
                previousIndex = 1;
                firstClickFlag = true;
            }

            if (index === activeIndex) {
                return;
            }

            remoteBtn.forEach(function (b) {
                b.classList.toggle("active", b === btn);
            });

            Array.from(productContent).forEach(function (content, i) {
                if (i !== index) {
                    content.classList.remove("active");
                    gsap.set(contentBg[i], { transform: "translateY(100%)" });
                    gsap.set(contentObjectImg[i], { transform: "translateY(100%)" });
                } else {
                    productContent[i].style.backgroundImage = "url(images/item" + previousIndex + "_bg.jpg)";
                    // console.log(previousIndex);
                    content.classList.add("active");
                }
            });

            if (currentTimeline) {
                currentTimeline.kill();
            }

            currentTimeline = gsap.timeline();
            currentTimeline
                .to(contentBg[index], {
                    transform: "translateY(0)",
                    duration: 0.75,
                    ease: "power2.out"
                })
                .to(contentObjectImg[index], {
                    delay: 0.3,
                    transform: "translateY(0)",
                    duration: 0.75,
                    ease: "power2.out"
                }, "<");

            previousIndex = index + 1;
            activeIndex = index;
        });
    });

    const sec2Tl = gsap.timeline({
        scrollTrigger: {
            trigger: sec2,
            start: "top top",
            end: "bottom bottom",
            markers: false,
            onEnter: () => {
                contentObject.forEach(function (obj) {
                    obj.classList.add("active");
                });
            }
        }
    });
})();