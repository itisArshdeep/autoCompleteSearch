import React, { useEffect, useState } from 'react'

const App = () => {

  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [cache, setCache] = useState({});
  const [show, setShow] = useState(false);


  const fetchdata = async () => {

    if (!input.trim()) {
      setResult([]);
      return;
    }

    if (cache[input]) {
      console.log("from cached :", input);
      setResult(cache[input]);
      return;
    }

    const url = `https://dummyjson.com/products/search?q=` + input;
    const fetchin = await fetch(url);
    const data = await fetchin.json();
    setResult(data.products);
    setCache(prev => ({ ...prev, [input]: data.products }));
    console.log("API hitted:", input)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchdata()
    }, 300);

    return () => clearTimeout(timer);

  }, [input])

  return (
    <div>
      <div className='container'>
        <h1>AutoComplete Search Bar</h1>
        <input onBlur={()=>setShow(false)} onFocus={()=>setShow(true)} value={input} onChange={(e) => setInput(e.target.value)} type="text" />
        {show ? <div className='searchConatiner'>
          {result.map((r) => <span key={r.id}>{r.title}</span>)}
        </div>: ""}
      </div>
    </div>
    
  )
}

export default App