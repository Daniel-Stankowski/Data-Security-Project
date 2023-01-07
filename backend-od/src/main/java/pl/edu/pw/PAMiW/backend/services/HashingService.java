package pl.edu.pw.PAMiW.backend.services;

import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class HashingService {
    Argon2PasswordEncoder argon2PasswordEncoder = new Argon2PasswordEncoder(16, 32, 1, 4096, 100);
    public String getHash(String password) {
        return argon2PasswordEncoder.encode(password);
    }

    public Boolean verifyPassword(String password, String hash) {
        return argon2PasswordEncoder.matches(password, hash);
    }
}
