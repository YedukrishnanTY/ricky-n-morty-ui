import React, { useEffect, useState } from "react";
import { getList, searchCharacter } from "../../../services/apiServices";
import "./Content.css";
export default function Content() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function fetchData() {
      const result = await getList();
      setData(result.results);
    }

    fetchData();
  }, []);


    const handleInput = (e) => {
      console.log(e.target.value);
      setSearch(e.target.value);
      const result = searchCharacter(e.target.value);
      console.log(result);
    };


  return (
    <div>
      <input type="text" onChange={handleInput} value={search} />
      <div className="list">List of Characters</div>
      <div className="details">
        <div className="details-card">
          {data.map((character, id) => (
            <div key={id} className="details-content">
              <div className="details-container">
                <img alt={character.name} src={character.image} />
                <div>
                  {character.status} : {character.name}{" "}
                </div>
                <div> origin : {character.origin.name} </div>
                <div> species : {character.species} </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
