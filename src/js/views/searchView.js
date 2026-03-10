class SearchView {
  #parentEl = document.querySelector('.search');

  getQuery() {
    return this.#parentEl.querySelector('input').value;
  }

  clearInput() {
    this.#parentEl.querySelector('input').value = '';
  }

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', e => {
      e.preventDefault();
      handler();
      this.clearInput();
    });
  }
}

export default new SearchView();
