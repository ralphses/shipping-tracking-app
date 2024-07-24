package com.clicks.shipping_tracking_app.user;

public interface UserService {

    boolean verifyUser(String receiver);
    UserDto findByReference(String sender);

    void createAccount(RegisterUserPayload registerUserPayload);
}
