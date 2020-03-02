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

class CE_CSS {
  constructor() {
    const head = document.querySelector(`head`)
    const style = document.createElement('style')
    const css = `
      :root {
          --accent: #0070bf;
          --gray: #999
      }
      
      body {
          margin: 0;
          padding: 0;
          font-family: 'Roboto', sans-serif;
          font-size: 16px;
      }
      
      #constructor {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
        background: var(--accent);
        overflow: hidden;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
      }
      
      #container {
          width: 100%;
          height: 100%;
      }
      
      .menu {
          z-index: 1000;
      }
      
      main {
          margin-bottom: 90px;
      }
      
      footer.page-footer {
          bottom: -90px;
      }
      
      #container, body, ul, ul li {
          margin: 0;
          padding: 0
      }
      
      #load-blueprint {
          transform: rotate(180deg)
      }
      
      #line-tool img {
          transform: rotate(-45deg)
      }
      
      .btn {
          display: flex;
          justify-content: center;
          align-items: center;
          border: none;
          outline: none;
          background: #fff;
          border-radius: 5px;
          margin: 5px;
          cursor: pointer;
          color: #072850;
          opacity: .75;
          transition: all .3s ease
      }
      
          .btn-indicator, .btn:hover {
              opacity: 1
          }
      
          .btn img {
              position: relative;
              width: 16px;
              height: 16px;
              object-fit: contain
          }
      
      .btn-accent {
          width: 38px;
          height: 38px
      }
      
      .btn-indicator {
          width: min-content;
          padding: 0 15px;
          white-space: nowrap
      }
      
          .btn-indicator img {
              margin-right: 10px
          }
      
          .btn-indicator span {
              opacity: .45;
              color: var(--accent);
              transition: all .3s ease;
          }
      
      .btn-indicator:hover span {
          opacity: 1;
      }
      
      .form-group {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px
      }
      
          .form-group input.setting {
              color: #072850;
              transition: all .3s ease;
              box-shadow: 0 0 75px 0 rgba(41,46,56,.25)
          }
      
          .form-group .setting {
              border: none;
              background: #fff;
              border-radius: 5px;
              height: 38px;
              margin: 5px;
              padding: 0 15px
          }
      
          .form-group button.setting {
              cursor: pointer;
              color: var(--accent);
              transition: all .3s ease
          }
      
              .form-group button.setting span {
                  opacity: .45;
                  transition: all .3s ease
              }
      
          .form-group input.setting::placeholder {
              color: var(--accent);
              opacity: .45;
              transition: all .3s ease
          }
      
          .form-group input.setting:hover::placeholder {
              opacity: 1
          }
      
          .form-group input.setting::placeholder:focus {
              opacity: 0
          }
      
          .form-group input::-webkit-inner-spin-button, .form-group input::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0
          }
      
          .form-group input[type=number] {
              -moz-appearance: textfield
          }
      
          .form-group button.setting:hover span {
              opacity: 1
          }
      
      .hide {
          display: none;
          opacity: 0
      }
      
      .show {
          display: flex;
          opacity: 1
      }
      
      #shape-context, #shape-tooltip {
          display: none;
          position: absolute;
          z-index: 800;
          width: 220px;
          background-color: #fff;
          box-shadow: 0 0 75px 0 rgba(41,46,56,.15);
          border-radius: 5px;
          overflow: hidden
      }
      
          #shape-context button {
              width: 100%;
              background-color: #fff;
              border: none;
              margin: 0;
              padding: 8px 15px;
              text-align: left;
              outline: none
          }
      
              #shape-context button span, #shape-tooltip p {
                  color: var(--accent);
                  opacity: .45;
                  transition: all .3s ease
              }
      
                  #shape-context button:hover span, #shape-tooltip p:hover {
                      opacity: 1
                  }
      
      .constructor-modal {
          display: none;
          justify-content: center;
          align-items: center;
          position: absolute;
          z-index: 900;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,.55);
          opacity: 0
      }
      
          .constructor-modal.active {
              display: flex;
              opacity: 1
          }
      
          .constructor-modal .wrapper {
              display: none;
              position: relative;
              z-index: 905;
              background: #fff;
              padding: 15px;
              border-radius: 5px;
              min-width: 525px
          }
      
              .constructor-modal .wrapper h1 {
                  margin: 0 0 15px;
                  padding: 0;
                  font-size: 20px;
                  font-weight: 500;
                  color: var(--accent);
                  text-align: center
              }
      
              .constructor-modal .wrapper ul {
                  display: grid;
                  grid-template-columns: 1fr;
                  grid-template-rows: auto;
                  grid-gap: 10px;
                  margin: 0;
                  padding: 0
              }
      
                  .constructor-modal .wrapper ul li {
                      display: flex;
                      justify-content: space-between;
                      list-style: none;
                      padding: 15px 10px;
                      margin: 0;
                      background: #f3f3f3;
                      border-radius: 5px;
                      width: calc(100% - 20px);
                  }
      
                      .constructor-modal .wrapper ul li label {
                          color: var(--accent);
                          width: 100%;
                          line-height: 0;
                      }
      
                      .constructor-modal .wrapper ul li span {
                          font-size: 14px;
                          color: var(--accent);
                          opacity: 1;
                          line-height: 0;
                      }
      
          .constructor-modal .background {
              position: absolute;
              z-index: 902;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: transparent;
              cursor: pointer;
              animation: fadeIn .3s ease
          }
      
          .constructor-modal .wrapper button {
              margin-top: 10px;
              padding: 10px;
              background: #f3f3f3;
              border: none;
              outline: none;
              border-radius: 5px;
              width: 100%;
              cursor: pointer
          }
      
              .constructor-modal .wrapper button span {
                  color: var(--accent);
                  opacity: .4;
                  transition: all .3s ease
              }
      
              .constructor-modal .wrapper button:hover span {
                  opacity: 1
              }
      
      .checkbox-container {
          display: block;
          position: relative;
          cursor: pointer;
          font-size: 14px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none
      }
      
          .checkbox-container input {
              position: absolute;
              opacity: 0;
              cursor: pointer;
              height: 0;
              width: 0
          }
      
          .checkbox-container .checkbox-checkmark {
              position: absolute;
              z-index: 906;
              top: -15px;
              right: -60px;
              height: 30px;
              width: 30px;
              background: #f3f3f3;
              border-radius: 5px;
              transition: all .3s ease
          }
      
          .checkbox-container:hover input ~ .checkbox-checkmark {
              background-color: var(--accent);
              opacity: .25
          }
      
          .checkbox-container input:checked ~ .checkbox-checkmark {
              background-color: var(--accent);
              opacity: 1
          }
      
          .checkbox-container .checkbox-checkmark:after {
              content: "";
              position: absolute;
              display: none
          }
      
          .checkbox-container input:checked ~ .checkbox-checkmark:after {
              display: block
          }
      
          .checkbox-container .checkbox-checkmark:after {
              top: 10px;
              left: 10px;
              width: calc(100% - 20px);
              height: calc(100% - 20px);
              border-radius: 3px;
              background: #fff
          }
      
      .checkbox-empty {
          text-align: center;
          font-weight: 300;
          opacity: .45;
          margin: 15px 0;
      }
      
      .constructor-modal .wrapper ul li.checkbox-item {
          width: calc(100% - 70px);
          padding: 15px 20px 15px 10px;
      }
      
      .constructor-modal .wrapper button {
          background: var(--accent)
      }
      
          .constructor-modal .wrapper button span {
              opacity: 1;
              color: #fff
          }
      
      .constructor-modal .wrapper .options-list .option-item .option-value img {
          width: 16px;
          height: 16px;
          object-fit: contain;
          position: absolute;
          right: 25px;
          opacity: .75;
          cursor: pointer;
          transition: all .3s ease
      }
      
          .constructor-modal .wrapper .options-list .option-item .option-value img:hover {
              opacity: 1
          }
      
      .wrapper.save-content .form-group {
          margin: 0 0 10px
      }
      
          .wrapper.save-content .form-group .setting {
              width: 100%;
              height: 18px;
              box-shadow: none;
              padding: 10px;
              margin: 0;
              background: #f3f3f3;
              border-radius: 5px;
              outline: none
          }
      
      #drop_zone {
          display: flex;
          justify-content: center;
          align-items: center;
          border: 2px dashed var(--accent);
          border-radius: 10px;
          height: 256px;
          color: var(--accent);
          font-size: 14px;
          opacity: .4;
          cursor: pointer;
          transition: all .3s ease
      }
      
          #drop_zone:hover {
              opacity: 1
          }
      
          #drop_zone span {
              background: #153f86;
              border-radius: 5px;
              padding: 10px 15px;
              color: #fff;
              cursor: default
          }
      
          #drop_zone.dropped {
              opacity: 1;
              background: rgba(21,63,134,.17)
          }
      
      .wrapper.resize-content {
          width: 525px
      }
      
          .wrapper.resize-content h2 {
              font-size: 14px;
              font-weight: 400;
              padding: 0 15px;
              text-align: center;
              color: var(--accent)
          }
      
          .wrapper.resize-content .form-group {
              margin: 0
          }
      
              .wrapper.resize-content .form-group button {
                  color: #fff;
                  opacity: 1
              }
      
      .load-select-button {
          background: var(--accent);
          color: #fff;
          margin: 0;
          padding: 10px;
          border-radius: 5px;
          font-size: 14px;
          cursor: pointer
      }
      
      .load-select-zone {
          position: relative
      }
      
          .load-select-zone #load-select-list {
              position: absolute;
              width: 100%;
              background: var(--accent);
              padding: 10px;
              margin-top: 15px;
              border-radius: 5px;
              z-index: 907;
              box-shadow: 0 0 50px 0 rgba(0,0,0,.45);
              font-size: 14px
          }
      
              .load-select-zone #load-select-list .load-select-item {
                  display: flex;
                  justify-content: space-between;
                  list-style: none;
                  padding: 20px 10px;
                  margin: 0;
                  background: #f3f3f3;
                  border-radius: 5px;
                  width: 100%;
                  cursor: pointer
              }
      
                  .load-select-zone #load-select-list .load-select-item span {
                      opacity: .4;
                      transition: all .3s ease
                  }
      
                  .load-select-zone #load-select-list .load-select-item:hover span {
                      opacity: 1
                  }
      
      .delimiter {
          width: 100%;
          text-align: center;
          color: var(--gray);
          text-transform: uppercase;
          font-size: 14px;
          margin: 10px 0
      }
      
      .constructor-logo {
          display: flex;
          position: absolute;
          z-index: 540;
          top: 0;
          left: 0;
          margin: 25px 0 0 25px;
          cursor: pointer;
          user-select: none
      }
      
          .constructor-logo .image {
              position: relative;
              z-index: 542;
              display: flex;
              justify-content: center;
              align-items: center;
              background: #fff;
              border-radius: 5px;
              width: 64px;
              height: 64px
          }
      
              .constructor-logo .image img {
                  width: 48px;
                  height: 48px;
                  object-fit: contain;
              }
      
          .constructor-logo .title {
              position: relative;
              z-index: 541;
              top: 6px;
              background: #fff;
              border-radius: 0 5px 5px 0;
              padding: 0 75px 0 15px;
              height: 35px;
              box-shadow: 0 0 75px 0 rgba(41,46,56,.25);
              display: flex;
              align-items: center;
          }
      
              .constructor-logo .title h1 {
                  font-size: 14px;
                  font-weight: 500;
                  color: var(--accent);
                  line-height: 0;
                  opacity: .45;
                  padding: 0;
                  position: relative;
                  top: 3px;
              }
      
      .constructor-tools {
          position: absolute;
          z-index: 500;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 15px
      }
      
          .constructor-tools .tool {
              display: flex;
              justify-content: center;
              align-items: center;
              border: none;
              outline: none;
              background: #fff;
              border-radius: 5px;
              width: 38px;
              height: 38px;
              margin: 5px;
              cursor: pointer;
              color: #072850;
              opacity: .75;
              transition: all .3s ease
          }
      
              .constructor-tools .tool img {
                  position: relative;
                  width: 16px;
                  height: 16px;
                  object-fit: contain
              }
      
              .constructor-tools .tool.active, .constructor-tools .tool:hover {
                  opacity: 1
              }
      
              .constructor-tools .tool.disable:hover {
                  opacity: .75;
                  cursor: default
              }
      
      .constructor-funcs {
          position: absolute;
          z-index: 541;
          top: 0;
          right: 0;
          margin: 15px 15px 0 0
      }
      
      .constructor-layers {
          position: absolute;
          z-index: 555;
          right: 0;
          bottom: 0;
          margin-right: 25px;
          margin-bottom: 25px;
          width: 256px;
          height: 256px;
          background: #fff;
          border-radius: 5px;
          overflow-y: scroll;
          box-shadow: 0 0 75px 0 rgba(41,46,56,.25)
      }
      
          .constructor-layers::-webkit-scrollbar {
              width: 2px;
              border-radius: 5px
          }
      
          .constructor-layers::-webkit-scrollbar-track {
              box-shadow: none
          }
      
          .constructor-layers::-webkit-scrollbar-thumb {
              background-color: #a9a9a9;
              outline: 1px solid #708090
          }
      
          .constructor-layers .list .item {
              display: flex;
              align-items: center;
              position: relative;
              padding: 10px;
              margin: 10px;
              background: #f3f3f3;
              border-radius: 5px;
              opacity: .4;
              cursor: pointer;
              transition: all .3s ease
          }
      
              .constructor-layers .list .item.empty {
                  opacity: .75
              }
      
              .constructor-layers .list .item.active, .constructor-layers .list .item:hover {
                  opacity: 1
              }
      
              .constructor-layers .list .item h3 {
                  font-size: 14px;
                  color: var(--accent);
                  font-weight: 400;
                  padding: 5px 0;
                  margin: -10px 0 0;
                  position: relative;
                  top: 5px;
              }
      
              .constructor-layers .list .item input.active {
                  color: #333
              }
      
              .constructor-layers .list .item .form-group {
                  position: absolute;
                  right: 0;
                  top: 5px;
              }
      
              .constructor-layers .list .item .action {
                  position: relative;
                  top: -5px;
                  border: none;
                  outline: none;
                  background: none;
                  width: 16px;
                  height: 16px;
                  opacity: .75;
                  margin: 0 5px;
                  cursor: pointer;
                  transition: all .3s ease
              }
      
                  .constructor-layers .list .item .action:hover {
                      opacity: 1
                  }
      
                  .constructor-layers .list .item .action img {
                      width: 16px;
                      height: 16px;
                      object-fit: contain
                  }
      
              .constructor-layers .list .item.empty {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  padding: 20px 10px;
              }
      
                  .constructor-layers .list .item.empty .form-group {
                      width: 100%
                  }
      
                      .constructor-layers .list .item.empty .form-group .action {
                          left: 10px;
                          width: 100%;
                          height: 100%
                      }
      
          .constructor-layers .layer.active {
              opacity: 1
          }
      
          .constructor-layers .layer .input-layer {
              display: none;
              position: relative;
              top: 0;
              left: 0;
              border-radius: 5px;
              border: none;
              outline: none;
              background: none;
              width: calc(100% - 20px);
              font-size: 14px;
              color: var(--accent);
              padding: 1px 0;
              line-height: 0
          }
      
      .constructor-message {
          position: absolute;
          z-index: 155;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          user-select: none;
          opacity: 1;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, .25);
          transition: all .3s ease;
      }
      
          .constructor-message.warning {
              top: 100px;
              align-items: flex-start;
              animation: slideIn .3s ease
          }
      
          .constructor-message.open p {
              top: 0;
              align-items: flex-start;
              animation: fadeIn .3s ease
          }
      
          .constructor-message.hide {
              display: none;
              opacity: 0;
              animation: fadeOut .3s ease
          }
      
          .constructor-message p {
              background: #fff;
              border-radius: 5px;
              padding: 25px;
              cursor: default;
              box-shadow: 0 0 75px 0 rgba(41,46,56,.25)
          }
      
              .constructor-message p span {
                  color: var(--accent);
                  opacity: .45;
                  font-size: 14px
              }
      
      .constructor-informations {
          position: absolute;
          z-index: 255;
          left: 0;
          bottom: 0;
          margin-left: 20px;
          margin-bottom: 20px
      }
      
          .constructor-informations .wrap-notifications {
              display: flex;
              flex-direction: column;
              margin-left: 5px;
              margin-bottom: 5px
          }
      
              .constructor-informations .wrap-notifications .notify-list {
                  display: flex;
                  flex-direction: column
              }
      
                  .constructor-informations .wrap-notifications .notify-list .notify-item {
                      list-style: none;
                      padding: 10px 15px;
                      background: #fff;
                      border-radius: 5px;
                      margin: 5px 0;
                      cursor: pointer;
                      opacity: 1
                  }
      
                      .constructor-informations .wrap-notifications .notify-list .notify-item span {
                          font-size: 14px;
                          color: var(--accent);
                          opacity: .45
                      }
      
          .constructor-informations .wrap-buttons {
              display: flex
          }
      
      .shape-tooltip li {
          display: none;
      }
      
      .disable {
          opacity: .25;
          cursor: default !important;
      }
      
      .fadeIn {
          animation: fadeIn .3s ease
      }
      
      .fadeOut {
          animation: fadeOut .3s ease
      }
      
      .slideIn {
          animation: fadeIn .3s ease
      }
      
      .slideOut {
          animation: fadeOut .3s ease
      }
      
      @keyframes fadeIn {
          0% {
              opacity: 0
          }
      
          25% {
              opacity: .25
          }
      
          50% {
              opacity: .5
          }
      
          75% {
              opacity: .75
          }
      
          to {
              opacity: 1
          }
      }
      
      @keyframes fadeOut {
          0% {
              opacity: 1
          }
      
          25% {
              opacity: .75
          }
      
          50% {
              opacity: .5
          }
      
          75% {
              opacity: .25
          }
      
          to {
              opacity: 0
          }
      }
      
      @keyframes slideIn {
          0% {
              opacity: 0;
              top: 0
          }
      
          25% {
              opacity: .25;
              top: 25px
          }
      
          50% {
              opacity: .5;
              top: 50px
          }
      
          75% {
              opacity: .75;
              top: 75px
          }
      
          to {
              opacity: 1;
              top: 100px
          }
      }
      
      @keyframes slideOut {
          0% {
              opacity: 1;
              top: 100px
          }
      
          25% {
              opacity: .75;
              top: 75px
          }
      
          50% {
              opacity: .5;
              top: 50px
          }
      
          75% {
              opacity: .25;
              top: 25px
          }
      
          to {
              opacity: 0;
              top: 0
          }
      }
  
    `
    style.innerHTML = css
    head.append(style)
  }
}

