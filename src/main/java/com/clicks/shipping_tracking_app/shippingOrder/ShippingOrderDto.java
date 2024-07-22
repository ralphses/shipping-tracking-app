package com.clicks.shipping_tracking_app.shippingOrder;

public record ShippingOrderDto(
        String sender,
        String receiver,
        String description,
        String reference,
        String status,
        ShippingLocationDto location
) {

    public record ShippingLocationDto(String address, String time) {
    }
}
