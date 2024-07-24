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
            default_value: 2,
            consumable: false,
        },
        {
            name: "Vitality",
            description: "Extra Health",
            affected_stat: "hp",
            default_value: 3,
            consumable: false,
        },
        {
            name: "Armour",
            description: "Extra Protection",
            affected_stat: "armour",
            default_value: 1,
            consumable: false,
        },
    ])

    const categoryRows = await db.select().from(categorySchema)
    const categoryIds = categoryRows.map((row) => row.id)

    await db.insert(questionSchema).values([
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