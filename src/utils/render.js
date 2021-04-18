import Abstract from '../view/abstract.js';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

export const render = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
    case RenderPosition.AFTEREND:
      container.after(child);
      // console.log(`element.outerHTML: `, element.outerHTML)
      // container.insertAdjacentHTML(place, element.outerHTML);// `ПРИВЕТ`);
      break;
  }
};

export const renderTemplate = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement('div'); //1. создаём пустой div-блок
  newElement.innerHTML = template; // 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент
  return newElement.firstChild; // 3. возвращаем этот DOM-элемент
};
