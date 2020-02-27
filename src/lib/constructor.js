const [width, height] = [window.innerWidth, window.innerHeight]

class CE_History {
  constructor() {
    this.history = 0
  }

  increase() { this.history++ }
  decrease() { this.history++ }
  
  get value() { return this.history }
}

class CE_Color {
  constructor(colors) {
    this.colors = colors
  }

  set add(color) {
    this.colors.push(color)
  }

  get random() {
    return this.colors[Math.floor(Math.random() * Math.floor(this.colors.length))]
  }
}

class CE_HTML {
  constructor() {
    const wrapper = document.querySelector(`#constructor`)

    // [INSERT MODALS / POPUP]
    this.insert({
      container: wrapper,
      name: 'constructor-modal',
      html: `
        <div class="background"></div>

        <div class="wrapper resize-content" id="resize-modal">
          <h2>Вы действительно хотите изменить масштаб сетки? Все слои и фигуры безвозвратно уничтожаться!</h2>
          <div class="form-group">
            <button id="apply-resize" class="btn">Применить</button>
            <button id="decline-resize" class="btn">Отмена</button>
          </div>
        </div>

        <div class="wrapper aggregator-pin" id="aggreagatorPinWrapper">
          <ul class="checkbox-list" id="aggregator-list"></ul>
          <button id="pin-button" class="pin-button"><span>Прикрепить</span></button>
        </div>

        <div class="wrapper info-content" id="info-modal">
          <ul class="hotkey-list">
            <li class="hotkey-item">
              <span class="hotkey-title">Сохранение</span>
              <span class="hotkey-value">Ctrl + S</span>
            </li>
            <li class="hotkey-item">
              <span class="hotkey-title">Инструмент "Перемещение"</span>
              <span class="hotkey-value">1</span>
            </li>
            <li class="hotkey-item">
              <span class="hotkey-title">Инструмент "Линия"</span>
              <span class="hotkey-value">2</span>
            </li>
            <li class="hotkey-item">
              <span class="hotkey-title">Инструмент "Прямоугольник"</span>
              <span class="hotkey-value">3</span>
            </li>
            <li class="hotkey-item">
              <span class="hotkey-title">Привязка к сетке</span>
              <span class="hotkey-value">S</span>
            </li>
            <li class="hotkey-item">
              <span class="hotkey-title">Отображение интерфейса</span>
              <span class="hotkey-value">X</span>
            </li>
          </ul>
        </div>

        <div class="wrapper save-content" id="save-modal">
          <div class="form-group">
            <input class="setting" id="file-name" type="text" placeholder="Название файла" />
          </div>
          <ul class="checkbox-list">
            <li class="checkbox-item">
              <label class="checkbox-container" for="png">Изображение
                <input class="checkbox-radio" id="png" type="radio" name="extention" checked="checked" />
                <span class="checkbox-checkmark"></span>
              </label>
            </li>

            <li class="checkbox-item">
              <label class="checkbox-container" for="json">JSON
                <input class="checkbox-radio" id="json" type="radio" name="extention" />
                <span class="checkbox-checkmark"></span>
              </label>
            </li>

            <li class="checkbox-item">
              <label class="checkbox-container" for="db">База данных
                <input class="checkbox-radio" id="db" type="radio" name="extention" />
                <span class="checkbox-checkmark"></span>
              </label>
            </li>
          </ul>
          <button id="save-button"><span>Сохранить</span></button>
        </div>

        <div class="wrapper load-content" id="load-modal">
          <div class="load-select-zone">
            <div id="load-select-button" class="load-select-button"><span>Выберите цех</span></div>
            <ul id="load-select-list" class="load-select-list hide"></ul>
          </div>

          <div class="delimiter">Или</div>

          <div id="drop_zone">Перетащите сюда JSON файл</div>
          <button id="load-button"><span>Загрузить</span></button>
        </div>

        <div class="wrapper options-content" id="options-modal">
          <ul class="options-list" id="options-list"></ul>
        </div>
      `
    })

    // [INSERT LOGOTYPE]
    this.insert({
      container: wrapper,
      name: 'constructor-logo',
      html: `
        <div class="image">
          <img src="img/logo.png" />
        </div>
        
        <div class="title">
          <h1 id="name-factory"></h1>
        </div>
      `
    })

    // [INSERT TOOLS]
    this.insert({
      container: wrapper,
      name: 'constructor-tools',
      html: `
        <div class="form-group">
          <input
            id="size-input"
            type="number"
            name="size"
            placeholder="Новый масштаб"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = 'Новый масштаб'"
            class="setting" />
          <button id="size-button" class="setting"><span>Применить</span></button>
        </div>

        <div class="form-group">
          <button id="move-tool" class="tool disable">
            <img src="img/move.svg" />
          </button>
          <button id="line-tool" class="tool disable">
            <img src="img/line.svg" />
          </button>
          <button id="rect-tool" class="tool disable">
            <img src="img/rect.svg" />
          </button>
        </div>
      `
    })

    // [INSERT FUNCTIONS]
    this.insert({
      container: wrapper,
      name: 'constructor-funcs',
      html: `
        <div class="form-group">
          <button id="load-blueprint" class="btn btn-accent">
            <img src="img/load.svg" />
          </button>
          <button id="save-blueprint" class="btn btn-accent">
            <img src="img/save.svg" />
          </button>
        </div>
      `
    })

    // [INSERT LAYERS]
    this.insert({
      container: wrapper,
      name: 'constructor-layers',
      html: `
        <div id="layer-list" class="list">
          <div id="empty" class="item empty">
            <div class="form-group">
              <button id="add-layer" class="tool action">
                <img src="img/add.svg" />
              </button>
            </div>
          </div>
        </div>
      `
    })

    // [INSERT MESSAGE OPEN]
    this.insert({
      container: wrapper,
      id: 'constructor-open-message',
      name: 'constructor-message open',
      html: `
        <p><span>Добавьте слой, чтобы начать работу</span></p>
      `
    })

    // [INSERT MESSAGE WARNNING]
    this.insert({
      container: wrapper,
      id: 'constructor-warning-message',
      name: 'constructor-message warning hide',
      html: `
        <p><span>Вы можете ввести масштаб только от 25 до 200</span></p>
      `
    })

    // [INSERT INFORMATION]
    this.insert({
      container: wrapper,
      name: 'constructor-informations',
      html: `
        <div class="wrap-notifications">
          <ul class="notify-list">
            <li id="notify-snap" class="notify-item"><span>Включена привязка к сетке</span></li>
          </ul>
        </div>

        <div class="wrap-buttons">
          <button id="info-button" class="btn btn-accent">
            <img src="img/info.svg" />
          </button>

          <button class="btn btn-indicator">
            <span id="scale-indicator">Текущий масштаб: </span>
          </button>
        </div>
      `
    })

    // [INSERT CONTEXT]
    this.insert({
      container: wrapper,
      id: 'shape-context',
      name: 'constructor-context',
      html: `
        <div>
          <button id="aggragator-pin-button"><span>Прикрепить к аггрегату</span></button>
          <button id="change-button"><span>Сменить цвет</span></button>
          <button id="delete-button"><span>Удалить</span></button>
          <button id="options-button"><span>Свойства</span></button>
        </div>
      `
    })
  }

