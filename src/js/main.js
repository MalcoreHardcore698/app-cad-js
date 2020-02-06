window.onload = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
  });

  const mainLayer = new Konva.Layer();
  const drawLayer = new Konva.Layer();
  stage.add(mainLayer);
  stage.add(drawLayer);

  const MATRIX_SIZE = 32
  const POINT_RADIUS = 3

  let size = [MATRIX_SIZE, POINT_RADIUS]

  const sizeLocal = localStorage.getItem('matrix_size')
  if (!!sizeLocal)
    size = JSON.parse(sizeLocal)

  let start = {}
  let end = {}

  let figures = []
  let drawing = []
  let points = []
  let isRepeat = false;
  let isClosed = false;

  let refresh = false
  let tool = {
    current: 'line-tool',
    get getTool() { return this.current },
    set setTool(name) { this.current = name }
  }

  const layersDiv = document.querySelector('#layer-list')
  let layer = {
    current: '',
    get getLayer() { return this.current },
    set setLayer(name) { this.current = name }
  }

  const generate = (limit, radius) => {
    const formationAxis = (axis) => {
      const side = (axis === "horizontal") ? width : height
      for (let i = 0; i < side; i++) {
        const line = new Konva.Line({
          points: (axis === "horizontal") ?
            [0, i * limit, width, i * limit] :
            [i * limit, 0, i * limit, height],
          stroke: 'rgba(255, 255, 255, .15)',
          strokeWidth: 2,
          lineCap: 'round',
          lineJoin: 'round'
        });
        mainLayer.add(line)
      }
    }

    const formationPoints = () => {
      for (let i = 0; i < Math.ceil(height / limit + limit); i++) {
        for (let k = 0; k < (width / limit); k++) {
          let circle = new Konva.Circle({
            x: k * limit,
            y: i * limit,
            radius: radius,
            fill: '#446b99',
            stroke: '#446b99',
            strokeWidth: 0,
            name: `point t-${i} n=${k}` 
          });

          mainLayer.add(circle);
        }
      }
    }

    formationAxis("horizontal")
    formationAxis("vertical")
    formationPoints()
  }

  const sizeHandler = () => {
    const button = document.querySelector('#size-button')
    const input = document.querySelector('#size-input')
    const indicator = document.querySelector('#scale-indicator')

    button.onclick = () => {
      if (input.value) {
        indicator.innerText = 'Текущий масштаб: ' + input.value
        size = [input.value, POINT_RADIUS]
        localStorage.setItem('matrix_size', JSON.stringify(size))
        location.reload()
      }
    }
  }

  const toolHandler = () => {
    const tools = document.querySelectorAll('.tool')
    console.log('OK, choose tool')
    tools.forEach(tl => {
      tl.onclick = () => {
        tools.forEach(_tl => _tl.classList.remove('active'))
        tl.classList.add('active')
        tool.setTool = tl.id

        switch (tool.getTool) {
          case 'line-tool':
            return lineToolHandler()
          case 'rect-tool':
            return rectToolHandler()
          default:
            tool.setTool = 'line-tool'
        }
      }
    })
  }

  const layerHandler = () => {
    // Get layer list
    const list = document.querySelector('#layer-list')
    const add = document.querySelector('#add-layer')
    add.onclick = () => {
      const createLayerHTML = () => {
        const layerDiv = document.createElement('div')
        layerDiv.className = `item layer layer-${list.children.length} active`
        layerDiv.innerHTML = `
          <h3 class="title">Новый слой</h3>
            
          <div class="form-group">
            <button id="el-${list.children.length}" class="action edit-layer">
              <img src="img/edit.svg" />
            </button>
            <button id="dl-${list.children.length}" class="action delete-layer">
              <img src="img/delete.svg" />
            </button>
          </div>
        `
        list.appendChild(layerDiv)

        layerDiv.children[0].onclick = () => {
          removeActiveClass()
          layerDiv.classList.add('active')
        }
        
        const del = document.querySelector(`#dl-${list.children.length - 1}`)
        del.onclick = () => {
          list.removeChild(layerDiv)

          /*
          let group = mainLayer.find(`#dl-${list.children.length - 1}`)[0]
          mainLayer.destroy(group)
          */

          if (list.children.length === 1) {
            message.classList.remove('hide')
          }
        }
        
        /*
        // Testing groups
        let arr = []
        let groups = mainLayer.find('Group')
        groups.each(shape => arr.push(shape))
        console.log(arr)
        */
      }

      const createLayerCanvas = () => {
        const group = new Konva.Group({
          id: `layer-${list.children.length}`
        })
        mainLayer.add(group)
      }

      const removeActiveClass = () => {
        const layers = document.querySelectorAll('.layer')
        layers.forEach(lr => lr.classList.remove('active'))
      }
      
      removeActiveClass()
      
      createLayerHTML()
      createLayerCanvas()
      layer.setLayer = `layer-${list.children.length}`
      
      const tools = document.querySelectorAll('.tool')
      tools.forEach(tl => tl.classList.remove('disable'))

      // Hide message
      if (list.children.length > 1) message.classList.add('hide')
    }
  }

  const lineToolHandler = () => {
    console.log('TOOL: ' + tool.getTool)
    stage.off('mousemove mouseup mousedown')
  }

  const rectToolHandler = () => {
    console.log('TOOL: ' + tool.getTool)
    let lastX, lastY
    let mousedown = false
    let rect

    stage.on('mousemove', (e) => {
      if (mousedown) {
        drawLayer.clear()
        const currentX = stage.getPointerPosition().x
        const currentY = stage.getPointerPosition().y
        rect.x(lastX)
        rect.y(lastY)
        rect.width(currentX - lastX)
        rect.height(currentY - lastY)
        rect.draw()
      }
    });

    stage.on('mouseup', () => {
      mousedown = false
      figures.push(rect)
      figures.forEach(figure => {
        stage.find('#layer-2').add(figure)
        figure.draw()
      })
      //console.log(figures)
    })

    stage.on('mousedown', () => {
      mousedown = true
      lastX = stage.getPointerPosition().x
      lastY = stage.getPointerPosition().y
      rect = new Konva.Rect({
        fill: '#446b99',
        stroke: 'white',
        strokeWidth: 2
      })
      drawLayer.add(rect)
    })
  }

  const init = () => {
    const indicator = document.querySelector('#scale-indicator')
    const size = JSON.parse(localStorage.getItem('matrix_size'))
    indicator.innerText = 'Текущий масштаб: ' + size[0]

    sizeHandler()
    toolHandler()
    layerHandler()

    generate(...size)
    mainLayer.draw()
  }

  init()
}