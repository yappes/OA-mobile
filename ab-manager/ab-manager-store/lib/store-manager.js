"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isArray(state) {
  return state instanceof Array;
}

function isString(state) {
  return typeof state == "string";
}

function isObject(state) {
  return (typeof state === "undefined" ? "undefined" : _typeof(state)) == "object";
}

function isModule(myModule) {
  return Object.keys(StoreManager.Store._modules.root._children).includes(myModule);
}

function isModuleState(myModule, myState) {
  return Object.keys(StoreManager.Store._modules.root._children[myModule].state).includes(myState);
}

function isMainState(myState) {
  return Object.keys(StoreManager.Store.state).includes(myState);
}

function getArray(state, target) {
  for (var i = 0; i < state.length; i++) {
    if (isArray(state[i])) {
      target[i] = [];
      getArray(state[i], target[i]);
    } else if (isObject(state[i])) {
      target[i] = {};
      getObject(state[i], target[i]);
    } else {
      target[i] = state[i];
    }
  }
}

function getObject(state, target) {
  for (var key in state) {
    if (isArray(state[key])) {
      target[key] = [];
      getArray(state[key], target[key]);
    } else if (isObject(state[key])) {
      target[key] = {};
      getObject(state[key], target[key]);
    } else {
      target[key] = state[key];
    }
  }
}
function getValue(state) {
  var target = "";
  if (isArray(state)) {
    target = [];
    getArray(state, target);
  } else if (isObject(state)) {
    target = {};
    getObject(state, target);
  } else {
    target = state;
  }
  return target;
}
var StoreManager = {
  Store: undefined,

  dispatch: function dispatch(type, name, arg) {
    switch (type) {
      case 'actions':
        this.Store.dispatch(name, arg);
        break;
      case 'mutations':
        this.Store.commit(name, arg);
        break;
      case 'getters':
        return this.Store.getters[name];
      default:
        console.log('unknown invoke type:' + type);
    }
  },
  dynamicDispatch: function dynamicDispatch(dynamicModuleName, type, name, arg) {
    var path = dynamicModuleName + '/' + name;
    return this.dispatch(type, path, arg);
  },
  initState: {},
  init: function init(store) {
    this.Store = store;
    this.initState = getValue(store.state);
  },
  clear: function clear(myModule, myState) {
    if (!myModule & !myState) {
      this.Store.state = getValue(this.initState);
    } else if (!!myModule & !myState) {
      if (isModule(myModule)) {
        this.Store.state[myModule] = getValue(this.initState[myModule]);
      } else if (isMainState(myModule)) {
        this.Store.state[myModule] = this.initState[myModule];
      } else {
        console.error("StoreManage Warnning: Can't resove '" + myModule + "' module!");
      }
    } else {
      if (isModule(myModule)) {
        if (isArray(myState)) {
          var myModuleState = "";
          for (var i = 0; i < myState.length; i++) {
            myModuleState = myState[i];
            if (isModuleState(myModule, myModuleState)) {
              this.Store.state[myModule][myModuleState] = getValue(this.initState[myModule][myModuleState]);
            } else {
              console.error("StoreManage Warnning: Can't resove '" + myModule + " 'module下的' " + myState[i] + "'状态!");
            }
          }
        } else {
          if (isModuleState(myModule, myState)) {
            this.Store.state[myModule][myState] = getValue(this.initState[myModule][myState]);
          } else {
            console.error("StoreManage Warnning: Can't resove '" + myModule + " 'module下的' " + myState + "'状态!");
          }
        }
      } else {
        console.error("StoreManage Warnning: Can't resove '" + myModule + "' module!");
      }
    }
  }
};
exports.default = StoreManager;