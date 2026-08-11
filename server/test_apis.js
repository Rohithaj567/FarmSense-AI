const http = require('http');

function get(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:5000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(data) }));
    }).on('error', reject);
  });
}

async function runTests() {
  console.log("🔍 Testing FarmSense AI Backend REST Endpoints...");
  try {
    const health = await get('/api/health');
    console.log("✅ GET /api/health -> Status:", health.status, health.data.message);

    const weather = await get('/api/weather/current');
    console.log("✅ GET /api/weather/current -> Location:", weather.data.weather.current.location, "Temp:", weather.data.weather.current.temp);

    const soil = await get('/api/soil/latest');
    console.log("✅ GET /api/soil/latest -> Health Score:", soil.data.report.healthScore);

    const risk = await get('/api/risk-score/calculate');
    console.log("✅ GET /api/risk-score/calculate -> Risk Score:", risk.data.riskScore.score, "Status:", risk.data.riskScore.status);

    const alerts = await get('/api/alerts');
    console.log("✅ GET /api/alerts -> Active Alerts Count:", alerts.data.alerts.length);

    const tasks = await get('/api/tasks');
    console.log("✅ GET /api/tasks -> Tasks Count:", tasks.data.tasks.length);

    const analytics = await get('/api/analytics');
    console.log("✅ GET /api/analytics -> 30-day Trend Points:", analytics.data.analytics.labels.length);

    console.log("🎉 ALL API ENDPOINTS OPERATIONAL!");
  } catch (err) {
    console.error("❌ Test API error:", err);
  }
}

runTests();
