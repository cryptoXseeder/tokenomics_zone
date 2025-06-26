import { useState } from "react";

export default function TokenValuationDemo() {
  const [token, setToken] = useState("SAHARA");
  const [circSupply, setCircSupply] = useState(2000000000);
  const [fairCap, setFairCap] = useState(250000000);
  const [overCap1, setOverCap1] = useState(500000000);
  const [overCap2, setOverCap2] = useState(1000000000);
  const [result, setResult] = useState(null);

  const calculateZones = () => {
    const fairPrice = fairCap / circSupply;
    const overPrice1 = overCap1 / circSupply;
    const overPrice2 = overCap2 / circSupply;
    const pineScript = `//@version=5
indicator("${token} Tokenomics Zones", overlay=true)
price = close
fair = ${fairPrice.toFixed(6)}
over1 = ${overPrice1.toFixed(6)}
over2 = ${overPrice2.toFixed(6)}
bgcolor(price <= fair ? color.new(color.green, 85) : na)
bgcolor(price > fair and price <= over1 ? color.new(color.yellow, 85) : na)
bgcolor(price > over1 and price <= over2 ? color.new(color.orange, 85) : na)
bgcolor(price > over2 ? color.new(color.red, 85) : na)
plot(fair, "Fair Price", color=color.green)
plot(over1, "Overvalued 1", color=color.orange)
plot(over2, "Overvalued 2", color=color.red)`;

    setResult({ fairPrice, overPrice1, overPrice2, pineScript });
  };

  return (
    <div>
      <h1>💰 Tokenomics Zone Calculator (Demo)</h1>
      <input value={token} onChange={e => setToken(e.target.value)} placeholder="Token Symbol" />
      <input type="number" value={circSupply} onChange={e => setCircSupply(+e.target.value)} />
      <input type="number" value={fairCap} onChange={e => setFairCap(+e.target.value)} />
      <input type="number" value={overCap1} onChange={e => setOverCap1(+e.target.value)} />
      <input type="number" value={overCap2} onChange={e => setOverCap2(+e.target.value)} />
      <button onClick={calculateZones}>Calculate</button>
      {result && (
        <div>
          <p>✅ Fair Price: {result.fairPrice.toFixed(6)}</p>
          <p>⚠️ Overvalued 1: {result.overPrice1.toFixed(6)}</p>
          <p>🚨 Overvalued 2: {result.overPrice2.toFixed(6)}</p>
          <pre>{result.pineScript}</pre>
        </div>
      )}
    </div>
  );
}
