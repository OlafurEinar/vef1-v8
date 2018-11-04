const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    const checkboxes = document.querySelectorAll('.item__checkbox');
    const itemList   = document.querySelectorAll('.item__text');
    const deleteBtns = document.querySelectorAll('.item__button');
    items = _items;

    _form.addEventListener('submit', formHandler);

    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener('click', finish);
    }

    for (let i = 0; i < itemList.length; i++) {
      itemList[i].addEventListener('click', edit);
    }

    for (let i = 0; i < deleteBtns.length; i++) {
      deleteBtns[i].addEventListener('click', deleteItem);
    }
  }

  function formHandler(e) {
    e.preventDefault();
    let input = document.querySelector('.form__input');
    let str = input.value.replace(/\s/g, '');

    if (str.length) {
      add(input.value);

    input.value = '';
    };       
  }

  // event handler fyrir það að klára færslu
  function finish() {
    this.parentNode.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    let input = document.createElement("input");

    input.classList.toggle('item__edit');
    input.value += this.innerText;
    this.replaceWith(input);
    input.focus();

    input.addEventListener('keyup', commit);
   // let texti = document.createTextNode(this.innerText);
   //   input.appendChild(texti);
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    if(e.keyCode === 13) {
      let span  = document.createElement("span");
      let texti = document.createTextNode(this.value);
      span.appendChild(texti);
      span.classList.toggle('item__text');
      span.addEventListener('click', edit);

      this.replaceWith(span);
    };
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    let skjal = document.body.querySelector('.items');
    let nyttItem = skjal.appendChild(el('li','item',0));
    let nyttBox = nyttItem.appendChild(el('input','item__checkbox', finish));
    nyttBox.setAttribute('type', 'checkbox');

    let nyttInput = nyttItem.appendChild(el('span', 'item__text', edit));
    nyttInput.appendChild(document.createTextNode(value));

    let nyrTakki = nyttItem.appendChild(el('button', 'item__button', deleteItem));
    nyrTakki.appendChild(document.createTextNode('Eyða'));

    document.querySelector('.form__input').reset;
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    this.parentNode.parentNode.removeChild(this.parentNode); 
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const el = document.createElement(type);
    el.classList.add(className);
    if (clickHandler !== 0) {
      el.addEventListener('click', clickHandler);
    };
    return el;
  }

  return {
    init: init
  }
})();