"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Product {
  name: string;
  buyPrice: number;
  sellPrice: number;
  profitLoss: number;
  date: string;
}

interface CreditItem {
  person: string;
  item: string;
  amount: number;
  date: string;
}

export default function Hero() {
  const [products, setProducts] = useState<Product[]>([]);
  const [credits, setCredits] = useState<CreditItem[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [date, setDate] = useState("");

  // Credit form states
  const [creditPerson, setCreditPerson] = useState("");
  const [creditItem, setCreditItem] = useState("");
  const [creditAmount, setCreditAmount] = useState("");
  const [creditDate, setCreditDate] = useState("");

  // Load from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    const savedCredits = localStorage.getItem("credits");

    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedCredits) setCredits(JSON.parse(savedCredits));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("credits", JSON.stringify(credits));
  }, [credits]);

  const handleAddProduct = () => {
    const buy = parseFloat(buyPrice);
    const sell = parseFloat(sellPrice);
    if (!name || isNaN(buy) || isNaN(sell) || !date) return;

    const newProduct: Product = {
      name,
      buyPrice: buy,
      sellPrice: sell,
      profitLoss: sell - buy,
      date,
    };

    setProducts((prev) => [...prev, newProduct]);
    setName("");
    setBuyPrice("");
    setSellPrice("");
    setDate("");
    setShowForm(false);
  };

  const handleDeleteProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddCredit = () => {
    const amount = parseFloat(creditAmount);
    if (!creditPerson || !creditItem || isNaN(amount) || !creditDate) return;

    const newCredit: CreditItem = {
      person: creditPerson,
      item: creditItem,
      amount,
      date: creditDate,
    };

    setCredits((prev) => [...prev, newCredit]);
    setCreditPerson("");
    setCreditItem("");
    setCreditAmount("");
    setCreditDate("");
  };

  const handleDeleteCredit = (index: number) => {
    setCredits((prev) => prev.filter((_, i) => i !== index));
  };

  const totalProfitLoss = products.reduce((total, p) => total + p.profitLoss, 0);
  const totalCreditAmount = credits.reduce((total, c) => total + c.amount, 0);

  return (
    <section className="w-full bg-gray-100 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">

        {/* Product Tracker */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Product Tracker</h1>
            <p className="text-gray-600">Track buy/sell prices & calculate profit or loss.</p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-black text-white hover:bg-gray-800"
          >
            + Add Product
          </Button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border px-4 py-2 rounded-md"
              />
              <input
                type="number"
                placeholder="Buy Price"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                className="border px-4 py-2 rounded-md"
              />
              <input
                type="number"
                placeholder="Sell Price"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                className="border px-4 py-2 rounded-md"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border px-4 py-2 rounded-md"
              />
              <Button
                onClick={handleAddProduct}
                className="bg-green-600 text-white hover:bg-green-700"
              >
                Add Sell Product
              </Button>
            </div>
          </div>
        )}

        {products.length > 0 && (
          <div className="space-y-4">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="text-2xl font-semibold">{product.name}</h3>
                  <p className="text-lg font-bold text-gray-600">
                    Buy: {product.buyPrice} | Sell: {product.sellPrice}
                  </p>
                  <p className="text-lg text-gray-500">Date: {product.date}</p>
                  <p
                    className={`text-lg font-bold ${
                      product.profitLoss >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.profitLoss >= 0 ? "Profit" : "Loss"}: {product.profitLoss.toFixed(2)}
                  </p>
                </div>
                <Button
                  onClick={() => handleDeleteProduct(index)}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </Button>
              </div>
            ))}

            <div className="p-4 bg-gray-200 rounded-md mt-6">
              <h4 className="text-lg font-semibold">Total Profit/Loss</h4>
              <p
                className={`text-xl font-bold ${
                  totalProfitLoss >= 0 ? "text-green-700" : "text-red-700"
                }`}
              >
                {totalProfitLoss}
              </p>
            </div>
          </div>
        )}

        {/* Credit Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Items on Udhar</h2>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Person's Name"
                value={creditPerson}
                onChange={(e) => setCreditPerson(e.target.value)}
                className="border px-4 py-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Item Given"
                value={creditItem}
                onChange={(e) => setCreditItem(e.target.value)}
                className="border px-4 py-2 rounded-md"
              />
              <input
                type="number"
                placeholder="Amount (optional)"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                className="border px-4 py-2 rounded-md"
              />
              <input
                type="date"
                value={creditDate}
                onChange={(e) => setCreditDate(e.target.value)}
                className="border px-4 py-2 rounded-md"
              />
              <Button
                onClick={handleAddCredit}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Add Udhar Product
              </Button>
            </div>
          </div>

          {credits.length > 0 && (
            <div className="space-y-4">
              {credits.map((credit, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{credit.item}</h3>
                    <p className="text-lg font-bold text-gray-600">
                      Given to: {credit.person} | Amount: {credit.amount.toFixed(2)}
                    </p>
                    <p className="text-lg font-bold text-red-600">Date: {credit.date}</p>
                  </div>
                  <Button
                    onClick={() => handleDeleteCredit(index)}
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </Button>
                </div>
              ))}

              <div className="p-4 bg-gray-200 rounded-md mt-6">
                <h4 className="text-lg font-semibold">Total Credit Given</h4>
                <p className="text-xl font-bold text-blue-700">
                  {totalCreditAmount.toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
