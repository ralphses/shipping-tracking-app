package com.clicks.shipping_tracking_app.shippingOrder.domain;

import com.clicks.shipping_tracking_app.infrastructure.exceptions.InvalidParamsException;
import com.clicks.shipping_tracking_app.shippingOrder.ShippingOrderDto;
import com.clicks.shipping_tracking_app.shippingOrder.ShippingOrderPayload;
import com.clicks.shipping_tracking_app.shippingOrder.ShippingOrderService;
import com.clicks.shipping_tracking_app.user.UserDto;
import com.clicks.shipping_tracking_app.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.ResolutionException;
import java.util.List;

@Service
@RequiredArgsConstructor
class ShippingOrderServiceImp implements ShippingOrderService {

    private final ShippingOrderRepository shippingOrderRepository;
    private final UserService userService;

    @Override
    public ShippingOrderDto register(ShippingOrderPayload shippingOrderPayload) {

        if(userService.verifyUser(shippingOrderPayload.receiver()) && userService.verifyUser(shippingOrderPayload.sender())) {
            ShippingOrder shippingOrder = ShippingOrder.builder()
                    .description(shippingOrderPayload.description())
                    .sender(shippingOrderPayload.sender())
                    .receiver(shippingOrderPayload.receiver())
                    .build();

            return shippingOrderRepository.save(shippingOrder).dto();
        }
        throw new InvalidParamsException("Invalid sender or receiver");
    }

    @Override
    public ShippingOrderDto findByReference(String reference) {
        ShippingOrder shippingOrder = getShippingOrder(reference);
        return shippingOrder.dto();
    }

    @Override
    public UserDto getSender(String orderReference) {
        ShippingOrder shippingOrder = getShippingOrder(orderReference);
        return userService.findByReference(shippingOrder.getSender());
    }

    @Override
    public UserDto getReceiver(String orderReference) {
        ShippingOrder shippingOrder = getShippingOrder(orderReference);
        return userService.findByReference(shippingOrder.getReceiver());
    }

    @Override
    public ShippingOrderDto track(String orderReference) {
        return findByReference(orderReference);
    }

    @Override
    public List<ShippingOrderDto> getShippingOrders(String userReference, String userType) {

        return switch (userType) {

            case "receiver" -> shippingOrderRepository.findByReferenceAndReceiver(userReference, userType)
                            .stream()
                            .map(ShippingOrder::dto)
                            .toList();

            case "sender" -> shippingOrderRepository.findByReferenceAndSender(userReference, userType)
                            .stream()
                            .map(ShippingOrder::dto)
                            .toList();

            default -> throw new InvalidParamsException("Invalid user type");
        };
    }

    private ShippingOrder getShippingOrder(String reference) {
        return shippingOrderRepository.findByReference(reference)
                .orElseThrow(() -> new ResolutionException("Order with reference " + reference + " not found"));
    }
}

