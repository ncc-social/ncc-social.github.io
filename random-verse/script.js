function getRandomVerse() {
    $.ajax({
        url: `https://api.quran.com/api/v4/verses/random?translations=131`,
        method: 'GET',
        headers: { 
            'Accept': 'application/json'
        },
        success: function (data) {
            displayVerse(data);
        },
        error: function (error) {
            console.error('Error fetching verse:', error);
        }
    });
}

function displayVerse(verseData) {
    const arabicVerse = verseData.verse.text_uthmani;
    const englishVerse = verseData.verse.translations[0].text;

    $('#arabicVerse').text(arabicVerse);
    $('#englishVerse').text(englishVerse);
}

// Initial load
getRandomVerse();