// Setting base resolution widget relative window browser
const [width, height] = [window.innerWidth, window.innerHeight]

/*************************************************/
/*                                               */
/* Below Constructor Editor (CE) implementations */
/*                                               */
/*************************************************/

class CE_HTML {
  constructor(scale) {
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
            <span id="scale-indicator">Текущий масштаб: ${scale}</span>
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

class CE_History {
  constructor() {
    // Access denied, only within class
    this.history = 0
  }

  increase() { this.history++ }
  decrease() { this.history++ }
  
  refresh() { this.history = 0 }
  get value() { return this.history }
}

class CE_Color {
  constructor(colors) {
    // Access denied, only within class
    this.colors = colors
  }

  set add(color) {
    this.colors.push(color)
  }

  get random() {
    return this.colors[Math.floor(Math.random() * Math.floor(this.colors.length))]
  }
}

class CE_Stage {
  constructor() {
    // Access denied, only within class
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
    // Access allowed, everywhere
    this.core = new Map()
    this.user = new Map()
    this.current = {}
  }

  /* Methods with __<name>__ is core */
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

  add(name, children=[]) {
    // Add new layer
    const layer = {
      id: this.user.size,
      name: name,
      children: children
    }
    this.user.set(name, layer)
  }

  set(key) {
    // Set current layer
    this.current = this.find(key)
  }

  all() {
    let formatted = []
    for (let value of this.user.values()) {
      formatted.push(value)
    }
    return formatted
  }

  refresh() { this.user = new Map() }

  get() {
    // Current layer
    return this.current
  }
}

class CE_Tool {
  constructor() {
    // Access denied, only within class
    this.tools = []
    this.current = ''
  }

  find(tool) {
    return this.tools.filter(tl => tl === tool)
  }

  add(name) {
    this.tools.push(name)
  }

  set(tool) {
    this.current = tool
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

class CE_Button {
  listen(event, button, callback) {
    switch (event) {
      case 'click':
        button.onclick = callback
    }
  }
}

class CE_Settings {
  constructor() {
    // Access denied, only within class
    this.settings = new Map()
  }

  find(key) {
    // Get value option
    return this.settings.get(key)
  }

  add(key, value) {
    // Add new option
    this.settings.set(key, value)
  }

  set(key, value) {
    // Set value option
    this.settings.set(key, value)
  }

  create() {
    this.add('debug', true)
    this.add('snap', true)
    this.add('ui', true)
  }
}

/*************************************************/
/*                                               */
/*           Initialization instances            */
/*                                               */
/*************************************************/
// Nesseccary for safe history about created lately layers
// and formation identificators (not action history)
const history = new CE_History()

// Just color collection with simple methods (add, random, etc.)
const colors = new CE_Color([
  '#446b99', '#444a99', '#6f4499', '#44998b',
  '#549944', '#919944', '#997744', '#995644',
  '#994444', '#994467', '#994485', '#6f4499'
])

// Nesseccary for building canvas
const stage = new CE_Stage()
const layers = new CE_Layer()
const tools = new CE_Tool()

// Nesseccary for rendering objects (line, rect, etc.)
const draw = new CE_Draw()

// Nesseccary for managment all buttons
const button = new CE_Button()

// Nesseccary for primary settings (debug mode, snap grid, etc)
const settings = new CE_Settings()

/*************************************************/
/*                                               */
/*                 Define links                  */
/*                                               */
/*************************************************/
// Strctures
let modal
let layer
// Wrappers for Modals / Popup
let wrapperModal
let wrapperInfo
let wrapperSave
let wrapperLoad
let wrapperSettings
let wrapperResize
// Nodes & Messages
let nodeTools
let nodeList
let nodeIndicator
let messageWarnning
let messageNotification

/*************************************************/
/*                                               */
/*                  Application                  */
/*                                               */
/*************************************************/

class Application {
  constructor(options) {
    this.unpacking(options)
    this.attaching()

    this.fetching()
    this.processing()
    this.listeners()
  }

  unpacking(options) {
    /* Unpacking options */
    this.padding = options.scale

    /* Generate HTML & CSS */
    new CE_HTML(this.padding)
    //new CE_CSS()
  }

  attaching() {
    wrapperModal = document.querySelector('.constructor-modal')
    wrapperInfo = document.querySelector('#info-modal')
    wrapperSave = document.querySelector('#save-modal')
    wrapperLoad = document.querySelector('#load-modal')
    wrapperSettings = document.querySelector('#options-modal')
    wrapperResize = document.querySelector('#resize-modal')
    
    nodeTools = document.querySelectorAll('.tool')
    nodeList = document.querySelector('#layer-list')
    nodeIndicator = document.querySelector('#scale-indicator')
    messageWarnning = document.querySelector('#constructor-warning-message')
    messageNotification = document.querySelector('#constructor-open-message')

    modal = {
      open: (wrapper) => {
        wrapper.style.display = 'block'
    
        wrapperModal.classList.toggle('active')
        wrapperModal.classList.remove('fadeOut')
        wrapperModal.classList.add('fadeIn')
      },
      close: () => {
        const wrappers = document.querySelectorAll('.wrapper')
        
        setTimeout(() => {
          wrapperModal.classList.toggle('active')
          wrappers.forEach(child => {
            child.style.display = 'none'
          })
        }, 200)
    
        wrapperModal.classList.remove('fadeIn')
        wrapperModal.classList.add('fadeOut')
      }
    }

    layer = {
      create: (title=`Новый слой ${history.value}`, children=[]) => {
        if (settings.find('debug'))
          console.log('[LAYER] Layer has been created')

        // Create layer content
        const layerDiv = document.createElement('div')
        layerDiv.className = `item layer layer-${history.value} active`
        layerDiv.innerHTML = `
          <h3 id="tl-input-${history.value}" class="title">${title}</h3>
          <input id="el-input-${history.value}" class="input-layer" type="text" placeholder="${title}" />
            
          <div class="form-group">
            <button id="el-${history.value}" class="action edit-layer">
              <img src="./img/edit.svg" />
            </button>
            <button id="dl-${history.value}" class="action delete-layer">
              <img src="./img/delete.svg" />
            </button>
          </div>
        `
        nodeList.appendChild(layerDiv)

        // Create essence interface
        const essence = {
          change: layerDiv.children[0],
          edit: layerDiv.children[2].children[0],
          remove: layerDiv.children[2].children[1]
        }

        // Create and set current layer by default
        const name = `layer-${history.value}`
        layers.add(name, children)
        layers.set(name)
        layers.__find__('main').clear()

        // Listen event by change current layer
        button.listen('click', essence.change, () => {
          if (settings.find('debug'))
            console.log('[LAYER] Layer has been change on ' + name)

          layer.clear()
          
          layers.__find__('main').clear()
          stage.get.batchDraw()

          layerDiv.classList.add('active')
          layers.set(name)
          
          layers.get().children.forEach(child => layers.__find__('main').add(child))
          layers.__find__('main').draw()
        })

        // Listen event by edit current layer
        button.listen('click', essence.edit, () => {
          layer.edit(name)
        })

        // Listen event by delete current layer
        button.listen('click', essence.remove, () => {
          layer.delete(name)
        })
      },
      edit: (id) => {
        if (settings.find('debug'))
          console.log(`[LAYER] Layer ${id} has been edited`)
      },
      delete: (id) => {
        if (settings.find('debug'))
          console.log(`[LAYER] Layer ${id} has been deleted`)
        
        // Delete content 
        const nodeLayers = document.querySelectorAll('.layer')
        nodeLayers.forEach(nodeItem => {
          if (nodeItem.classList[2] === id)
            nodeList.removeChild(nodeItem)
        })

        // Delete layer
        layers.user.delete(id)
        layers.__find__('main').clear()

        // Make active another layer, if it exists
        if (nodeList.children.length > 1) {
          layer.clear()
          nodeList.children[nodeList.children.length - 1].classList.add('active')
        }

        // Show message open, if there are no layers 
        if (nodeList.children.length === 1) {
          layer.clear()
          messageNotification.classList.remove('hide')
          nodeTools.forEach(tool => {
              tool.classList.remove('active')
              tool.classList.add('disable')
          })
        }
      },
      clear: () => {
        const nodeLayers = document.querySelectorAll('.layer')
        nodeLayers.forEach(nodeLayer => nodeLayer.classList.remove('active'))
      }
    }
  }

  fetching() {
    // Fetching data...
  }

  processing() {
    settings.create()
    stage.create()

    // Adding core layers
    layers.__add__('grid')
    layers.__add__('main')
    layers.__add__('draw')

    // Adding layers on stage
    stage.update(layers.core.values())

    // Adding tools
    tools.add('move-tool')
    tools.add('line-tool')
    tools.add('rect-tool')

    // Drawing grid on grid layer
    draw.grid(layers.__find__('grid'), this.padding)
  }

  listeners() {
    let currentShape

    const ui = {
      layer: {
        add: document.querySelector('#add-layer'),
      },
      resize: {
        button: document.querySelector('#size-button'),
        input: document.querySelector('#size-input'),
        apply: document.querySelector('#apply-resize'),
        decline: document.querySelector('#decline-resize')
      },
      save: {
        button: document.querySelector('#save-blueprint'),
        export: document.querySelector('#save-button'),
        fileName: document.querySelector('#file-name'),
        jsonType: document.querySelector('#json'),
        pngType: document.querySelector('#png'),
        dbType: document.querySelector('#db')
      },
      load: {
        button: document.querySelector('#load-blueprint'),
        import: document.querySelector('#load-button'),
        select: document.querySelector('#load-select-button'),
        list: document.querySelector('#load-select-button'),
        dropzone: document.querySelector('#drop_zone')
      },
      information: document.querySelector('#info-button'),
      background: wrapperModal.children[0]
    }

    const context = {
      get: document.querySelector('#shape-context'),
      attach: document.querySelector('#aggragator-pin-button'),
      change: document.querySelector('#change-button'),
      delete: document.querySelector('#delete-button'),
      options: document.querySelector('#options-button')
    }

    // Handlers
    const handlerNotDraggableStage = () => {
      stage.listen('mousedown', e => {
        const isLeft = e.evt.button === 0
        stage.get.draggable(!isLeft)
      })
    }

    const handlerMoveTool = () => {
      if (settings.find('debug'))
        console.log('[TOOL] Change tool on ' + tools.get())
      stage.get.off('mousemove mouseup mousedown')
      handlerNotDraggableStage()
    }

    const handlerLineTool = () => {
      if (settings.find('debug'))
        console.log('[TOOL] Change tool on ' + tools.get())
      stage.get.off('mousemove mouseup mousedown')
      handlerNotDraggableStage()
    }

    const handlerRectTool = () => {
      if (settings.find('debug'))
        console.log('[TOOL] Change tool on ' + tools.get())

      let x, y, rect
      let mousedown = false
        
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
  
          if (x || y) {
            if ((rect.x() !== 0) && (rect.y() !== 0)) {
              layers.__find__('main').add(rect)

              layers.get().children.push(rect)

              layers.__find__('main').batchDraw()
            }
          }
        }
      })
  
      stage.listen('mousedown', e => {
        const isLeft = e.evt.button === 0
        stage.get.draggable(!isLeft)
  
        if (isLeft) {
          if (!e.target.__proto__.className) {
            mousedown = true
            x = Math.round(stage.get.getPointerPosition().x / this.padding) * this.padding
            y = Math.round(stage.get.getPointerPosition().y / this.padding) * this.padding
    
            rect = draw.rect(stage.get, layers.__find__('draw'), this.padding, x, y)
          }
        }
      })
    }

    const handlerResize = () => {
      layers.__find__('grid').destroyChildren()
      layers.__find__('main').destroyChildren()
      layers.__find__('draw').destroyChildren()

      draw.grid(layers.__find__('grid'), ui.resize.input.value)

      stage.get.batchDraw()
      this.padding = ui.resize.input.value
      if (nodeIndicator) nodeIndicator.innerText = 'Текущий масштаб: ' + this.padding
      ui.resize.input.value = null
    }

    // Each tools
    nodeTools.forEach(btn => {
      button.listen('click', btn, () => {
        if (nodeList.children.length > 1) {
          // Clear 'active' class from tools
          nodeTools.forEach(nodeTool => nodeTool.classList.remove('active'))
          // Add 'active' class current tool
          btn.classList.add('active')

          if (tools.get() !== btn.id) {
            // Set new current tool
            tools.set(btn.id)
            
            /* Tool Handler */
            if (btn.id === 'move-tool') handlerMoveTool()
            if (btn.id === 'line-tool') handlerLineTool()
            if (btn.id === 'rect-tool') handlerRectTool()
          }
        }
      })
    })

    // Button listeners
    button.listen('click', ui.layer.add, () => {
      history.increase()

      layer.clear()
      layer.create()

      // Enable tools
      nodeTools.forEach(tl => tl.classList.remove('disable'))

      // Hide message
      if (nodeList.children.length > 1) messageNotification.classList.add('hide')
    })

    button.listen('click', ui.save.button, () => modal.open(wrapperSave))
    button.listen('click', ui.save.export, () => {
      const downloadURI = (uri, name) => {
        const link = document.createElement('a')
        link.download = name
        link.href = uri
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
      
      const data = {
        scale: this.padding,
        layers: layers.all().map((layer, i) => {
          return {
            id: layer.id,
            name: layer.name,
            children: layer.children.map(child => {
              return {
                ...child.attrs
              }
            })
          }
        })
      }

      if (json.checked) {
          const dataURL = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
          downloadURI(dataURL, ui.save.fileName.value ? `${ui.save.fileName.value}.json` : 'blueprint.json')
          modal.close()
      }

      if (png.checked) {
          const dataURL = stage.get.toDataURL({ pixelRatio: 3 })
          downloadURI(dataURL, ui.save.fileName.value ? `${ui.save.fileName.value}.png` : 'blueprint.png')
          modal.close()
      }

      if (db.checked) {
        const adds = location.pathname.split('/')
        //console.log(data)
        fetch(`http://cr-dev.dock7.66bit.ru/admin/department/saveschema?id=${adds[adds.length - 1]}&schema=` + encodeURIComponent(JSON.stringify(data)), {
            method: 'POST'
        })
        .then(response => response.json())
        modal.close()
      }
    })

    let result = ''
    let factoryID = false

    function handleFileSelect(evt) {
      evt.stopPropagation()
      evt.preventDefault()
      const file = evt.dataTransfer.files[0]
      const fileName = file.name
      ui.load.dropzone.innerHTML = `<span>${fileName}</span>`
      ui.load.dropzone.classList.add('dropped')

      const reader = new FileReader();
      reader.onload = (function (theFile) {
        return function (e) {
          result = e.target.result
          factoryID = false
        };
      })(file);
      reader.readAsDataURL(file);
    }

    function handleDragOver(evt) {
      evt.stopPropagation()
      evt.preventDefault()
      evt.dataTransfer.dropEffect = 'copy'
    }

    ui.load.dropzone.addEventListener('dragover', handleDragOver, false)
    ui.load.dropzone.addEventListener('drop', handleFileSelect, false)

    ui.load.select.onclick = () => {
      nodeList.classList.toggle('hide')
    }

    ui.load.list.childNodes.forEach(child => {
      child.onclick = () => {
        ui.load.list.classList.toggle('hide')
        ui.load.select.children[0].textContent = child.children[0].textContent
      }
    })

    button.listen('click', ui.load.button, () => modal.open(wrapperLoad))
    button.listen('click', ui.load.import, () => {
      modal.close()

      const decode = (str) => {
        if (typeof str === 'string') {
            let res = str.replace('data:application/json;base64,', '')
            res = escape(window.atob(res))
            res = res ? JSON.parse(decodeURIComponent(res)) : false
            return res
        } else return false
      }
      result = decode(result)

      if (result) {
        history.refresh()
        // Clear objects of all layers
        layers.__find__('grid').destroyChildren()
        layers.__find__('main').destroyChildren()
        layers.__find__('draw').destroyChildren()

        // Redrawing grid with new scale
        this.padding = result.scale
        nodeIndicator.innerText = 'Текущий масштаб: ' + this.padding
        draw.grid(layers.__find__('grid'), this.padding)
        ui.resize.input.value = null

        layers.refresh()
        // Fill layers instance object
        result.layers.forEach(lr => {
          history.increase()

          let chds = []
          lr.children.forEach(chd => {
            const sp = new Konva.Rect({ ...chd })
  
            sp.on('mousedown', e => {
              const isMiddle = e.evt.button === 1;
              sp.draggable(!isMiddle);
            })
        
            sp.on('dragstart dragmove dragend', e => {
              sp.position({
                x: Math.round(sp.x() / this.padding) * this.padding,
                y: Math.round(sp.y() / this.padding) * this.padding
              })
              stage.get.batchDraw()
            })

            chds.push(sp)
          })

          layer.create(layer.name, chds)

          if (nodeList.children.length > 1) messageNotification.classList.add('hide')
        })

        layer.clear()
        layers.__find__('main').clear()
        nodeList.children[1].classList.add('active')
        
        layers.set(result.layers[0].name)
        layers.get().children.forEach(child => layers.__find__('main').add(child))

        layers.__find__('main').draw()

        stage.get.batchDraw()
      }

      setTimeout(() => {
        result = ''
        factoryID = false
        ui.load.dropzone.innerHTML = 'Перетащите сюда JSON файл'
        ui.load.dropzone.classList.remove('dropped')
      }, 350)
    })
    
    button.listen('click', ui.resize.button, () => {
      if (ui.resize.input.value) {
        if (ui.resize.input.value >= 25 && ui.resize.input.value <= 200) {
          if (nodeList.childElementCount == 1) {
            handlerResize()
          } else {
            setTimeout(() => {
              modal.open(wrapperResize)
            }, 200)
          }
        } else {
          setTimeout(() => {
            messageWarnning.classList.remove('hide')
            ui.resize.input.value = null
          }, 150)
          setTimeout(() => messageWarnning.classList.add('hide'), 2500)
        }
      }
    })

    button.listen('click', ui.resize.apply, () => {
      modal.close()
      handlerResize()
    })

    button.listen('click', ui.resize.decline, () => {
      modal.close()
    })

    button.listen('click', ui.information, () => modal.open(wrapperInfo))
    button.listen('click', ui.background, () => modal.close())

    button.listen('click', context.attach, () => {
      if (settings.find('debug'))
        console.log('[EVENT] Shape has been attached to aggregator')

      context.get.style.display = 'none'
    })

    button.listen('click', context.change, () => {
      if (settings.find('debug'))
        console.log('[EVENT] Shape has been changed color')

      currentShape.fill(colors.random)
      currentShape.draw()

      context.get.style.display = 'none'
    })

    button.listen('click', context.delete, () => {
      if (settings.find('debug'))
        console.log('[EVENT] Shape has been deleted')

      layers.__find__('main').children.forEach(child => {
        if (currentShape === child) child.destroy()
      })
      currentShape.destroy()
      stage.get.batchDraw()

      context.get.style.display = 'none'
    })

    button.listen('click', context.options, () => {
      if (settings.find('debug'))
        console.log('[EVENT] Shape has been called options')

      context.get.style.display = 'none'
    })

    // Stage listeners
    handlerNotDraggableStage()

    stage.listen('contextmenu', e => {
      e.evt.preventDefault()

      if (e.target === stage.get) {
        return
      }

      currentShape = e.target

      context.get.style.display = 'initial'

      const containerRect = stage.get.container().getBoundingClientRect()
      context.get.style.top = containerRect.top + stage.get.getPointerPosition().y - 10 + 'px'
      context.get.style.left = containerRect.left + stage.get.getPointerPosition().x - 15 + 'px'
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
      context.get.style.display = 'none'
    })
  }
}

function constructor(options) { return new Application(options) }