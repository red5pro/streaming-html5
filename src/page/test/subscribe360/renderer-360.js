// gratiously adopted from https://github.com/gbentaieb/simple360Player/blob/master/360-player.js
(function (window, THREE) {
  'use strict';

  var mouseIsDown = false;
  var mouseX = 0;
  var mouseY = 0;

  function generatePanDownHandler (renderer) { // eslint-disable-line no-unused-vars
    return function (event) {
      event.preventDefault();
      mouseIsDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;

      if (!window.PointerEvent) {
        // Add Mouse Listeners
        document.addEventListener('mousemove', generatePanMoveHandler(renderer), true);
        document.addEventListener('mouseup', generatePanUpHandler(renderer), true);
      }
    }
  }
  function generatePanMoveHandler (renderer) {
    return function (event) {
      event.preventDefault();
      if (!mouseIsDown) return;
      
      var deltaX = event.clientX - mouseX,
          deltaY = event.clientY - mouseY;
      mouseX = event.clientX;
      mouseY = event.clientY;
      renderer.rotateScene.call(renderer, -deltaX, -deltaY);
    }
  }
  function generatePanUpHandler (renderer) { // eslint-disable-line no-unused-vars
    return function (event) {
      event.preventDefault();
      mouseIsDown = false;
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
    this.render = this.render.bind(this);
  };

  Renderer360.prototype.setUp = function () {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.canvas.clientWidth / this.canvas.clientHeight, 1, 1000);
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

  Renderer360.prototype.addPanGesture = function () {
    if (window.PointerEvent) {
      this.canvas.addEventListener('pointerdown', generatePanDownHandler(this), true);
      this.canvas.addEventListener('pointermove', generatePanMoveHandler(this), true);
      this.canvas.addEventListener('pointerup', generatePanUpHandler(this), true);
    } else {
      this.canvas.addEventListener('touchstart', generatePanDownHandler(this), true);
      this.canvas.addEventListener('touchmove', generatePanMoveHandler(this), true);
      this.canvas.addEventListener('touchend', generatePanUpHandler(this), true);

      this.canvas.addEventListener('mousedown', generatePanDownHandler(this), true);

    }
    return this;
  }

  window.Renderer360 = Renderer360;

})(window, window.THREE);
