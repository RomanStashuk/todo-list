class Component {
  constructor(id) {
    this.$el = document.getElementById(id);
    this.init();
  }

  init() {}

  onShow() {}

  onHide() {}

  hide() {
    this.$el.classList.add('hidden');
    this.onHide();
  }

  show() {
    this.$el.classList.remove('hidden');
    this.onShow();
  }
}

export default Component;
