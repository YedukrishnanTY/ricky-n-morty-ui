export async function getList(page) {
    const apiUrl =  `https://rickandmortyapi.com/api/character/?page=${page}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}

export async function searchCharacter(characterName) {
    const apiUrl =  `https://rickandmortyapi.com/api/character/?name=${characterName}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}