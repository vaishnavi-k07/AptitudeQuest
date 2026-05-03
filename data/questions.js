const makeQuestion = (sectionId, topicId, index, prompt, options, answerIndex, explanation) => ({
  id: `${sectionId}-${topicId}-${index}`,
  prompt,
  options,
  answerIndex,
  explanation
});

const logicalSeries = [
  ["Find the next term: 2, 6, 12, 20, 30, ?", ["36", "40", "42", "44"], 2, "The differences are 4, 6, 8, 10, so the next difference is 12."],
  ["If all roses are flowers and some flowers fade quickly, which is definitely true?", ["All roses fade quickly", "Some roses fade quickly", "Roses are flowers", "No flowers fade"], 2, "The first statement directly says every rose belongs to flowers."],
  ["A is taller than B. C is taller than A. Who is shortest?", ["A", "B", "C", "Cannot say"], 1, "B is shorter than A, and C is taller than A."],
  ["Book is to Reading as Fork is to:", ["Drawing", "Eating", "Writing", "Sleeping"], 1, "A fork is a tool commonly used for eating."],
  ["Odd one out: Square, Triangle, Circle, Cube", ["Square", "Triangle", "Circle", "Cube"], 3, "Cube is three-dimensional; the others are plane shapes."],
  ["If MONDAY is coded as NPOEBZ, how is FRIDAY coded?", ["GSJEBZ", "GQJEBZ", "GSJEBY", "EQHCCX"], 0, "Each letter is shifted forward by one."],
  ["Which number replaces ?: 3, 9, 27, ?", ["54", "72", "81", "90"], 2, "Each term is multiplied by 3."],
  ["Pointing to a woman, Ravi says, 'She is my mother's only daughter.' Who is she?", ["Sister", "Mother", "Daughter", "Aunt"], 0, "His mother's only daughter is Ravi's sister."],
  ["Complete the pair: Doctor : Hospital :: Teacher : ?", ["Court", "School", "Market", "Bank"], 1, "Teachers primarily work in schools."],
  ["Statement: All pens are blue. This object is a pen. Conclusion?", ["It is blue", "It is red", "It is not blue", "Cannot say"], 0, "If all pens are blue, any pen must be blue."]
];

const quantPercentages = [
  ["What is 15% of 240?", ["24", "30", "36", "42"], 2, "10% is 24 and 5% is 12, so 15% is 36."],
  ["A number increases from 80 to 100. What is the percentage increase?", ["20%", "25%", "30%", "40%"], 1, "Increase is 20 over the original 80, which is 25%."],
  ["If 40% of a number is 64, what is the number?", ["120", "140", "160", "180"], 2, "64 divided by 0.4 equals 160."],
  ["A shirt marked at 1000 is sold at 20% discount. Selling price?", ["700", "750", "800", "850"], 2, "20% of 1000 is 200, so price is 800."],
  ["Successive discounts of 10% and 20% equal a single discount of:", ["28%", "30%", "32%", "35%"], 0, "Net price is 0.9 x 0.8 = 0.72, so discount is 28%."],
  ["A value becomes 121 after 10% increase. Original value?", ["100", "105", "110", "115"], 2, "Original is 121 divided by 1.1."],
  ["30 is what percent of 150?", ["15%", "20%", "25%", "30%"], 1, "30/150 equals 0.2."],
  ["A population of 5000 grows by 12%. New population?", ["5400", "5500", "5600", "5700"], 2, "12% of 5000 is 600."],
  ["If profit is 25% on cost price 400, selling price is:", ["450", "475", "500", "525"], 2, "Profit is 100, so selling price is 500."],
  ["A price drops from 250 to 200. Percentage decrease?", ["15%", "18%", "20%", "25%"], 2, "Decrease is 50 over 250, which is 20%."]
];

const verbalSynonyms = [
  ["Choose the synonym of 'Rapid'.", ["Slow", "Quick", "Weak", "Late"], 1, "Rapid means quick or fast."],
  ["Choose the antonym of 'Ancient'.", ["Old", "Modern", "Historic", "Early"], 1, "Modern is the opposite of ancient."],
  ["Fill in: She is good ___ mathematics.", ["in", "at", "on", "for"], 1, "The correct phrase is good at."],
  ["Choose the correctly spelled word.", ["Accomodate", "Acommodate", "Accommodate", "Acomodate"], 2, "Accommodate has double c and double m."],
  ["Identify the noun: The brave child smiled.", ["brave", "child", "smiled", "the"], 1, "Child names a person, so it is a noun."],
  ["Choose the meaning of 'Concise'.", ["Brief", "Confusing", "Ancient", "Loud"], 0, "Concise means brief and clear."],
  ["Fill in: Neither Ravi nor his friends ___ present.", ["is", "are", "was", "be"], 1, "The verb agrees with the nearer plural subject friends."],
  ["Choose the best replacement: He did it by hisself.", ["himself", "herself", "itself", "no change"], 0, "The reflexive pronoun for he is himself."],
  ["Choose the correctly punctuated sentence.", ["Lets eat, Riya.", "Let's eat, Riya.", "Lets eat Riya.", "Let's eat Riya"], 1, "The apostrophe and comma make the meaning correct."],
  ["Choose the synonym of 'Diligent'.", ["Lazy", "Careful", "Careless", "Random"], 1, "Diligent means careful and hardworking."]
];

