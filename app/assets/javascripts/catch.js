function catchGame(){

var game = create_game();
game.init();

function create_game() {
    debugger;
    var level = 1;
    var chips_per_level = 1;
    var min_speed_per_level = 1;
    var max_speed_per_level = 2;
    var last_chip_time = 0;
    var next_chip_time = 0;
    var width = 500;
    var height = 500;
    var delay = 1000;
    var item_width = 50;
    var item_height = 50;
    var total_chips = 0;
    var chip_img = new Image();
    var chip_w = 20;
    var chip_h = 20;
    var wface_img = new Image();
    var c, ctx;

    var chips = [];
    var wface = {
        x: 100,
        y: 100,
        score: 0
    };

    function init() {
        chip_img.src = "images/chips1.png";
        wface_img.src = "images/weinye.png";

        level = 1;
        total_chips = 0;
        chips = [];

        c = document.getElementById("c");
        ctx = c.getContext("2d");
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, 800, 800);

        c.addEventListener("mousemove", function (e) {
            //moving over the canvas.
            var bounding_box = c.getBoundingClientRect();
            wface.x = (e.clientX - bounding_box.left) * (c.width / bounding_box.width) - wface_img.width / 2;
            wface.y = (e.clientY - bounding_box.top) * (c.height / bounding_box.height) - wface_img.height / 2;
        }, false);

        setupchips();
        requestAnimationFrame(tick);
    }

    function setupchips() {
        var max_chips = level * chips_per_level;
        while (chips.length < max_chips) {
            initchip(chips.length);
        }
    }

    function initchip(index) {
        var max_speed = max_speed_per_level * level;
        var min_speed = min_speed_per_level * level;
        chips[index] = {
            x: Math.round(Math.random() * (width - 2 * chip_w)) + chip_w,
            y: -chip_h,
            v: Math.round(Math.random() * (max_speed - min_speed)) + min_speed,
            delay: Date.now() + Math.random() * delay
        }
        total_chips++;
    }

    function collision(chip) {
        if (chip.y + chip_img.height < wface.y + 50) {
            return false;
        }
        if (chip.y > wface.y + 50) {
            return false;
        }
        if (chip.x + chip_img.width < wface.x + 50) {
            return false;
        }
        if (chip.x > wface.x + 50) {
            return false;
        }

        return true;
    }

    function maybeIncreaseDifficulty() {
        level = Math.max(1, Math.ceil(wface.score / 10));
        setupchips();
    }

    function tick() {
        var i;
        var chip;
        var dateNow = Date.now();
        c.width = c.width;
        for (i = 0; i < chips.length; i++) {
            chip = chips[i];
            if (dateNow > chip.delay) {
                chip.y += chip.v;
                if (collision(chip)) {
                    initchip(i);
                    wface.score++;
                } else if (chip.y > height) {
                    initchip(i);
                } else {
                    ctx.drawImage(chip_img, chip.x, chip.y);
                }
            }
        }
        ctx.font = "bold 24px sans-serif";
        ctx.fillStyle = "#2FFF2F";
        ctx.fillText(wface.score, c.width - 50, 50);
        ctx.fillText("Level: " + level, 20, 50);

        ctx.drawImage(wface_img, wface.x, wface.y);
        maybeIncreaseDifficulty();
        requestAnimationFrame(tick);
    }

    return {
        init: init
    };
}
};