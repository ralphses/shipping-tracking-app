package com.clicks.shipping_tracking_app.user.domain;

import com.clicks.shipping_tracking_app.user.UserDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phoneNumber;
    private String address;

    private String reference = UUID.randomUUID().toString();

    @ElementCollection
    private Set<String> sentOrders;

    @ElementCollection
    private Set<String> receivedOrders;

    public UserDto dto() {
        return new UserDto(
                this.name,
                this.email,
                this.phoneNumber,
                this.address,
                this.reference
        );
    }
}
