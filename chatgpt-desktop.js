const data = JSON.parse($response.body);

for (const key in data.feature_gates) {
    if (data.feature_gates.hasOwnProperty(key)) {
        data.feature_gates[key].value = true;

        data.feature_gates[key].secondary_exposures.forEach(exposure => {
            exposure.gateValue = "true";
        });
    }
}

$done({body: JSON.stringify(data)});
