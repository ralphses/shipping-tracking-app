package com.clicks.shipping_tracking_app.user;

import com.clicks.shipping_tracking_app.infrastructure.utils.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

import static org.springframework.http.HttpStatus.CREATED;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/user")
public class UserController {

    private final UserService userService;

    @PostMapping
    public ApiResponse createAccount(@RequestBody RegisterUserPayload registerUserPayload) {
        userService.createAccount(registerUserPayload);
        return new ApiResponse(true, CREATED.value(), Collections.emptyList());
    }
}
