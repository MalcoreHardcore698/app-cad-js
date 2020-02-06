const formationPoints = () => {
      return new Konva.Line({
        points: points,
        stroke: 'white',
        strokeWidth: 2,
        closed: false
      });
    }

    const pointsHandler = () => {
      if (isClosed) {
        if (tool.getTool === 'line-tool') {
          figures.push({ id: figure.length, tool: tool.getTool, figure: drawing })
          
          drawing = []
          points = []
          start = {}
          end = {}

          isClosed = false
          isRepeat = false
          return pointsHandler()
        }
      }
      
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

          circle.on('mouseover', function() {
            circle.fill('#b8c5d5');
            circle.draw();
          });

          circle.on('mouseout', function() {
            circle.fill('#446b99');
            circle.draw();
          });

          circle.on('click', function() {
            circle.fill('#446b99');
            circle.draw();

            if (drawing.length === 1) {
              start = {
                x: circle.position().x,
                y: circle.position().y
              }
            }

            drawing.forEach(item => {
              if (item.x === circle.position().x && item.y === circle.position().y)
                isRepeat = true;
            })

            if (!isRepeat)
              drawing.push(circle.position())

            if ((drawing.length > 1) && (start.x === circle.position().x) && (start.y === circle.position().y))
              isClosed = true;

            if (drawing.length > 1) {
              drawing.map(coord => {
                points.push(coord.x)
                points.push(coord.y)
              })

              drawLine.points(points)

              if (isClosed) {
                drawLine.fill('#446b99')
                drawLine.closed(isClosed)
              }

              drawLine.draw();
            }

            if (isClosed) end = {
              x: circle.position().x,
              y: circle.position().y
            }
          });
        }
      }
    }

    formationAxis("horizontal")
    formationAxis("vertical")