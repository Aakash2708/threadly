package com.x.Service;

import java.util.List;

import com.x.exception.TwitException;
import com.x.exception.UserException;
import com.x.model.Like;
import com.x.model.User;

public interface LikeService {
	
	public Like likeTwit(Long twitId , User user )throws UserException, TwitException;
	
	public List<Like>getAllLikes(Long twitId) throws TwitException;

}
