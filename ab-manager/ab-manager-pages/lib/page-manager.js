'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  pages: {},
  flows: '',
  install: function install(Vue, options) {
    var _this = this;

    console.log('PageManager: installing...');

    if (options && options.pages) {
      options.pages.forEach(function (page) {
        console.log('PageManager: registering %s', page.name);
        _this.pages[page.name] = page.page;
      });
    }

    this.flows = options.flows;

    console.log('PageManager: installed');
  },
  getPage: function getPage(name) {
    console.log('Getting "%s"', name);

    if (!Object.keys(this.pages).includes(name)) {
      console.error('[page-manager]: page "' + name + '" 不存在！');
    }

    var page = this.pages[name];
    return page;
  }
};