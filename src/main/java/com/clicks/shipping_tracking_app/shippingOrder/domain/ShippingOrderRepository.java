package com.clicks.shipping_tracking_app.shippingOrder.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
interface ShippingOrderRepository extends JpaRepository<ShippingOrder, Long> {
    Optional<ShippingOrder> findByReference(String reference);
    Page<ShippingOrder> findByReferenceAndSender(Pageable pageable, String reference, String sender);
    Page<ShippingOrder> findByReferenceAndReceiver(Pageable pageable, String reference, String receiver);

    @Query("SELECT shippingOrder FROM ShippingOrder shippingOrder WHERE shippingOrder.receiver = ?1 OR shippingOrder.sender = ?1")
    Page<ShippingOrder> findUserOrders(Pageable pageable, String email);
}
