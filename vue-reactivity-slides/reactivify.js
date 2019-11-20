// state
let state = {
  count: 0,
}


// dependencies tracking
class Dep {
  constructor () {
    this.dependencies = new Set()
  }

  depend () {
    if (activeUpdate) {
      this.dependencies.add(activeUpdate)
    }
  }

  notify () {
    this.dependencies.forEach(dep => dep())
  }
}


// Observer
const dep = new Dep()

function observe (obj) {
  Object.keys(obj).map((key) => {
    let value = obj[key]
    Object.defineProperty(obj, key, {
      get () {
        dep.depend()
        return value
      },
      set (newValue) {
        value = newValue
        dep.notify()
      },
    })
  })
}


window.state = state
window.addClick = addClick
window.removeClick = removeClick

observe(state)


function addClick () {
  state.count += 1
}

function removeClick () {
  state.count -= 1
}

function render (state) {
  if (state) {
    document.querySelector('#testId').textContent = state
  }
  console.log(`component should render ${state}`)
}


let activeUpdate = null

function install (update) {
  function wrapperInstall () {
    activeUpdate = wrapperInstall
    update()
    activeUpdate = null
  }
  wrapperInstall()
}

install(() => {
  render(state.count)
})


