package com.x.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.x.Config.JwtProvider;
import com.x.Service.CustomUserDetailServiceImplementation;
import com.x.exception.UserException;
import com.x.model.User;
import com.x.model.Verification;
import com.x.repository.UserRepository;
import com.x.response.AuthResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private CustomUserDetailServiceImplementation customUserDetails;

    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            String email = user.getEmail();
            String password = user.getPassword();
            String fullName = user.getFullName();
            String birthDate = user.getBirthDate();

            if (userRepository.findByEmail(email) != null) {
                return new ResponseEntity<>("Email is already used by another account", HttpStatus.BAD_REQUEST);
            }

            User createdUser = new User();
            createdUser.setEmail(email);
            createdUser.setFullName(fullName);
            createdUser.setPassword(passwordEncoder.encode(password));
            createdUser.setBirthDate(birthDate);
            createdUser.setVerification(new Verification());

            userRepository.save(createdUser);

            // Authenticate User
            Authentication authentication = authenticate(email, password);
            String token = jwtProvider.generateToken(authentication);

            return new ResponseEntity<>(new AuthResponse(token, true), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error creating user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody User user) {
        try {
            String username = user.getEmail();
            String password = user.getPassword();

            Authentication authentication = authenticate(username, password);
            String token = jwtProvider.generateToken(authentication);

            return new ResponseEntity<>(new AuthResponse(token, true), HttpStatus.ACCEPTED);
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>("Login error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = customUserDetails.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid Username");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid Password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
