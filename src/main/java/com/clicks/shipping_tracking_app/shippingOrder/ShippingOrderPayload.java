package com.clicks.shipping_tracking_app.shippingOrder;

public record ShippingOrderPayload(String sender, String description, String receiver, String destination) {
}
