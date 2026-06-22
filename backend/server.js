const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 8912;

app.use(cors());
app.use(express.json());

const travelStandards = {
  'P7-总监': {
    accommodation: { firstTier: 800, secondTier: 600, thirdTier: 450 },
    transportation: { highSpeedRail: '商务座', flight: '商务舱', dailyAllowance: 200 }
  },
  'P6-经理': {
    accommodation: { firstTier: 600, secondTier: 450, thirdTier: 350 },
    transportation: { highSpeedRail: '一等座', flight: '经济舱', dailyAllowance: 150 }
  },
  'P5-主管': {
    accommodation: { firstTier: 450, secondTier: 350, thirdTier: 280 },
    transportation: { highSpeedRail: '二等座', flight: '经济舱', dailyAllowance: 120 }
  },
  'P4-普通员工': {
    accommodation: { firstTier: 350, secondTier: 280, thirdTier: 220 },
    transportation: { highSpeedRail: '二等座', flight: '经济舱', dailyAllowance: 100 }
  }
};

const cityTierMap = {
  '北京': 'firstTier', '上海': 'firstTier', '广州': 'firstTier', '深圳': 'firstTier',
  '杭州': 'secondTier', '南京': 'secondTier', '成都': 'secondTier', '武汉': 'secondTier',
  '西安': 'secondTier', '重庆': 'secondTier', '天津': 'secondTier', '苏州': 'secondTier',
  '长沙': 'secondTier', '青岛': 'secondTier', '大连': 'secondTier', '厦门': 'secondTier',
  '郑州': 'thirdTier', '合肥': 'thirdTier', '福州': 'thirdTier', '济南': 'thirdTier',
  '昆明': 'thirdTier', '哈尔滨': 'thirdTier', '沈阳': 'thirdTier', '长春': 'thirdTier',
  '南昌': 'thirdTier', '石家庄': 'thirdTier', '太原': 'thirdTier', '南宁': 'thirdTier',
  '贵阳': 'thirdTier', '兰州': 'thirdTier', '乌鲁木齐': 'thirdTier', '呼和浩特': 'thirdTier'
};

const employees = [
  { id: 'E001', name: '张伟', level: 'P7-总监', department: '技术部' },
  { id: 'E002', name: '李娜', level: 'P6-经理', department: '市场部' },
  { id: 'E003', name: '王强', level: 'P5-主管', department: '销售部' },
  { id: 'E004', name: '赵敏', level: 'P4-普通员工', department: '人事部' },
  { id: 'E005', name: '陈刚', level: 'P4-普通员工', department: '技术部' }
];

const approvals = [
  {
    id: 'APPR202606001',
    employeeId: 'E001',
    employeeName: '张伟',
    purpose: '参加技术峰会',
    startDate: '2026-06-10',
    endDate: '2026-06-14',
    cities: ['北京', '上海'],
    status: 'approved',
    amount: 8000
  },
  {
    id: 'APPR202606002',
    employeeId: 'E002',
    employeeName: '李娜',
    purpose: '客户拜访',
    startDate: '2026-06-15',
    endDate: '2026-06-18',
    cities: ['深圳', '广州'],
    status: 'approved',
    amount: 5000
  },
  {
    id: 'APPR202606003',
    employeeId: 'E003',
    employeeName: '王强',
    purpose: '区域销售会议',
    startDate: '2026-06-20',
    endDate: '2026-06-22',
    cities: ['杭州'],
    status: 'approved',
    amount: 3000
  },
  {
    id: 'APPR202606004',
    employeeId: 'E005',
    employeeName: '陈刚',
    purpose: '项目交付',
    startDate: '2026-06-18',
    endDate: '2026-06-25',
    cities: ['成都', '重庆'],
    status: 'approved',
    amount: 6000
  }
];

