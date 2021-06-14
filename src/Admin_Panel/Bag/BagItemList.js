import React from "react";
import BillItem from "./components/BillItem";

class BagItemList extends React.Component {
  render() {
    return (
      <div>
        {this.props.order_details.map((item, index) => {
          return (
            <BillItem
              key={index}
              description={item.menu_quantity_measure_price.menu.short_descr}
              itemName={item.menu_quantity_measure_price.menu.name}
              image={item.menu_quantity_measure_price.menu.image}
<<<<<<< HEAD

              price={this.props.price_details[index].order_detail.original_price}
              
              discountPrice={this.props.price_details[index].order_detail.price}
              
=======
              // price={this.props.price_details[index].order_detail.original_price}
              price={item.order_detail.original_price}
              // discountPrice={this.props.price_details[index].order_detail.price}
              discountPrice={item.order_detail.price}
>>>>>>> origin/release
              discount={item.menu_quantity_measure_price.menu.discount}
              // quantity={this.props.price_details[index].order_detail.quantity}
              quantity={item.order_detail.quantity}
              measure_values={item.menu_quantity_measure_price.measure_values.name}
              quantity_values={item.menu_quantity_measure_price.quantity_values.quantity}
             
            />
          );
        })}
      </div>
    );
  }
}

export default BagItemList;
