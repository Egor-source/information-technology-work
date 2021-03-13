
//Конструктор библиотеки
function ThreeSOSM() {
    //Объект с названием фигур и функциями для получения их геометрии 
    this.surfaces = {
        'rectangle': this.Rectangle,
        'cone': this.Cone,
        'cylinder': this.Cylinder,
        'sphere': this.Sphere,
        'elips': this.Elips,
    }
}

//Функция для отрисовки все фигур 
ThreeSOSM.prototype.Start = function () {
    //Получает все canvas, на которых будут отрисованы фигуры
    let canvases = document.getElementsByClassName('threeSOSM');

    //Вызывает функцию создания фигуры для всех canvas
    for (let i = 0; i < canvases.length; i++) {
        this.Create(canvases[i]);
    }

}

//Функция для создания фигур
ThreeSOSM.prototype.Create = function (canvas) {
    //Получаем ширину канваса, в который будет отрисована фигура
    let width = canvas.offsetWidth;
    //Получаем высоту канваса, в который будет отрисована фигура
    let height = canvas.offsetHeight;

    //Получаем название фигуры, которая должна быть отрисована
    let surfaceFunc = canvas.dataset.surface;
    //Получаем функцию для создание геометрии
    let geometry = this.surfaces[surfaceFunc](canvas);
    //Создание материала 
    let material = new THREE.MeshNormalMaterial();
    //Создание сетки 
    let mesh = new THREE.Mesh(geometry, material);

    //Создание сцены
    let scene = new THREE.Scene();
    //Добавление сетки на сцену 
    scene.add(mesh);

    //Создание камеры 
    let camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 5000);
    //Выставление позиции камеры
    camera.position.set(0, 0, 1000);

    //Создание рендера
    let rendarer = new THREE.WebGLRenderer({ canvas: canvas });
    //Задание цвета заднего фона
    rendarer.setClearColor(0xffffff);
    //Задание размеров области отрисовки
    rendarer.setSize(width, height)
    //Рендер сцены
    rendarer.render(scene, camera);

    //Анимацтя вращения
    (function animate() {
        rendarer.render(scene, camera);
        //Вращение по оси z
        mesh.rotation.z += 180 / Math.PI * 0.0001;
        requestAnimationFrame(animate)
    }());

    let prevX = 0, prevY = 0

    //Функция вращения фигуры с помощью мыши (не работает на телефонах)
    let moveSurface = function (event) {

        //Сравнивает предыдущую y координату курс с текущей.Если она больше, вращает вверх, если меньше, вниз
        if (event.pageY > prevY) {
            mesh.rotation.x += 180 / Math.PI * 0.001;
        } else if (event.pageY < prevY) {
            mesh.rotation.x -= 180 / Math.PI * 0.001;
        }

        //Аналогично с y координатой
        if (event.pageX > prevX) {
            mesh.rotation.y += 180 / Math.PI * 0.001;
        } else if (event.pageX < prevX) {
            mesh.rotation.y -= 180 / Math.PI * 0.001;
        }

        //Записывает координаты курсора 
        prevY = event.pageY;
        prevX = event.pageX
    };


    //Функция для приближения и отдаления фигуры
    let zoom = function (event) {

        //Новое положение камеры
        let fov = camera.fov + (-1 * event.wheelDelta / 100);

        //Область допустимых значений
        if (fov > 130 || fov < 70) {
            return;
        }

        camera = new THREE.PerspectiveCamera(fov, width / height);
        camera.position.set(0, 0, 1000);
    }

    canvas.addEventListener('mousedown', (event) => {
        event.target.addEventListener('mousemove', moveSurface);
    })

    canvas.addEventListener('mouseup', (event) => {
        event.target.removeEventListener('mousemove', moveSurface);

    });

    canvas.addEventListener('wheel', zoom);

    canvas.addEventListener('mouseover', () => {
        document.body.style.overflow = 'hidden';
        let padding = window.innerWidth - document.body.offsetWidth;
        document.body.style.paddingRight = padding + 'px';
    });

    canvas.addEventListener('mouseout', (event) => {
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = 0;
        event.target.removeEventListener('mousemove', moveSurface);
    });
}

//Создание геометрии квадрата 
ThreeSOSM.prototype.Rectangle = function (canvas) {
    return new THREE.BoxGeometry(canvas.dataset.width, canvas.dataset.height, canvas.dataset.depth);
}

//Создание геометрии конуса
ThreeSOSM.prototype.Cone = function (canvas) {
    return new THREE.ConeGeometry(canvas.dataset.radius, canvas.dataset.height, canvas.dataset.radial);
}

//Создание геометрии цилиндра
ThreeSOSM.prototype.Cylinder = function (canvas) {
    return new THREE.CylinderGeometry(canvas.dataset.radius, canvas.dataset.radius, canvas.dataset.height, canvas.dataset.radial);
}

//Создание геометрии сферы
ThreeSOSM.prototype.Sphere = function (canvas) {
    return new THREE.SphereGeometry(canvas.dataset.radius, canvas.dataset.width, canvas.dataset.height);
}

//Создание геометрии элипса
ThreeSOSM.prototype.Elips = function (canvas) {

    return new THREE.ParametricBufferGeometry(function (u, v, target) {
        u *= Math.PI;
        v *= Math.PI * 2;
        let x = canvas.dataset.a * Math.sin(u) * Math.cos(v)
        let y = canvas.dataset.b * Math.sin(u) * Math.sin(v)
        let z = canvas.dataset.c * Math.cos(u)
        target.set(x, y, z);
    }, canvas.offsetWidth, canvas.offsetHeight);
}
