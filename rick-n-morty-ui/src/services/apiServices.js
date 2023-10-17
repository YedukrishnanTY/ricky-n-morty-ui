export async function getList(
  page = "",
  name = "",
  status = "",
  gender = "",
  species = ""
) {
  const apiUrl = `https://rickandmortyapi.com/api/character/?page=${page}&name=${name}&status=${status}&gender=${gender}&species=${species}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}
