// gratiously adopted from https://github.com/gbentaieb/simple360Player/blob/master/360-player.js
(function (window, THREE) {
  'use strict';

  var Renderer360 = function (canvas, video) {
    this.canvas = canvas;
    this.video = video;
    this.active = false;
    this.scene = undefined;
    this.camera = undefined;
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
    var sphere = new THREE.Mesh(geometry, material);
    sphere.scale.x = -1;

    this.scene.add(sphere);
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

  Renderer360.prototype.render = function () {
    if (this.active) {
      requestAnimationFrame(this.render);
      this.renderer.render(this.scene, this.camera);
    }
  }

  window.Renderer360 = Renderer360;

})(window, window.THREE);
