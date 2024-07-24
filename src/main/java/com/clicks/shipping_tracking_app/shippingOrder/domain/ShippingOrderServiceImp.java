package com.clicks.shipping_tracking_app.shippingOrder.domain;

import com.clicks.shipping_tracking_app.infrastructure.exceptions.InvalidParamsException;
import com.clicks.shipping_tracking_app.infrastructure.exceptions.ResourceNotFoundException;
import com.clicks.shipping_tracking_app.shippingOrder.AllSippingOrders;
import com.clicks.shipping_tracking_app.shippingOrder.ShippingOrderDto;
import com.clicks.shipping_tracking_app.shippingOrder.ShippingOrderPayload;
import com.clicks.shipping_tracking_app.shippingOrder.ShippingOrderService;
import com.clicks.shipping_tracking_app.user.UserDto;
import com.clicks.shipping_tracking_app.user.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Implementation of the ShippingOrderService interface.
 * Provides methods for registering, finding, tracking, and retrieving shipping orders.
 */
@Service
@Transactional
@RequiredArgsConstructor
class ShippingOrderServiceImp implements ShippingOrderService {

    private final ShippingOrderRepository shippingOrderRepository;
    private final UserService userService;

    /**
     * Registers a new shipping order.
     *
     * @param shippingOrderPayload the payload containing order details
     * @return the registered ShippingOrderDto
     * @throws InvalidParamsException if the sender or receiver is invalid
     */
    @Override
    public String register(ShippingOrderPayload shippingOrderPayload) {

        // Verify both sender and receiver
        boolean isSenderValid = userService.verifyUser(shippingOrderPayload.sender());
        boolean isReceiverValid = userService.verifyUser(shippingOrderPayload.receiver());

        if (isSenderValid && isReceiverValid) {
            ShippingOrder shippingOrder = ShippingOrder.builder()
                    .description(shippingOrderPayload.description())
                    .sender(shippingOrderPayload.sender())
                    .receiver(shippingOrderPayload.receiver())
                    .reference(UUID.randomUUID().toString())
                    .status(ShippingOrderStatus.INITIATED)
                    .timestamp(LocalDateTime.now())
                    .destination(shippingOrderPayload.destination())
                    .build();

            // Save the shipping order and return its ID
            return shippingOrderRepository.save(shippingOrder).getReference();
        }

        // Throw exception if sender or receiver is invalid
        throw new InvalidParamsException("Invalid sender or receiver");
    }

    /**
     * Finds a shipping order by its reference.
     *
     * @param reference the order reference
     * @return the ShippingOrderDto
     */
    @Override
    public ShippingOrderDto findByReference(String reference) {
        ShippingOrder shippingOrder = getShippingOrder(reference);
        return shippingOrder.dto();
    }

    @Override
    public ShippingOrderDto updateLocation(String reference, String newLocation) {
        ShippingOrder shippingOrder = getShippingOrder(reference);
        shippingOrder.UpdateLocation(newLocation);

        return shippingOrder.dto();
    }

    /**
     * Gets the sender of a shipping order.
     *
     * @param orderReference the order reference
     * @return the UserDto of the sender
     */
    @Override
    public UserDto getSender(String orderReference) {
        ShippingOrder shippingOrder = getShippingOrder(orderReference);
        return userService.findByReference(shippingOrder.getSender());
    }

    /**
     * Gets the receiver of a shipping order.
     *
     * @param orderReference the order reference
     * @return the UserDto of the receiver
     */
    @Override
    public UserDto getReceiver(String orderReference) {
        ShippingOrder shippingOrder = getShippingOrder(orderReference);
        return userService.findByReference(shippingOrder.getReceiver());
    }

    /**
     * Tracks a shipping order by its reference.
     *
     * @param orderReference the order reference
     * @return the ShippingOrderDto
     */
    @Override
    public ShippingOrderDto track(String orderReference) {
        return findByReference(orderReference);
    }

    /**
     * Retrieves a list of shipping orders for a user based on their role (sender or receiver).
     *
     * @param userReference the user's reference
     * @param userType      the type of user (sender or receiver)
     * @return a list of ShippingOrderDto
     * @throws InvalidParamsException if the user type is invalid
     */
    @Override
    public AllSippingOrders getShippingOrders(String userReference, String userType, int page) {

        Pageable pa = PageRequest.of(page - 1, 10);

        // Retrieve orders based on user type
        Page<ShippingOrder> orders = switch (userType) {
            case "receiver" -> shippingOrderRepository.findByReferenceAndReceiver(pa, userReference, userType);
            case "sender" -> shippingOrderRepository.findByReferenceAndSender(pa, userReference, userType);
            case "all" -> shippingOrderRepository.findUserOrders(pa, userReference);
            default -> throw new InvalidParamsException("Invalid user type");
        };

        // Convert orders to DTOs
        return new AllSippingOrders(
                orders.getTotalPages(),
                orders.getTotalElements(),
                orders.getContent().stream()
                        .map(ShippingOrder::dto)
                        .toList());
    }

    /**
     * Fetches a shipping order from the repository.
     *
     * @param reference the order reference
     * @return the ShippingOrder
     * @throws ResourceNotFoundException if the order is not found
     */
    private ShippingOrder getShippingOrder(String reference) {
        Optional<ShippingOrder> orderOptional = shippingOrderRepository.findByReference(reference);
        return orderOptional.orElseThrow(() -> new ResourceNotFoundException("Order with reference " + reference + " not found"));
    }
}
