# ThreeSOSM

--

## Важно!

Для работы библиотеки необходина библиотека Three.js

Скачать ее можно с сайта разработчика https://threejs.org

--

## Подключение

```
<body>

	.
	.
	.

	<script type="text/javascript" src="ThreeSOSM.min.js"></script>

</body>
```

--

## Работа с библиотекой

### Html

Фигуры отрисовываются на canvas с классом threeSOSM.

В data атрибутах нужно указать название поверхности и ее параметры.


#### Доступные фигуры:

<br>

Название | Параметры 
--- | ---
**rectangle** |  data-width <br> data-height <br> data-depth
**cone** |  data-radius <br> data-height <br> data-radial
**cylinder** |  data-radius <br> data-height <br> data-radial
**sphere** |  data-width <br> data-height <br> data-radius 
**elips** |  data-a <br> data-b <br> data-c

#### Пример создания 

```
 <canvas class="threeSOSM" data-surface="rectangle" data-width="500" data-height="500" data-depth="500" ></canvas>
```


### Js

Для отрисовки всех фигур нужно создать экземпля ThreeSOSM и вызвать у него метод Start

```
let threeSOSM = new ThreeSOSM();

threeSOSM.Start();
```

Для отрисовки в конкретном canvas нужно создать экземпля ThreeSOSM, вызвать метод Create и передат ьв него canvas


```
let canvas = document.querySelector('#threeId');

let threeSOSM = new ThreeSOSM();

threeSOSM.Create(canvas);

```
