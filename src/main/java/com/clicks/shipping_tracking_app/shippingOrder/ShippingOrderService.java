package com.clicks.shipping_tracking_app.shippingOrder;


import com.clicks.shipping_tracking_app.user.UserDto;

public interface ShippingOrderService {
    String register(ShippingOrderPayload shippingOrderPayload);
    ShippingOrderDto findByReference(String reference);
    ShippingOrderDto updateLocation(String reference, String newLocation);
    UserDto getSender(String reference);
    UserDto getReceiver(String reference);
    ShippingOrderDto track(String reference);
    AllSippingOrders getShippingOrders(String userReference, String type, int page);
}
