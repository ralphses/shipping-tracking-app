package com.clicks.shipping_tracking_app.shippingOrder.domain;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
class ShippingLocation{
    private String address;
    private LocalDateTime arrivedAt;
}
