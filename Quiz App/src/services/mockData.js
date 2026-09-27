export const MOCK_CATEGORIES = [
  {
    id: "programming",
    name: "Programming & Code",
    description: "Master JavaScript, Python, and other programming concepts.",
    icon: "Code",
    color: "#6366F1", // Indigo
    quizCount: 2,
    quizzes: ["qz_js_fundamentals", "qz_python_essentials"]
  },
  {
    id: "web-design",
    name: "UI/UX & Frontend Design",
    description: "Perfect your layouts, colors, responsive flex designs, and styling skills.",
    icon: "Palette",
    color: "#EC4899", // Pink
    quizCount: 1,
    quizzes: ["qz_css_flexbox"]
  },
  {
    id: "science",
    name: "Space & Astronomy",
    description: "Explore the solar system, stars, physics, and cosmic mysteries.",
    icon: "Orbit",
    color: "#10B981", // Emerald
    quizCount: 1,
    quizzes: ["qz_space_exploration"]
  },
  {
    id: "history",
    name: "World History",
    description: "Travel through time and test your memory of historical events.",
    icon: "Compass",
    color: "#F59E0B", // Amber
    quizCount: 1,
    quizzes: ["qz_world_history"]
  }
];

export const MOCK_QUIZZES = {
  qz_js_fundamentals: {
    id: "qz_js_fundamentals",
    categoryId: "programming",
    title: "JavaScript Fundamentals",
    description: "Test your core knowledge of closures, hoisting, standard array methods, and async/await flows.",
    difficulty: "Medium",
    durationMinutes: 5,
    questionsCount: 5,
    points: 50,
    questions: [
      {
        id: "q_js_1",
        question: "Which of the following is NOT a primitive data type in JavaScript?",
        options: ["String", "Number", "Object", "Boolean"],
        correctAnswer: 2,
        explanation: "In JavaScript, primitive types include String, Number, Boolean, undefined, null, symbol, and bigint. Objects (including arrays and functions) are non-primitive reference types.",
        points: 10
      },
      {
        id: "q_js_2",
        question: "What is the output of: console.log(typeof null);",
        options: ["'null'", "'undefined'", "'object'", "'string'"],
        correctAnswer: 2,
        explanation: "This is a historical bug in JavaScript that was kept for backward compatibility. null is treated as an object in typeof checks.",
        points: 10
      },
      {
        id: "q_js_3",
        question: "Which function allows us to execute a callback function once after a specified delay?",
        options: ["setInterval()", "setTimeout()", "delay()", "requestAnimationFrame()"],
        correctAnswer: 1,
        explanation: "setTimeout() schedules a single execution of a callback after a specified duration in milliseconds. setInterval() repeats the call indefinitely.",
        points: 10
      },
      {
        id: "q_js_4",
        question: "What does the 'hoisting' behavior do in JavaScript execution?",
        options: [
          "Moves variable and function declarations to the top of their containing scope before code execution",
          "Optimizes array loops to execute faster in modern V8 browser engines",
          "Converts synchronous asynchronous code into standard promises automatically",
          "Prevents the usage of strict mode across file scopes"
        ],
        correctAnswer: 0,
        explanation: "Hoisting is JavaScript's default behavior of moving all declarations to the top of the current scope (script or function) before execution begins.",
        points: 10
      },
      {
        id: "q_js_5",
        question: "What will the following code output? console.log(0.1 + 0.2 === 0.3);",
        options: ["true", "false", "undefined", "TypeError"],
        correctAnswer: 1,
        explanation: "Due to floating-point arithmetic precision issues in computer memory (IEEE 754 standard), 0.1 + 0.2 equals 0.30000000000000004, which is not strictly equal to 0.3.",
        points: 10
      }
    ]
  },
  qz_python_essentials: {
    id: "qz_python_essentials",
    categoryId: "programming",
    title: "Python Essentials",
    description: "Deep dive into lists, dictionaries, tuples, decorators, memory references, and key programming syntax rules.",
    difficulty: "Hard",
    durationMinutes: 8,
    questionsCount: 5,
    points: 50,
    questions: [
      {
        id: "q_py_1",
        question: "Which of the following data structures in Python is immutable?",
        options: ["List", "Dictionary", "Set", "Tuple"],
        correctAnswer: 3,
        explanation: "Tuples are immutable sequences, meaning their contents cannot be modified or replaced once created. Lists, dictionaries, and sets are mutable.",
        points: 10
      },
      {
        id: "q_py_2",
        question: "What is the correct syntax to output the type of a variable x in Python?",
        options: ["print(typeof(x))", "print(type(x))", "print(x.type())", "print(isinstance(x))"],
        correctAnswer: 1,
        explanation: "The built-in type() function returns the class representation of the object parameter passed in.",
        points: 10
      },
      {
        id: "q_py_3",
        question: "How do you append a value 'orange' to an existing list named fruits in Python?",
        options: ["fruits.add('orange')", "fruits.push('orange')", "fruits.append('orange')", "fruits.insert('orange')"],
        correctAnswer: 2,
        explanation: "The append() method is used to add an item to the end of a list in Python. push() is JavaScript, and add() is typically used for sets.",
        points: 10
      },
      {
        id: "q_py_4",
        question: "What does the double asterisk (**) operator represent in Python math calculations?",
        options: ["Multiplication twice", "Matrix dot product", "Exponentiation / Power", "Modulus remainder"],
        correctAnswer: 2,
        explanation: "In Python, ** calculates exponents (e.g., 2**3 returns 8). * is standard multiplication.",
        points: 10
      },
      {
        id: "q_py_5",
        question: "What is the output of: print(bool([]))?",
        options: ["True", "False", "None", "SyntaxError"],
        correctAnswer: 1,
        explanation: "Empty lists, strings, sets, dictionaries, zero numeric values, and None are falsy in Python. Thus, converting an empty list to a boolean returns False.",
        points: 10
      }
    ]
  },
  qz_css_flexbox: {
    id: "qz_css_flexbox",
    categoryId: "web-design",
    title: "CSS Flexbox Layouts",
    description: "Align, center, wrap, and structure complex modern cards and layouts using CSS flex containers.",
    difficulty: "Easy",
    durationMinutes: 4,
    questionsCount: 4,
    points: 40,
    questions: [
      {
        id: "q_flex_1",
        question: "Which property is applied to the parent container to establish a flexbox layout system?",
        options: ["align-items: flex", "display: flex", "flex-direction: row", "position: absolute"],
        correctAnswer: 1,
        explanation: "To turn an element into a flex container, display: flex or display: inline-flex must be set on it.",
        points: 10
      },
      {
        id: "q_flex_2",
        question: "Which property aligns flex items along the secondary (cross) axis inside a flex container?",
        options: ["justify-content", "align-items", "flex-wrap", "grid-gap"],
        correctAnswer: 1,
        explanation: "justify-content aligns items along the main axis. align-items aligns items along the cross axis.",
        points: 10
      },
      {
        id: "q_flex_3",
        question: "What is the default value of the flex-direction property?",
        options: ["column", "row-reverse", "row", "column-reverse"],
        correctAnswer: 2,
        explanation: "By default, flex-direction is set to 'row', meaning items align horizontally from left to right.",
        points: 10
      },
      {
        id: "q_flex_4",
        question: "How do you center a flex child perfectly both horizontally and vertically inside a flex parent?",
        options: [
          "Set justify-content: center; and align-items: center; on the parent",
          "Set margin: auto; and position: absolute; on the child",
          "Set text-align: center; and vertical-align: middle; on the parent",
          "Set float: center; on the child"
        ],
        correctAnswer: 0,
        explanation: "Combining justify-content: center (main axis centering) and align-items: center (cross axis centering) on a display: flex container centers all direct child items perfectly.",
        points: 10
      }
    ]
  },
  qz_space_exploration: {
    id: "qz_space_exploration",
    categoryId: "science",
    title: "Space Exploration",
    description: "Explore moon landings, rockets, orbital mechanics, planetary probes, and Mars exploration missions.",
    difficulty: "Medium",
    durationMinutes: 5,
    questionsCount: 5,
    points: 50,
    questions: [
      {
        id: "q_sp_1",
        question: "In which year did humans first set foot on the Moon during the Apollo 11 mission?",
        options: ["1965", "1969", "1972", "1975"],
        correctAnswer: 1,
        explanation: "Astronaut Neil Armstrong stepped onto the lunar surface on July 20, 1969, declaring it 'one small step for man, one giant leap for mankind.'",
        points: 10
      },
      {
        id: "q_sp_2",
        question: "Which planet in our solar system has the highest number of moons?",
        options: ["Jupiter", "Saturn", "Mars", "Neptune"],
        correctAnswer: 1,
        explanation: "As of recent astronomical discoveries, Saturn holds the record with over 140 officially recognized moons, surpassing Jupiter's list of moons.",
        points: 10
      },
      {
        id: "q_sp_3",
        question: "What is the name of the largest volcano in our solar system?",
        options: ["Mauna Kea", "Mount Vesuvius", "Olympus Mons", "Krakatoa"],
        correctAnswer: 2,
        explanation: "Olympus Mons, located on Mars, is a massive shield volcano that stands at over 21.9 km (13.6 miles) high, making it nearly three times the height of Mount Everest.",
        points: 10
      },
      {
        id: "q_sp_4",
        question: "Which space agency launched the Hubble Space Telescope into orbit?",
        options: ["ESA", "Roscosmos", "NASA", "JAXA"],
        correctAnswer: 2,
        explanation: "NASA launched the Hubble Space Telescope in April 1990, in cooperation with the European Space Agency (ESA).",
        points: 10
      },
      {
        id: "q_sp_5",
        question: "What is the escape velocity of Earth (minimum speed required to break free from gravitational pull)?",
        options: ["11.2 km/s", "5.4 km/s", "28.1 km/s", "1.5 km/s"],
        correctAnswer: 0,
        explanation: "The escape velocity of Earth is approximately 11.2 kilometers per second (about 25,000 miles per hour).",
        points: 10
      }
    ]
  },
  qz_world_history: {
    id: "qz_world_history",
    categoryId: "history",
    title: "World History Trivia",
    description: "Test your memory of ancient empires, significant battles, declarations, and globally defining treaties.",
    difficulty: "Easy",
    durationMinutes: 5,
    questionsCount: 5,
    points: 50,
    questions: [
      {
        id: "q_hist_1",
        question: "Who was the first emperor of the Roman Empire?",
        options: ["Julius Caesar", "Augustus", "Nero", "Marcus Aurelius"],
        correctAnswer: 1,
        explanation: "Augustus Caesar (originally named Octavian) became the first official Emperor of Rome in 27 BC following the fall of the Roman Republic.",
        points: 10
      },
      {
        id: "q_hist_2",
        question: "Which historic event triggered the start of World War I?",
        options: [
          "The invasion of Poland",
          "The assassination of Archduke Franz Ferdinand",
          "The signing of the Treaty of Versailles",
          "The sinking of the Lusitania"
        ],
        correctAnswer: 1,
        explanation: "The assassination of Archduke Franz Ferdinand of Austria in Sarajevo on June 28, 1914, set off a chain reaction of alliances that started World War I.",
        points: 10
      },
      {
        id: "q_hist_3",
        question: "In which country did the Industrial Revolution begin during the 18th century?",
        options: ["France", "Germany", "United States", "Great Britain"],
        correctAnswer: 3,
        explanation: "Great Britain was the birthplace of the Industrial Revolution, owing to its rich coal reserves, technological innovations, and oceanic trade systems.",
        points: 10
      },
      {
        id: "q_hist_4",
        question: "Which ancient civilization constructed the historic Machu Picchu city complex?",
        options: ["Aztecs", "Mayans", "Incas", "Egyptians"],
        correctAnswer: 2,
        explanation: "Machu Picchu was built in the 15th century by the Inca Empire high in the Andes Mountains of Peru.",
        points: 10
      },
      {
        id: "q_hist_5",
        question: "What year did the Berlin Wall fall, leading to the reunification of Germany?",
        options: ["1985", "1989", "1991", "1995"],
        correctAnswer: 1,
        explanation: "The Berlin Wall was opened on November 9, 1989, symbolizing the end of the Cold War and leading directly to the German reunification.",
        points: 10
      }
    ]
  }
};

