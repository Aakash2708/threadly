package com.x.Service;

import java.util.List;

import java.util.List;

import com.x.exception.UserException;
import com.x.model.User;

public interface UserService {
	
	public User findUserById(Long userId)throws UserException;
	
	public User findUserProfileByJwt(String jwt) throws UserException;
	
	public User updateUser(Long userId, User user) throws UserException;
	

	public User followUser(Long userId , User user) throws UserException;
	
	public List<User> serachUser(String query );
}
