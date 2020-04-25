const path = require("path");
const fs = require("fs");

const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "card.json"
);

class Card {
    static async add(course) {
        const card = await Card.fetch();

        const idx = card.courses.findIndex((c) => c.id === course.id);

        const candidate = card.courses[idx];
        console.log(candidate);

        if (candidate) {
            //Курс уде есть

            candidate.count++;
            // card.course[idx] = candidate;
        } else {
            //Нужно добавить
            course.count = 1;
            card.courses.push(course);
        }
        console.log(course);

        card.price += +course.price;

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, "utf-8", (e, content) => {
                if (e) {
                    reject(e);
                } else {
                    resolve(JSON.parse(content));
                }
            });
        });
    }

    static async remove(id) {
        const card = await Card.fetch();

        const idx = card.courses.findIndex((c) => c.id === id);

        const course = card.courses[idx];

        console.log(course);

        if (course.count === 1) {
            card.courses = card.courses.filter((e) => e.id !== id);
        } else {
            card.courses[idx].count--;
        }
        card.price -= course.price;
        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(card);
                }
            });
        });
    }
}
module.exports = Card;
