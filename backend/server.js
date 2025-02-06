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
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


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



