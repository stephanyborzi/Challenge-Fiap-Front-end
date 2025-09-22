const suppliers = [
  { supplierId: 'SUP-001', name: 'Farmalogic Distribuidora', contact: 'contato@farmalogic.com.br', phone: '(11) 98765-4321' },
  { supplierId: 'SUP-002', name: 'Hospitalar Suprimentos Ltda.', contact: 'vendas@hospitalsuprimentos.com', phone: '(21) 91234-5678' },
  { supplierId: 'SUP-003', name: 'Escritório Total', contact: 'compras@escritoriototal.com.br', phone: '(31) 95555-4444' },
  { supplierId: 'SUP-004', name: 'Clean & Health Higiene', contact: 'sac@cleanhealth.com.br', phone: '(41) 99888-7777' },
  { supplierId: 'SUP-005', name: 'LabSolutions Químicos', contact: 'comercial@labsolutions.com', phone: '(51) 96543-2109' }
];

const stockItemsBase = [
  {
    productId: 'MED-001',
    name: 'Paracetamol 500mg',
    category: 'Medicamentos',
    subCategory: 'Analgésico',
    initialStock: 100,
    minStock: 50,
    unitPrice: 2.50,
    batch: 'LOTE-123-A',
    expirationDate: '2026-12-31',
    supplierId: 'SUP-001',
    location: 'A1-2B-3'
  },
  {
    productId: 'MED-002',
    name: 'Ibuprofeno 400mg',
    category: 'Medicamentos',
    subCategory: 'Analgésico',
    initialStock: 150,
    minStock: 80,
    unitPrice: 3.60,
    batch: 'LOTE-456-B',
    expirationDate: '2027-06-15',
    supplierId: 'SUP-001',
    location: 'A1-2B-4'
  },
  {
    productId: 'MED-003',
    name: 'Dipirona 500mg',
    category: 'Medicamentos',
    subCategory: 'Analgésico',
    initialStock: 50,
    minStock: 25,
    unitPrice: 3.00,
    batch: 'LOTE-789-C',
    expirationDate: '2026-08-20',
    supplierId: 'SUP-001',
    location: 'A1-2B-5'
  },
  {
    productId: 'MED-004',
    name: 'Omeprazol 20mg',
    category: 'Medicamentos',
    subCategory: 'Gastrointestinal',
    initialStock: 50,
    minStock: 100,
    unitPrice: 2.00,
    batch: 'LOTE-101-D',
    expirationDate: '2026-03-01',
    supplierId: 'SUP-002',
    location: 'B2-4C-1'
  },
  {
    productId: 'MED-005',
    name: 'Amoxicilina 500mg',
    category: 'Medicamentos',
    subCategory: 'Antibiótico',
    initialStock: 200,
    minStock: 100,
    unitPrice: 3.33,
    batch: 'LOTE-112-E',
    expirationDate: '2026-05-10',
    supplierId: 'SUP-001',
    location: 'A1-2B-6'
  },
  {
    productId: 'MED-006',
    name: 'Aspirina 100mg',
    category: 'Medicamentos',
    subCategory: 'Analgésico',
    initialStock: 50,
    minStock: 50,
    unitPrice: 0.40,
    batch: 'LOTE-134-F',
    expirationDate: '2027-01-20',
    supplierId: 'SUP-001',
    location: 'A1-2B-7'
  },
  {
    productId: 'SUP-001',
    name: 'Soro Fisiológico',
    category: 'Materiais de Enfermagem',
    subCategory: 'Insumos',
    initialStock: 300,
    minStock: 150,
    unitPrice: 0.60,
    batch: 'LOTE-156-G',
    expirationDate: '2027-09-01',
    supplierId: 'SUP-002',
    location: 'B2-4C-2'
  },
  {
    productId: 'MED-007',
    name: 'Loratadina 10mg',
    category: 'Medicamentos',
    subCategory: 'Antialérgico',
    initialStock: 100,
    minStock: 40,
    unitPrice: 1.50,
    batch: 'LOTE-178-H',
    expirationDate: '2026-11-05',
    supplierId: 'SUP-001',
    location: 'A1-2B-8'
  },
  {
    productId: 'MED-008',
    name: 'Novalgina 1g',
    category: 'Medicamentos',
    subCategory: 'Analgésico',
    initialStock: 80,
    minStock: 50,
    unitPrice: 2.50,
    batch: 'LOTE-190-I',
    expirationDate: '2027-03-25',
    supplierId: 'SUP-001',
    location: 'A1-2B-9'
  },
  {
    productId: 'MED-009',
    name: 'Buscopan',
    category: 'Medicamentos',
    subCategory: 'Antiespasmódico',
    initialStock: 100,
    minStock: 30,
    unitPrice: 3.00,
    batch: 'LOTE-212-J',
    expirationDate: '2026-07-10',
    supplierId: 'SUP-001',
    location: 'A1-2B-10'
  },
  {
    productId: 'ESC-001',
    name: 'Caneta Esferográfica',
    category: 'Materiais de Escritório',
    subCategory: 'Canetas',
    initialStock: 200,
    minStock: 50,
    unitPrice: 1.20,
    batch: 'LOTE-301-K',
    expirationDate: null,
    supplierId: 'SUP-003',
    location: 'C3-1D-1'
  },
  {
    productId: 'MED-010',
    name: 'Simeticona 75mg',
    category: 'Medicamentos',
    subCategory: 'Gastrointestinal',
    initialStock: 75,
    minStock: 30,
    unitPrice: 2.25,
    batch: 'LOTE-325-L',
    expirationDate: '2026-05-15',
    supplierId: 'SUP-002',
    location: 'B2-4C-3'
  },
  {
    productId: 'INS-002',
    name: 'Luvas de Procedimento (Caixa)',
    category: 'Materiais de Enfermagem',
    subCategory: 'EPI',
    initialStock: 50,
    minStock: 20,
    unitPrice: 15.00,
    batch: 'LOTE-401-M',
    expirationDate: '2028-01-01',
    supplierId: 'SUP-002',
    location: 'B2-4C-4'
  },
  {
    productId: 'INS-003',
    name: 'Gaze Estéril (Pacote)',
    category: 'Materiais de Enfermagem',
    subCategory: 'Curativos',
    initialStock: 80,
    minStock: 40,
    unitPrice: 8.50,
    batch: 'LOTE-420-N',
    expirationDate: '2027-11-20',
    supplierId: 'SUP-002',
    location: 'B2-4C-5'
  },
  {
    productId: 'LAB-001',
    name: 'Álcool 70%',
    category: 'Materiais de Limpeza',
    subCategory: 'Desinfetantes',
    initialStock: 20,
    minStock: 10,
    unitPrice: 12.00,
    batch: 'LOTE-500-O',
    expirationDate: '2027-08-30',
    supplierId: 'SUP-004',
    location: 'D4-1E-1'
  },
  {
    productId: 'LAB-002',
    name: 'Água Destilada',
    category: 'Materiais de Limpeza',
    subCategory: 'Solventes',
    initialStock: 15,
    minStock: 5,
    unitPrice: 5.00,
    batch: 'LOTE-501-P',
    expirationDate: '2026-04-10',
    supplierId: 'SUP-005',
    location: 'E5-2F-1'
  },
];

