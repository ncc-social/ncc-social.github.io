function getRandomVerse() {
    $.ajax({
        url: 'https://api.quran.com/v4/verses/random',
        method: 'GET',
        success: function (data) {
            displayVerse(data);
        },
        error: function (error) {
            console.error('Error fetching verse:', error);
        }
    });
}

function displayVerse(verseData) {
    const arabicVerse = verseData.data[0].attributes.text_madani;
    const englishVerse = verseData.data[0].attributes.translation_en;

    $('#arabicVerse').text(arabicVerse);
    $('#englishVerse').text(englishVerse);
}

// Initial load
getRandomVerse();