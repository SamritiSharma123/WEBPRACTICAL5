const MATCH_LIST = {
  'there': 'their',
  'their': 'there',
  'they\'re': 'there',
  'There': 'Their',
  'Their': 'There',
  'They\'re': 'There',
  'THERE': 'THEIR',
  'THEIR': 'THERE',
  'THEY\'RE': 'THERE'
};

function transformTextNodes(node) {
  const textNodes = getTextNodes(node);
  textNodes.forEach(n => {
    if (n.nodeType === Node.TEXT_NODE && n.nodeValue.trim() !== '') {
      let textContent = n.nodeValue;
      for (let key in MATCH_LIST) {
        let value = MATCH_LIST[key];
        textContent = textContent.split(key).join(value);
      }
      n.nodeValue = textContent;
    }
  });
}

function getTextNodes(element) {
  let textNodes = [];
  const walk = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  let currentNode;
  while (currentNode = walk.nextNode()) {
    textNodes.push(currentNode);
  }
  return textNodes;
}

transformTextNodes(document.body);

console.log('Evil extension loaded!');