const stockMovements = [
  // Janeiro 2024
  { movementId: 1, productId: 'MED-001', type: 'entrada', quantity: 100, date: '2024-01-15T09:30:00Z', reason: 'Compra inicial', responsible: 'João Silva', supplier: 'SUP-001' },
  { movementId: 2, productId: 'MED-002', type: 'entrada', quantity: 150, date: '2024-01-15T08:15:00Z', reason: 'Compra inicial', responsible: 'Maria Santos', supplier: 'SUP-001' },
  { movementId: 3, productId: 'MED-003', type: 'entrada', quantity: 50, date: '2024-01-14T16:45:00Z', reason: 'Compra inicial', responsible: 'Carlos Lima', supplier: 'SUP-001' },
  { movementId: 4, productId: 'SUP-001', type: 'entrada', quantity: 300, date: '2024-01-14T10:00:00Z', reason: 'Compra inicial', responsible: 'Ana Paula', supplier: 'SUP-002' },
  { movementId: 5, productId: 'ESC-001', type: 'entrada', quantity: 200, date: '2024-01-13T14:20:00Z', reason: 'Compra inicial', responsible: 'Pedro Costa', supplier: 'SUP-003' },
  { movementId: 6, productId: 'MED-001', type: 'saida', quantity: 10, date: '2024-01-20T11:00:00Z', reason: 'Uso interno - setor A', responsible: 'Maria Santos' },
  { movementId: 7, productId: 'MED-002', type: 'saida', quantity: 20, date: '2024-01-22T14:00:00Z', reason: 'Uso interno - setor B', responsible: 'João Silva' },
  // Fevereiro 2024
  { movementId: 8, productId: 'MED-004', type: 'entrada', quantity: 50, date: '2024-02-05T09:00:00Z', reason: 'Compra de novo item', responsible: 'Carlos Lima', supplier: 'SUP-002' },
  { movementId: 9, productId: 'MED-001', type: 'saida', quantity: 15, date: '2024-02-10T15:30:00Z', reason: 'Uso interno - setor A', responsible: 'Ana Paula' },
  { movementId: 10, productId: 'SUP-001', type: 'saida', quantity: 50, date: '2024-02-18T10:00:00Z', reason: 'Uso interno - setor de enfermagem', responsible: 'Ricardo Almeida' },
  // Março 2024
  { movementId: 11, productId: 'MED-005', type: 'entrada', quantity: 200, date: '2024-03-01T10:00:00Z', reason: 'Compra de novo item', responsible: 'Fernanda Lima', supplier: 'SUP-001' },
  { movementId: 12, productId: 'ESC-001', type: 'saida', quantity: 30, date: '2024-03-05T12:00:00Z', reason: 'Uso interno - equipe administrativa', responsible: 'Carla Dias' },
  { movementId: 13, productId: 'MED-002', type: 'saida', quantity: 35, date: '2024-03-20T16:00:00Z', reason: 'Uso interno - setor B', responsible: 'Maria Santos' },
  // Abril 2024
  { movementId: 14, productId: 'MED-006', type: 'entrada', quantity: 50, date: '2024-04-02T14:00:00Z', reason: 'Compra de novo item', responsible: 'Pedro Costa', supplier: 'SUP-001' },
  { movementId: 15, productId: 'MED-005', type: 'saida', quantity: 45, date: '2024-04-10T09:00:00Z', reason: 'Uso interno - setor C', responsible: 'Pedro Costa' },
  { movementId: 16, productId: 'SUP-001', type: 'saida', quantity: 70, date: '2024-04-15T11:00:00Z', reason: 'Uso interno - setor de emergência', responsible: 'Ricardo Almeida' },
  // Maio 2024
  { movementId: 17, productId: 'MED-007', type: 'entrada', quantity: 100, date: '2024-05-08T10:00:00Z', reason: 'Compra de novo item', responsible: 'Ana Paula', supplier: 'SUP-001' },
  { movementId: 18, productId: 'MED-001', type: 'saida', quantity: 25, date: '2024-05-15T13:00:00Z', reason: 'Uso interno - setor A', responsible: 'Maria Santos' },
  // Junho 2024
  { movementId: 19, productId: 'MED-008', type: 'entrada', quantity: 80, date: '2024-06-01T16:00:00Z', reason: 'Compra de novo item', responsible: 'João Silva', supplier: 'SUP-001' },
  { movementId: 20, productId: 'MED-006', type: 'saida', quantity: 20, date: '2024-06-10T11:00:00Z', reason: 'Uso interno - setor B', responsible: 'Carla Dias' },
  // Julho 2024
  { movementId: 21, productId: 'MED-009', type: 'entrada', quantity: 100, date: '2024-07-05T09:00:00Z', reason: 'Compra de novo item', responsible: 'Pedro Costa', supplier: 'SUP-001' },
  { movementId: 22, productId: 'ESC-001', type: 'saida', quantity: 40, date: '2024-07-15T14:00:00Z', reason: 'Uso interno - equipe administrativa', responsible: 'Ana Paula' },
  // Agosto 2024
  { movementId: 23, productId: 'MED-010', type: 'entrada', quantity: 75, date: '2024-08-01T10:00:00Z', reason: 'Compra de novo item', responsible: 'Maria Santos', supplier: 'SUP-002' },
  { movementId: 24, productId: 'MED-003', type: 'saida', quantity: 15, date: '2024-08-10T13:00:00Z', reason: 'Uso interno - setor C', responsible: 'Carlos Lima' },
  // Setembro 2024
  { movementId: 25, productId: 'INS-002', type: 'entrada', quantity: 50, date: '2024-09-05T11:00:00Z', reason: 'Compra de novo item', responsible: 'Ricardo Almeida', supplier: 'SUP-002' },
  { movementId: 26, productId: 'MED-008', type: 'saida', quantity: 30, date: '2024-09-18T15:00:00Z', reason: 'Uso interno - setor A', responsible: 'João Silva' },
  // Outubro 2024
  { movementId: 27, productId: 'INS-003', type: 'entrada', quantity: 80, date: '2024-10-10T14:00:00Z', reason: 'Compra de novo item', responsible: 'Carla Dias', supplier: 'SUP-002' },
  { movementId: 28, productId: 'LAB-001', type: 'entrada', quantity: 20, date: '2024-10-25T16:00:00Z', reason: 'Compra de novo item', responsible: 'Fernanda Lima', supplier: 'SUP-004' },
  { movementId: 29, productId: 'MED-001', type: 'saida', quantity: 10, date: '2024-10-28T10:00:00Z', reason: 'Uso interno - setor A', responsible: 'Maria Santos' },
  // Novembro 2024
  { movementId: 30, productId: 'LAB-002', type: 'entrada', quantity: 15, date: '2024-11-05T09:00:00Z', reason: 'Compra de novo item', responsible: 'Pedro Costa', supplier: 'SUP-005' },
  { movementId: 31, productId: 'MED-002', type: 'saida', quantity: 25, date: '2024-11-15T11:00:00Z', reason: 'Uso interno - setor B', responsible: 'João Silva' },
  { movementId: 32, productId: 'INS-002', type: 'saida', quantity: 20, date: '2024-11-20T14:00:00Z', reason: 'Uso interno - setor de enfermagem', responsible: 'Ricardo Almeida' },
  // Dezembro 2024
  { movementId: 33, productId: 'MED-003', type: 'saida', quantity: 10, date: '2024-12-05T10:00:00Z', reason: 'Uso interno - setor C', responsible: 'Carlos Lima' },
  { movementId: 34, productId: 'ESC-001', type: 'entrada', quantity: 100, date: '2024-12-18T14:00:00Z', reason: 'Compra', responsible: 'Ana Paula', supplier: 'SUP-003' },
  { movementId: 35, productId: 'MED-007', type: 'saida', quantity: 60, date: '2024-12-20T16:00:00Z', reason: 'Uso interno - setor A', responsible: 'Mariana Santos' },
  // Janeiro 2025
  { movementId: 36, productId: 'MED-001', type: 'saida', quantity: 30, date: '2025-01-05T10:00:00Z', reason: 'Uso interno - setor A', responsible: 'Maria Santos' },
  { movementId: 37, productId: 'MED-004', type: 'saida', quantity: 15, date: '2025-01-10T12:00:00Z', reason: 'Uso interno - setor B', responsible: 'João Silva' },
  { movementId: 38, productId: 'SUP-001', type: 'entrada', quantity: 200, date: '2025-01-15T15:00:00Z', reason: 'Compra', responsible: 'Ricardo Almeida', supplier: 'SUP-002' },
  // Fevereiro 2025
  { movementId: 39, productId: 'MED-005', type: 'saida', quantity: 70, date: '2025-02-02T09:00:00Z', reason: 'Uso interno - setor C', responsible: 'Pedro Costa' },
  { movementId: 40, productId: 'MED-002', type: 'entrada', quantity: 100, date: '2025-02-18T14:00:00Z', reason: 'Compra', responsible: 'Maria Santos', supplier: 'SUP-001' },
  { movementId: 41, productId: 'LAB-001', type: 'saida', quantity: 10, date: '2025-02-25T11:00:00Z', reason: 'Uso interno - laboratório', responsible: 'Fernanda Lima' },
  // Março 2025
  { movementId: 42, productId: 'MED-009', type: 'saida', quantity: 30, date: '2025-03-01T10:00:00Z', reason: 'Uso interno - setor C', responsible: 'Carla Dias' },
  { movementId: 43, productId: 'INS-003', type: 'saida', quantity: 40, date: '2025-03-10T13:00:00Z', reason: 'Uso interno - setor de emergência', responsible: 'Ricardo Almeida' },
  { movementId: 44, productId: 'MED-006', type: 'entrada', quantity: 150, date: '2025-03-20T15:00:00Z', reason: 'Compra', responsible: 'Pedro Costa', supplier: 'SUP-001' },
  // Abril 2025
  { movementId: 45, productId: 'MED-001', type: 'entrada', quantity: 200, date: '2025-04-05T09:00:00Z', reason: 'Compra', responsible: 'João Silva', supplier: 'SUP-001' },
  { movementId: 46, productId: 'LAB-002', type: 'saida', quantity: 5, date: '2025-04-15T14:00:00Z', reason: 'Uso interno - laboratório', responsible: 'Fernanda Lima' },
  // Maio 2025
  { movementId: 47, productId: 'MED-003', type: 'entrada', quantity: 150, date: '2025-05-10T11:00:00Z', reason: 'Compra', responsible: 'Carlos Lima', supplier: 'SUP-001' },
  { movementId: 48, productId: 'ESC-001', type: 'saida', quantity: 70, date: '2025-05-20T15:00:00Z', reason: 'Uso interno - setor financeiro', responsible: 'Ana Paula' },
  // Junho 2025
  { movementId: 49, productId: 'MED-007', type: 'saida', quantity: 20, date: '2025-06-01T10:00:00Z', reason: 'Uso interno - setor A', responsible: 'Mariana Santos' },
  { movementId: 50, productId: 'MED-008', type: 'entrada', quantity: 100, date: '2025-06-15T16:00:00Z', reason: 'Compra', responsible: 'João Silva', supplier: 'SUP-001' },
  // Julho 2025
  { movementId: 51, productId: 'MED-004', type: 'entrada', quantity: 150, date: '2025-07-01T09:00:00Z', reason: 'Compra', responsible: 'Carlos Lima', supplier: 'SUP-002' },
  { movementId: 52, productId: 'SUP-001', type: 'saida', quantity: 80, date: '2025-07-15T11:00:00Z', reason: 'Uso interno - setor de enfermagem', responsible: 'Ricardo Almeida' },
  // Agosto 2025
  { movementId: 53, productId: 'MED-005', type: 'entrada', quantity: 80, date: '2025-08-10T14:00:00Z', reason: 'Compra', responsible: 'Pedro Costa', supplier: 'SUP-001' },
  { movementId: 54, productId: 'INS-002', type: 'saida', quantity: 15, date: '2025-08-20T16:00:00Z', reason: 'Uso interno - setor de enfermagem', responsible: 'Ricardo Almeida' },
  // Setembro 2025
  { movementId: 55, productId: 'MED-010', type: 'saida', quantity: 20, date: '2025-09-05T10:00:00Z', reason: 'Uso interno - setor B', responsible: 'Ana Paula' },
  { movementId: 56, productId: 'MED-006', type: 'saida', quantity: 80, date: '2025-09-18T14:00:00Z', reason: 'Uso interno - setor C', responsible: 'Carla Dias' },
  // Outubro 2025
  { movementId: 57, productId: 'MED-003', type: 'saida', quantity: 30, date: '2025-10-01T10:00:00Z', reason: 'Uso interno - setor C', responsible: 'Carlos Lima' },
  { movementId: 58, productId: 'MED-009', type: 'saida', quantity: 50, date: '2025-10-15T11:00:00Z', reason: 'Uso interno - setor A', responsible: 'Mariana Santos' },
  { movementId: 59, productId: 'ESC-001', type: 'entrada', quantity: 150, date: '2025-10-25T15:00:00Z', reason: 'Compra', responsible: 'João Silva', supplier: 'SUP-003' },
  { movementId: 60, productId: 'MED-007', type: 'entrada', quantity: 100, date: '2025-10-28T16:00:00Z', reason: 'Compra', responsible: 'Maria Santos', supplier: 'SUP-001' },
];

