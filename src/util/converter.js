const validTypes = ['header', 'image', 'embed', 'list', 'paragraph'];

function handleParagraph(block) {
  let data = block.data;

  return `<p>${data.text}<p>`;
}

function handleHeader(block) {
  let data = block.data;

  return `<h${data.level}>${data.text}</h${data.level}>`;
}

function handleList(block) {
  let data = block.data;

  let tag = data.style === 'ordered' ? 'ol' : 'ul';
  let items = '';
  data.items.forEach((item) => {
    items += `<li>${item}</li>`;
  });

  return `<${tag}>${items}</${tag}>`;
}

function handleImage(block) {
  let data = block.data;

  return `<figure><img src="${data.url}"/><figcaption>${data.caption}</figcaption></figure>`;
}

function handleEmbed(block) {
  let data = block.data;

  return `<iframe width="${data.width}" height="${data.height}" src="${data.embed}" frameborder="0" allowfullscreen></iframe>`;
}

const conversionHandlers = {
  paragraph: handleParagraph,
  header: handleHeader,
  list: handleList,
  image: handleImage,
  embed: handleEmbed,
};

function convertBlockToHTML(block) {
  if (typeof block !== 'object') return;
  if (!('id' in block && 'type' in block && 'data' in block)) return;

  if (!validTypes.includes(block.type)) return;

  let result = conversionHandlers[block.type](block);

  return result;
}

function convertToHTML(blocks) {
  let final = '';
  blocks.forEach((block) => {
    let result = convertBlockToHTML(block);
    final += result;
  });

  return final;
}

export default convertToHTML;
