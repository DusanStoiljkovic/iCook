class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    return this._parentEl.querySelector('input').value;
  }

  clearInput() {
    this._parentEl.querySelector('input').value = '';
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      handler();
      this.clearInput();
    });
  }
}

export default new SearchView();
