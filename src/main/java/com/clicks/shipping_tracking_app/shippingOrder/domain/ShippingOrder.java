package com.clicks.shipping_tracking_app.shippingOrder.domain;

import com.clicks.shipping_tracking_app.shippingOrder.ShippingOrderDto;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Entity
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
class ShippingOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reference = UUID.randomUUID().toString();

    @Enumerated(EnumType.STRING)
    private ShippingOrderStatus status = ShippingOrderStatus.INITIATED;

    private LocalDateTime timestamp = LocalDateTime.now();
    private String sender;
    private String receiver;
    private String description;

    @Embedded
    private ShippingLocation location;

    public ShippingOrderDto dto() {
        return new ShippingOrderDto(
                this.sender,
                this.receiver,
                this.description,
                this.reference,
                this.status.toString().toLowerCase(),
                new ShippingOrderDto.ShippingLocationDto(
                        this.location.address(),
                        this.location.arrivedAt().format(DateTimeFormatter.ofPattern("dd-MM-yyyy H:m:s")))
        );
    }

}
