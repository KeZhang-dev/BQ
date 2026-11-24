// Shared code: questions are stored in the Supabase table "bq_cards" (columns: id, question, category, answer, created_at)

var db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Send the visitor to the login page if they are not signed in
async function requireLogin() {
  var result = await db.auth.getSession();
  if (!result.data.session) {
    location.href = "login.html";
    return false;
  }
  return true;
}

async function signOut() {
  await db.auth.signOut();
  location.href = "login.html";
}

async function loadCards() {
  var result = await db.from("bq_cards").select("*").order("id");
  if (result.error) {
    showToast("Could not load questions: " + result.error.message);
    return [];
  }
  return result.data;
}

async function addCards(cards) {
  var rows = cards.map(function (c) {
    return { question: c.question, category: c.category || "", answer: c.answer || "" };
  });
  return db.from("bq_cards").insert(rows);
}

async function updateCard(id, card) {
  return db.from("bq_cards").update(card).eq("id", id);
}

async function deleteCard(id) {
  return db.from("bq_cards").delete().eq("id", id);
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
  setTimeout(function () { el.remove(); }, 2200);
}
