export async function getList() {
    const apiUrl =  `https://rickandmortyapi.com/api/character`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data)
    return data;
}

export async function searchCharacter(characterName) {
    const apiUrl =  `https://rickandmortyapi.com/api/character/?name=${characterName}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data)
    return data;
}