"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Product {
  name: string;
  buyPrice: number; // quantity
  sellPrice: number; // rate
  profitLoss: number; // total price
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

  const [showSellForm, setShowSellForm] = useState(false);
  const [showCreditForm, setShowCreditForm] = useState(false);

  const [name, setName] = useState("");
  const [buyPrice, setBuyPrice] = useState(""); // quantity
  const [sellPrice, setSellPrice] = useState(""); // rate
  const [date, setDate] = useState("");

  const [creditPerson, setCreditPerson] = useState("");
  const [creditItem, setCreditItem] = useState("");
  const [creditAmount, setCreditAmount] = useState("");
  const [creditDate, setCreditDate] = useState("");

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    const savedCredits = localStorage.getItem("credits");

    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedCredits) setCredits(JSON.parse(savedCredits));
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("credits", JSON.stringify(credits));
  }, [credits]);

  const handleAddProduct = () => {
    const quantity = parseFloat(buyPrice);
    const rate = parseFloat(sellPrice);
    if (!name || isNaN(quantity) || isNaN(rate) || !date) return;

    const newProduct: Product = {
      name,
      buyPrice: quantity,
      sellPrice: rate,
      profitLoss: quantity * rate,
      date,
    };

    setProducts((prev) => [...prev, newProduct]);
    setName("");
    setBuyPrice("");
    setSellPrice("");
    setDate("");
    setShowSellForm(false);
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
    setShowCreditForm(false);
  };

  const handleDeleteCredit = (index: number) => {
    setCredits((prev) => prev.filter((_, i) => i !== index));
  };

  const totalProfitLoss = products.reduce((total, p) => total + p.profitLoss, 0);
  const totalCreditAmount = credits.reduce((total, c) => total + c.amount, 0);

  return (
    <section className="w-full bg-gray-100 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto">

        <div className="flex gap-4 justify-center mb-8">
          <Button
            onClick={() => {
              setShowSellForm(true);
              setShowCreditForm(false);
            }}
            className="bg-black text-white hover:bg-gray-800"
          >
            + Add Sell Product
          </Button>
          <Button
            onClick={() => {
              setShowCreditForm(true);
              setShowSellForm(false);
            }}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            + Add Udhar Product
          </Button>
        </div>

        {showSellForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Add New Sell Product</h2>
            <div className="flex flex-col gap-4">
              <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="border px-4 py-2 rounded-md" />
              <input type="number" placeholder="Quantity" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} className="border px-4 py-2 rounded-md" />
              <input type="number" placeholder="Rate" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} className="border px-4 py-2 rounded-md" />
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border px-4 py-2 rounded-md" />
              <Button onClick={handleAddProduct} className="bg-green-600 text-white hover:bg-green-700">
                Add Sell Product
              </Button>
            </div>
          </div>
        )}

        {products.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Sell Product List</h2>
            <table className="w-full bg-white rounded-lg shadow overflow-hidden text-left">
              <thead className="bg-gray-200">
                <tr className="text-gray-700">
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Product Name</th>
                  <th className="py-2 px-4">Rate</th>
                  <th className="py-2 px-4">Total Price</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{product.buyPrice}</td>
                    <td className="py-2 px-4">{product.name}</td>
                    <td className="py-2 px-4">{product.sellPrice}</td>
                    <td className="py-2 px-4 font-semibold text-green-600">{product.profitLoss.toFixed(2)}</td>
                    <td className="py-2 px-4">{product.date}</td>
                    <td className="py-2 px-4">
                      <Button onClick={() => handleDeleteProduct(index)} className="bg-red-600 text-white hover:bg-red-700 text-sm px-3 py-1">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 p-4 bg-gray-100 rounded text-right">
              <strong className="text-gray-800">Total Sell Amount: </strong>
              <span className="text-green-700 font-bold text-lg">{totalProfitLoss.toFixed(2)}</span>
            </div>
          </div>
        )}

        {showCreditForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Add Udhar Product</h2>
            <div className="flex flex-col gap-4">
              <input type="text" placeholder="Person's Name" value={creditPerson} onChange={(e) => setCreditPerson(e.target.value)} className="border px-4 py-2 rounded-md" />
              <input type="text" placeholder="Item Given" value={creditItem} onChange={(e) => setCreditItem(e.target.value)} className="border px-4 py-2 rounded-md" />
              <input type="number" placeholder="Amount" value={creditAmount} onChange={(e) => setCreditAmount(e.target.value)} className="border px-4 py-2 rounded-md" />
              <input type="date" value={creditDate} onChange={(e) => setCreditDate(e.target.value)} className="border px-4 py-2 rounded-md" />
              <Button onClick={handleAddCredit} className="bg-blue-600 text-white hover:bg-blue-700">
                Add Udhar Product
              </Button>
            </div>
          </div>
        )}

        {credits.length > 0 && (
          <div className="space-y-4 mt-16">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Udhar Product List</h2>
            {credits.map((credit, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{credit.item}</h3>
                  <p className="text-lg font-bold text-gray-600">
                    Given to: {credit.person} | Amount: {credit.amount.toFixed(2)}
                  </p>
                  <p className="text-lg font-bold text-red-600">Date: {credit.date}</p>
                </div>
                <Button onClick={() => handleDeleteCredit(index)} className="bg-red-600 text-white hover:bg-red-700">
                  Delete
                </Button>
              </div>
            ))}
            <div className="p-4 bg-gray-200 rounded-md mt-6">
              <h4 className="text-lg font-semibold">Total Udhar</h4>
              <p className="text-xl font-bold text-blue-700">{totalCreditAmount.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
