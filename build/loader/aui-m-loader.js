const path = require('path')
const fs = require('fs');
const acorn = require("acorn")
const walk = require("acorn/dist/walk")
const Assets = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../aui-m/components/assets.json")))

/**
 * 
 * @description get component's name we need
 * @param {any} component 
 * @returns 
 */
function getComponents(component) {
    component = component.replace(/[A-Z]/g, function (m) {
        return "-" + m.toLowerCase()
    }).substr(1)
    return component
}


/**
 * @description append customer theme to var.less
 * 
 */
function addCustomerTheme() {
    const theme = fs.readFileSync(path.resolve(__dirname, "../../aui-m/theme-default/var.less"))
    let reg = /@import '..\/..\/src\/theme.less\';/g
    if (!reg.test(theme)) {
        fs.appendFileSync(path.resolve(__dirname, "../../aui-m/theme-default/var.less"), "\r\n@import '../../src/theme.less';")
    }
}

//转换交易名称
function toDash(str) {
    return str.toUpperCase().replace(/[-.]/g, '')
}

addCustomerTheme()

module.exports = function (source) {
    let components = []
    let plugins = []
    let directives = []

    let importState = "import Vue from 'vue'\r\n import 'AUI/theme-default/reset.less'\r\n"
    let UseState = ""
    walk.full(acorn.parse(source), node => {
        if (node.type == "VariableDeclarator" && node.id.name == "AuiComponents") {
            node.init.elements.forEach(item => {
                if(components.includes(item.value)){
                    UseState += 'console.error("you have duplicate definition AuiComponents '+"'"+item.value+"'"+' in AuiComponents in aui-m-config.js");\r\n'
                }else{
                    components.push(item.value)
                }
            });
        }
        if (node.type == "VariableDeclarator" && node.id.name == "AuiPlugins") {
            node.init.elements.forEach(item => {
                if(plugins.includes(item.value)){
                    UseState += 'console.error("you have duplicate definition AuiPlugins '+"'"+item.value+"'"+' in AuiPlugins in aui-m-config.js");\r\n'
                }else{
                    plugins.push(item.value)
                }
            });
        }
        if (node.type == "VariableDeclarator" && node.id.name == "AuiDirectives") {
            node.init.elements.forEach(item => {
                if(directives.includes(item.value)){
                    UseState += 'console.error("you have duplicate definition AuiDirectives '+"'"+item.value+"'"+' in AuiDirectives in aui-m-config.js");\r\n'
                }else{
                    directives.push(item.value)
                }
            });
        }
    })


    for (let i = 0; i < components.length; i++) {
        let componentName = Assets[getComponents(components[i])]
        if (componentName == undefined) {
            UseState +="console.error("+'"Didn'+"'t find "+"'"+components[i]+"'"+" in AUI!you may have a wrong component name"+'"'+");\r\n"
            continue;
        };
        let ComponentPath = "'AUI/components/" + componentName.substr(2) + "'\r\n"
        importState += "import " + components[i] + " from " + ComponentPath + "import 'AUI/theme-default/components/" + getComponents(components[i]) + ".less'\r\n"
        UseState += "Vue.use(" + components[i] + ")\r\n"
    }
    for (let i = 0; i < plugins.length; i++) {
        let pluginName = Assets[plugins[i]]
        if (pluginName == undefined) {
            UseState +="console.error("+'"Didn'+"'t find "+"'"+plugins[i]+"'"+" in AUI!you may have a wrong plugin name"+'"'+");\r\n"
            continue;
        };
        let PluginPath = "'AUI/components/" + pluginName.substr(2) + "'\r\n"
        importState += "import " + plugins[i] + " from " + PluginPath  
        UseState += "Vue.use(" + plugins[i] + ")\r\n "
        if(plugins[i] == "alert"||plugins[i] == "confirm"||plugins[i] == "toast"||plugins[i] == "loading"||plugins[i] == "datetime"){
            importState += "import 'AUI/theme-default/components/aui-" + plugins[i] + ".less'\r\n"
        }
    }
    for (let i = 0; i < directives.length; i++) {
        let directiveName = Assets[directives[i]]
        if (directiveName == undefined) {
            UseState +="console.error("+'"Didn'+"'t find "+"'"+directives[i]+"'"+" in AUI!you may have a wrong directive name"+'"'+");\r\n"
            continue;
        };
        let directivePath = "'AUI/components/" + directiveName.substr(2) + "'\r\n"
        let directiveUseName = toDash(directives[i])
        importState += "import " + directiveUseName + " from " + directivePath 
        UseState += "Vue.directive( '"+directives[i] +"',"+ directiveUseName + ")\r\n "
    }
    return importState + UseState + source;
}