const stockItemsMap = {};
stockItemsBase.forEach(item => {
  stockItemsMap[item.productId] = { ...item, currentStock: item.initialStock };
});

stockMovements.forEach(movement => {
  const item = stockItemsMap[movement.productId];
  if (item) {
    if (movement.type === 'entrada') {
      item.currentStock += movement.quantity;
    } else if (movement.type === 'saida' || movement.type === 'transferencia') {
      item.currentStock = Math.max(0, item.currentStock - movement.quantity);
    }
  }
});

const stockItems = Object.values(stockItemsMap);

const categories = [...new Set(stockItems.map(item => item.category))];
const categoryStocks = {};

categories.forEach(category => {
  const itemsInCategory = stockItems.filter(item => item.category === category);
  const totalStock = itemsInCategory.reduce((acc, item) => acc + item.currentStock, 0);
  categoryStocks[category] = {
    totalItems: totalStock,
    lowStockItems: itemsInCategory.filter(item => item.currentStock > 0 && item.currentStock <= item.minStock).length,
    outOfStockItems: itemsInCategory.filter(item => item.currentStock === 0).length,
    totalValue: parseFloat(itemsInCategory.reduce((acc, item) => acc + (item.currentStock * item.unitPrice), 0).toFixed(2))
  };
});

const totalItems = stockItems.reduce((acc, item) => acc + item.currentStock, 0);
const lowStockItems = stockItems.filter(item => item.currentStock > 0 && item.currentStock <= item.minStock).length;
const outOfStockItems = stockItems.filter(item => item.currentStock === 0).length;
const totalValue = stockItems.reduce((acc, item) => acc + (item.currentStock * item.unitPrice), 0);