class CE_History {
  constructor() {
    // Access denied, only within class
    this.history = 0
  }

  increase() { this.history++ }
  decrease() { this.history++ }
  
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

  add(name) {
    // Add new layer
    const layer = {
      id: this.user.size,
      name: name,
      children: []
    }
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
    new CE_CSS()
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
      create: () => {
        if (settings.find('debug'))
          console.log('[LAYER] Layer has been created')

        // Create layer content
        const layerDiv = document.createElement('div')
        layerDiv.className = `item layer layer-${history.value} active`
        layerDiv.innerHTML = `
          <h3 id="tl-input-${history.value}" class="title">Новый слой ${history.value}</h3>
          <input id="el-input-${history.value}" class="input-layer" type="text" placeholder="Новый слой ${history.value}" />
            
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
        layers.add(name)
        layers.set(name)
        layers.__find__('main').clear()
        console.log(layers.user)

        // Listen event by change current layer
        button.listen('click', essence.change, () => {
          if (settings.find('debug'))
            console.log('[LAYER] Layer has been change on ' + name)

          layer.clear()
          layers.__find__('main').clear()
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
      info: document.querySelector('#info-button'),
      save: document.querySelector('#save-blueprint'),
      load: document.querySelector('#load-blueprint'),
      background: wrapperModal.children[0]
    }

    const context = {
      get: document.querySelector('#shape-context'),
      attach: document.querySelector('#aggragator-pin-button'),
      change: document.querySelector('#change-button'),
      delete: document.querySelector('#delete-button'),
      options: document.querySelector('#options-button')
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
    
    const handlerNotDraggableStage = () => {
      stage.listen('mousedown', e => {
        const isLeft = e.evt.button === 0
        stage.get.draggable(!isLeft)
      })
    }

    /* Tool Handlers */
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

              stage.get.batchDraw()
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

    button.listen('click', ui.info, () => modal.open(wrapperInfo))
    button.listen('click', ui.save, () => modal.open(wrapperSave))
    button.listen('click', ui.load, () => modal.open(wrapperLoad))
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