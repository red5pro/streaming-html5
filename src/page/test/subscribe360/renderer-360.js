// gratiously adopted from https://github.com/gbentaieb/simple360Player/blob/master/360-player.js
(function (window, THREE) {
  'use strict';

  var mouseIsDown = false;
  var mouseX = 0;
  var mouseY = 0;
  var lastGamma = 0;
  var lastBeta = 0;

  var average = 0;
  var smooth = 0.2;
  var fov = window.query('fov') ? Number(window.query('fov')) : 60;
  var near = window.query('near') ? Number(window.query('near')) : 1;
  var far = window.query('far') ? Number(window.query('far')) : 100;
  var autopan = window.query('autopan') ? Number(window.query('autopan')) : NaN;
  function clampOrientation (value) {
    if (value > 90) {
      value = 90;
    } else if (value < -90) {
      value = -90;
    }
    return value;
  }
  function generateGyroscopeHandler (renderer) {
    return function (event) {
      var currentGamma = clampOrientation(event.gamma);
      var currentBeta = clampOrientation(event.beta);
      var deltaX = currentGamma - lastGamma;
      var deltaY = currentBeta - lastBeta;
      var w = window.innerWidth;
      var h = window.innerHeight;
      var isRotated = h < w;
      var vDims = renderer.getVideoDimensions();
      var cDims = renderer.getCanvasDimensions();
      var wPerc = (vDims.width - cDims.width) / 180;
      var hPerc = (vDims.height - cDims.height) / 180;
      average = (currentGamma * smooth) + (average * (1.0 - smooth))
      var dx = isRotated ? (-deltaY * wPerc) : (-deltaX * wPerc);
      var dy = isRotated ? (-deltaX * hPerc) : (-deltaY * hPerc)
      renderer.rotateScene.call(renderer, dx, dy);
      lastGamma = currentGamma;
      lastBeta = currentBeta;
    }
  }

  var Renderer360 = function (canvas, video) {
    this.canvas = canvas;
    this.video = video;
    this.active = false;
    this.scene = undefined;
    this.camera = undefined;
    this.sphere = undefined;
    this.renderer = undefined;
    this.autopanInterval = 0;
    this.render = this.render.bind(this);
    this.touchDownHandler = this.touchDownHandler.bind(this);
    this.touchMoveHandler = this.touchMoveHandler.bind(this);
    this.touchUpHandler = this.touchUpHandler.bind(this);
  };

  Renderer360.prototype.getCanvasDimensions = function () {
    return {
      width: this.canvas.clientWidth,
      height: this.canvas.clientHeight
    };
  }

  Renderer360.prototype.getVideoDimensions = function () {
    return {
      width: this.video.videoWidth,
      height: this.video.videoHeight
    };
  }

  Renderer360.prototype.setUp = function () {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(fov, this.video.videoWidth / this.video.videoHeight, near, far);
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight, false);

    var texture = new THREE.VideoTexture(this.video);
    texture.minFilter = THREE.LinearFilter;

    var material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    });

    var geometry = new THREE.SphereGeometry(5, 32, 32);
    this.sphere = new THREE.Mesh(geometry, material);
    this.sphere.scale.x = -1;

    this.scene.add(this.sphere);
    this.renderer.render(this.scene, this.camera);
    return this;
  };

  Renderer360.prototype.start = function () {
    this.active = true;
    this.render();
    return this;
  }

  Renderer360.prototype.stop = function () {
    this.active = false;
    return this;
  }

  Renderer360.prototype.startAutopan = function (value) {
    var self = this;
    this.autopanInterval = setInterval(function () {
      self.rotateScene.call(self, -(value), 0);
    }, 50);
  }

  Renderer360.prototype.stopAutopan = function () {
    clearInterval(this.autopanInterval);
  }

  Renderer360.prototype.rotateScene = function (deltaX, deltaY) {
    this.sphere.rotation.y += deltaX / 300;
    this.sphere.rotation.x += deltaY / 300;
  }

  Renderer360.prototype.render = function () {
    if (this.active) {
      requestAnimationFrame(this.render);
      this.renderer.render(this.scene, this.camera);
    }
  }

  Renderer360.prototype.touchDownHandler = function (event) {
    event.preventDefault();
    mouseIsDown = true;
    mouseX = event.targetTouches ? event.targetTouches[0].clientX : event.clientX;
    mouseY = event.targetTouches ? event.targetTouches[0].clientY : event.clientY;

    if (!isNaN(autopan)) {
      this.stopAutopan(autopan);
    }

    if (!window.PointerEvent) {
      // Add Mouse Listeners
      document.addEventListener('mousemove', this.touchMoveHandler, true);
      document.addEventListener('mouseup', this.touchUpHandler, true);
    } else {
      event.target.setPointerCapture(event.pointerId);
    }
  }

  Renderer360.prototype.touchMoveHandler = function () {
    event.preventDefault();
    if (!mouseIsDown) return;

    var x = event.clientX;
    var y = event.clientY;
    if (event.targetTouches) {
      x = event.targetTouches[0].clientX;
      y = event.targetTouches[0].clientY;
    }

    var deltaX = x - mouseX;
    var deltaY = y - mouseY;
    mouseX = x;
    mouseY = y;
    this.rotateScene.call(this, -deltaX, -deltaY);
  }

  Renderer360.prototype.touchUpHandler =  function () {
    event.preventDefault();
    mouseIsDown = false;
    if (!isNaN(autopan)) {
      this.startAutopan(autopan);
    }

    if (!window.PointerEvent) {
      document.removeEventListener('mousemove', this.touchMoveHandler);
      document.removeEventListener('mouseup', this.touchUpHandler);
    } else {
      event.target.releasePointerCapture(event.pointerId);
    }
  }

  Renderer360.prototype.addPanGesture = function () {
    if (window.PointerEvent) {
      this.canvas.addEventListener('pointerdown', this.touchDownHandler, true);
      this.canvas.addEventListener('pointermove', this.touchMoveHandler, true);
      this.canvas.addEventListener('pointerup', this.touchUpHandler, true);
    } else {
      this.canvas.addEventListener('touchstart', this.touchDownHandler, true);
      this.canvas.addEventListener('touchmove', this.touchMoveHandler, true);
      this.canvas.addEventListener('touchend', this.touchUpHandler, true);

      this.canvas.addEventListener('mousedown', this.touchDownHandler, true);
    }
    if (!isNaN(autopan)) {
      this.startAutopan(autopan)
    }
    return this;
  }

  Renderer360.prototype.addGyroGesture = function () {
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', generateGyroscopeHandler(this), true);
    }
    return this;
  }

  window.Renderer360 = Renderer360;

})(window, window.THREE);