const inventorySummary = {
  totalItems: totalItems,
  lowStockItems: lowStockItems,
  outOfStockItems: outOfStockItems,
  totalValue: parseFloat(totalValue.toFixed(2)),
  lastUpdated: new Date().toISOString()
};

const totalExpenses = stockMovements
  .filter(m => m.type === 'saida')
  .reduce((acc, movement) => {
    const item = stockItemsBase.find(i => i.productId === movement.productId);
    return acc + (item ? movement.quantity * item.unitPrice : 0);
  }, 0);

const totalRevenue = stockMovements
  .filter(m => m.type === 'entrada')
  .reduce((acc, movement) => {
    const item = stockItemsBase.find(i => i.productId === movement.productId);
    return acc + (item ? movement.quantity * item.unitPrice : 0);
  }, 0);

const purchaseSuggestions = stockItems
  .filter(item => item.currentStock <= item.minStock)
  .map(item => {
    const suggestedQuantity = item.minStock - item.currentStock;
    const estimatedValue = suggestedQuantity * item.unitPrice;
    const urgency = item.currentStock === 0 ? 'Crítica' : (item.currentStock <= item.minStock * 0.5 ? 'Urgente' : 'Média');
    return {
      productId: item.productId,
      name: item.name,
      currentStock: item.currentStock,
      minStock: item.minStock,
      suggestedQuantity: suggestedQuantity > 0 ? suggestedQuantity : item.minStock,
      estimatedValue: parseFloat(estimatedValue.toFixed(2)),
      urgency: urgency,
      details: `Estoque em ${item.currentStock}, abaixo do mínimo (${item.minStock}).`
    };
  });
  
