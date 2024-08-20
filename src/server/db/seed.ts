import { neon } from "@neondatabase/serverless";
import { categorySchema, questionSchema, upgradeSchema } from "./schema"
import { config } from 'dotenv';
import { drizzle } from "drizzle-orm/neon-http";

config({ path: '.env' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

if(!(sql)){
    throw new Error("DATABASE_URL not found.")
}

async function seed(){
    await db.insert(categorySchema).values([
        {
            category: "Geography"
        },
        {
            category: "Maths"
        },
        {
            category: "English"
        },
        {
            category: "History"
        },
        {
            category: "Science"
        },
    ])

    await db.insert(upgradeSchema).values([
        {
            name: "Sharpness",
            description: "Extra Damage",
            affected_stat: "dmg",
            default_value: 1,
            consumable: false,
        },
        {
            name: "Vitality",
            description: "Extra Health",
            affected_stat: "hp",
            default_value: 1,
            consumable: false,
        },
        {
            name: "Armour",
            description: "Extra Protection",
            affected_stat: "armour",
            default_value: 1,
            consumable: false,
        },
        {
            name: "Critical Chance",
            description: "Chance to deal double damage",
            affected_stat: "critical",
            default_value: 1,
            consumable: false,
        },
        {
            name: "Parry",
            description: "Chance to block incoming damage",
            affected_stat: "parry",
            default_value: 1,
            consumable: false
        },
        {
            name: "Looting",
            description: "Increase your item discovery",
            affected_stat: "looting",
            default_value: 1,
            consumable: false
        }
    ])

    const categoryRows = await db.select().from(categorySchema)
    const categoryIds = categoryRows.map((row) => row.id)

    await db.insert(questionSchema).values([

        //
        // GEOGRAPHY
        //

        {
            difficulty: "easy",
            question: "What is the capital of Italy?",
            answers: ["Rome", "Paris", "Berlin", "Madrid"],
            correct_index: 0,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "easy",
            question: "Which continent is Egypt located on?",
            answers: ["Asia", "Europe", "Africa", "Australia"],
            correct_index: 2,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "easy",
            question: "What is the largest ocean on Earth?",
            answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
            correct_index: 3,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "easy",
            question: "Which country is known as the Land of the Rising Sun?",
            answers: ["China", "Japan", "South Korea", "Thailand"],
            correct_index: 1,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "medium",
            question: "What is the longest river in the world?",
            answers: ["Amazon", "Nile", "Yangtze", "Mississippi"],
            correct_index: 1,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "medium",
            question: "Which desert is the largest in the world?",
            answers: ["Sahara", "Gobi", "Arctic", "Antarctic"],
            correct_index: 3,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "medium",
            question: "Which European city is known as the City of Canals?",
            answers: ["Amsterdam", "Venice", "Bruges", "Copenhagen"],
            correct_index: 1,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "medium",
            question: "Which country has the most natural lakes?",
            answers: ["Canada", "USA", "Russia", "Brazil"],
            correct_index: 0,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "hard",
            question: "What is the smallest country in the world by area?",
            answers: ["Monaco", "San Marino", "Liechtenstein", "Vatican City"],
            correct_index: 3,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "hard",
            question: "Which mountain range forms the natural border between France and Spain?",
            answers: ["Alps", "Pyrenees", "Carpathians", "Apennines"],
            correct_index: 1,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "hard",
            question: "What is the capital of Mongolia?",
            answers: ["Astana", "Tashkent", "Ulaanbaatar", "Bishkek"],
            correct_index: 2,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "hard",
            question: "Which African country has the most pyramids?",
            answers: ["Egypt", "Sudan", "Ethiopia", "Libya"],
            correct_index: 1,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "easy",
            question: "What is the capital of France?",
            answers: ["London", "Rome", "Paris", "Berlin"],
            correct_index: 2,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "easy",
            question: "Which continent is Australia located on?",
            answers: ["Australia", "Asia", "Africa", "Europe"],
            correct_index: 0,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "easy",
            question: "What is the largest ocean on Earth?",
            answers: ["Indian Ocean", "Pacific Ocean", "Atlantic Ocean", "Arctic Ocean"],
            correct_index: 1,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "easy",
            question: "Which country is known as the Land of the Rising Sun?",
            answers: ["Japan", "China", "Thailand", "South Korea"],
            correct_index: 0,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "easy",
            question: "Which river is the longest in the world?",
            answers: ["Amazon", "Nile", "Yangtze", "Mississippi"],
            correct_index: 1,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "easy",
            question: "Which country has the largest population?",
            answers: ["Russia", "China", "United States", "India"],
            correct_index: 1,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "easy",
            question: "Which desert is the largest in the world?",
            answers: ["Gobi", "Kalahari", "Atacama", "Sahara"],
            correct_index: 3,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "easy",
            question: "Which is the smallest country in the world by area?",
            answers: ["Vatican City", "Monaco", "San Marino", "Liechtenstein"],
            correct_index: 0,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "easy",
            question: "Which continent is the Sahara Desert located on?",
            answers: ["Africa", "Asia", "Australia", "South America"],
            correct_index: 0,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "easy",
            question: "Which of these countries is located in South America?",
            answers: ["Portugal", "Spain", "Brazil", "Mexico"],
            correct_index: 2,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "medium",
            question: "What is the longest river in the United States?",
            answers: ["Mississippi River", "Missouri River", "Colorado River", "Ohio River"],
            correct_index: 1,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "medium",
            question: "Which mountain range separates Europe and Asia?",
            answers: ["Andes", "Rockies", "Ural Mountains", "Alps"],
            correct_index: 2,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "medium",
            question: "Which of these countries is not part of Scandinavia?",
            answers: ["Finland", "Sweden", "Norway", "Denmark"],
            correct_index: 0,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "medium",
            question: "What is the capital of Canada?",
            answers: ["Ottawa", "Toronto", "Vancouver", "Montreal"],
            correct_index: 0,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "medium",
            question: "Which desert is located in northern China and southern Mongolia?",
            answers: ["Gobi Desert", "Sahara Desert", "Kalahari Desert", "Mojave Desert"],
            correct_index: 0,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "medium",
            question: "Which sea is the largest in the world by area?",
            answers: ["Caribbean Sea", "Philippine Sea", "Mediterranean Sea", "Baltic Sea"],
            correct_index: 1,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "medium",
            question: "Which country has the longest coastline in the world?",
            answers: ["Canada", "Russia", "Australia", "Indonesia"],
            correct_index: 0,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "medium",
            question: "Which is the smallest continent by land area?",
            answers: ["Australia", "South America", "Europe", "Antarctica"],
            correct_index: 0,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "medium",
            question: "What is the name of the world's highest waterfall?",
            answers: ["Niagara Falls", "Victoria Falls", "Angel Falls", "Iguazu Falls"],
            correct_index: 2,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "medium",
            question: "Which country is home to the ancient city of Petra?",
            answers: ["Turkey", "Jordan", "Egypt", "Syria"],
            correct_index: 1,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "hard",
            question: "What is the capital of the Canadian province of Alberta?",
            answers: ["Calgary", "Edmonton", "Vancouver", "Winnipeg"],
            correct_index: 1,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "hard",
            question: "Which country owns the island of Greenland?",
            answers: ["Canada", "Iceland", "Norway", "Denmark"],
            correct_index: 3,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "hard",
            question: "Which ocean is the Bermuda Triangle located in?",
            answers: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Southern Ocean"],
            correct_index: 1,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "hard",
            question: "Which river flows through Baghdad?",
            answers: ["Nile", "Tigris", "Euphrates", "Jordan"],
            correct_index: 1,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "hard",
            question: "What is the capital of Bhutan?",
            answers: ["Paro", "Kathmandu", "Thimphu", "Thimpu"],
            correct_index: 2,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "hard",
            question: "Which country has the highest number of active volcanoes?",
            answers: ["Indonesia", "Japan", "United States", "Chile"],
            correct_index: 0,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "hard",
            question: "Which island is the largest in the Mediterranean Sea?",
            answers: ["Sardinia", "Cyprus", "Sicily", "Crete"],
            correct_index: 2,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "hard",
            question: "Which country is the Gobi Desert primarily located in?",
            answers: ["China", "Kazakhstan", "Mongolia", "Russia"],
            correct_index: 2,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "hard",
            question: "Which river forms the border between Texas and Mexico?",
            answers: ["Colorado River", "Mississippi River", "Arkansas River", "Rio Grande"],
            correct_index: 3,
            category_id: Number(categoryIds[0])
        },
        {
            difficulty: "hard",
            question: "Which city is the capital of Lithuania?",
            answers: ["Vilnius", "Riga", "Tallinn", "Warsaw"],
            correct_index: 0,
            category_id: Number(categoryIds[0])
        },

        //
        // MATHS
        //

        {
            difficulty: "easy",
            question: "What is 5 + 3?",
            answers: ["6", "7", "8", "9"],
            correct_index: 2,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "easy",
            question: "What is 12 - 4?",
            answers: ["6", "7", "8", "9"],
            correct_index: 2,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "easy",
            question: "What is 9 * 1?",
            answers: ["7", "8", "9", "10"],
            correct_index: 2,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "easy",
            question: "What is 20 / 4?",
            answers: ["4", "5", "6", "7"],
            correct_index: 1,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "medium",
            question: "What is the square root of 81?",
            answers: ["7", "8", "9", "10"],
            correct_index: 2,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "medium",
            question: "What is 25% of 200?",
            answers: ["25", "50", "75", "100"],
            correct_index: 1,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "medium",
            question: "What is 14 * 14?",
            answers: ["196", "186", "176", "166"],
            correct_index: 0,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "medium",
            question: "What is the value of π (pi) to two decimal places?",
            answers: ["3.12", "3.14", "3.16", "3.18"],
            correct_index: 1,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "hard",
            question: "What is the derivative of x^2?",
            answers: ["1", "x", "2x", "x^2"],
            correct_index: 2,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "hard",
            question: "What is the integral of 1/x?",
            answers: ["x", "1/x", "ln(x)", "e^x"],
            correct_index: 2,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "hard",
            question: "What is the solution to the equation 2x + 3 = 7?",
            answers: ["1", "2", "3", "4"],
            correct_index: 1,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "hard",
            question: "What is the limit of (1 + 1/n)^n as n approaches infinity?",
            answers: ["e", "1", "∞", "0"],
            correct_index: 0,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "easy",
            question: "What is 5 + 7?",
            answers: ["10", "12", "13", "11"],
            correct_index: 1,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "easy",
            question: "What is the value of 10 divided by 2?",
            answers: ["6", "5", "7", "4"],
            correct_index: 1,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "easy",
            question: "What is 9 - 4?",
            answers: ["4", "6", "5", "7"],
            correct_index: 2,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "easy",
            question: "What is 3 x 8?",
            answers: ["20", "26", "24", "22"],
            correct_index: 2,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "easy",
            question: "What is the square root of 16?",
            answers: ["5", "3", "6", "4"],
            correct_index: 3,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "easy",
            question: "What is 7 x 9?",
            answers: ["72", "63", "81", "54"],
            correct_index: 1,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "easy",
            question: "What is 12 divided by 4?",
            answers: ["2", "3", "5", "4"],
            correct_index: 1,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "easy",
            question: "What is the perimeter of a square with side length 5?",
            answers: ["25", "30", "15", "20"],
            correct_index: 3,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "easy",
            question: "What is 15 + 6?",
            answers: ["19", "20", "21", "22"],
            correct_index: 2,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "easy",
            question: "What is 8 - 3?",
            answers: ["6", "7", "4", "5"],
            correct_index: 3,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "medium",
            question: "What is 15% of 200?",
            answers: ["25", "30", "35", "20"],
            correct_index: 1,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "medium",
            question: "What is the product of the first four prime numbers?",
            answers: ["17", "120", "210", "24"],
            correct_index: 2,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "medium",
            question: "Solve for x: 2x - 4 = 10",
            answers: ["8", "7", "6", "9"],
            correct_index: 0,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "medium",
            question: "What is the area of a triangle with a base of 10 and height of 5?",
            answers: ["25", "30", "50", "15"],
            correct_index: 0,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "medium",
            question: "If a circle has a radius of 4, what is its diameter?",
            answers: ["8", "16", "12", "4"],
            correct_index: 0,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "medium",
            question: "What is 9 squared?",
            answers: ["81", "72", "90", "100"],
            correct_index: 0,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "medium",
            question: "What is the next number in the sequence: 2, 4, 8, 16, ?",
            answers: ["32", "24", "20", "28"],
            correct_index: 0,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "medium",
            question: "What is the sum of the interior angles of a pentagon?",
            answers: ["360 degrees", "540 degrees", "180 degrees", "720 degrees"],
            correct_index: 1,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "medium",
            question: "What is the value of π (pi) rounded to two decimal places?",
            answers: ["3.14", "3.16", "3.12", "3.18"],
            correct_index: 0,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "hard",
            question: "Solve for x: 5x^2 - 3x - 2 = 0",
            answers: ["1 and -0.2", "-2 and 0.2", "1 and -1", "-1 and 1"],
            correct_index: 0,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "hard",
            question: "What is the derivative of the function f(x) = x^3?",
            answers: [ "2x^2", "3x", "3x^2", "x^2"],
            correct_index: 2,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "hard",
            question: "What is the integral of the function f(x) = 2x?",
            answers: ["x^2 + C", "2x^2 + C", "x^2", "2x"],
            correct_index: 0,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "hard",
            question: "What is the value of log10(1000)?",
            answers: ["3", "2", "1", "4"],
            correct_index: 0,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "hard",
            question: "If a matrix A has dimensions 3x2 and a matrix B has dimensions 2x4, what are the dimensions of their product AB?",
            answers: ["2x4", "3x4", "2x2", "3x2"],
            correct_index: 1,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "hard",
            question: "Solve for x: 3^x = 27",
            answers: ["3", "2", "4", "5"],
            correct_index: 1,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "hard",
            question: "What is the sum of the first 10 positive integers?",
            answers: ["55", "45", "65", "50"],
            correct_index: 0,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "hard",
            question: "What is the standard deviation of the dataset: 1, 2, 3, 4, 5?",
            answers: ["1.58", "1.41", "1.87", "2.00"],
            correct_index: 1,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "hard",
            question: "What is the sum of the angles in a heptagon?",
            answers: ["720 degrees", "900 degrees", "1080 degrees", "1260 degrees"],
            correct_index: 2,
            category_id: Number(categoryIds[1])
        },
        {
            difficulty: "hard",
            question: "In a right triangle, if one angle is 45 degrees, what is the measure of the other non-right angle?",
            answers: ["45 degrees", "60 degrees", "30 degrees", "90 degrees"],
            correct_index: 0,
            category_id: Number(categoryIds[1])
        },

        //
        // ENGLISH
        //

        {
            difficulty: "easy",
            question: "What is the past tense of 'run'?",
            answers: ["runs", "ran", "running", "run"],
            correct_index: 1,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "easy",
            question: "Which of these is a noun?",
            answers: ["quickly", "happy", "book", "run"],
            correct_index: 2,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "easy",
            question: "What is the opposite of 'hot'?",
            answers: ["warm", "cold", "cool", "freezing"],
            correct_index: 1,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "easy",
            question: "Which word is a synonym for 'fast'?",
            answers: ["slow", "quick", "stop", "still"],
            correct_index: 1,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "medium",
            question: "Who wrote '1984'?",
            answers: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "Margaret Atwood"],
            correct_index: 1,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "medium",
            question: "Which of these is a compound word?",
            answers: ["Sunflower", "Caterpillar", "Butterfly", "Rainbow"],
            correct_index: 3,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "medium",
            question: "What is the adjective in this sentence: 'The quick brown fox jumps over the lazy dog'?",
            answers: ["quick", "fox", "jumps", "over"],
            correct_index: 0,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "medium",
            question: "Which word means 'to predict or foretell a future event'?",
            answers: ["predict", "foresee", "forecast", "prophesy"],
            correct_index: 3,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "hard",
            question: "What is the term for a word that is spelled the same backwards and forwards?",
            answers: ["Palindrome", "Anagram", "Homonym", "Antonym"],
            correct_index: 0,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "hard",
            question: "What is the main theme of Shakespeare's 'Macbeth'?",
            answers: ["Love", "Betrayal", "Ambition", "Revenge"],
            correct_index: 2,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "hard",
            question: "What is the difference between 'affect' and 'effect'?",
            answers: ["Affect is a noun, effect is a verb", "Affect is a verb, effect is a noun", "They are synonyms", "They are antonyms"],
            correct_index: 1,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "hard",
            question: "Which of these authors wrote in the Romantic period?",
            answers: ["Charles Dickens", "Jane Austen", "William Wordsworth", "Mark Twain"],
            correct_index: 2,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "easy",
            question: "What is the past tense of the verb 'run'?",
            answers: ["ran", "runned", "ranning", "runs"],
            correct_index: 0,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "easy",
            question: "Which word is an antonym of 'hot'?",
            answers: [ "warm", "burning", "boiling","cold",],
            correct_index: 3,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "easy",
            question: "Which word is a synonym for 'big'?",
            answers: ["small","large", "tiny", "narrow"],
            correct_index: 1,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "easy",
            question: "Which word is an antonym of 'happy'?",
            answers: ["sad", "joyful", "content", "glad"],
            correct_index: 0,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "easy",
            question: "What is the plural of 'child'?",
            answers: [ "childs", "childes", "children", "childrens"],
            correct_index: 2,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "easy",
            question: "Which of the following is a vowel?",
            answers: ["a", "b", "c", "d"],
            correct_index: 0,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "easy",
            question: "What is the correct spelling of the number 3?",
            answers: ["thre", "three", "thri", "thr"],
            correct_index: 1,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "easy",
            question: "Which word rhymes with 'cat'?",
            answers: ["hat", "dog", "pen", "sun"],
            correct_index: 0,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "easy",
            question: "What is the opposite of 'up'?",
            answers: [ "left", "right","down", "over"],
            correct_index: 2,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "easy",
            question: "Which word is a synonym for 'fast'?",
            answers: [ "slow", "steady", "calm","quick",],
            correct_index: 3,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "medium",
            question: "Which of the following is a synonym for the word 'happy'?",
            answers: [ "melancholic", "elated", "despondent", "morose"],
            correct_index: 1,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "medium",
            question: "What is the meaning of the word 'benevolent'?",
            answers: ["malevolent","kind",  "indifferent", "hostile"],
            correct_index: 1,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "medium",
            question: "Which of these words means 'a brief rest'?",
            answers: ["strain", "endeavor","respite",  "exertion"],
            correct_index: 2,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "medium",
            question: "Which of the following is the correct spelling?",
            answers: ["acommodate", "accomodate", "accommadate", "accommodate", ],
            correct_index: 3,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "medium",
            question: "What is the comparative form of the word 'good'?",
            answers: [ "gooder", "best","better", "worse"],
            correct_index: 2,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "medium",
            question: "Which word is an antonym of 'expand'?",
            answers: [ "grow","contract", "enlarge", "stretch"],
            correct_index: 1,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "medium",
            question: "What is the plural form of 'mouse'?",
            answers: [ "mouses", "mouse", "meese", "mice",],
            correct_index: 3,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "medium",
            question: "What does the prefix 'un-' in 'unlikely' mean?",
            answers: ["very", "more", "not",  "after"],
            correct_index: 2,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "medium",
            question: "What is the meaning of the word 'omnipotent'?",
            answers: ["all-powerful", "all-knowing", "present everywhere", "benevolent"],
            correct_index: 0,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "medium",
            question: "Which of these words means 'to mislead or deceive someone'?",
            answers: ["delude", "convince", "clarify", "elucidate"],
            correct_index: 0,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "hard",
            question: "Which author wrote 'Brave New World'?",
            answers: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "Kurt Vonnegut"],
            correct_index: 0,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "hard",
            question: "In literature, what is the term for a character's moment of realization or discovery?",
            answers: ["climax", "epiphany",  "denouement", "foreshadowing"],
            correct_index: 1,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "hard",
            question: "Which of the following is an example of onomatopoeia?",
            answers: [ "run", "light", "buzz", "silence"],
            correct_index: 2,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "hard",
            question: "What is the term for a word that has the opposite meaning of another word?",
            answers: ["synonym", "antonym",  "homonym", "acronym"],
            correct_index: 1,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "hard",
            question: "In literature, what is the meaning of the term 'juxtaposition'?",
            answers: ["placing two elements side by side for contrast", "a recurring theme", "a metaphorical comparison", "the climax of a story"],
            correct_index: 0,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "hard",
            question: "What is the correct term for a word that modifies a verb?",
            answers: [ "adjective","adverb", "noun", "pronoun"],
            correct_index: 1,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "hard",
            question: "Which Shakespeare play features the character of Shylock?",
            answers: [ "Macbeth", "Othello","The Merchant of Venice", "Hamlet"],
            correct_index: 2,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "hard",
            question: "Who wrote the epic poem 'Paradise Lost'?",
            answers: ["John Milton", "Geoffrey Chaucer", "John Donne", "William Blake"],
            correct_index: 0,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "hard",
            question: "What is the term for a recurring symbol in a literary work?",
            answers: [ "metaphor", "allusion", "hyperbole","motif",],
            correct_index: 3,
            category_id: Number(categoryIds[2])
        },
        {
            difficulty: "hard",
            question: "Which of these literary devices involves giving human traits to non-human things?",
            answers: [ "alliteration", "metaphor", "oxymoron","personification",],
            correct_index: 3,
            category_id: Number(categoryIds[2])
        },

        // 
        // HISTORY
        //
        {
            difficulty: "easy",
            question: "Who was the first President of the United States?",
            answers: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
            correct_index: 1,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "easy",
            question: "In which year did World War II end?",
            answers: ["1942", "1945", "1948", "1950"],
            correct_index: 1,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "easy",
            question: "Who was known as the Maid of Orleans?",
            answers: ["Catherine the Great", "Joan of Arc", "Marie Antoinette", "Queen Elizabeth I"],
            correct_index: 1,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "easy",
            question: "Which ancient civilization built the pyramids?",
            answers: ["Greek", "Roman", "Egyptian", "Mayan"],
            correct_index: 2,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "medium",
            question: "Who was the first emperor of Rome?",
            answers: ["Julius Caesar", "Augustus", "Nero", "Caligula"],
            correct_index: 1,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "medium",
            question: "What was the name of the ship that brought the Pilgrims to America in 1620?",
            answers: ["Santa Maria", "Mayflower", "Pinta", "Nina"],
            correct_index: 1,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "medium",
            question: "Which war was fought between the North and South regions in the United States?",
            answers: ["Revolutionary War", "War of 1812", "Civil War", "Mexican-American War"],
            correct_index: 2,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "medium",
            question: "Who was the British Prime Minister during World War II?",
            answers: ["Winston Churchill", "Neville Chamberlain", "Clement Attlee", "Harold Macmillan"],
            correct_index: 0,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "hard",
            question: "In which year did the Berlin Wall fall?",
            answers: ["1987", "1988", "1989", "1990"],
            correct_index: 2,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "hard",
            question: "What was the main cause of the fall of the Roman Empire?",
            answers: ["Economic troubles", "Military defeat", "Internal corruption", "All of the above"],
            correct_index: 3,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "hard",
            question: "Who was the leader of the Soviet Union during the Cuban Missile Crisis?",
            answers: ["Joseph Stalin", "Nikita Khrushchev", "Leonid Brezhnev", "Mikhail Gorbachev"],
            correct_index: 1,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "hard",
            question: "What was the name of the treaty that ended World War I?",
            answers: ["Treaty of Paris", "Treaty of Versailles", "Treaty of Ghent", "Treaty of Tordesillas"],
            correct_index: 1,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "easy",
            question: "Who was the first President of the United States?",
            answers: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
            correct_index: 1,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "easy",
            question: "In which year did the Titanic sink?",
            answers: ["1912", "1911", "1910", "1913"],
            correct_index: 0,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "easy",
            question: "Which ancient civilization built the pyramids of Giza?",
            answers: ["Romans", "Greeks", "Egyptians", "Babylonians"],
            correct_index: 2,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "easy",
            question: "Who was the British Prime Minister during World War II?",
            answers: ["Winston Churchill", "Neville Chamberlain", "Clement Attlee", "Harold Macmillan"],
            correct_index: 0,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "easy",
            question: "Who was the first Emperor of China?",
            answers: ["Qin Shi Huang", "Kangxi", "Wudi", "Yongle"],
            correct_index: 0,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "easy",
            question: "What was the primary language spoken in Ancient Rome?",
            answers: ["Latin", "Greek", "Hebrew", "Egyptian"],
            correct_index: 0,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "easy",
            question: "Which war was fought between the North and South in the United States from 1861 to 1865?",
            answers: ["The Revolutionary War", "The Civil War", "The War of 1812", "The Spanish-American War"],
            correct_index: 1,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "easy",
            question: "Which famous queen was the last pharaoh of Ancient Egypt?",
            answers: ["Cleopatra", "Nefertiti", "Hatshepsut", "Tutankhamun"],
            correct_index: 0,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "easy",
            question: "In what year did the Berlin Wall fall?",
            answers: ["1989", "1990", "1988", "1987"],
            correct_index: 0,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "easy",
            question: "Who was the famous leader of the Mongol Empire in the 13th century?",
            answers: ["Genghis Khan", "Kublai Khan", "Attila the Hun", "Alexander the Great"],
            correct_index: 0,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "medium",
            question: "What was the main cause of the Hundred Years' War?",
            answers: ["Territorial disputes", "Religious differences", "Dynastic claims", "Economic competition"],
            correct_index: 2,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "medium",
            question: "Who was the leader of the Soviet Union during World War II?",
            answers: ["Nikita Khrushchev", "Joseph Stalin", "Leon Trotsky", "Vladimir Lenin"],
            correct_index: 1,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "medium",
            question: "Which historical period is known as the 'Age of Enlightenment'?",
            answers: ["18th century", "16th century", "15th century", "19th century"],
            correct_index: 0,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "medium",
            question: "What was the name of the ship that carried the Pilgrims to America in 1620?",
            answers: ["The Mayflower", "The Nina", "The Santa Maria", "The Endeavour"],
            correct_index: 0,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "medium",
            question: "Who was the first female Prime Minister of the United Kingdom?",
            answers: ["Margaret Thatcher", "Theresa May", "Ethel Smyth", "Emily Pankhurst"],
            correct_index: 0,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "medium",
            question: "Which country was the birthplace of the Renaissance?",
            answers: ["France", "Italy", "Germany", "England"],
            correct_index: 1,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "medium",
            question: "Who was the famous Carthaginian general during the Second Punic War?",
            answers: ["Scipio Africanus", "Julius Caesar", "Hannibal Barca", "Alexander the Great"],
            correct_index: 2,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "medium",
            question: "What was the purpose of the Marshall Plan after World War II?",
            answers: ["To provide military aid to Western Europe", "To rebuild Europe’s economies", "To establish NATO", "To create the United Nations"],
            correct_index: 1,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "medium",
            question: "Which empire was ruled by the Ottoman Turks?",
            answers: ["Mongol Empire", "Byzantine Empire", "Ottoman Empire", "Roman Empire"],
            correct_index: 2,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "hard",
            question: "What was the primary aim of the Treaty of Versailles?",
            answers: ["To punish Germany after World War I", "To establish the United Nations", "To end the Cold War", "To divide the Ottoman Empire"],
            correct_index: 0,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "hard",
            question: "Which battle marked the turning point in the Pacific Theater during World War II?",
            answers: ["Battle of Midway", "Battle of Iwo Jima", "Battle of the Coral Sea", "Battle of the Bulge"],
            correct_index: 0,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "hard",
            question: "Who was the leader of the French Revolution and the Reign of Terror?",
            answers: ["Maximilien Robespierre", "Louis XVI", "Napoleon Bonaparte", "Georges Danton"],
            correct_index: 0,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "hard",
            question: "What was the primary objective of the Crusades?",
            answers: ["To control the Holy Land", "To spread the Black Death", "To convert Native Americans", "To conquer Asia"],
            correct_index: 0,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "hard",
            question: "Which empire was known for its system of qanats for irrigation?",
            answers: ["Ming Dynasty", "Roman Empire", "Persian Empire", "Ottoman Empire"],
            correct_index: 2,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "hard",
            question: "What was the primary cause of the Taiping Rebellion in China?",
            answers: ["Religious and political dissatisfaction", "Economic collapse", "Colonial invasion", "Territorial expansion"],
            correct_index: 0,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "hard",
            question: "Who was the leader of the Bolshevik Revolution in Russia?",
            answers: ["Leon Trotsky", "Joseph Stalin", "Vladimir Lenin", "Nikita Khrushchev"],
            correct_index: 2,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "hard",
            question: "What was the name of the treaty that ended the Thirty Years' War in 1648?",
            answers: ["Treaty of Versailles", "Treaty of Utrecht", "Treaty of Westphalia", "Treaty of Paris"],
            correct_index: 2,
            category_id: Number(categoryIds[3])
        },
        {
            difficulty: "hard",
            question: "Which war was fought between the United States and the Native American tribes from 1830 to 1850?",
            answers: ["The War of 1812", "The Indian Removal War", "The Black Hawk War", "The Second Seminole War"],
            correct_index: 3,
            category_id: Number(categoryIds[3])
        },

        //
        // SCIENCE
        //

        {
            difficulty: "easy",
            question: "What planet is known as the Red Planet?",
            answers: ["Earth", "Venus", "Mars", "Jupiter"],
            correct_index: 2,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "easy",
            question: "What gas do plants absorb from the atmosphere?",
            answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
            correct_index: 2,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "easy",
            question: "What is the chemical symbol for water?",
            answers: ["O2", "H2O", "CO2", "NaCl"],
            correct_index: 1,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "easy",
            question: "What force keeps us on the ground?",
            answers: ["Magnetism", "Friction", "Gravity", "Tension"],
            correct_index: 2,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "medium",
            question: "What is the powerhouse of the cell?",
            answers: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
            correct_index: 2,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "medium",
            question: "What is the chemical symbol for sodium?",
            answers: ["S", "Na", "K", "Cl"],
            correct_index: 1,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "medium",
            question: "What is the most abundant gas in Earth's atmosphere?",
            answers: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"],
            correct_index: 3,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "medium",
            question: "What is the boiling point of water at sea level?",
            answers: ["90°C", "100°C", "110°C", "120°C"],
            correct_index: 1,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "hard",
            question: "What is the Heisenberg Uncertainty Principle?",
            answers: ["It states that you can know the exact position and momentum of a particle simultaneously.", "It states that you cannot know the exact position and momentum of a particle simultaneously.", "It states that energy and matter are interchangeable.", "It states that particles can exist in two places at once."],
            correct_index: 1,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "hard",
            question: "What is the most abundant element in the universe?",
            answers: ["Oxygen", "Helium", "Carbon", "Hydrogen"],
            correct_index: 3,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "hard",
            question: "What is the theory of relativity associated with?",
            answers: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Marie Curie"],
            correct_index: 1,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "hard",
            question: "What is the name of the process by which plants make their food?",
            answers: ["Respiration", "Photosynthesis", "Digestion", "Transpiration"],
            correct_index: 1,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "easy",
            question: "What is the chemical symbol for water?",
            answers: ["H2O", "O2", "CO2", "NaCl"],
            correct_index: 0,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "easy",
            question: "How many planets are there in our Solar System?",
            answers: ["8", "9", "7", "6"],
            correct_index: 0,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "easy",
            question: "What is the largest organ in the human body?",
            answers: ["Liver", "Heart", "Skin", "Lung"],
            correct_index: 2,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "easy",
            question: "What gas do plants primarily use for photosynthesis?",
            answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
            correct_index: 1,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "easy",
            question: "What is the process by which plants make their food?",
            answers: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
            correct_index: 1,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "easy",
            question: "What planet is known as the Red Planet?",
            answers: ["Venus", "Mars", "Jupiter", "Saturn"],
            correct_index: 1,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "easy",
            question: "What is the hardest natural substance on Earth?",
            answers: ["Gold", "Diamond", "Iron", "Platinum"],
            correct_index: 1,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "easy",
            question: "What is the smallest unit of life?",
            answers: ["Organ", "Tissue", "Cell", "Organism"],
            correct_index: 2,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "easy",
            question: "What is the chemical symbol for gold?",
            answers: ["Ag", "Au", "Pb", "Fe"],
            correct_index: 1,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "easy",
            question: "How many states of matter are there?",
            answers: ["3", "4", "5", "2"],
            correct_index: 1,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "medium",
            question: "What is the atomic number of Carbon?",
            answers: ["6", "12", "8", "14"],
            correct_index: 0,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "medium",
            question: "What organelle is known as the powerhouse of the cell?",
            answers: ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic Reticulum"],
            correct_index: 2,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "medium",
            question: "What type of bond is formed by the sharing of electrons?",
            answers: ["Ionic Bond", "Hydrogen Bond", "Metallic Bond", "Covalent Bond"],
            correct_index: 3,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "medium",
            question: "Which planet has the most moons?",
            answers: ["Mars", "Earth", "Jupiter", "Saturn"],
            correct_index: 3,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "medium",
            question: "What is the process by which a liquid changes into a gas?",
            answers: ["Freezing", "Condensation", "Evaporation", "Melting"],
            correct_index: 2,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "medium",
            question: "Which part of the cell contains the genetic material?",
            answers: ["Cytoplasm", "Mitochondria", "Nucleus", "Ribosome"],
            correct_index: 2,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "medium",
            question: "What is the most abundant gas in Earth's atmosphere?",
            answers: ["Oxygen", "Carbon Dioxide", "Argon", "Nitrogen"],
            correct_index: 3,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "medium",
            question: "What is the main component of natural gas?",
            answers: ["Ethane", "Methane", "Propane", "Butane"],
            correct_index: 1,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "medium",
            question: "What is the boiling point of water in Celsius?",
            answers: ["90°C", "95°C", "100°C", "85°C"],
            correct_index: 2,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "hard",
            question: "What principle states that the total energy of an isolated system remains constant?",
            answers: ["Law of Conservation of Energy", "Second Law of Thermodynamics", "Law of Conservation of Mass", "First Law of Thermodynamics"],
            correct_index: 0,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "hard",
            question: "What is the name of the process by which bacteria convert nitrogen from the air into a form usable by plants?",
            answers: ["Nitrification", "Nitrogen Fixation", "Denitrification", "Ammonification"],
            correct_index: 1,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "hard",
            question: "Who is known as the father of modern physics?",
            answers: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Galileo Galilei"],
            correct_index: 1,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "hard",
            question: "What type of radiation has the highest energy and shortest wavelength?",
            answers: ["Ultraviolet", "X-rays", "Gamma Rays", "Microwaves"],
            correct_index: 2,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "hard",
            question: "What is the primary function of ribosomes in a cell?",
            answers: ["DNA replication", "Protein synthesis", "Cell division", "Energy production"],
            correct_index: 1,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "hard",
            question: "Which scientist is known for his work on the theory of evolution by natural selection?",
            answers: ["Charles Darwin", "Gregor Mendel", "Louis Pasteur", "James Watson"],
            correct_index: 0,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "hard",
            question: "What is the phenomenon where light bends as it passes from one medium to another?",
            answers: ["Reflection", "Diffraction", "Refraction", "Absorption"],
            correct_index: 2,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "hard",
            question: "What is the name of the principle that describes the behavior of gases under varying pressure and temperature conditions?",
            answers: ["Boyle's Law", "Charles's Law", "Ideal Gas Law", "Avogadro's Law"],
            correct_index: 2,
            category_id: Number(categoryIds[4])
        },
        {
            difficulty: "hard",
            question: "What is the most abundant element in the universe?",
            answers: ["Oxygen", "Carbon", "Hydrogen", "Helium"],
            correct_index: 2,
            category_id: Number(categoryIds[4])
        }
    ])
}

async function main() {
    try {
        await seed()
        console.log("seeding complete");
    } catch (error) {
        console.error("Error during seeding.", error)
        process.exit(1)
    }
}

await main()