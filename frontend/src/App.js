/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding
 * copyright ownership. The ASF licenses this file to You under
 * the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


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

