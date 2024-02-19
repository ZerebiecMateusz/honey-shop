import { useState } from "react";


const Shop = ({name, price, onShowHoney, onCalculateTotal}) => {

    const [counter, setCounter] = useState(0)

    const buy = () => {
        setCounter(counter + 1);
        onCalculateTotal(price);
    }
    const clearBuy = () => {
        setCounter(counter-counter)
    }
    
        return (
            <div>
                <h1>Witaj w sklepie</h1>
                <h2>{name}</h2>
                <h3>cena za słoik: {price}</h3>
                <button className="greenButton" onClick={buy}>Buy</button>
                <button className="greyButton" onClick={() => onShowHoney(name)}>Show</button>
                <button className="redButton" onClick={clearBuy}>zeruj</button>
                <h3>Liczba zakupionych słoików: {counter}</h3>
                <hr />
            </div>
            
        );
}

const Total = ({totalCash}) => {
    return (
        <h1>
            Total cash: {totalCash}
        </h1>
    )
}

const HoneyForm = ({index, onCreateHoney}) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);

    const createHoney = (e) => {
        e.preventDefault();
        // alert("Name " + name + " - Proce " + price);
        const honey = {id : index, name, price};
        onCreateHoney(honey);
        setName("");
        setPrice("");
    }

    return (
        <form>
            <label>Honey name </label>
            <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}/> 
            <br /> <br />
            
            <label>Honey price </label>
            <input 
            type="number" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}/> 
            <br /> <br />
            <input type="submit" value="Create" onClick={createHoney}></input>
        </form>
    )
}
 
const HoneyList = () => {

    const [total, setTotal] = useState(0);
    const [honeys, setHoneys] = useState([
        {id: 1, name: "Miód rzepakowy", price: 35},
        {id: 2, name: "Miód wielokwiatowy", price: 45},
        {id: 3, name: "Miód spadziowy", price: 55}
    ]);

    const calculateTotal = (price) => {
        setTotal(total + price)
    }


    const showHoney = (name) => {
        alert("you selected: " + name)
    }

    const addHoney = (honey) => {
        setHoneys([...honeys, honey]);
    }

    return (
        <div className="container">
            <HoneyForm index={honeys.length + 1} onCreateHoney={addHoney}/>
            {honeys.map((p) => (
                <Shop
                key={p.id}
                name={p.name}
                price={p.price}
                onCalculateTotal = {calculateTotal}
                onShowHoney = {showHoney}/>
            ))}
              
              <Total totalCash={total}/>
        </div>
    )
  
}
export default HoneyList;