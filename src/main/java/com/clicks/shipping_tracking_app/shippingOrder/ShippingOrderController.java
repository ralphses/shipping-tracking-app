package com.clicks.shipping_tracking_app.shippingOrder;

import com.clicks.shipping_tracking_app.infrastructure.utils.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/shipping-order")
public class ShippingOrderController {

    private final ShippingOrderService shippingOrderService;

    @PostMapping
    public ApiResponse createOrder(@RequestBody ShippingOrderPayload shippingOrder) {
        String orderId = shippingOrderService.register(shippingOrder);
        return new ApiResponse(true, 200, orderId);
    }

    @GetMapping("{orderId}")
    public ApiResponse getShippingOrder(@PathVariable String orderId) {
        ShippingOrderDto order = shippingOrderService.findByReference(orderId);
        return new ApiResponse(true, 200, order);
    }

    @GetMapping
    public ApiResponse getShippingOrders(@RequestParam("page") int page, @RequestParam("user") String userEmail) {
        AllSippingOrders order = shippingOrderService.getShippingOrders(userEmail, "all", page);
        return new ApiResponse(true, 200, order);
    }
}