let expenseReports = [
  {
    id: 'EXP202606001',
    employeeId: 'E001',
    employeeName: '张伟',
    employeeLevel: 'P7-总监',
    approvalId: 'APPR202606001',
    purpose: '参加技术峰会',
    submitDate: '2026-06-15',
    status: 'pending',
    items: [
      {
        id: 'ITEM001',
        type: 'transportation',
        category: 'highSpeedRail',
        description: '上海-北京 高铁',
        date: '2026-06-10',
        city: '北京',
        amount: 1750,
        classLevel: '商务座',
        status: 'pending',
        reviewNote: ''
      },
      {
        id: 'ITEM002',
        type: 'accommodation',
        category: 'hotel',
        description: '北京王府井大酒店 3晚',
        date: '2026-06-10',
        city: '北京',
        amount: 2850,
        nights: 3,
        perNight: 950,
        status: 'pending',
        reviewNote: ''
      },
      {
        id: 'ITEM003',
        type: 'transportation',
        category: 'flight',
        description: '北京-上海 机票',
        date: '2026-06-14',
        city: '上海',
        amount: 2400,
        classLevel: '商务舱',
        status: 'pending',
        reviewNote: ''
      },
      {
        id: 'ITEM004',
        type: 'allowance',
        category: 'daily',
        description: '出差补贴 5天',
        date: '2026-06-10',
        city: '北京',
        amount: 1000,
        days: 5,
        status: 'pending',
        reviewNote: ''
      }
    ],
    totalAmount: 8000,
    reviewResult: null
  },
  {
    id: 'EXP202606002',
    employeeId: 'E002',
    employeeName: '李娜',
    employeeLevel: 'P6-经理',
    approvalId: 'APPR202606002',
    purpose: '客户拜访',
    submitDate: '2026-06-19',
    status: 'pending',
    items: [
      {
        id: 'ITEM005',
        type: 'transportation',
        category: 'flight',
        description: '上海-深圳 机票',
        date: '2026-06-15',
        city: '深圳',
        amount: 1280,
        classLevel: '经济舱',
        status: 'pending',
        reviewNote: ''
      },
      {
        id: 'ITEM006',
        type: 'accommodation',
        category: 'hotel',
        description: '深圳福田喜来登 2晚',
        date: '2026-06-15',
        city: '深圳',
        amount: 1350,
        nights: 2,
        perNight: 675,
        status: 'pending',
        reviewNote: ''
      },
      {
        id: 'ITEM007',
        type: 'transportation',
        category: 'taxi',
        description: '深圳市区打车',
        date: '2026-06-16',
        city: '深圳',
        amount: 180,
        status: 'pending',
        reviewNote: ''
      },
      {
        id: 'ITEM008',
        type: 'transportation',
        category: 'highSpeedRail',
        description: '深圳-广州 高铁',
        date: '2026-06-17',
        city: '广州',
        amount: 240,
        classLevel: '一等座',
        status: 'pending',
        reviewNote: ''
      },
      {
        id: 'ITEM009',
        type: 'accommodation',
        category: 'hotel',
        description: '广州花园酒店 1晚',
        date: '2026-06-17',
        city: '广州',
        amount: 580,
        nights: 1,
        perNight: 580,
        status: 'pending',
        reviewNote: ''
      },
      {
        id: 'ITEM010',
        type: 'transportation',
        category: 'flight',
        description: '广州-上海 机票',
        date: '2026-06-18',
        city: '广州',
        amount: 1150,
        classLevel: '经济舱',
        status: 'pending',
        reviewNote: ''
      }
    ],
    totalAmount: 4780,
    reviewResult: null
  },
  {
    id: 'EXP202606003',
    employeeId: 'E003',
    employeeName: '王强',
    employeeLevel: 'P5-主管',
    approvalId: null,
    purpose: '区域销售会议',
    submitDate: '2026-06-21',
    status: 'pending',
    items: [
      {
        id: 'ITEM011',
        type: 'transportation',
        category: 'highSpeedRail',
        description: '上海-杭州 高铁',
        date: '2026-06-20',
        city: '杭州',
        amount: 180,
        classLevel: '二等座',
        status: 'pending',
        reviewNote: ''
      },
      {
        id: 'ITEM012',
        type: 'accommodation',
        category: 'hotel',
        description: '杭州西湖酒店 2晚',
        date: '2026-06-20',
        city: '杭州',
        amount: 900,
        nights: 2,
        perNight: 450,
        status: 'pending',
        reviewNote: ''
      }
    ],
    totalAmount: 1080,
    reviewResult: null
  },
  {
    id: 'EXP202606004',
    employeeId: 'E005',
    employeeName: '陈刚',
    employeeLevel: 'P4-普通员工',
    approvalId: 'APPR202606004',
    purpose: '项目交付',
    submitDate: '2026-06-21',
    status: 'pending',
    items: [
      {
        id: 'ITEM013',
        type: 'transportation',
        category: 'flight',
        description: '上海-成都 机票',
        date: '2026-06-18',
        city: '成都',
        amount: 1580,
        classLevel: '经济舱',
        status: 'pending',
        reviewNote: ''
      },
      {
        id: 'ITEM014',
        type: 'accommodation',
        category: 'hotel',
        description: '成都天府广场酒店 3晚',
        date: '2026-06-18',
        city: '成都',
        amount: 1200,
        nights: 3,
        perNight: 400,
        status: 'pending',
        reviewNote: ''
      },
      {
        id: 'ITEM015',
        type: 'transportation',
        category: 'highSpeedRail',
        description: '成都-重庆 高铁',
        date: '2026-06-21',
        city: '重庆',
        amount: 320,
        classLevel: '一等座',
        status: 'pending',
        reviewNote: ''
      },
      {
        id: 'ITEM016',
        type: 'accommodation',
        category: 'hotel',
        description: '重庆解放碑酒店 3晚',
        date: '2026-06-21',
        city: '重庆',
        amount: 750,
        nights: 3,
        perNight: 250,
        status: 'pending',
        reviewNote: ''
      },
      {
        id: 'ITEM017',
        type: 'transportation',
        category: 'flight',
        description: '重庆-上海 机票',
        date: '2026-06-24',
        city: '重庆',
        amount: 1420,
        classLevel: '经济舱',
        status: 'pending',
        reviewNote: ''
      },
      {
        id: 'ITEM018',
        type: 'meal',
        category: 'dinner',
        description: '客户宴请',
        date: '2026-06-22',
        city: '重庆',
        amount: 880,
        status: 'pending',
        reviewNote: ''
      }
    ],
    totalAmount: 6150,
    reviewResult: null
  }
];

