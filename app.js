try {

  "use strict";

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var endpoint = 'https://crossorigin.me/https://dreamscopeapp.com/api/images?sorting=score&offset=';

  var Image = (function (_React$Component) {
    _inherits(Image, _React$Component);

    function Image() {
      _classCallCheck(this, Image);

      _get(Object.getPrototypeOf(Image.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Image, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps) {
        return nextProps.image !== this.props.image;
      }
    }, {
      key: "render",
      value: function render() {
        var _props$image$toJS = this.props.image.toJS();

        var original_url = _props$image$toJS.original_url;
        var profile = _props$image$toJS.profile;
        var username = profile.username;

        var userProfile = "https://dreamscopeapp.com/u/" + username;
        return React.createElement(
          "li",
          null,
          React.createElement("img", { src: original_url, onClick: function (e) {
            return window.open(original_url);
          }, title: "View image" }),
          React.createElement(
            "a",
            { href: userProfile, title: "View profile", target: "_blank" },
            username
          )
        );
      }
    }]);

    return Image;
  })(React.Component);

  var List = (function (_React$Component2) {
    _inherits(List, _React$Component2);

    function List() {
      _classCallCheck(this, List);

      _get(Object.getPrototypeOf(List.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(List, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps) {
        return nextProps.images !== this.props.images;
      }
    }, {
      key: "generateImages",
      value: function generateImages() {
        return this.props.images.map(function (image, index) {
          return React.createElement(Image, { key: index, image: image });
        });
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement(
          "ul",
          { className: "clearfix" },
          this.generateImages()
        );
      }
    }]);

    return List;
  })(React.Component);

  var App = (function (_React$Component3) {
    _inherits(App, _React$Component3);

    function App(props) {
      _classCallCheck(this, App);

      _get(Object.getPrototypeOf(App.prototype), "constructor", this).call(this, props);
      this.state = {
        offset: 0,
        loading: false,
        finished: false,
        images: Immutable.List()
      };
      this.debounce = _.debounce(this.checkPosition.bind(this), 250);
    }

    _createClass(App, [{
      key: "fetchNextImages",
      value: function fetchNextImages() {
        var _this = this;

        if (!this.state.finished) {
          this.setState({
            loading: true
          }, function () {
            fetch(endpoint + _this.state.offset).then(function (response) {
              return response.json();
            }).then(_this.processResponse.bind(_this));
          });
        }
      }
    }, {
      key: "processResponse",
      value: function processResponse(response) {
        this.setState({
          loading: false,
          offset: this.state.offset + 30,
          finished: this.state.offset + 30 > 1000,
          images: this.state.images.concat(Immutable.fromJS(response.images))
        });
      }
    }, {
      key: "generateFooter",
      value: function generateFooter() {
        if (!this.state.finished) {
          if (this.state.loading) {
            return React.createElement(
              "div",
              { className: "loading" },
              "Loading images..."
            );
          } else {
            return React.createElement(
              "button",
              { onClick: this.fetchNextImages.bind(this) },
              "Get Next"
            );
          }
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.fetchNextImages();
        window.addEventListener('scroll', this.debounce, false);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        window.removeEventListener('scroll', this.debounce, false);
      }
    }, {
      key: "checkPosition",
      value: function checkPosition() {
        if (!this.state.loading) {
          var scrollPos = window.pageYOffset + window.innerHeight;
          var bottomPos = document.documentElement.scrollHeight - 100;
          if (scrollPos >= bottomPos) {
            this.fetchNextImages();
          }
        }
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          null,
          React.createElement(List, { images: this.state.images }),
          React.createElement(
            "footer",
            null,
            this.generateFooter()
          )
        );
      }
    }]);

    return App;
  })(React.Component);

  ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
} catch (error) { throw error; }