const financialSummary = {
  currentMonth: 'Outubro 2025',
  monthlyExpenses: parseFloat(totalExpenses.toFixed(2)),
  monthlyRevenue: parseFloat(totalRevenue.toFixed(2)),
  totalSavings: 5800.25, 
  nextMonthForecast: parseFloat((totalExpenses + purchaseSuggestions.reduce((acc, item) => acc + item.estimatedValue, 0)).toFixed(2)),
};

const expenseForecast = [
  { month: 'Janeiro 2025', value: 875.55, type: 'actual' },
  { month: 'Fevereiro 2025', value: 112.50, type: 'actual' },
  { month: 'Março 2025', value: 16.00, type: 'actual' },
  { month: 'Abril 2025', value: 125.00, type: 'actual' },
  { month: 'Maio 2025', value: 45.00, type: 'actual' },
  { month: 'Junho 2025', value: 0, type: 'actual' },
  { month: 'Julho 2025', value: 144.00, type: 'actual' },
  { month: 'Agosto 2025', value: 40.00, type: 'actual' },
  { month: 'Setembro 2025', value: 125.00, type: 'actual' },
  { month: 'Outubro 2025', value: 110.00, type: 'actual' },
  { month: 'Novembro 2025', value: 250.00, type: 'forecast' },
  { month: 'Dezembro 2025', value: 290.00, type: 'forecast' }
];

export const fakeData = {
  inventorySummary,
  financialSummary,
  categoryStocks,
  suppliers,
  stockItems,
  stockMovements,
  purchaseSuggestions,
  expenseForecast
};