function getCityTier(city) {
  return cityTierMap[city] || 'thirdTier';
}

function getStandardByLevel(level) {
  return travelStandards[level] || travelStandards['P4-普通员工'];
}

const CABIN_COEFFICIENTS = {
  highSpeedRail: {
    '二等座': 1.0,
    '一等座': 1.6,
    '商务座': 3.0
  },
  flight: {
    '经济舱': 1.0,
    '超级经济舱': 1.3,
    '商务舱': 2.5,
    '头等舱': 3.5
  }
};

function validateExpenseItem(item, employeeLevel) {
  const standard = getStandardByLevel(employeeLevel);
  const cityTier = getCityTier(item.city);
  const issues = [];
  let compliantAmount = item.amount;
  let isOverLimit = false;

  if (item.type === 'accommodation') {
    const limitPerNight = standard.accommodation[cityTier];
    if (item.perNight > limitPerNight) {
      isOverLimit = true;
      const overAmount = (item.perNight - limitPerNight) * (item.nights || 1);
      compliantAmount = item.amount - overAmount;
      issues.push({
        field: 'accommodation',
        message: `住宿超标：${item.city}(${getTierLabel(cityTier)})标准${limitPerNight}元/晚，实际${item.perNight}元/晚，超标¥${overAmount.toFixed(2)}`,
        limit: limitPerNight,
        actual: item.perNight,
        overAmount: overAmount
      });
    }
  }

  if (item.type === 'transportation') {
    if (item.category === 'highSpeedRail' && item.classLevel) {
      const allowedClass = standard.transportation.highSpeedRail;
      const classOrder = { '二等座': 1, '一等座': 2, '商务座': 3 };
      if (classOrder[item.classLevel] > classOrder[allowedClass]) {
        isOverLimit = true;
        const actualCoeff = CABIN_COEFFICIENTS.highSpeedRail[item.classLevel] || 1.0;
        const allowedCoeff = CABIN_COEFFICIENTS.highSpeedRail[allowedClass] || 1.0;
        const standardAmount = Math.round(item.amount * (allowedCoeff / actualCoeff) * 100) / 100;
        const overAmount = Math.round((item.amount - standardAmount) * 100) / 100;
        compliantAmount = standardAmount;
        issues.push({
          field: 'transportation_class',
          message: `高铁舱位超标：职级标准${allowedClass}，实际${item.classLevel}，按系数折算超标¥${overAmount.toFixed(2)}`,
          limit: allowedClass,
          actual: item.classLevel,
          overAmount: overAmount
        });
      }
    }
    if (item.category === 'flight' && item.classLevel) {
      const allowedClass = standard.transportation.flight;
      const classOrder = { '经济舱': 1, '超级经济舱': 2, '商务舱': 3, '头等舱': 4 };
      if (classOrder[item.classLevel] > classOrder[allowedClass]) {
        isOverLimit = true;
        const actualCoeff = CABIN_COEFFICIENTS.flight[item.classLevel] || 1.0;
        const allowedCoeff = CABIN_COEFFICIENTS.flight[allowedClass] || 1.0;
        const standardAmount = Math.round(item.amount * (allowedCoeff / actualCoeff) * 100) / 100;
        const overAmount = Math.round((item.amount - standardAmount) * 100) / 100;
        compliantAmount = standardAmount;
        issues.push({
          field: 'transportation_class',
          message: `机票舱位超标：职级标准${allowedClass}，实际${item.classLevel}，按系数折算超标¥${overAmount.toFixed(2)}`,
          limit: allowedClass,
          actual: item.classLevel,
          overAmount: overAmount
        });
      }
    }
  }

  if (item.type === 'allowance') {
    const dailyLimit = standard.transportation.dailyAllowance;
    const perDay = item.days ? item.amount / item.days : item.amount;
    if (perDay > dailyLimit) {
      isOverLimit = true;
      const overAmount = (perDay - dailyLimit) * (item.days || 1);
      compliantAmount = item.amount - overAmount;
      issues.push({
        field: 'allowance',
        message: `补贴超标：标准${dailyLimit}元/天，实际${perDay.toFixed(2)}元/天，超标¥${overAmount.toFixed(2)}`,
        limit: dailyLimit,
        actual: perDay,
        overAmount: overAmount
      });
    }
  }

  return {
    isOverLimit,
    compliantAmount,
    issues
  };
}

