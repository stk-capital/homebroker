// Conectar ao banco de dados homebroker
db = db.getSiblingDB('homebroker');

// Limpar coleções existentes
db.stocks.drop();
db.users.drop();
db.transactions.drop();

// Inserir stocks
db.stocks.insertMany([
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    currentPrice: 151.0,
    change: 2.5,
    historicalData: [
      { date: "2025-02-14", price: 145.0, volume: 1000000 },
      { date: "2025-02-17", price: 147.5, volume: 1200000 },
      { date: "2025-02-18", price: 149.25, volume: 1100000 },
      { date: "2025-02-19", price: 150.75, volume: 1050000 },
      { date: "2025-02-20", price: 149.5, volume: 1150000 },
      { date: "2025-02-21", price: 251.0, volume: 1200000 }
    ]
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    currentPrice: 2751.5,
    change: -0.3,
    historicalData: [
      { date: "2025-02-14", price: 2755.0, volume: 500000 },
      { date: "2025-02-17", price: 2752.5, volume: 550000 },
      { date: "2025-02-18", price: 2750.8, volume: 520000 },
      { date: "2025-02-19", price: 2748.0, volume: 530000 },
      { date: "2025-02-20", price: 2753.0, volume: 510000 },
      { date: "2025-02-21", price: 2751.5, volume: 540000 }
    ]
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    currentPrice: 306.0,
    change: 1.2,
    historicalData: [
      { date: "2025-02-14", price: 300.0, volume: 800000 },
      { date: "2025-02-17", price: 302.5, volume: 820000 },
      { date: "2025-02-18", price: 305.15, volume: 810000 },
      { date: "2025-02-19", price: 304.75, volume: 815000 },
      { date: "2025-02-20", price: 305.5, volume: 825000 },
      { date: "2025-02-21", price: 306.0, volume: 830000 }
    ]
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    currentPrice: 3385.0,
    change: -1.5,
    historicalData: [
      { date: "2025-02-14", price: 3400.0, volume: 600000 },
      { date: "2025-02-17", price: 3390.0, volume: 620000 },
      { date: "2025-02-18", price: 3380.5, volume: 610000 },
      { date: "2025-02-19", price: 3375.0, volume: 615000 },
      { date: "2025-02-20", price: 3382.0, volume: 625000 },
      { date: "2025-02-21", price: 3385.0, volume: 630000 }
    ]
  }
]);

// Inserir users
db.users.insertMany([
  {
    name: "John Doe",
    email: "john@example.com",
    balance: 100000,
    watchlist: ["AAPL", "GOOGL"]
  }
]);

// Inserir transactions
const userId = db.users.findOne({email: "john@example.com"})._id;

db.transactions.insertMany([
  {
    userId: userId,
    type: "BUY",
    symbol: "AAPL",
    shares: 10,
    price: 150.25,
    date: new Date("2023-05-01T10:30:00Z")
  },
  {
    userId: userId,
    type: "SELL",
    symbol: "GOOGL",
    shares: 5,
    price: 2755.5,
    date: new Date("2023-05-02T14:45:00Z")
  }
]);

// Imprimir confirmação
print("Dados inseridos com sucesso!"); 