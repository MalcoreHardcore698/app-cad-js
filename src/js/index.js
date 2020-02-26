window.onload = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
  });

  const mainLayer = new Konva.Layer()
  const drawLayer = new Konva.Layer()
  stage.add(mainLayer)
  stage.add(drawLayer)

  const MATRIX_SIZE = 32
  const POINT_RADIUS = 1

  const sizeLocal = localStorage.getItem('matrix_size')
  let size = !!sizeLocal ? JSON.parse(sizeLocal) : [MATRIX_SIZE, POINT_RADIUS]

  const modal = document.querySelector('.constructor-modal')
  const infoWrapper = document.querySelector('#info-modal')
  const saveWrapper = document.querySelector('#save-modal')
  const loadWrapper = document.querySelector('#load-modal')
  const optionsWrapper = document.querySelector('#options-modal')
  const resizeWrapper = document.querySelector('#resize-modal')

  let settings = {
    isSnapMode: false,
    isUIVisible: true,
    get getSnap() { return this.isSnapMode },
    set setSnap(value) { this.isSnapMode = value },
    get getUI() { return this.isUIVisible },
    set setUI(value) { this.isUIVisible = value }
  }

  let tool = {
    current: 'line-tool',
    get getTool() { return this.current },
    set setTool(name) { this.current = name }
  }

  let layer = {
    current: '',
    get getLayer() { return this.current },
    set setLayer(name) { this.current = name }
  }

  const colors = [
    '#446b99', '#444a99', '#6f4499', '#44998b',
    '#549944', '#919944', '#997744', '#995644',
    '#994444', '#994467', '#994485', '#6f4499'
  ]

  const list = document.querySelector('#layer-list')
  let history = 0
  let layers = []

  const indicator = document.querySelector('#scale-indicator')
  
  const warningMessage = document.querySelector('#constructor-warning-message')
  const notificationMessage = document.querySelector('#constructor-open-message')

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const createLayerHTML = (id, name) => {
    const layerDiv = document.createElement('div')
    layerDiv.className = `item layer layer-${id} active`
    layerDiv.innerHTML = `
      <h3 id="tl-input-${id}" class="title">${name}</h3>
      <input id="el-input-${id}" class="input-layer" type="text" placeholder="Новый слой ${id}" />
        
      <div class="form-group">
        <button id="el-${id}" class="action edit-layer">
          <img src="img/edit.svg" />
        </button>
        <button id="dl-${id}" class="action delete-layer">
          <img src="img/delete.svg" />
        </button>
      </div>
    `
    list.appendChild(layerDiv)

    // Change current layer
    layerDiv.children[0].onclick = () => {
      removeActiveClass()
      layerDiv.classList.add('active')

      const founded = layers.filter(l => l.layer.id() === `layer-${id}`)[0]
      layer.setLayer = founded.layer

      stage.find('.layer').forEach(lr => lr.remove())
      stage.add(founded.layer)

      founded.children.forEach(child => founded.layer.add(child))

      console.log('[LAYER] Change: ' + layer.getLayer.id())
    }
  }

  const createLayerCanvas = (id, childs) => {
    const newLayer = new Konva.Layer({
      id: `layer-${id}`,
      name: `layer`
    })
    childs.forEach(chd => newLayer.add(chd))

    layers.push({ layer: newLayer, children: childs })

    stage.find('.layer').forEach(lr => lr.remove())
    stage.add(newLayer)

    layer.setLayer = newLayer
    console.log('[LAYER] Create: ' + layer.getLayer.id())
  }

  const startEditHandler = () => {
    const current = history
    const edit = document.querySelector(`#el-${current}`)
    edit.onclick = () => {
      console.log('[LAYER] Edit: ' + layer.getLayer.id())
      const title = document.querySelector(`#tl-input-${current}`)
      const input = document.querySelector(`#el-input-${current}`)
      input.classList.toggle('active')

      const clear = () => {
        title.style.display = 'block'
        input.style.display = 'none'
        title.innerText = (input.value !== '') ? input.value : title.innerText
      }

      input.focus()

      title.style.display = 'none'
      input.style.display = 'block'

      input.addEventListener("keyup", function(e) {
        // Enter
        if (e.keyCode === 13) {
          e.preventDefault()
          clear()
        }
      })

      stage.on('click', () => {
        clear()
      })

      if (!input.classList.contains('active')) {
        clear()
      }
    }
  }

  const startDeleteHandler = () => {
    const del = document.querySelector(`#dl-${history}`)
    del.onclick = () => {
      console.log('[LAYER] Delete: ' + layer.getLayer.id())
      drawLayer.clear()

      /* Delete layer from anywhere: */
      // HTML
      const layerDiv = del.parentNode.parentNode
      list.removeChild(layerDiv)
      // Canvas
      layer.getLayer.destroy()
      // Array
      layers = layers.filter(lr =>
        lr.layer.id() !== layer.getLayer.id())

      // Make active another exists layer
      if (layers.length > 0) {
        const stock = layers[layers.length - 1]

        stage.add(stock.layer)
        stock.children.forEach(child => stock.layer.add(child))
        layer.setLayer = stock.layer

        if (layerDiv.classList[2] !== layer.getLayer.id()) {
          const lrDiv = document.querySelector(`.${layer.getLayer.id()}`)
          lrDiv.classList.add('active')
        }
      }

      // Show open message
      if (list.children.length === 1) {
        notificationMessage.classList.remove('hide')

        const tools = document.querySelectorAll('.tool')
        tools.forEach(tool => {
          tool.classList.remove('active')
          tool.classList.add('disable')
        })
      }

      //console.log('COUNT_LAYERS: ' + layers.length)
    }
  }

  const removeActiveClass = () => {
    const layers = document.querySelectorAll('.layer')
    layers.forEach(lr => lr.classList.remove('active'))
  }

  const formationAxis = (limit, axis, ml, multiply=1, alpha=.15) => {
    const side = (axis === "horizontal") ? width : height
    const newLimit = limit * multiply
    for (let i = 0; i < side; i++) {
      const line = new Konva.Line({
        points: (axis === "horizontal") ?
          [0, i * newLimit, width, i * newLimit] :
          [i * newLimit, 0, i * newLimit, height],
        stroke: `rgba(255, 255, 255, ${alpha})`,
        strokeWidth: 2,
        lineCap: 'round',
        lineJoin: 'round'
      });
      ml.add(line)
    }
  }

  const formationPoints = (limit, radius, ml) => {
    for (let i = 0; i < Math.ceil(height / limit + limit); i++) {
      for (let k = 0; k < (width / limit); k++) {
        let circle = new Konva.Circle({
          x: k * limit,
          y: i * limit,
          radius: radius,
          fill: '#446b99',
          stroke: '#446b99',
          strokeWidth: 0,
          name: 'point',
          id: `point t-${i} n=${k}` 
        });

        ml.add(circle);
      }
    }
  }

  const generate = (limit, radius, ml) => {
    formationAxis(limit, "horizontal", ml)
    formationAxis(limit, "vertical", ml)

    formationAxis(limit, "horizontal", ml, 5, .25)
    formationAxis(limit, "vertical", ml, 5, .25)

    formationPoints(limit, radius, ml)
  }

  const pointHandler = () => {
    const points = mainLayer.find('.point')
    points.forEach(point => {
      /*
      point.on('click', () => {
        point.radius(6)
        point.draw()
      })
      */
    })
  }

  const sizeHandler = () => {
    const button = document.querySelector('#size-button')
    const input = document.querySelector('#size-input')

    button.onclick = () => {
      const resize = () => {
        setTimeout(() => warningMessage.classList.add('hide'), 300)
          indicator.innerText = 'Текущий масштаб: ' + input.value
          size = [input.value, POINT_RADIUS]
          localStorage.setItem('matrix_size', JSON.stringify(size))
          
          stage.destroyChildren()

          let itera = list.childNodes
          while (list.childElementCount > 1) {
            itera.forEach(node => (node.id !== 'empty') ? list.removeChild(node) : '')
          }

          history = 0
          layers = []
          
          const newMainLayer = new Konva.Layer()
          const newDrawLayer = new Konva.Layer()

          generate(...size, newMainLayer)

          stage.add(newMainLayer)
          stage.add(newDrawLayer)
      }
      const disableWrappers = () => {
        modal.classList.toggle('active')
        saveWrapper.style.display = 'none'
        loadWrapper.style.display = 'none'
        infoWrapper.style.display = 'none'
        optionsWrapper.style.display = 'none'
      }
      const closeModal = () => {
        setTimeout(() => {
          disableWrappers()
          resizeWrapper.style.display = 'none'
        }, 200)
        modal.classList.remove('fadeIn')
        modal.classList.add('fadeOut')
      }

      const applyBtn = document.querySelector('#apply-resize')
      const declineBtn = document.querySelector('#decline-resize')

      applyBtn.onclick = () => {
        resize()
        closeModal()
      }
      declineBtn.onclick = () => {
        closeModal()
      }

      if (input.value) {
        if (input.value >= 25 && input.value <= 200) {
          if (list.childElementCount == 1) {
            resize()
          } else {
            setTimeout(() => {
              disableWrappers()
              resizeWrapper.style.display = 'block'
            }, 200)
            modal.classList.add('fadeIn')
            modal.classList.remove('fadeOut')
          }
        } else {
          setTimeout(() => warningMessage.classList.remove('hide'), 300)
        }
      }
    }
  }

  const saveHandler = () => {
    const downloadURI = (uri, name) => {
      const link = document.createElement('a')
      link.download = name
      link.href = uri
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      delete link
    }
    
    const button = document.querySelector('#save-button')
    const save = document.querySelector('#save-blueprint')

    button.onclick = () => {
      const json = document.querySelector('#json')
      const png = document.querySelector('#png')
      const fileName = document.querySelector('#file-name')

      if (json.checked) {
        const titles = list
        let lrs = layers.map((layer, i) => {
          return {
            ...layer.layer.attrs,
            title: list.children[i + 1].children[0].innerText,
            childs: layer.children.map(child => {
              return {
                ...child.attrs
              }
            })
          }
        })
        const data = {
          size: size,
          layers: lrs
        }
        const dataURL = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
        downloadURI(dataURL, fileName.value ? `${fileName.value}.json` : 'blueprint.json')
      }

      if (png.checked) {
        const dataURL = stage.toDataURL({ pixelRatio: 3 })
        downloadURI(dataURL, fileName.value ? `${fileName.value}.png` : 'blueprint.png')
      }
    }

    save.onclick = () => {
      infoWrapper.style.display = 'none'
      optionsWrapper.style.display = 'none'
      loadWrapper.style.display = 'none'
      saveWrapper.style.display = 'block'

      modal.classList.toggle('active')
      modal.classList.remove('fadeOut')
      modal.classList.add('fadeIn')
    }
  }

  const loadHandler = () => {
    const button = document.querySelector('#load-button')
    const input = document.querySelector('#load-input')
    const load = document.querySelector('#load-blueprint')
    const inputSize = document.querySelector('#size-input')

    const dropZone = document.querySelector('#drop_zone')
    let result = ''

    function handleFileSelect(evt) {
      evt.stopPropagation()
      evt.preventDefault()
      const file = evt.dataTransfer.files[0]
      const fileName = file.name
      dropZone.innerHTML = `<span>${fileName}</span>`
      dropZone.classList.add('dropped')

      const reader = new FileReader();
      reader.onload = (function(theFile) {
        return function(e) {
          result = e.target.result
        };
      })(file);
      reader.readAsDataURL(file);
    }

    function handleDragOver(evt) {
      evt.stopPropagation()
      evt.preventDefault()
      evt.dataTransfer.dropEffect = 'copy'
    }

    dropZone.addEventListener('dragover', handleDragOver, false)
    dropZone.addEventListener('drop', handleFileSelect, false)

    button.onclick = () => {
      const decode = (str) => {
        if (typeof str === 'string') {
          let res = str.replace('data:application/json;base64,', '')
          res = escape(window.atob(res))
          res = JSON.parse(decodeURIComponent(res))
          return res
        } else return []
      }
      result = decode(result)

      size = result.size
      indicator.innerText = 'Текущий масштаб: ' + size[0]
      localStorage.setItem('matrix_size', JSON.stringify(size))

      stage.destroyChildren()

      let itera = list.childNodes
      while (list.childElementCount > 1) {
        itera.forEach(node => (node.id !== 'empty') ? list.removeChild(node) : '')
      }

      inputSize.value= ''
      history = 0
      layers = []
      
      const newMainLayer = new Konva.Layer()
      const newDrawLayer = new Konva.Layer()

      generate(...size, newMainLayer)

      stage.add(newMainLayer);
      stage.add(newDrawLayer);

      result.layers.forEach(lr => {
        history++

        removeActiveClass()

        let childs = []
        lr.childs.forEach(chd => {
          return childs.push(new Konva.Rect({
            name: chd.name,
            x: chd.x,
            y: chd.y,
            width: chd.width,
            height: chd.height,
            fill: chd.fill,
            stroke: chd.stroke,
            strokeWidth: chd.strokeWidth
          }))
        })
        createLayerCanvas(history, childs)
        createLayerHTML(history, lr.title)

        startDeleteHandler()
        startEditHandler()

        const tools = document.querySelectorAll('.tool')
        tools.forEach(tl => tl.classList.remove('disable'))

        // Hide message
        if (list.children.length > 1) notificationMessage.classList.add('hide')
      })

      stage.add(layer.getLayer)
      layer.getLayer.children.forEach(child => layer.getLayer.add(child))

      setTimeout(() => {
        modal.classList.toggle('active')
        saveWrapper.style.display = 'none'
        loadWrapper.style.display = 'none'
        infoWrapper.style.display = 'none'
        optionsWrapper.style.display = 'none'
        resizeWrapper.style.display = 'none'
      }, 200)
      modal.classList.remove('fadeIn')
      modal.classList.add('fadeOut')
    }

    load.onclick = () => {
      infoWrapper.style.display = 'none'
      optionsWrapper.style.display = 'none'
      saveWrapper.style.display = 'none'
      loadWrapper.style.display = 'block'

      modal.classList.toggle('active')
      modal.classList.remove('fadeOut')
      modal.classList.add('fadeIn')
    }
  }

  const toolHandler = () => {
    const tools = document.querySelectorAll('.tool')
    tools.forEach(tl => {
      tl.onclick = () => {
        if (list.children.length > 1) {
          tools.forEach(_tl => _tl.classList.remove('active'))
          tl.classList.add('active')
          tool.setTool = tl.id

          switch (tool.getTool) {
            case 'move-tool':
              return moveToolHandler()
            case 'line-tool':
              return lineToolHandler()
            case 'rect-tool':
              return rectToolHandler()
            default:
              tool.setTool = 'line-tool'
          }
        }
      }
    })
  }

  const layerHandler = () => {
    // Get layer list
    const add = document.querySelector('#add-layer')
    add.onclick = () => {
      history++

      removeActiveClass()
      createLayerCanvas(history, [])
      createLayerHTML(history, `Новый слой ${history}`)
      startDeleteHandler()
      startEditHandler()
      
      const tools = document.querySelectorAll('.tool')
      tools.forEach(tl => tl.classList.remove('disable'))

      // Hide message
      if (list.children.length > 1) notificationMessage.classList.add('hide')
    }
  }

  const hotkeyHandler = () => {
    console.log('[HOTKEYS IS LISTENING]')
    const toolsAny = document.querySelectorAll('.tool')
    const notify = document.querySelector('#notify-snap')
    const logo = document.querySelector('.constructor-logo')
    const tools = document.querySelector('.constructor-tools')
    const funcs = document.querySelector('.constructor-funcs')
    const layers = document.querySelector('.constructor-layers')
    const informations = document.querySelector('.constructor-informations')
    const container = stage.container()

    container.tabIndex = 1
    container.focus()

    container.addEventListener('keydown', function(e) {
      if (e.keyCode === 49) {
        if (list.children.length > 1) {
          const tl = document.querySelector('#move-tool')
          toolsAny.forEach(_tl => _tl.classList.remove('active'))
          tl.classList.add('active')
          tool.setTool = tl.id
          
          moveToolHandler()
        }
      }

       // Snap mode [2] - key
      if (e.keyCode === 50) {
        if (list.children.length > 1) {
          const tl = document.querySelector('#line-tool')
          toolsAny.forEach(_tl => _tl.classList.remove('active'))
          tl.classList.add('active')
          tool.setTool = tl.id
          
          lineToolHandler()
        }
      }

       // Snap mode [3] - key
      if (e.keyCode === 51) {
        if (list.children.length > 1) {
          const tl = document.querySelector('#rect-tool')
          toolsAny.forEach(_tl => _tl.classList.remove('active'))
          tl.classList.add('active')
          tool.setTool = tl.id
          
          rectToolHandler()
        }
      }

      // Snap mode [S] - key
      if (e.keyCode === 83) {
        if (settings.getSnap) {
          console.log('[SETTINGS] Change: Snap mode on')
          notify.classList.add('hide')
          settings.setSnap = false
        }
        else {
          console.log('[SETTINGS] Change: Snap mode off')
          notify.classList.remove('hide')
          settings.setSnap = true
        }
      }
      
      //UI toggle [X] - key
      if (e.keyCode === 88) {
        if (settings.getUI) {
          console.log('[SETTINGS] Change: UI off')

          logo.classList.add('hide')
          tools.classList.add('hide')
          funcs.classList.add('hide')
          layers.classList.add('hide')
          informations.classList.add('hide')

          settings.setUI = false
        }
        else {
          console.log('[SETTINGS] Change: Snap mode on')

          logo.classList.remove('hide')
          tools.classList.remove('hide')
          funcs.classList.remove('hide')
          layers.classList.remove('hide')
          informations.classList.remove('hide')

          settings.setUI = true
        }
      }

      e.preventDefault()
    })
  }

  const moveToolHandler = () => {
    console.log('[TOOL] Change: ' + tool.getTool)
    stage.off('mousemove mouseup mousedown')
  }

  const lineToolHandler = () => {
    console.log('[TOOL] Change: ' + tool.getTool)
    stage.off('mousemove mouseup mousedown')
  }

  const rectToolHandler = () => {
    console.log('[TOOL] Change: ' + tool.getTool)
    let lastX, lastY
    let mousedown = false
    let rect

    stage.on('mousemove', (e) => {
      if (e.evt.button === 0) {
        if (mousedown) {
          drawLayer.clear()
          const currentX = stage.getPointerPosition().x
          const currentY = stage.getPointerPosition().y
          rect.x(lastX)
          rect.y(lastY)

          if (settings.isSnapMode) {
            rect.width(Math.round((currentX - lastX) / size[0]) * size[0])
            rect.height(Math.round((currentY - lastY) / size[0]) * size[0])
          } else {
            rect.width(currentX - lastX)
            rect.height(currentY - lastY)
          }

          rect.draw()
        }
      }
    });

    stage.on('mouseup', (e) => {
      if (e.evt.button === 0) {
        drawLayer.clear()
        mousedown = false

        if (settings.isSnapMode) {
          rect.position({
            x: Math.round(rect.x() / size[0]) * size[0],
            y: Math.round(rect.y() / size[0]) * size[0]
          })
        }

        if ((rect.x() !== 0) && (rect.y() !== 0)) {
          layers.forEach(lr => {
            if (lr.layer === layer.getLayer) {
              lr.children.push(rect)
            }
          })
          layer.getLayer.add(rect)

          stage.find('.layer').forEach(lr => lr.remove())
          stage.add(layer.getLayer)
          layer.getLayer.children.forEach(child => layer.getLayer.add(child))
        }
      }
    })

    stage.on('mousedown', (e) => {
      if (e.evt.button === 0) {
        const count = layer.getLayer.children.length ? layer.getLayer.children.length : 0
        mousedown = true
        lastX = stage.getPointerPosition().x
        lastY = stage.getPointerPosition().y
        rect = new Konva.Rect({
          name: 'Rect ' + (count + 1),
          fill: colors[getRandomInt(colors.length)],
          stroke: 'white',
          strokeWidth: 3
        })
        drawLayer.add(rect)
      }
    })

    let currentShape
    const context = document.querySelector('#shape-context')
    const moveButton = document.querySelector('#move-button')
    const changeButton = document.querySelector('#change-button')
    const deleteButton = document.querySelector('#delete-button')
    const optionsButton = document.querySelector('#options-button')

    moveButton.onclick = () => {
      //currentShape.draggable(true)
    }

    changeButton.onclick = () => {
      console.log('[EVENT] Change color shape')

      currentShape.fill(colors[getRandomInt(colors.length)])
      currentShape.draw()

      context.style.display = 'none'
    }

    deleteButton.onclick = () => {
      console.log('[EVENT] Destroy shape')

      drawLayer.clear()

      layers.forEach(lr => {
        if (lr.layer === layer.getLayer) {
          lr.children = lr.children.filter(chd => chd !== currentShape)
        }
      })

      currentShape.destroy()

      stage.find('.layer').forEach(lr => lr.remove())
      stage.add(layer.getLayer)
      layer.getLayer.children.forEach(child => layer.getLayer.add(child))

      context.style.display = 'none'
    }

    optionsButton.onclick = () => {
      console.log('[EVENT] Open shape options')

      const nameShape = document.querySelector('#name-shape') 
      const widthShape = document.querySelector('#width-shape') 
      const heightShape = document.querySelector('#height-shape') 
      const coordsShape = document.querySelector('#coords-shape') 
      const colorShape = document.querySelector('#color-shape') 
      const borderShape = document.querySelector('#border-shape') 
      const widthBorder = document.querySelector('#width-border') 
      const colorBorder = document.querySelector('#color-border')

      nameShape.innerText = currentShape.name()
      widthShape.innerText = currentShape.width().toString().replace('-', '')
      heightShape.innerText = currentShape.height().toString().replace('-', '')
      coordsShape.innerText = currentShape.x() + ', ' + currentShape.y()
      colorShape.innerText = currentShape.fill()
      borderShape.innerText = currentShape.stroke() ? true : false
      widthBorder.innerText = currentShape.strokeWidth()
      colorBorder.innerText = currentShape.stroke()

      saveWrapper.style.display = 'none'
      optionsWrapper.style.display = 'block'
      infoWrapper.style.display = 'none'
      resizeWrapper.style.display = 'none'

      modal.classList.toggle('active')
      modal.classList.remove('fadeOut')
      modal.classList.add('fadeIn')

      context.style.display = 'none'
    }

    stage.on('click', () => {
      context.style.display = 'none'
      console.log(layer)
    })

    stage.on('contextmenu', (e) => {
      e.evt.preventDefault()
      if (e.target === stage) {
        return
      }

      currentShape = e.target

      context.style.display = 'initial'

      const containerRect = stage.container().getBoundingClientRect()
      context.style.top = containerRect.top + stage.getPointerPosition().y + 4 +'px'
      context.style.left = containerRect.left + stage.getPointerPosition().x + 4 + 'px'
    })
  }

  const infoButtonHandler = () => {
    const button = document.querySelector('#info-button')

    button.onclick = () => {
      saveWrapper.style.display = 'none'
      optionsWrapper.style.display = 'none'
      loadWrapper.style.display = 'none'
      infoWrapper.style.display = 'block'

      modal.classList.toggle('active')
      modal.classList.remove('fadeOut')
      modal.classList.add('fadeIn')
    }
  }

  const init = () => {
    const indicator = document.querySelector('#scale-indicator')
    indicator.innerText = 'Текущий масштаб: ' + size[0]

    modal.children[0].onclick = () => {
      setTimeout(() => {
        modal.classList.toggle('active')
        saveWrapper.style.display = 'none'
        loadWrapper.style.display = 'none'
        infoWrapper.style.display = 'none'
        optionsWrapper.style.display = 'none'
        resizeWrapper.style.display = 'none'
      }, 200)
      modal.classList.remove('fadeIn')
      modal.classList.add('fadeOut')
    }
    
    infoButtonHandler()
    sizeHandler()
    toolHandler()
    layerHandler()
    hotkeyHandler()

    saveHandler()
    loadHandler()

    generate(...size, mainLayer)
    pointHandler()

    mainLayer.draw()
  }

  init()
}