function calculateBudgetValidation(approvalId, currentReportId, currentItems, currentEmployeeLevel) {
  if (!approvalId) return null;

  const approval = approvals.find(a => a.id === approvalId);
  if (!approval) return null;

  const siblingReports = expenseReports.filter(r => r.approvalId === approvalId && r.id !== currentReportId);

  let existingCompliantTotal = 0;
  siblingReports.forEach(report => {
    report.items.forEach(item => {
      const v = validateExpenseItem(item, report.employeeLevel);
      existingCompliantTotal += v.compliantAmount;
    });
  });

  let currentCompliantTotal = 0;
  if (currentItems && currentItems.length > 0) {
    currentItems.forEach(item => {
      const v = validateExpenseItem(item, currentEmployeeLevel);
      currentCompliantTotal += v.compliantAmount;
    });
  }

  const totalCompliantAmount = existingCompliantTotal + currentCompliantTotal;
  const budgetAmount = approval.amount;
  const usedRatio = budgetAmount > 0 ? totalCompliantAmount / budgetAmount : 0;
  const isOverBudget = totalCompliantAmount > budgetAmount;
  const overBudgetAmount = isOverBudget ? Math.round((totalCompliantAmount - budgetAmount) * 100) / 100 : 0;

  return {
    budgetAmount,
    currentReportCompliantAmount: Math.round(currentCompliantTotal * 100) / 100,
    existingCompliantAmount: Math.round(existingCompliantTotal * 100) / 100,
    totalCompliantAmount: Math.round(totalCompliantAmount * 100) / 100,
    usedRatio: Math.round(usedRatio * 10000) / 100,
    isOverBudget,
    overBudgetAmount
  };
}

function getTierLabel(tier) {
  const labels = { firstTier: '一线城市', secondTier: '二线城市', thirdTier: '三线城市' };
  return labels[tier] || '三线城市';
}

