// Shared code: data lives in the browser's localStorage and is used by both pages

var STORAGE_KEY = "bq_cards";

// Common NZ IT behavioural questions, added on first visit (edit or delete them on the Manage page)
var DEFAULT_CARDS = [
  {
    category: "Teamwork",
    question: "Tell me about a time you worked in a team to achieve a goal.",
    answer: "Situation: \n\nTask: \n\nAction: \n\nResult: \n\nTip: NZ interviewers value collaboration and humility. Say \"we\" for the team result and \"I\" for your own actions."
  },
  {
    category: "Conflict",
    question: "Tell me about a time you had a disagreement with a colleague. How did you handle it?",
    answer: "Situation: \n\nTask: \n\nAction: \n\nResult: \n\nTip: Show that you listened, stayed respectful, focused on the problem rather than the person, and reached a compromise."
  },
  {
    category: "Challenge",
    question: "Describe the most challenging technical problem you have solved.",
    answer: "Situation: \n\nTask: \n\nAction: \n\nResult: \n\nTip: Walk through your debugging / problem-solving steps clearly and finish with a measurable result."
  },
  {
    category: "Failure",
    question: "Tell me about a time you made a mistake. What did you learn?",
    answer: "Situation: \n\nTask: \n\nAction: \n\nResult: \n\nTip: Own the mistake, explain how you fixed it, and what you changed afterwards."
  },
  {
    category: "Learning",
    question: "Tell me about a time you had to learn a new technology quickly.",
    answer: "Situation: \n\nTask: \n\nAction: \n\nResult: "
  },
  {
    category: "Deadline",
    question: "Describe a time you had to work under a tight deadline.",
    answer: "Situation: \n\nTask: \n\nAction: \n\nResult: \n\nTip: Talk about prioritising, communicating early with stakeholders, and protecting quality."
  },
  {
    category: "Communication",
    question: "Tell me about a time you explained a technical concept to a non-technical person.",
    answer: "Situation: \n\nTask: \n\nAction: \n\nResult: "
  },
  {
    category: "Feedback",
    question: "Tell me about a time you received critical feedback.",
    answer: "Situation: \n\nTask: \n\nAction: \n\nResult: "
  },
  {
    category: "Initiative",
    question: "Tell me about a time you went above and beyond or improved a process.",
    answer: "Situation: \n\nTask: \n\nAction: \n\nResult: "
  },
  {
    category: "Culture fit",
    question: "Why do you want to work in New Zealand / for our company?",
    answer: "Tip: Research the company's values. Mention team culture, work-life balance, and your long-term plans in NZ."
  }
];

function loadCards() {
  var text = localStorage.getItem(STORAGE_KEY);
  if (text === null) {
    saveCards(DEFAULT_CARDS);
    return DEFAULT_CARDS.slice();
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    return [];
  }
}

function saveCards(cards) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

function getCategories(cards) {
  var categories = [];
  cards.forEach(function (c) {
    if (c.category && categories.indexOf(c.category) === -1) categories.push(c.category);
  });
  return categories;
}

// An answer counts as "written" once it has text beyond the empty STAR labels and tips
function hasAnswer(card) {
  var text = (card.answer || "")
    .replace(/^Tip:.*$/gm, "")
    .replace(/(Situation|Task|Action|Result|S|T|A|R):/g, "");
  return text.trim().length > 0;
}

// Safely insert user text into HTML
function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function showToast(message) {
  var el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(function () { el.remove(); }, 1800);
}