  insert({ container, id = null, name = null, html = null }) {
    const div = document.createElement('div')
    if (id) div.id = id
    if (name) div.className = name
    if (html) div.innerHTML = html
    container.appendChild(div)
  }
}

class CE_Stage {
  constructor() {
    this.stage = {}
  }

  create() {
    this.stage = new Konva.Stage({
      id: 'ce-stage',
      container: 'container',
      width: width,
      height: height,
      draggable: true,
      dragBoundFunc: function(pos) {
        let newX = pos.x
        let newY = pos.y

        if (newX > 0)  newX = 0;
        if (newY > 0) newY = 0;

        return { x: newX, y: newY }
      }
    })
  }

  update(layers) {
    this.stage.destroyChildren()
    for (let layer of layers) {
      this.stage.add(layer)
    }
    this.stage.batchDraw()
  }

  listen(event, callback) {
    this.stage.on(event, callback)
  }

  get get() {
    return this.stage
  }
}

class CE_Layer {
  constructor() {
    this.core = new Map()
    this.user = new Map()
    this.current = {}
  }

  // Methods with __<name>__ is core
  __find__(key) {
    // Find exists core layer
    return this.core.get(key)
  }

  __add__(name) {
    // Add new core layer
    const layer = new Konva.Layer()
    this.core.set(name, layer)
  }

