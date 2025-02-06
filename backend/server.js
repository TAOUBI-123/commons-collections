const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/convert', (req, res) => {
    const { value, unit } = req.body;

    if (typeof value !== 'number' || !['kg', 'lbs'].includes(unit)) {
        return res.status(400).json({ error: 'Invalid request data.' });
    }

    let convertedValue = unit === 'kg' ? value * 2.20462 : value / 2.20462;
    let convertedUnit = unit === 'kg' ? 'lbs' : 'kg';

    return res.json({
        original: { value, unit },
        converted: { value: convertedValue.toFixed(2), unit: convertedUnit }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});