function validateApprovalDateMatch(expenseItems, approval) {
  if (!approval) return { matched: false, mismatchedItems: [], message: '无对应出差审批单' };

  const mismatchedItems = [];
  const approvalStart = new Date(approval.startDate);
  const approvalEnd = new Date(approval.endDate);

  expenseItems.forEach(item => {
    if (item.date) {
      const itemDate = new Date(item.date);
      if (itemDate < approvalStart || itemDate > approvalEnd) {
        mismatchedItems.push({
          itemId: item.id,
          description: item.description,
          itemDate: item.date,
          approvalRange: `${approval.startDate} ~ ${approval.endDate}`
        });
      }
    }
  });

  return {
    matched: mismatchedItems.length === 0,
    mismatchedItems,
    message: mismatchedItems.length > 0 ? '存在行程日期超出审批范围的项目' : '日期匹配通过'
  };
}

function validateApprovalCityMatch(expenseItems, approval) {
  if (!approval) return { matched: false, mismatchedItems: [] };

  const mismatchedItems = [];
  expenseItems.forEach(item => {
    if (item.city && approval.cities.indexOf(item.city) === -1) {
      mismatchedItems.push({
        itemId: item.id,
        description: item.description,
        itemCity: item.city,
        approvedCities: approval.cities
      });
    }
  });

  return {
    matched: mismatchedItems.length === 0,
    mismatchedItems
  };
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'travel-expense-core', port: PORT });
});

app.get('/api/standards', (req, res) => {
  res.json({
    success: true,
    data: {
      standards: travelStandards,
      cityTierMap: cityTierMap
    }
  });
});

app.get('/api/employees', (req, res) => {
  res.json({ success: true, data: employees });
});

app.get('/api/approvals', (req, res) => {
  const { employeeId } = req.query;
  let result = approvals;
  if (employeeId) {
    result = approvals.filter(a => a.employeeId === employeeId && a.status === 'approved');
  }
  res.json({ success: true, data: result });
});

app.get('/api/expenses', (req, res) => {
  const { status, employeeId } = req.query;
  let result = [...expenseReports];
  if (status) result = result.filter(r => r.status === status);
  if (employeeId) result = result.filter(r => r.employeeId === employeeId);
  res.json({ success: true, data: result });
});

app.get('/api/expenses/:id', (req, res) => {
  const report = expenseReports.find(r => r.id === req.params.id);
  if (!report) {
    return res.status(404).json({ success: false, message: '报销单不存在' });
  }

  const employee = employees.find(e => e.id === report.employeeId);
  const approval = report.approvalId ? approvals.find(a => a.id === report.approvalId) : null;
  const standard = getStandardByLevel(report.employeeLevel);

  const dateValidation = validateApprovalDateMatch(report.items, approval);
  const cityValidation = validateApprovalCityMatch(report.items, approval);

  const itemValidations = report.items.map(item => {
    const validation = validateExpenseItem(item, report.employeeLevel);
    return {
      itemId: item.id,
      ...validation
    };
  });

  const hasApproval = !!approval;
  const overallCompliant = hasApproval && dateValidation.matched && cityValidation.matched &&
    itemValidations.every(v => !v.isOverLimit);

  const budgetValidation = calculateBudgetValidation(report.approvalId, report.id, report.items, report.employeeLevel);

  res.json({
    success: true,
    data: {
      report,
      employee,
      approval,
      standard,
      validations: {
        hasApproval,
        dateValidation,
        cityValidation,
        itemValidations,
        overallCompliant,
        rejectWithoutApproval: !hasApproval,
        budgetValidation
      }
    }
  });
});

