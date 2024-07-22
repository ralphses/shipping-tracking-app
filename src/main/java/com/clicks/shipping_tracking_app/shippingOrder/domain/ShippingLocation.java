package com.clicks.shipping_tracking_app.shippingOrder.domain;

import jakarta.persistence.Embeddable;

import java.time.LocalDateTime;

@Embeddable
public record ShippingLocation(
        String address,
        LocalDateTime arrivedAt
) {
}
