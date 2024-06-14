import express from 'express';
// import os from 'os'
import cors from 'cors';
import router from './routes.js';
import sequelize from './connectDB.js';

const app = express();
let PORT = 4004;
// let IP = os.networkInterfaces().wlp4s0[0].address;
// let IP = os.networkInterfaces().lo0[0].address;
// let IP = os.networkInterfaces().en1[1].address;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded( {  extended: false} ));

sequelize.sync().then(() => {
    console.log('Database synchronized');
  });

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Drag and Drop</title>
    <style>
        #draggable {
            width: 100px;
            height: 100px;
            background-color: #f00;
            cursor: pointer;
            position: absolute;
        }
    </style>
    </head>
    <body>

    <div id="draggable" draggable="true">Drag me!</div>

    <script>
        const draggable = document.getElementById('draggable');
        console.log(draggable)

        // Event listeners para dispositivos de escritorio
        draggable.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', ''); // necesario para Firefox
        });

        // Event listeners para dispositivos móviles
        draggable.addEventListener('touchstart', (event) => {
            console.log(event.target)
            const touch = event.targetTouches[0];

            const offsetX = touch.clientX - parseInt(draggable.style.left || 0);
            const offsetY = touch.clientY - parseInt(draggable.style.top || 0);

            function handleMove(e) {
                e.preventDefault();
                const touch = e.targetTouches[0];
                draggable.style.left = touch.clientX - offsetX + 'px';
                draggable.style.top = touch.clientY - offsetY + 'px';
            }

            function handleEnd(e) {
                e.preventDefault();
                document.removeEventListener('touchmove', handleMove);
                document.removeEventListener('touchend', handleEnd);
            }

            document.addEventListener('touchmove', handleMove);
            document.addEventListener('touchend', handleEnd);
        });
    </script>

    </body>
    </html>

    `)
});

app.get('/sortable', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sortable Drag and Drop</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.14.0/Sortable.min.css">
      <style>
        #sortable-list {
          list-style-type: none;
          padding: 0;
          margin: 20px;
        }
    
        #sortable-list li {
          background-color: #f4f4f4;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 10px;
          margin-bottom: 5px;
          cursor: grab; /* Cambia el cursor al icono de mano al arrastrar */
        }
    
        #sortable-list li.drag-handle {
          cursor: pointer; /* Cambia el cursor al icono de flecha al pasar por el asa de arrastre */
        }
      </style>
    </head>
    <body>
      <ul id="sortable-list">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
        <li>Item 5</li>
      </ul>
    
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.14.0/Sortable.min.js"></script>
      <script>
      document.addEventListener('DOMContentLoaded', function () {
        new Sortable(document.getElementById('sortable-list'), {
          animation: 150,
          handle: '.drag-handle', // Selector del elemento que actuará como asa para arrastrar
          draggable: 'li', // Selector de los elementos que se pueden arrastrar
          onEnd: function (evt) {
            console.log('Elemento arrastrado:', evt.item);
          }
        });
      });
      
      </script>
    </body>
    </html>
    
    
    `)
});

app.use(router);

app.listen(PORT, () => {
    console.log(`Server in runing on port ${PORT}`);
    console.log(`http://localhost:${PORT}`)
    // console.log(`http://${IP}:${PORT}`)
});