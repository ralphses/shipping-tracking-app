package com.clicks.shipping_tracking_app.shippingOrder.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
interface ShippingOrderRepository extends JpaRepository<ShippingOrder, Long> {
    Optional<ShippingOrder> findByReference(String reference);
    List<ShippingOrder> findByReferenceAndSender(String reference, String sender);
    List<ShippingOrder> findByReferenceAndReceiver(String reference, String receiver);
}
