package com.clicks.shipping_tracking_app.shippingOrder;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/shipping-order")
public class ShippingOrderController {

    private final ShippingOrderService shippingOrderService;
}
