import React, { useState } from 'react';

function App() {
    const [value, setValue] = useState('');
    const [unit, setUnit] = useState('kg');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleConvert = async () => {
        if (!value || isNaN(value)) {
            alert("Please enter a valid number");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/convert", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ value: parseFloat(value), unit }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
                setResult(null);
            } else {
                setResult(data.converted);
                setError(null);
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Failed to fetch data. Check backend.");
        }
    };

    return (
        <div style={{ fontFamily: "Arial", margin: "20px" }}>
            <h1>Weight Converter</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                    type="text"
                    placeholder="Enter weight"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                </select>
                <button onClick={handleConvert}>Convert</button>
                
                {result && (
                    <span style={{ fontSize: "18px", fontWeight: "bold", marginLeft: "10px" }}>
                        {result.value} {result.unit}
                    </span>
                )}
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default App;

