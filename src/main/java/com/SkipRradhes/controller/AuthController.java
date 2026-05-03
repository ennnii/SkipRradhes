package com.SkipRradhes.controller;

import com.SkipRradhes.config.JwtConfig;
import com.SkipRradhes.dto.AuthRequest;
import com.SkipRradhes.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepo;
    private final JwtConfig jwtConfig;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/hash")
    public ResponseEntity<?> hash() {
        String hashed = passwordEncoder.encode("admin123");
        return ResponseEntity.ok(Map.of("hash", hashed));
    }

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        var user = userRepo.findByUsername("admin.bank1").orElse(null);
        if (user == null) return ResponseEntity.ok("USER NOT FOUND");
        boolean matches = passwordEncoder.matches("admin123", user.getPassword());
        return ResponseEntity.ok(Map.of(
                "found", true,
                "username", user.getUsername(),
                "passwordMatches", matches
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req) {
        var user = userRepo.findByUsername(req.getUsername()).orElse(null);

        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Përdoruesi nuk u gjet"));
        }

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Fjalëkalimi i gabuar"));
        }

        String token = jwtConfig.generateToken(user.getUsername());
        return ResponseEntity.ok(Map.of(
                "token", token,
                "username", user.getUsername(),
                "businessId", user.getBusiness().getId()
        ));
    }
}