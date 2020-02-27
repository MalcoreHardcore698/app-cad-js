const find = () => document.querySelector
const create = () => document.createElement
const [width, height] = [window.innerWidth, window.innerHeight]

class Tool {

}

class Application {
  constructor(options) {
    this.container = options.container
    
    this.ct = document.querySelector('#constructor')
    this.sc = options.scale

    this.createEditor = this.createEditor.bind(this)

    this.fethedData()
    this.createEditor()
    this.listenEvents()
  }

  fethedData() {
    // Data fething...
  }

  createEditor() {
    this.insertHTML()

    this.sg = new Konva.Stage({
      container: 'container',
      width: width,
      height: height,
      draggable: true
    })
  
    this.ml = new Konva.Layer()
    this.dl = new Konva.Layer()

    this.sg.add(this.ml)
    this.sg.add(this.dl)
  
    this.drawGridEditor(this.sc, this.ml)
    this.fitEditor(this.sg)
  }

  insertHTML() {
    const insert = ({ container, id = null, name = null, html = null }) => {
      const div = document.createElement('div')
      if (id) div.id = id
      if (name) div.className = name
      if (html) div.innerHTML = html
      container.appendChild(div)
    }

    const wrapper = document.querySelector(`#constructor`)

    // [MODALS / POPUPS]
    insert({
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

    // [LOGOTYPE]
    insert({
      container: wrapper,
      name: 'constructor-logo',
      html: `
        <div class="image">
          <img src="./img/logo.png" />
        </div>
        
        <div class="title">
          <h1 id="name-factory"></h1>
        </div>
      `
    })

    // [TOOLS]
    insert({
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
            <img src="./img/move.svg" />
          </button>
          <button id="line-tool" class="tool disable">
            <img src="./img/line.svg" />
          </button>
          <button id="rect-tool" class="tool disable">
            <img src="./img/rect.svg" />
          </button>
        </div>
      `
    })

    // [FUNCTIONS]
    insert({
      container: wrapper,
      name: 'constructor-funcs',
      html: `
        <div class="form-group">
          <button id="load-blueprint" class="btn btn-accent">
            <img src="./img/load.svg" />
          </button>
          <button id="save-blueprint" class="btn btn-accent">
            <img src="./img/save.svg" />
          </button>
        </div>
      `
    })

    // [LAYERS]
    insert({
      container: wrapper,
      name: 'constructor-layers',
      html: `
        <div id="layer-list" class="list">
          <div id="empty" class="item empty">
            <div class="form-group">
              <button id="add-layer" class="tool action">
                <img src="./img/add.svg" />
              </button>
            </div>
          </div>
        </div>
      `
    })

    // [MESSAGE OPEN]
    insert({
      container: wrapper,
      id: 'constructor-open-message',
      name: 'constructor-message open',
      html: `
        <p><span>Добавьте слой, чтобы начать работу</span></p>
      `
    })

    // [MESSAGE WARNNING]
    insert({
      container: wrapper,
      id: 'constructor-warning-message',
      name: 'constructor-message warning hide',
      html: `
        <p><span>Вы можете ввести масштаб только от 25 до 200</span></p>
      `
    })

    // [INFORMATION]
    insert({
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
            <img src="./img/info.svg" />
          </button>

          <button class="btn btn-indicator">
            <span id="scale-indicator">Текущий масштаб: </span>
          </button>
        </div>
      `
    })

    // [CONTEXTMENU]
    insert({
      container: wrapper,
      id: 'shape-context',
      name: 'constructor-context',
      html: `
        <div>
          <button id="aggragator-pin-button"><span>Прикрепить к аггрегату</span></button>
          <button id="move-button"><span>Переместить</span></button>
          <button id="change-button"><span>Сменить цвет</span></button>
          <button id="delete-button"><span>Удалить</span></button>
          <button id="options-button"><span>Свойства</span></button>
        </div>
      `
    })
  }

  drawGridEditor(scale, layer) {
    const drawAxis = (scale, axis, layer, multiply = 1, alpha = .15) => {
      const side = (axis === "horizontal") ? width : height
      const rescale = scale * multiply
      for (let i = 0; i < side; i++) {
        const line = new Konva.Line({
          points: (axis === "horizontal") ?
            [0, i * rescale, width, i * rescale] :
            [i * rescale, 0, i * rescale, height],
          stroke: `rgba(255, 255, 255, ${alpha})`,
          strokeWidth: 2,
          lineCap: 'round',
          lineJoin: 'round'
        });
        layer.add(line)
      }
    }

    const drawPoints = (scale, layer) => {
      for (let i = 0; i < Math.ceil(height / scale + scale); i++) {
        for (let k = 0; k < (width / scale); k++) {
          let circle = new Konva.Circle({
            x: k * scale,
            y: i * scale,
            radius: 3,
            fill: 'rgba(255, 255, 255, .25)',
            stroke: 'rgba(255, 255, 255, .25)',
            strokeWidth: 0,
            name: 'point',
            id: `point t-${i} n=${k}`
          });

          layer.add(circle);
        }
      }
    }

    // Formation grid
    drawAxis(scale, "horizontal", layer)
    drawAxis(scale, "vertical", layer)
    drawAxis(scale, "horizontal", layer, 5, .25)
    drawAxis(scale, "vertical", layer, 5, .25)
  }

  fitEditor(stage) {
    const containerWidth = this.ct.offsetWidth
    const scale = containerWidth / width

    stage.width(width * scale)
    stage.scale({ x: scale, y: scale })
    stage.draw()
  }

  listenEvents() {
    window.addEventListener('resize', () => this.fitEditor(this.sg))

    const scaleBy = 1.15
    this.sg.on('wheel', e => {
      e.evt.preventDefault()
      const scale = this.sg.scaleX()

      const rescale = e.evt.deltaY > 0 ? scale * scaleBy : scale / scaleBy
      this.sg.scale({ x: rescale, y: rescale })
      this.sg.batchDraw()
    })
  }
}

function constructor(options) { return new Application(options) }