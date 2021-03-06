const app = {
  start: 1,
  eListItems: [],
  app: document.getElementById("app"),
  generateItems(number = 100) {
    number += this.start;
    for (; this.start < number; this.start += 2) {
      const li = this.generateItem(this.start);
      if (li.isFirst) {
        li.item.addEventListener('click', (event) => {
          this.startAnimation(event)
        });
        li.item.addEventListener('transitionend', (event) => {
          this.stopAnimation(event)
        });
      }
      this.eListItems.push(li.item);
      this.app.appendChild(li.item);
    }
  },
  generateItem(idx) {
    const oResult = myLittleCalculator.isFirst(idx);
    const li = document.createElement('li');
    li.textContent = idx;
    li.dataset.sum = `${idx * ((idx + 1) / 2)}`;
    if (oResult) {
      li.classList.add('premier');
      li.insertAdjacentHTML('beforeend', `<div class="ribbon-wrapper"><div data-text="somme" class="ribbon">premier</div></div>`)
    } else if (myLittleCalculator.isMultipleOf(idx, 3)) {
      if (myLittleCalculator.isMultipleOf(this.start, 9)) {
        li.classList.add('multiple-3-9');
        li.insertAdjacentHTML('beforeend', `<div class="ribbon-wrapper"><div class="ribbon">3 et 9</div></div>`)
      } else {
        li.classList.add('multiple-3');
        li.insertAdjacentHTML('beforeend', `<div class="ribbon-wrapper"><div class="ribbon">3</div></div>`)
      }
    }
    li.classList.add("grid__item");
    return { isFirst: oResult, item: li };
  },
  addEventListeners() {
    document.addEventListener("scroll", () => {
      if (window.scrollY + window.innerHeight >= this.app.scrollHeight) {
        this.generateItems();
      }
    })
  },
  startAnimation(event) {
    event.currentTarget.classList.add("animate");
    [event.currentTarget.childNodes[0].textContent, event.currentTarget.dataset.sum] = [event.currentTarget.dataset.sum, event.currentTarget.childNodes[0].textContent];
    [event.currentTarget.querySelector("[data-text]").dataset.text, event.currentTarget.querySelector("[data-text]").textContent] = [event.currentTarget.querySelector("[data-text]").textContent, event.currentTarget.querySelector("[data-text]").dataset.text];
    for (let item of this.eListItems) {
      item.classList.add('grid__item--lighter');
    }
  },
  stopAnimation(event) {
    event.currentTarget.classList.remove("animate");
    this.eListItems.forEach(function (elem) {
      elem.classList.remove('grid__item--lighter');
    });
  },
  init() {
    document.documentElement.classList.add("js-enabled");
    this.generateItems();
    this.addEventListeners();
  }
};

window.myLittleCalculator = {
  isFirst(nbr) {
    if (nbr < 2) {
      return false;
    }
    for (let i = 2; i <= Math.sqrt(nbr); i += 1) {
      if (this.isMultipleOf(nbr, i)) {
        return false;
      }
    }
    return true;
  },
  isMultipleOf(base, multiple) {
    return base % multiple === 0;
  }
};
app.init();
