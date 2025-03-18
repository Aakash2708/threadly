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
	private UserRepository userRepositry;
    @Autowired
	private PasswordEncoder passwordEncoder;
    @Autowired
	private JwtProvider jwtProvider;
    @Autowired
	private CustomUserDetailServiceImplementation customUserDetails;
    
    
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse>creaateUser(@RequestBody User user )throws UserException
    {
    	
    	String email = user.getEmail();
    	String password = user.getPassword();
    	String fullName = user.getFullName();
    	String birthDate = user.getBirthDate();
    	
    	User isEmailExist = userRepositry.findByEmail(email);
    	if(isEmailExist !=null)
    	{
    		throw new UserException("Email is Already used another Acccount");
    	}
    	
    	User createduser = new User();
    	
    	createduser.setEmail(email);
    	createduser.setFullName(fullName);
    	createduser.setPassword(password);
    	createduser.setBirthDate(birthDate);
    	createduser.setVerification(new Verification() );
    	User savedUser = userRepositry.save(createduser);

    	Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
    	SecurityContextHolder.getContext().setAuthentication(authentication);
    	String token = jwtProvider.generateToken(authentication);
    	   	
    	AuthResponse res = new AuthResponse(token ,true);
    	
    	
    	
        return new ResponseEntity<AuthResponse>(res,HttpStatus.CREATED);
        
    }
    
    @PostMapping("/signin")
	
    public ResponseEntity<AuthResponse>signin(@RequestBody User user)
    {
    	String username = user.getEmail();
    	String password = user.getPassword();
    	
    	Authentication authentication= authenticate(username,password);
    	
    	String token = jwtProvider.generateToken(authentication);
	   	
    	AuthResponse res = new AuthResponse(token ,true);
    	
    	return new ResponseEntity<AuthResponse>(res,HttpStatus.ACCEPTED);
    }

	private Authentication authenticate(String username, String password) {
		
		
		UserDetails userdetails = customUserDetails.loadUserByUsername(username);
		
		if(userdetails==null)
		{
			throw new BadCredentialsException("Invails USername");
		}
		if(!passwordEncoder.matches(password, userdetails.getPassword())) {
			throw new BadCredentialsException("Invaild Passwod");
		}
		return new  UsernamePasswordAuthenticationToken(userdetails,null,userdetails.getAuthorities());
	}
}
