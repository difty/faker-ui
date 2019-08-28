
const components = require('../components.json')
const fs = require('fs')
const path = require('path')
const uppercamelcase = require('uppercamelcase')

const names = Object.keys(components).map(name => uppercamelcase(name))
let importContent = names.map(name => {
  return `import ${name} from '../packages/${name}/index.js'`
}).join('\n')

let installContent = names.join(',\n  ')
const content = `
${importContent}
const components = [
  ${installContent},
]
// 这样可以使用 Vue.use(xxx) 来加载所有的
const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const all = {
  install,
  ${installContent},
}

export default all

// 每个组件实现了 install 方法，这样可以按需加载
export {
  install,
  ${installContent},
}
`
fs.writeFileSync(path.join(__dirname,'../src/index.js'), content)