  find(key) {
    // Find exists layer
    return this.user.get(key)
  }

  add(name) {
    // Add new layer
    const layer = new Konva.Layer()
    this.user.set(name, layer)
  }

  set(key) {
    // Set current layer
    this.current = this.find(key)
  }

  get() {
    // Current layer
    return this.current
  }
}

class CE_Tool {
  constructor() {
    this.tools = new Map()
    this.current = {}
  }

  find(key) {
    return this.tools.get(key)
  }

  add(name) {
    this.tools.set(name)
  }

  set(key) {
    this.current = this.find(key)
  }

  get() {
    return this.current
  }
}

class CE_Draw {
  grid(layer, padding) {
    const drawing = (axis, scale=padding, alpha=.15) => {
      for (var i = 0; i < ((axis === 'v') ? width : height) / scale; i++) {
        const line = new Konva.Line({
          points: (axis === 'v') ?
            [Math.round(i * scale) + 0.5, 0, Math.round(i * scale) + 0.5, height] :
            [0, Math.round(i * scale), width, Math.round(i * scale)],
          stroke: `rgba(255, 255, 255, ${alpha})`,
          strokeWidth: 1,
        })
        layer.add(line)
      }
    }

    // Drawing primary lines
    drawing('v')
    drawing('h')

    // Drawing secondary lines
    drawing('v', padding * 5, .25)
    drawing('h', padding * 5, .25)
  }

  rect(stage, layer, padding, x, y) {
    const round = (n) => Math.round(n / padding) * padding
    const rect = new Konva.Rect({
      x: round(x),
      y: round(y),
      fill: colors.random,
      stroke: 'white',
      strokeWidth: 3,
      draggable: true
    })

    rect.on('mousedown', e => {
      const isMiddle = e.evt.button === 1;
      rect.draggable(!isMiddle);
    })

    rect.on('dragstart dragmove dragend', (e) => {
      rect.position({
        x: Math.round(rect.x() / padding) * padding,
        y: Math.round(rect.y() / padding) * padding
      });
      stage.batchDraw()
    })

    layer.add(rect)
    return rect
  }
}

const history = new CE_History()
const colors = new CE_Color([
  '#446b99', '#444a99', '#6f4499', '#44998b',
  '#549944', '#919944', '#997744', '#995644',
  '#994444', '#994467', '#994485', '#6f4499'
])

const stage = new CE_Stage()
const layers = new CE_Layer()
const tools = new CE_Tool()
const draw = new CE_Draw()

class Application {
  constructor(options) {
    this.unpacking(options)

    this.fetching()
    this.processing()
    this.listeners()
  }

  unpacking(options) {
    this.padding = options.padding
    new CE_HTML()
  }

  processing() {
    // Create stage
    stage.create()

    // Adding core layers
    layers.__add__('grid')
    layers.__add__('main')
    layers.__add__('draw')

    // Adding layers on stage
    stage.update(layers.core.values())

    // Drawing grid on grid layer
    draw.grid(layers.__find__('grid'), this.padding)
  }

