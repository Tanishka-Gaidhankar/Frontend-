document.getElementById('wordInput').addEventListener('input', async function() {
    const input = this.value.trim();
    const suggestionsContainer = document.getElementById('suggestions');

    if (!input) {
        suggestionsContainer.innerHTML = ''; 
        return;
    }

    try {
    
        const response = await fetch(`https://api.datamuse.com/sug?s=${input}`);
        const suggestions = await response.json();

        
        suggestionsContainer.innerHTML = '';

        
        suggestions.forEach(item => {
            const suggestionItem = document.createElement('div');
            suggestionItem.textContent = item.word;
            suggestionItem.className = 'suggestion-item';

            
            suggestionItem.addEventListener('click', function() {
                document.getElementById('wordInput').value = item.word;
                suggestionsContainer.innerHTML = ''; // Clear suggestions after selection
            });

            suggestionsContainer.appendChild(suggestionItem);
        });
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
});

document.getElementById('findSynonyms').addEventListener('click', async function() {
    const word = document.getElementById('wordInput').value.trim();
    if (!word) return alert('Please enter a word');

    try {
       
        const response = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`);
        const data = await response.json();

        
        if (data.length === 0) {
            document.getElementById('synonymResults').innerHTML = 'No synonyms found.';
            return;
        }

        const synonymResults = document.getElementById('synonymResults');
        synonymResults.innerHTML = ''; 
        const ul = document.createElement('ul');

        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.word;
            ul.appendChild(li);
        });

        synonymResults.appendChild(ul);

        
        document.getElementById('page1').style.display = 'none';
        document.getElementById('page2').style.display = 'block';
    } catch (error) {
        console.error('Error fetching synonyms:', error);
        alert('Could not fetch synonyms. Please try again later.');
    }
});


document.getElementById('backButton').addEventListener('click', function() {
    document.getElementById('wordInput').value = ''; 
    document.getElementById('synonymResults').innerHTML = ''; 
    document.getElementById('suggestions').innerHTML = ''; 
    document.getElementById('page2').style.display = 'none'; 
    document.getElementById('page1').style.display = 'block'; 
});




