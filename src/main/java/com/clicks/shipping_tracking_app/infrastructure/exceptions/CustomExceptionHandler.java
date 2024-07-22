package com.clicks.shipping_tracking_app.infrastructure.exceptions;

import com.clicks.shipping_tracking_app.infrastructure.utils.ApiResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(InvalidParamsException.class)
    @ResponseStatus(BAD_REQUEST)
    public ApiResponse handleInvalidParams(InvalidParamsException ex) {
        return new ApiResponse(false, BAD_REQUEST.value(), ex.getMessage());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(NOT_FOUND)
    public ApiResponse handleNotFound(InvalidParamsException ex) {
        return new ApiResponse(false, NOT_FOUND.value(), ex.getMessage());
    }
}