export const MOCK_BADGES = [
  {
    id: "badge_perfect_score",
    name: "Perfect Score",
    description: "Complete any quiz with an accuracy score of 100%.",
    icon: "Award"
  },
  {
    id: "badge_speed_demon",
    name: "Speed Demon",
    description: "Complete a quiz in less than half of the allocated duration.",
    icon: "Zap"
  },
  {
    id: "badge_streak_5",
    name: "Unstoppable",
    description: "Reach a continuous daily quiz attempt streak of 5 days.",
    icon: "Flame"
  },
  {
    id: "badge_quiz_master",
    name: "Quiz Master",
    description: "Complete all quizzes in the Programming & Code category.",
    icon: "Crown"
  }
];

export const MOCK_LEADERBOARD = [
  { rank: 1, username: "quiz_legend", xp: 4800, badges: 4, avatar: "🧙‍♂️", active: false },
  { rank: 2, username: "code_ninja", xp: 4120, badges: 3, avatar: "🥷", active: false },
  { rank: 3, username: "spaceman_sam", xp: 3750, badges: 3, avatar: "👨‍🚀", active: false },
  { rank: 4, username: "history_buff", xp: 2900, badges: 2, avatar: "🧭", active: false },
  { rank: 5, username: "design_queen", xp: 2500, badges: 2, avatar: "👸", active: false },
  { rank: 6, username: "logic_guru", xp: 1980, badges: 1, avatar: "🧠", active: false },
  { rank: 7, username: "star_gazer", xp: 1820, badges: 1, avatar: "🔭", active: false }
];
