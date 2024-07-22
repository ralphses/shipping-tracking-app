package com.clicks.shipping_tracking_app.shippingOrder;


import com.clicks.shipping_tracking_app.user.UserDto;

import java.util.List;

public interface ShippingOrderService {
    ShippingOrderDto register(ShippingOrderPayload shippingOrderPayload);
    ShippingOrderDto findByReference(String reference);
    ShippingOrderDto updateLocation(String reference, String newLocation);
    UserDto getSender(String reference);
    UserDto getReceiver(String reference);
    ShippingOrderDto track(String reference);
    List<ShippingOrderDto> getShippingOrders(String userReference, String type);
}
