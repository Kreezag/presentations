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

class Dep {
  constructor () {
  }

  depend () {
  }

  notify () {
  }
}


// Observer

function observe (obj) {

}

observe(state);


function install (update) {
}

install(() => {
  render(state.count);
});
