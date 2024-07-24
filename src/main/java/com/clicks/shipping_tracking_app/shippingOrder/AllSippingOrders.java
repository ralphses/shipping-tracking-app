package com.clicks.shipping_tracking_app.shippingOrder;

import java.util.List;

public record AllSippingOrders(int noOfPages, long totalElements, List<ShippingOrderDto> orders) {
}
