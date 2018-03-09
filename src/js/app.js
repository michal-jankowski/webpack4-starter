import "../sass/main.scss";

import "es6-promise/auto"; // polyfill dla promise
import $ from "jquery";

let container = $(".container"),
    button = $(".button");

button.on("click", function () {

    import("./Users")
        .then(function ({ default: getUsersHTML }) {

            getUsersHTML()
                .then(html => {
                    container.append(html);

                });
        });

});