app.post('/api/expenses/validate', (req, res) => {
  const { employeeId, items, approvalId } = req.body;
  const employee = employees.find(e => e.id === employeeId);

  if (!employee) {
    return res.status(400).json({ success: false, message: '员工不存在' });
  }

  const approval = approvalId ? approvals.find(a => a.id === approvalId) : null;
  const standard = getStandardByLevel(employee.level);

  const dateValidation = validateApprovalDateMatch(items, approval);
  const cityValidation = validateApprovalCityMatch(items, approval);

  const itemValidations = items.map(item => {
    const validation = validateExpenseItem(item, employee.level);
    return {
      itemId: item.id,
      ...validation
    };
  });

  const hasApproval = !!approval;
  const overallCompliant = hasApproval && dateValidation.matched && cityValidation.matched &&
    itemValidations.every(v => !v.isOverLimit);

  const totalCompliantAmount = itemValidations.reduce((sum, v) => sum + v.compliantAmount, 0);
  const totalOverAmount = itemValidations.reduce((sum, v) => {
    const over = v.issues.reduce((s, i) => s + (i.overAmount || 0), 0);
    return sum + over;
  }, 0);

  const budgetValidation = calculateBudgetValidation(approvalId, null, items, employee.level);

  res.json({
    success: true,
    data: {
      employee,
      approval,
      standard,
      validations: {
        hasApproval,
        rejectWithoutApproval: !hasApproval,
        dateValidation,
        cityValidation,
        itemValidations,
        overallCompliant,
        totalCompliantAmount,
        totalOverAmount,
        budgetValidation
      }
    }
  });
});

app.post('/api/expenses', (req, res) => {
  const { employeeId, approvalId, purpose, items } = req.body;
  const employee = employees.find(e => e.id === employeeId);

  if (!employee) {
    return res.status(400).json({ success: false, message: '员工不存在' });
  }

  const approval = approvalId ? approvals.find(a => a.id === approvalId) : null;
  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  const newReport = {
    id: 'EXP' + Date.now().toString().slice(-8),
    employeeId: employee.id,
    employeeName: employee.name,
    employeeLevel: employee.level,
    approvalId: approvalId || null,
    purpose,
    submitDate: new Date().toISOString().slice(0, 10),
    status: 'pending',
    items: items.map(item => ({
      ...item,
      id: item.id || 'ITEM' + uuidv4().slice(0, 6),
      status: 'pending',
      reviewNote: ''
    })),
    totalAmount,
    reviewResult: null
  };

  expenseReports.unshift(newReport);
  res.json({ success: true, data: newReport });
});

app.post('/api/expenses/:id/review', (req, res) => {
  const { decisions, reviewer, overallNote } = req.body;
  const report = expenseReports.find(r => r.id === req.params.id);

  if (!report) {
    return res.status(404).json({ success: false, message: '报销单不存在' });
  }

  let approvedCount = 0;
  let rejectedCount = 0;
  let approvedAmount = 0;

  report.items = report.items.map(item => {
    const decision = decisions.find(d => d.itemId === item.id);
    if (decision) {
      if (decision.status === 'approved') {
        approvedCount++;
        approvedAmount += decision.approvedAmount || item.amount;
        return { ...item, status: 'approved', reviewNote: decision.note || '', approvedAmount: decision.approvedAmount || item.amount };
      } else if (decision.status === 'rejected') {
        rejectedCount++;
        return { ...item, status: 'rejected', reviewNote: decision.note || '' };
      } else if (decision.status === 'partial') {
        approvedCount++;
        approvedAmount += decision.approvedAmount || 0;
        return { ...item, status: 'partial', reviewNote: decision.note || '', approvedAmount: decision.approvedAmount || 0 };
      }
    }
    return item;
  });

  if (approvedCount === report.items.length && rejectedCount === 0) {
    report.status = 'approved';
  } else if (rejectedCount === report.items.length) {
    report.status = 'rejected';
  } else {
    report.status = 'partial';
  }

  report.reviewResult = {
    reviewer,
    reviewDate: new Date().toISOString(),
    approvedCount,
    rejectedCount,
    approvedAmount,
    overallNote: overallNote || ''
  };

  res.json({ success: true, data: report });
});

app.get('/api/stats', (req, res) => {
  const pending = expenseReports.filter(r => r.status === 'pending').length;
  const approved = expenseReports.filter(r => r.status === 'approved').length;
  const rejected = expenseReports.filter(r => r.status === 'rejected').length;
  const partial = expenseReports.filter(r => r.status === 'partial').length;
  const totalAmount = expenseReports.reduce((sum, r) => sum + r.totalAmount, 0);

  res.json({
    success: true,
    data: {
      totalReports: expenseReports.length,
      pending,
      approved,
      rejected,
      partial,
      totalAmount
    }
  });
});

app.listen(PORT, () => {
  console.log(`差旅报销合规校验核心运算服务已启动: http://localhost:${PORT}`);
});
