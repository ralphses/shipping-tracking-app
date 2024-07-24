package com.clicks.shipping_tracking_app.user.domain;

import com.clicks.shipping_tracking_app.infrastructure.exceptions.InvalidParamsException;
import com.clicks.shipping_tracking_app.infrastructure.exceptions.ResourceNotFoundException;
import com.clicks.shipping_tracking_app.user.RegisterUserPayload;
import com.clicks.shipping_tracking_app.user.UserDto;
import com.clicks.shipping_tracking_app.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.UUID;

@Service
@RequiredArgsConstructor
class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public boolean verifyUser(String receiverEmail) {
        return userRepository.existsByEmail(receiverEmail);
    }

    @Override
    public UserDto findByReference(String userReference) {
        return userRepository.findByReference(userReference)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"))
                .dto();
    }

    @Override
    public void createAccount(RegisterUserPayload registerUserPayload) {

        if(userRepository.existsByEmail(registerUserPayload.email()))
            throw new InvalidParamsException("email already exists");

        User user = User.builder()
                .email(registerUserPayload.email())
                .name(registerUserPayload.name())
                .reference(UUID.randomUUID().toString())
                .sentOrders(new HashSet<>())
                .phoneNumber(registerUserPayload.phone())
                .address(registerUserPayload.address())
                .receivedOrders(new HashSet<>())
                .build();

        userRepository.save(user);
    }
}
