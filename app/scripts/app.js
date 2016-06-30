var App = function(canvas) {
  var _canvas = (document.getElementById(canvas) || document.createElement("canvas"));
  var _running = false;
  var _renderer;
  var _scene; // TODO: Implement an accessor
  var _camera; // TODO: Implement an accessor
  var _updateInterval; // TODO: Implement an accessor

  Object.defineProperties(this, {
    "clock": {
      value: new THREE.Clock(false),
      enumerable: true
    },
    "started": {
      value: new signals.Signal(),
      enumerable: true
    },
    "updated": {
      value: new signals.Signal(),
      enumerable: true
    },
    "rendered": {
      value: new signals.Signal(),
      enumerable: true
    },
    "running": {
      enumerable: true,
      get: function() {return _running;}
    },
    "renderer": {
      enumerable: true,
      get: function() {return _renderer;}
    },
    "renderCB": {
      enumerable: true,
      value: function() {
        // console.log(_scene);
        _renderer.render(_scene, _camera);
        window.requestAnimationFrame(this.renderCB.bind(this));
        this.rendered.dispatch();
      }
    },
    "updateCB": {
      enumerable: true,
      value: function() {
        var _clock = this.clock;
        _clock.running === false && _clock.start();
        this.updated.dispatch(_clock.getDelta());
      }
    },
    "start": {
      enumerable: true,
      value: function() {

        // TODO:reimplement error check better
        if(_canvas !== undefined) {
          _renderer = new THREE.WebGLRenderer({canvas:_canvas});
          _renderer.setSize(_canvas.offsetWidth, _canvas.offsetHeight);
          _running = true;

          if (_scene === undefined) {_scene = new THREE.Scene();}
          if (_camera === undefined) {_camera = new THREE.PerspectiveCamera(45, _canvas.offsetWidth/_canvas.offsetHeight, 1, 1000);}
        }

        _updateInterval = setInterval(this.updateCB.bind(this), 0);
        window.requestAnimationFrame(this.renderCB.bind(this));
      }
    }
  });
};

App.prototype.constructor = App;
