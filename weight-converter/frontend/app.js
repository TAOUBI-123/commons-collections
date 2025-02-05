function convert() {
    const lbs = document.getElementById('lbs').value;
    fetch('http://localhost:5000/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lbs: parseFloat(lbs) })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = `Weight in KG: 
${data.kg}`;
    })
    .catch(error => console.error('Error:', error));
}