  fetching() {
    // Fetching data...
  }

  listeners() {
    let x, y, rect
    let mousedown = false

    let currentShape
    const context = document.querySelector('#shape-context')
    const aggragatorPinButton = document.querySelector('#aggragator-pin-button')
    const changeButton = document.querySelector('#change-button')
    const deleteButton = document.querySelector('#delete-button')
    const optionsButton = document.querySelector('#options-button')

    aggragatorPinButton.onclick = () => {
      console.log('[EVENT] Change color shape')

      context.style.display = 'none'
    }

    changeButton.onclick = () => {
      console.log('[EVENT] Change color shape')

      currentShape.fill(colors.random)
      currentShape.draw()

      context.style.display = 'none'
    }

    deleteButton.onclick = () => {
      console.log('[EVENT] Destroy shape')

      layers.__find__('main').children.forEach(child => {
        if (currentShape === child) child.destroy()
      })
      currentShape.destroy()
      stage.get.batchDraw()

      context.style.display = 'none'
    }

    optionsButton.onclick = () => {
      console.log('[EVENT] Open shape options')

      context.style.display = 'none'
    }

    stage.listen('contextmenu', e => {
      e.evt.preventDefault()

      if (e.target === stage.get) {
        return
      }

      currentShape = e.target

      context.style.display = 'initial'

      const containerRect = stage.get.container().getBoundingClientRect()
      context.style.top = containerRect.top + stage.get.getPointerPosition().y - 10 + 'px'
      context.style.left = containerRect.left + stage.get.getPointerPosition().x - 15 + 'px'
    })

    stage.listen('mousemove', e => {
      const pos = stage.get.getPointerPosition()
      if (e.evt.button === 0) {
        if (mousedown) {
          layers.__find__('draw').clear()
          const currentX = pos.x
          const currentY = pos.y
          rect.x(x)
          rect.y(y)

          rect.width(Math.round((currentX - x) / this.padding) * this.padding)
          rect.height(Math.round((currentY - y) / this.padding) * this.padding)

          rect.draw()
        }
      }
    })

    stage.listen('mouseup', e => {
      if (e.evt.button === 0) {
        layers.__find__('draw').clear()
        mousedown = false

        if ((rect.x() !== 0) && (rect.y() !== 0)) {
          layers.__find__('main').add(rect)
          stage.get.batchDraw()
        }
      }
    })

    stage.listen('mousedown', e => {
      const isLeft = e.evt.button === 0;
      stage.get.draggable(!isLeft);

      if (isLeft) {
        if (!e.target.__proto__.className) {
          mousedown = true
          x = Math.round(stage.get.getPointerPosition().x / this.padding) * this.padding
          y = Math.round(stage.get.getPointerPosition().y / this.padding) * this.padding
  
          rect = draw.rect(stage.get, layers.__find__('draw'), this.padding, x, y)
          //console.log(rect)
        }
      }
    })

    stage.listen('wheel', e => {
      e.evt.preventDefault()
      const scaleBy = 1.05;
      const scale = stage.get.scaleX()
      const mousePointTo = {
          x: stage.get.getPointerPosition().x / scale - stage.get.x() / scale,
          y: stage.get.getPointerPosition().y / scale - stage.get.y() / scale
      }

      const rescale = e.evt.deltaY > 0 ? scale / scaleBy : scale * scaleBy
      stage.get.scale({ x: rescale, y: rescale })

      const position = {
          x: -(mousePointTo.x - stage.get.getPointerPosition().x / rescale) * rescale,
          y: -(mousePointTo.y - stage.get.getPointerPosition().y / rescale) * rescale
      }

      stage.get.position(position)
      stage.get.batchDraw()
    })

    stage.listen('click', () => {
      context.style.display = 'none'
    })
  }
}

function constructor(options) { return new Application(options) }