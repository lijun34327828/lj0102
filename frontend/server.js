const express = require('express');
const path = require('path');

const app = express();
const PORT = 3912;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'travel-expense-frontend', port: PORT, backend: 'http://localhost:8912' });
});

app.listen(PORT, () => {
  console.log(`差旅报销财务可视化视图已启动: http://localhost:${PORT}`);
  console.log(`  - 财务审核页面: http://localhost:${PORT}/`);
  console.log(`  - 员工报销提交: http://localhost:${PORT}/submit.html`);
});
