const engine = new Howl({
    src: ["audio/engine.mp3"],
    onend: function () {},
    sprite: {
        start: [100, 3000],
        startMove: [10000, 3000],
        slow: [33300, 2000, true],
        move: [40700, 3500, true],
        boost: [48000, 4000, true],
        fast: [51000, 3000, true],
    },
    volume: Howler.volume(),
});

const crush = new Howl({
    src: ["audio/crush1.mp3"],
    volume: Howler.volume(),
});
