package com.clicks.shipping_tracking_app.infrastructure.utils;

public record ApiResponse(boolean success, int status, Object data) {
}
