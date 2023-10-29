function getRandom(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

const stars: NodeListOf<HTMLElement> = document.querySelectorAll(".star");

stars.forEach((star: HTMLElement, index: number) => {
    const top: string = getRandom(0, 100) + "vh";
    const left: string = getRandom(0, 100) + "vw";
    const delay: string = getRandom(0, 15) + "s";

    star.style.top = top;
    star.style.left = left;
    star.style.animationDelay = delay;
});
