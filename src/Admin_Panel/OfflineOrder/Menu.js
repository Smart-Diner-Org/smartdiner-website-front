import React, { Component } from "react";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.ele = [];
    this.dropDown = [];
    this.state = {
      is_visible: false,
      sticky_sideMenu: "nav flex-column nav-pills desktop",
    };

    this.onDropdownSelected = this.onDropdownSelected.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }
  componentDidMount() {
    this.dropDown.value && this.props.setType(this.dropDown[0].value);
    this.props.setType(this.ele[0].dataset.value);
    var scrollComponent = this;

    document.addEventListener("scroll", function (e) {
      scrollComponent.toggleVisibility();
    });
  }

  toggleVisibility() {
    try {
      if (
        window.pageYOffset >
          document.getElementById("product")?.offsetTop + 200 &&
        window.pageYOffset <
          document.getElementById("product").offsetTop +
            document.getElementById("product").offsetHeight -
            250
      ) {
        this.setState({
          is_visible: true,
          function() {},
        });
      } else {
        this.setState({
          is_visible: false,
        });
      }
      if (
        window.pageYOffset >
          document.getElementById("product")?.offsetTop + 120 &&
        window.pageYOffset <
          document.getElementById("product").offsetTop +
            document.getElementById("product").offsetHeight -
            this.ele[this.ele.length - 1].offsetTop +
            this.ele[this.ele.length - 1].offsetHeight -
            280
      ) {
        this.setState({
          sticky_sideMenu:
            this.props.categoryArray.length < 7
              ? "nav flex-column nav-pills desktop desktop-sticky desktop-sticky-top"
              : "nav flex-column nav-pills desktop desktop-sticky desktop-sticky-bottom",
        });
      } else {
        this.setState({
          sticky_sideMenu: "nav flex-column nav-pills desktop desktop-rel",
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  onDropdownSelected(id) {
    this.props.setType(id);
    window.scrollTo({
      top: document.getElementById("product").offsetTop + 60,
      behavior: "smooth",
    });
  }

  render() {
    const { is_visible, sticky_sideMenu } = this.state;
    return (
      <div class="col-lg-3 col-md-4">
        <div id="collection-menu" class="collection-menu text-center mt-20">
          <div
            ref={(a) => (this.menuOptions = a)}
            class={sticky_sideMenu}
            role="tablist"
            id="menu-options"
            aria-orientation="vertical"
          >
            {this.props.categoryArray.map((category, index) => {
              return (
                <button
                  ref={(a) => (this.ele[index] = a)}
                  id={`menuCategory_${category.id}`}
                  data-value={category.id}
                  data-toggle="pill"
                  className={
                    Number(this.props.selectedType) === category.id && "active"
                  }
                  onClick={() => {
                    this.onDropdownSelected(category.id);
                    return false;
                  }}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
          <div
            id="menu-drop-down"
            className={is_visible ? "mobile sticky" : "mobile"}
          >
            <select
              className="menu-dropdown"
              id="menu-dropdown"
              onChange={(e) => this.onDropdownSelected(e.target.value)}
            >
              {this.props.categoryArray.map((category, index) => {
                return (
                  <option
                    key={index}
                    ref={(option) => (this.dropDown[index] = option)}
                    className={index === 0 ? "active" : ""}
                    value={`${category.id}`}
                    data-toggle="pill"
                  >
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    );
  }
}
export default Menu;
