# ab-manager-store

自动化构架Vuex

1.引入

```js
import {StoreManager}  from 'ab-manager-store'

StoreManager.init()
```

2.操作：


```js
import {StoreManager} from "ab-manager-store";

//dynamicDispatch方法 操作子模块
StoreManager.dynamicDispatch(dynamicModuleName, type, name, arg)

//dispatch 操作主状态库
StoreManager.dispatch(type, name, arg) 

//clear 重置store状态
StoreManager.clear()
```


| 事件     | 参数     | 类型 | 说明 |
| -------- | --- | --- |
| dispatch | type（类型:getters,mutations,actions）, name, arg | string | 操作主状态库 |
| dynamicDispatch | dynamicModuleName, type, name, arg | - | 操作子模块 |
| init | - | - | 初始化 |
| clear | myState(模块名) | string | 重置myState的store状态，不传参数为清空所有 |