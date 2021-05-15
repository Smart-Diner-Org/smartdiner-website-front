import React, { Component } from "react";
import Item from "./Item";
import Menu from "./Menu";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: this.props.category[0].id,
      seacrh: "",
    };
  }
  setType = (type) => {
    //to display respective items for menu items selected
    this.setState((prevState) => {
      return {
        selectedType: type,
      };
    });
  };
  render() {
    return (
      <section id="product" className="product-area pt-90 pb-80">
        <div className="container">
          <div className="row ">
            <h2 className="col-lg-3 col-md-4 collection-tilte">Menu</h2>
            <div className="search-bar" tabindex="0">
              <input
                type="text"
                value={this.state.seacrh}
                onChange={(e) => this.setState({ seacrh: e.target.value })}
                name="search"
                placeholder="Search Items..."
              />
              <i class="lni lni-search"></i>
            </div>
          </div>
          <div className="row">
            <Menu
              categoryArray={this.props.category}
              setType={this.setType}
              selectedType={this.state.selectedType}
            />

            <div className="col-lg-9 col-md-8">
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id={this.state.selectedType}
                  role="tabpanel"
                  aria-labelledby={`${this.state.selectedType}-tab`}
                >
                  <div className="product-items mt-30 d-flex flex-wrap">
                    <>
                      {this.props.items.map((singleCategory) => {
                        if (singleCategory.id == this.state.selectedType) {
                          return singleCategory.menus.map((item) => {
                            if (
                              item.name
                                .toUpperCase()
                                .indexOf(this.state.seacrh.toUpperCase()) > -1
                            )
                              return (
                                <Item
                                  key={item.id}
                                  short_description={item.short_description}
                                  description={item.description}
                                  quantity={item.quantity}
                                  itemName={item.name}
                                  image={item.image}
                                  priceList={
                                    item.menu_quantity_measure_price_list
                                  }
                                  discount={item.discount}
                                  changequantity={this.props.changequantity}
                                  categoryID={singleCategory.id}
                                  menuID={item.id}
                                  total={this.props.total}
                                  is_available={item.is_available}
                                  is_availableButton={
                                    this.props.is_availableButton
                                  }
                                />
                              );
                          });
                        }
                      })}
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Product;
