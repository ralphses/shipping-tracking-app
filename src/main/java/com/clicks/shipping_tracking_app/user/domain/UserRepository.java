package com.clicks.shipping_tracking_app.user.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByReference(String reference);
    boolean existsByEmail(String email);
    Optional<User> findByReference(String reference);

}
