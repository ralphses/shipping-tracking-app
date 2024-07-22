package com.clicks.shipping_tracking_app.user.domain;

import com.clicks.shipping_tracking_app.infrastructure.exceptions.ResourceNotFoundException;
import com.clicks.shipping_tracking_app.user.UserDto;
import com.clicks.shipping_tracking_app.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public boolean verifyUser(String receiverReference) {
        return userRepository.existsByReference(receiverReference);
    }

    @Override
    public UserDto findByReference(String userReference) {
        return userRepository.findByReference(userReference)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"))
                .dto();
    }
}
