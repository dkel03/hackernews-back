export let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];
let idCount = links.length;

export const getLink = ({ id }) => {
  const linkIndex = links.findIndex(link => link.id === id);
  if (linkIndex > -1) {
    return links[linkIndex];
  }
  return null;
};

export const postLink = ({ url, description }) => {
  const link = {
    id: `link-${idCount++}`,
    description: description,
    url: url,
  };
  links.push(link);
  return link;
}

export const fetchLink = ({ id, url, description }) => {
  const linkIndex = links.findIndex(link => link.id === id);
  if (linkIndex > -1) {
    links[linkIndex] = {id, url, description}
    return links[linkIndex];
  }
  return null;
}

export const delLink = ({ id }) => {
  const linkIndex = links.findIndex(link => link.id === id);
  if (linkIndex > -1) {
    const deletedLink = links[linkIndex];
    links.splice(linkIndex, 1);
    return deletedLink;
  }
  return null;
}
