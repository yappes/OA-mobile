'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _abManagerPage = require('ab-manager-pages');

exports.default = {
  flowFinish: false,
  flowHost: '',
  flowList: '',
  currentFlow: '', run: function run(tradeName, pageHost) {
    var tradePage = _abManagerPage.PageManager.getPage(tradeName);
    pageHost.openPage({
      page: tradePage,
      tradeName: tradeName
    });
  },
  next: function next(outType, pageHost) {
    this.flowFinish = false;
    if (!outType) {
      console.error('[trade-flow-manager]: 必须传入出口类型');
      return;
    } else if (outType == "entry") {
      if (pageHost) {
        this.flowHost = pageHost;
      } else {
        console.error('[trade-flow-manager]: 入口必须传入当前作用域');
        return;
      }
    }

    this.flowList = _abManagerPage.PageManager.flows;

    if (outType === "entry") {
      var entryCount = 0;
      var entryFlow = '';
      for (var item in this.flowList) {
        if (Object.keys(this.flowList[item]).includes(outType) && this.flowList[item][outType] == true) {
          entryCount++;
          entryFlow = item;
          if (entryCount > 1) {
            entryFlow = '';
            console.error('[trade-flow-manager]: 只能定义一个入口!');
            return;
          }
        }
      }

      if (!entryFlow) {
        console.warn('[trade-flow-manager]: 没有定义合适的入口！');
        return;
      }

      this.currentFlow = entryFlow;

      var flowPage = _abManagerPage.PageManager.getPage(this.flowList[entryFlow].name);
      this.flowHost.$aui.dialog.show(flowPage);
    } else if (outType == "exit") {

      this.flowFinish = false;
      this.flowHost.$aui.dialog.hide();
      this.flowHost.focusManager && this.flowHost.focusManager.toggleFocus();
    } else if (this.flowList[this.currentFlow][outType]) {
      this.flowFinish = true;
      this.flowHost.$aui.dialog.hide();

      var self = this;
      setTimeout(function () {
        self.currentFlow = self.flowList[self.currentFlow][outType];
        var flowPage = self.flowList[self.currentFlow] && self.flowList[self.currentFlow].name ? _abManagerPage.PageManager.getPage(self.flowList[self.currentFlow].name) : console.error('[trade-flow-manager]: 节点"' + self.currentFlow + '"异常！');
        self.flowHost.$aui.dialog.show(flowPage);
      }, 500);
    } else {
      console.error('[trade-flow-manager]: 步骤：' + this.currentFlow + '=>"' + outType + '"出口异常！');
    }
  }
};