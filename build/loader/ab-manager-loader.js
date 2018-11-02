const path = require('path')
const fs = require('fs');
const glob = require("glob")

//转换交易名称
function toDash(str) {
    return str.toUpperCase().replace(/[-.]/g, '')
}

//注入store
let basePath = path.resolve(__dirname, '../../src/modules'); //基础路径

let str ="\r\nimport { StoreManager }  from 'ab-manager-store'\r\n"//引入StoreManager
let registerModule = ''//注册模块的内容

//获取除share文件夹外所有子的vuex数据模块，并注册入store中
function buildStore(filepath, modulename) {
    let dirs = fs.readdirSync(filepath);
    for (let i = 0; i < dirs.length; i++) {
        //不读取shared目录
        if (dirs[i] != 'shared') {
            let subfilepath = filepath + '/' + dirs[i];
            let filestatusinfo = fs.statSync(subfilepath);
            if (filestatusinfo.isFile()) {
                if (dirs[i] == 'store.js') {
                    str += "import " + modulename + " from '../modules" + subfilepath.replace(basePath, '').replace(/\\/g, "\/") + "'" + "\r\n";
                    registerModule += "store.registerModule(" + modulename + ".name" + ", " + modulename + ");\r\n"
                }
            } else {
                buildStore(subfilepath, toDash(dirs[i]));
            }
        }
    }
}

//注入
buildStore(path.resolve(__dirname, "../../src/modules"), 'MODULES');

//注入pages
let pageInit = "import { PageManager } from 'ab-manager-pages'\r\n"//引入PageManager 
let pages = []//所有引入的page名称

glob.sync('./src/**/page.js').forEach(path => {
    path = path.replace("./src","@")
    if(path.indexOf("@/modules")!==-1){
        let tradeNameArray = path.split("@/modules/")[1].split(".js")[0]
        let tradeName = ""
        tradeNameArray.split("/").forEach(name => {
            tradeName+=name
        });
        let tradeNamePage = toDash(tradeName)
        pageInit += "import "+ tradeNamePage+" from \""+path+"\";\r\n"//引入page文件
        pages.push(tradeNamePage)//存储所有page文件
    }else if(path == "@/page.js"){
        pageInit += "import MAINPAGE from '@/page.js';\r\n"//引入page文件
        pages.push("MAINPAGE")
    }
})
pageInit += "let AuiPageManagerPages = [].concat("+pages.join(',')+");\r\nVue.use(PageManager, { pages: AuiPageManagerPages });\r\n"//使用PageManager

module.exports = function (source) {
    if(registerModule.length>0){//交易内是否存在store文件
        source += str + "\r\n" + registerModule + "StoreManager\.init(store) \r\n"
    }
    if(pages.length>0){//交易内是否存在page文件
        source = source+pageInit
    }
    return source;
}