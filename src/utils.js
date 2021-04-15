export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
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