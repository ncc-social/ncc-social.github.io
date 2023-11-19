// API endpoint with random verse
const apiUrl = `https://api.quran.com/api/v4/verses/random?translations=171&fields=text_uthmani,chapter_id`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Display verse and translation
    document.getElementById("verse").innerText = data.verse.text_uthmani;
    document.getElementById("translation").innerText = data.verse.translations[0].text;
    document.getElementById("cite").innerText = 'Quran Chapter ' + data.verse.chapter_id + ' Verse ' + data.verse.verse_number;
  });