// state
let state = {
  count: 1,
}


function addClick () {
  state.count += 1
}

function removeClick () {
  state.count -= 1
}

window.state = state
window.addClick = addClick
window.removeClick = removeClick

function render (count) {
  document.querySelector('#testId').innerText = `${count}`

  console.log(`component should render ${count}`)
}


// dependencies tracking

let activeUpdate = null


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
    let value = obj[key];
    Object.defineProperty(obj, key, {
      get () {
        dep.depend();
        return value
      },
      set (newValue) {
        value = newValue;
        dep.notify()
      },
    })
  })
}

observe(state);


function install (update) {
  function wrapperInstall () {
    activeUpdate = wrapperInstall;
    update();
    activeUpdate = null;
  }
  wrapperInstall();
}

install(() => {
  render(state.count);
});