const dataTables = [
  ["A class has 20 boys and 30 girls. What percent are girls?", ["40%", "50%", "60%", "70%"], 2, "Girls are 30 out of 50, which is 60%."],
  ["Sales are Jan 40, Feb 50, Mar 60. Average sales?", ["45", "50", "55", "60"], 1, "Total 150 divided by 3 is 50."],
  ["If Product A sold 120 units and Product B sold 80, A exceeds B by:", ["20%", "40%", "50%", "60%"], 2, "Difference is 40 over 80, which is 50%."],
  ["A pie chart angle is 72 degrees. It represents what percent?", ["10%", "15%", "20%", "25%"], 2, "72/360 equals 20%."],
  ["Revenue rose from 2 lakh to 2.5 lakh. Increase?", ["20%", "25%", "30%", "35%"], 1, "Increase is 0.5 over 2, which is 25%."],
  ["The ratio of 45 to 60 is:", ["2:3", "3:4", "4:5", "5:6"], 1, "Divide both numbers by 15."],
  ["If total expenses are 8000 and rent is 2400, rent share is:", ["20%", "25%", "30%", "35%"], 2, "2400/8000 equals 30%."],
  ["Marks are 70, 80, 90. Median?", ["70", "80", "85", "90"], 1, "The middle value is 80."],
  ["If exports are 300 and imports are 250, trade surplus is:", ["40", "50", "60", "70"], 1, "Surplus is exports minus imports."],
  ["A bar shows 25 out of total 100. Fraction?", ["1/2", "1/3", "1/4", "1/5"], 2, "25 out of 100 simplifies to 1/4."]
];

const sectionsBase = [
  {
    id: "logical",
    title: "Logical Reasoning",
    icon: "extension-puzzle-outline",
    accent: "#67E8F9",
    topics: [
      {
        id: "logical-series",
        title: "Series, Coding & Relations",
        explanation: "Logical reasoning tests pattern recognition, relationships, analogies, and deduction. Start by identifying the rule before checking answer options.",
        source: logicalSeries
      }
    ]
  },
  {
    id: "quant",
    title: "Quantitative Aptitude",
    icon: "calculator-outline",
    accent: "#A7F3D0",
    topics: [
      {
        id: "quant-percentages",
        title: "Percentages & Profit",
        explanation: "Percentages compare a value against 100. Convert word problems into base, change, and result before calculating.",
        source: quantPercentages
      }
    ]
  },
  {
    id: "verbal",
    title: "Verbal Ability",
    icon: "book-outline",
    accent: "#FDE68A",
    topics: [
      {
        id: "verbal-basics",
        title: "Vocabulary & Grammar",
        explanation: "Verbal ability combines vocabulary, grammar, sentence correction, and usage. Read every option because small grammar clues matter.",
        source: verbalSynonyms
      }
    ]
  },
  {
    id: "data",
    title: "Data Interpretation",
    icon: "stats-chart-outline",
    accent: "#FCA5A5",
    topics: [
      {
        id: "data-basics",
        title: "Tables, Charts & Ratios",
        explanation: "Data interpretation questions require reading charts accurately, calculating ratios, averages, and percentage changes.",
        source: dataTables
      }
    ]
  }
];

export const sections = sectionsBase.map((section) => ({
  ...section,
  topics: section.topics.map((topic) => ({
    ...topic,
    questions: topic.source.map((item, index) =>
      makeQuestion(section.id, topic.id, index + 1, ...item)
    )
  }))
}));

export const getSectionById = (sectionId) => sections.find((section) => section.id === sectionId);

export const getTopicById = (topicId) =>
  sections.flatMap((section) => section.topics.map((topic) => ({ ...topic, section }))).find(
    (topic) => topic.id === topicId
  );

const allQuestions = sections.flatMap((section) =>
  section.topics.flatMap((topic) =>
    topic.questions.map((question) => ({ ...question, sectionId: section.id, topicId: topic.id }))
  )
);

const takeTwenty = (questions) =>
  Array.from({ length: 20 }, (_, index) => ({
    ...questions[index % questions.length],
    id: `${questions[index % questions.length].id}-test-${index + 1}`
  }));

export const sampleTests = [
  {
    id: "test-mixed-1",
    title: "Mixed Aptitude Sprint",
    type: "sample",
    sectionId: null,
    topicId: null,
    durationMinutes: 20,
    questions: allQuestions.slice(0, 20)
  },
  ...sections.map((section) => ({
    id: `test-${section.id}`,
    title: `${section.title} Test`,
    type: "sample",
    sectionId: section.id,
    topicId: null,
    durationMinutes: 20,
    questions: takeTwenty(section.topics.flatMap((topic) => topic.questions))
  }))
];

export const buildTopicQuiz = (topic) => ({
  id: `quiz-${topic.id}`,
  title: topic.title,
  type: "topic",
  sectionId: topic.section?.id,
  topicId: topic.id,
  durationMinutes: 15,
  questions: topic.questions.slice(0, 10)
});
